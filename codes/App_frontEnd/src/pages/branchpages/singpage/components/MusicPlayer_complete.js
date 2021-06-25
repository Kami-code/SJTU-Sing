import React, { Component } from 'react'
import {
    StyleSheet,
    Dimensions,
    Text,
    Image,
    View,
    // Slider,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    DeviceEventEmitter
} from 'react-native'
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
let { width, height } = Dimensions.get('window');
import Video from 'react-native-video';
let lyrObj = []   // 存放歌词
import SONGS from '../../../../images/song';
import Svg from 'react-native-svg-uri';
import {pxToDp} from '../../../../utils/stylesKits';

import {NavigationContext} from "@react-navigation/native";
//  http://rapapi.org/mockjsdata/16978/rn_songList
//  http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.lry&songid=213508

export default class MusicPlayer extends Component {
    static contextType = NavigationContext;
    // static propTypes = {
    //     audioVolumn: PropTypes.int,
    //     musicVolumn: PropTypes.int,
    // };
    constructor(props) {
        super(props);
        this._timer=null;
        this.keepBuffer = 0;
        this.clearCurrentBuffer = 1;
        this.clearAllBuffer = 2;
        this.state = {
            songs: global.SONGS,   //数据源
            picture: '',
            file_duration: 0,    //歌曲长度
            id: '',
            song_id: '',     //歌曲id
            title: '',       //歌曲名字
            author: '',      //歌曲作者
            file_link: `file:///${global.ACC[4]}`,   //歌曲播放链接
            songLyr: [],     //当前歌词
            sliderValue: 0,    //Slide的value
            pause: false,       //歌曲播放/暂停
            currentTime: 0.0,   //当前时间
            duration: 0.0,     //歌曲时间
            duration2: 0.0,
            currentIndex: 0,    //当前第几首
            isplayBtn: require('./image/播放.png'),  //播放/暂停按钮背景图
            currentLine: 0, //当前第几行
            firstPlay: true,
            fragNum: 0,
            recordShift:0.75
        }
    }

    //播放/暂停
    playAction = () => {
        this.setState({
            pause: !this.state.pause
        })
        //判断按钮显示什么
        if (this.state.pause === true) {
            this.setState({
                isplayBtn: require('./image/播放.png')
            });
            //同步开始录音
           
            
        } else {
            this.setState({
                isplayBtn: require('./image/暂停.png')
            });
            //录音器暂停，但不清空缓存
            
        }

    }
    //播放器每隔250ms调用一次
    onProgress = (data) => {
        let val = parseInt(data.currentTime)
        this.setState({
            sliderValue: val,
            currentTime: data.currentTime
        })
        if(this.state.currentLine<lyrObj.length-2){
            this.state.currentLine=0;
            if (this.state.currentTime.toFixed(2) > (lyrObj[this.state.currentLine+1].total)){
                this.state.currentLine = this.state.currentLine + 1;
            }
        }
        
    }

    //把秒数转换为时间类型
    formatTime(time) {
        // 71s -> 01:11
        let min = Math.floor(time / 60)
        let second = time - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second : '0' + second
        return min + ':' + second
    }
    // 歌词
    renderItem() {
        // 数组
        let itemAry = [];
        for (let i = 0; i < lyrObj.length; i++) {
            let item = lyrObj[i].txt

            if (i==this.state.currentLine) {
                //正在唱的歌词
                itemAry.push(
                    <View key={i + 2} style={styles.itemStyle}>

                        <Text style={{ color: '#5555ff',fontSize:16 }}> {item} </Text>
                    </View>
                );
                if(this.state.currentTime > 0){this.scrollView.scrollTo({ x: 0, y: (40 * i), animated: true })};
                
            }

        }

        return itemAry;
    }
    // 播放器加载好时调用,其中有一些信息带过来
    onLoad = (data) => {
        this.setState({ duration: data.duration });
    }

    loadSongInfo = (index) => {
        //加载歌曲
        let local_song = this.state.songs[index];
        this.setState({
            pic_small: local_song.picture, //小图
            pic_big: local_song.picture,  //大图
            title: local_song.name,     //歌曲名
            author: local_song.singer,   //歌手
            file_link: local_song.mp3,   //播放链接
            file_duration: local_song.file_duration //歌曲长度
        })
        let lry = local_song.lyric
        let lryAry = lry.split('\n')   //按照换行符切数组
        lryAry.forEach(function (val, index) {
            let obj = {}   //用于存放时间
            val = val.replace(/(^\s*)|(\s*$)/g, '')    //正则,去除前后空格
            let indeofLastTime = val.indexOf(']')  // ]的下标
            let timeStr = val.substring(1, indeofLastTime) //把时间切出来 0:04.19
            let minSec = ''
            let timeMsIndex = timeStr.indexOf('.')  // .的下标
            if (timeMsIndex !== -1) {
                //存在毫秒 0:04.19
                minSec = timeStr.substring(1, val.indexOf('.'))  // 0:04.
                obj.ms = parseInt(timeStr.substring(timeMsIndex + 1, indeofLastTime))  //毫秒值 19
            } else {
                //不存在毫秒 0:04
                minSec = timeStr
                obj.ms = 0
            }
            let curTime = minSec.split(':')  // [0,04]
            obj.min = parseInt(curTime[0])   //分钟 0
            obj.sec = parseInt(curTime[1])   //秒钟 04
            obj.txt = val.substring(indeofLastTime + 1, val.length) //歌词文本: 留下唇印的嘴
            obj.txt = obj.txt.replace(/(^\s*)|(\s*$)/g, '')
            obj.dis = false
            obj.total = obj.min * 60 + obj.sec + obj.ms / 1000   //总时间
            if (obj.txt.length > 0) {
                lyrObj.push(obj)
            }
        })

    }


    UNSAFE_componentWillMount() {
        this.loadSongInfo(0)   //预先加载第一首
        
    }
    async componentDidMount() {
        //录音器保存完成后，跳转到下一个界面
        this.resetListener = DeviceEventEmitter.addListener('resetAudio',()=>{
            let time = this.state.currentTime;
            let play = false;
            if(this.state.pause==false){
                play = true;
                this.setState({pause:true});
            }
            this.setState({
                file_link: `file:///${global.ACC[1]}`,   //播放链接
            });
            this.setState({
                file_link: `file:///${global.ACC[4]}`,   //播放链接
            });
            timer = setTimeout(()=>{            
                this.refs.audio.seek(time+0.1);
                this.setState({
                    currentTime:time+0.1,  
                });
                if(play == true){
                    this.setState({pause:false});
                }
                timer && clearTimeout(timer);
            },100);



        });
        this.stopListener = DeviceEventEmitter.addListener('stop',()=>{
            this.setState({
                pause:true
            })
        });
    }


    render() {
        //如果未加载出来数据 就一直转菊花
        if (this.state.songs.length <= 0) {
            return (
                <ActivityIndicator
                    animating={this.state.animating}
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                    size="large" />
            )
        } else {
            //数据加载出来
            return (
                <View style={styles.container}>
                    <View>
                        <Video
                                // source={{ uri: this.state.file_link }}   // Can be a URL or a local file.
                                source = {{uri: this.state.file_link}}
                                ref='audio'                           // Store reference
                                rate={1.0}                     // 0 is paused, 1 is normal.
                                volume={1.0}                   // 0 is muted, 1 is normal.
                                muted={false}                  // Mutes the audio entirely.
                                paused={this.state.pause}                 // Pauses playback entirely.
                                onProgress={(e) => this.onProgress(e)}
                                onLoad={(e) => this.onLoad(e)}
                                onEnd={() => {}}
                            />
                    </View>
                    <View style={styles.playingInfo}>
                        <Text>{this.state.author} - {this.state.title}</Text>
                        <Text>{this.formatTime(Math.floor(this.state.currentTime))} - {this.formatTime(Math.floor(this.state.duration))}</Text>
                    </View>

                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around',marginTop: pxToDp(12) }}>
                        <View style={{ marginLeft: 10, marginRight: 10}}></View>
                        <TouchableOpacity onPress={() => this.playAction()}>
                            <Image source={this.state.isplayBtn} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>

                        <Slider
                        ref='slider'
                        style={{ marginLeft: 10, marginRight: 20 ,flex:1}}
                        value={this.state.sliderValue}
                        maximumValue={this.state.file_duration}
                        step={1}
                        minimumTrackTintColor='#FFDB42'
                        onValueChange={(value) => {
                            this.setState({
                                currentTime: value
                            })
                            this.refs.audio.seek(value);
                        }
                        }
                        onSlidingComplete={(value) => {

                        }}
                    />
                    </View>

                        {/* 歌词界面设置 */}
                    <View style={{ height: 120,alignItems: 'center' ,marginTop:0}}>
                        <ScrollView style={{ position: 'relative' ,width:"80%"}}
                                    ref={(scrollView) => { this.scrollView = scrollView }}
                                    snapToInterval = {0}
                        >
                            {this.renderItem()}
                        </ScrollView>
                    </View>

                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
    buttontext:{
        fontSize:pxToDp(14),
        marginTop:(4),
        color:"#4444889a"
    },
    button:{
        height:pxToDp(60),
        width:pxToDp(60),
        borderRadius:40,
        backgroundColor:"#ddddee",
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    image: {
        flex: 1
    },
    playingControl: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
    },
    playingInfo: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    text: {
        color: "black",
        fontSize: 22
    },
    modal: {
        height: 300,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        paddingTop: 5,
        paddingBottom: 50
    },
    itemStyle: {
        height: 35,
        alignItems: 'center'
    }
})
