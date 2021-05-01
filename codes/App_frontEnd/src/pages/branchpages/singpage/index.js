import React, { Component } from 'react'
import {
    StyleSheet,
    Dimensions,
    Text,
    Image,
    View,
    Slider,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    DeviceEventEmitter
} from 'react-native'
import Recorder_2 from '../../../components/Recorder2.0/Recorder_2'
let { width, height } = Dimensions.get('window');
import Video from 'react-native-video';
let lyrObj = []   // 存放歌词
import SONGS from '../../../images/song';
import Svg from 'react-native-svg-uri';
import {origin,adjust,restart,finish,svg_huatong} from '../../../res/fonts/iconSvg';
import {pxToDp} from '../../../utils/stylesKits';

import {NavigationContext} from "@react-navigation/native";
//  http://rapapi.org/mockjsdata/16978/rn_songList
//  http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.lry&songid=213508

export default class MusicPlayer extends Component {
    static contextType = NavigationContext;

    constructor(props) {
        super(props);
        this._timer=null;
        this.keepBuffer = 0;
        this.clearCurrentBuffer = 1;
        this.clearAllBuffer = 2;
        this.state = {
            songs: SONGS,   //数据源
            pic_small: '',    //小图
            pic_big: '',      //大图
            file_duration: 0,    //歌曲长度
            song_id: '',     //歌曲id
            title: '',       //歌曲名字
            author: '',      //歌曲作者
            file_link: '',   //歌曲播放链接
            songLyr: [],     //当前歌词
            sliderValue: 0,    //Slide的value
            pause: true,       //歌曲播放/暂停
            currentTime: 0.0,   //当前时间
            duration: 0.0,     //歌曲时间
            currentIndex: 0,    //当前第几首
            isplayBtn: require('./images/暂停.png'),  //播放/暂停按钮背景图
            currentLine: 0, //当前第几行
            firstPlay: true,
            fragNum: 0,
            recordShift:0.75
        }
    }
    //重唱上一句话
    prevAction = (index) => {
        if(this.state.fragNum>0){       
            DeviceEventEmitter.emit('RecordPause',this.clearCurrentBuffer);   
            let lastFrag = lyrObj[this.state.currentLine-1].total-this.state.recordShift+0.55;
            if(lastFrag>=5){ //如果上次分割点之前还有5秒，给予5秒的准备时间。
                this.state.currentTime = lastFrag-5;
                this._timer=setInterval(()=>{
                    DeviceEventEmitter.emit('RecordStart');
                    clearInterval(this._timer); 
                },5000);
            }else{ //否则把时间拉到0，有多少时间给多少时间。
                this.state.currentTime = 0;
                this._timer=setInterval(()=>{
                    DeviceEventEmitter.emit('RecordStart');
                    clearInterval(this._timer); 
                },lastFrag*1000);
            }
            this.refs.video.seek(this.state.currentTime);
            this.state.sliderValue = this.state.currentTime;
            this.state.currentLine = this.state.currentLine - 1;
            this.state.fragNum = this.state.fragNum - 1;
        }
    }
    //全部初始化
    restart = () => {
        DeviceEventEmitter.emit('RecordPause',this.clearAllBuffer); 
        this.setState({
            currentTime: 0, 
            sliderValue: 0,
            currentLine: 0,
            fragNum: 0
        })
        this.refs.video.seek(0);
        DeviceEventEmitter.emit('RecordStart');
    }

    //下一曲
    nextAction = (index) => {
        lyrObj = [];
        if (index === this.state.songs.length) {
            index = 0 //如果是最后一首就回到第一首
        }
        this.setState({
            currentIndex: index  //更新数据
        })
        this.loadSongInfo(index)   //加载数据
    }
    //播放/暂停
    playAction = () => {
        this.setState({
            pause: !this.state.pause
        })
        //判断按钮显示什么
        if (this.state.pause === true) {
            this.setState({
                isplayBtn: require('./images/播放.png')
            });
            //同步开始录音
            DeviceEventEmitter.emit('RecordStart');
            
        } else {
            this.setState({
                isplayBtn: require('./images/暂停.png')
            });
            //录音器暂停，但不清空缓存
            DeviceEventEmitter.emit('RecordPause',this.keepBuffer);
        }

    }
    //播放器每隔250ms调用一次
    onProgress = (data) => {
        let val = parseInt(data.currentTime)
        this.setState({
            sliderValue: val,
            currentTime: data.currentTime
        })
        let shift = 0.75;
        //维护两个状态，当前唱到的歌和保存时的编号，后者使得分割尽可能是有意义的。
        if (this.state.currentTime.toFixed(2) > (lyrObj[this.state.currentLine+1].total-this.state.recordShift)){
            if(this.state.currentTime.toFixed(2)>2){
                DeviceEventEmitter.emit('fetchChunk',this.state.fragNum);
                this.state.fragNum = this.state.fragNum + 1;
            }
            this.state.currentLine = this.state.currentLine + 1;
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

            if (i < 2){
                itemAry.push(
                    <View key={i} style={styles.itemStyle}>

                        <Text style={{ color: 'blue' }}>  </Text>
                    </View>
                );

            }
            if (i==this.state.currentLine) {
                //正在唱的歌词
                itemAry.push(
                    <View key={i + 2} style={styles.itemStyle}>

                        <Text style={{ color: '#5555ff',fontSize:22 }}> {item} </Text>
                    </View>
                );
                if(this.state.currentTime > 0){this.scrollView.scrollTo({ x: 0, y: (32 * i), animated: true })};
                
            }
            else {
                //所有歌词
                itemAry.push(
                    <View key={i + 2} style={styles.itemStyle}>
                        <Text style={{ color: '#ff55559a',fontSize:18 }}> {item} </Text>
                    </View>
                )
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
            pic_small: local_song.pic_small, //小图
            pic_big: local_song.pic_big,  //大图
            title: local_song.title,     //歌曲名
            author: local_song.author,   //歌手
            file_link: local_song.file_link,   //播放链接
            file_duration: local_song.file_duration //歌曲长度
        })
        let lry = local_song.lrcContent
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
            obj.total = obj.min * 60 + obj.sec + obj.ms / 100   //总时间
            if (obj.txt.length > 0) {
                lyrObj.push(obj)
            }
        })

    }


    componentWillMount() {
        this.loadSongInfo(0)   //预先加载第一首
        
    }
    async componentDidMount() {
        //录音器保存完成后，跳转到下一个界面
        this.finishListener = DeviceEventEmitter.addListener('audioSaved',()=>{
            this.context.navigate("CompletePage");
        });
    }

    finish = ()=>{
        //告诉录音器结束了，等待录音器把完整的歌保存。
        DeviceEventEmitter.emit("RecordFinish");
        if(this.state.pause==false){
            this.playAction();
        }

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
                    {/* <Recorder_2></Recorder_2> */}
                    <Image source={{ uri: this.state.pic_big }} style={{ width: width, height: 200 }} />
                    <View>
                    <Video
                        source={{ uri: this.state.file_link }}   // Can be a URL or a local file.
                        ref='video'                           // Store reference
                        rate={1.0}                     // 0 is paused, 1 is normal.
                        volume={1.0}                   // 0 is muted, 1 is normal.
                        muted={false}                  // Mutes the audio entirely.
                        paused={this.state.pause}                 // Pauses playback entirely.
                        onProgress={(e) => this.onProgress(e)}
                        onLoad={(e) => this.onLoad(e)}
                        onEnd={() => this.nextAction(this.state.currentIndex + 1)}
                    />
                    </View>
                    <View style={styles.playingInfo}>
                        <Text>{this.state.author} - {this.state.title}</Text>
                        <Text>{this.formatTime(Math.floor(this.state.currentTime))} - {this.formatTime(Math.floor(this.state.duration))}</Text>
                    </View>

                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around',marginTop: pxToDp(12) }}>
                    <View style={{ flex:9}}>
                    <Slider
                        ref='slider'
                        value={this.state.sliderValue}
                        maximumValue={this.state.file_duration}
                        step={1}
                        minimumTrackTintColor='#FFDB42'
                        onValueChange={(value) => {
                            this.setState({
                                currentTime: value
                            })
                        }
                        }
                        onSlidingComplete={(value) => {                                
                            this.refs.video.seek(value)
                        }}
                    />
                    </View>
                        <TouchableOpacity  style={{ flex:1}} onPress={() => this.nextAction(this.state.currentIndex + 1)}>
                            <Image source={require('./images/下一首.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    </View>

                        {/* 歌词界面设置 */}
                    <View style={{ height: 320,alignItems: 'center' ,marginTop:20, flex:1}}>
                        <ScrollView style={{ position: 'relative' ,width:"80%"}}
                                    ref={(scrollView) => { this.scrollView = scrollView }}
                                    snapToInterval = {15}
                        >
                            {this.renderItem()}
                        </ScrollView>
                    </View>
                    {/* 额外添加按钮 */}
                    <View style={{ flexDirection: 'row',marginTop:pxToDp(20),marginBottom:pxToDp(20), justifyContent: 'space-around' }}>

                    <TouchableOpacity onPress={() => this.prevAction(this.state.currentIndex - 1)}>
                        <View style={styles.button}>
                            <Image source={require('./images/上一首.png')} style={{ width: 30, height: 30}} />
                            
                        </View>
                        <Text style={styles.buttontext}>上一句</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{alignItems:"center"}}>
                            <View style={styles.button}>
                                <Svg width="45" height="45" fill ="#fff"  svgXmlData={origin} />
                            </View>
                            <Text style={styles.buttontext}>原唱</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={{alignItems:"center"}}>
                            <View style={styles.button}>
                                <Svg width="35" height="35" fill ="#fff"  svgXmlData={adjust} />
                            </View>
                            <Text style={styles.buttontext}>返听调音</Text>
                        </TouchableOpacity> */}

                        <TouchableOpacity onPress={() => this.playAction()}>
                        <View style={styles.mainButton}>
                            <Image source={this.state.isplayBtn} style={{ width: 40, height: 40 }} />
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{alignItems:"center"}} onPress ={()=>this.restart()}>
                            <View style={styles.button}>
                                <Svg width="40" height="40" fill ="#fff"  svgXmlData={restart} />
                            </View>
                            <Text style={styles.buttontext}>重录</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{alignItems:"center"}}onPress ={()=>this.finish()}>
                            <View style={styles.button}>
                                <Svg width="45" height="45" fill ="#fff"  svgXmlData={finish} />
                            </View>
                            <Text style={styles.buttontext}>完成</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <Recorder_2></Recorder_2>
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
        height:pxToDp(40),
        width:pxToDp(40),
        borderRadius:30,
        backgroundColor:"#ddddee",
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainButton:{
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
        height: 40,
        alignItems: 'center'
    }
})



// import React,{Component} from 'react';
// import {View,Text,Image,StatusBar,StyleSheet} from 'react-native';

// import {pxToDp} from "../../../utils/stylesKits";
// import MusicPlayer from "../../../utils/MusicPlayer";
// import Recorder_2 from "../../../components/Recorder2.0/Recorder_2";
// import Singrefer from "./components/singrefer";
// import Svg from 'react-native-svg-uri';
// import {origin,adjust,restart,finish} from '../../../res/fonts/iconSvg';
// import CompletePage from './completepage';
// import {NavigationContext} from "@react-navigation/native";
// class Index extends Component {
//     static contextType = NavigationContext;
//     state = {  }
//     goPage = ()=>{
//         // this.context = this.props.navigation
//         this.context.navigate("CompletePage");
//     }
//     render() { 
//         return ( 
//             <View style={styles.flexFrame}>
//                 <StatusBar backgroundColor="transparent" translucent={true} ></StatusBar>
//                 <MusicPlayer></MusicPlayer>
//                 <Recorder_2></Recorder_2>
//                 {/* <Singrefer></Singrefer> */}
//                 {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around',alignContent:"center" ,paddingBottom:pxToDp(50)}}>
//                     <TouchableOpacity style={{alignItems:"center"}}>
//                         <View style={styles.button}>
//                             <Svg width="45" height="45" fill ="#fff"  svgXmlData={origin} />
//                         </View>
//                         <Text style={styles.buttontext}>原唱</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity style={{alignItems:"center"}}>
//                         <View style={styles.button}>
//                             <Svg width="35" height="35" fill ="#fff"  svgXmlData={adjust} />
//                         </View>
//                         <Text style={styles.buttontext}>返听调音</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity style={{alignItems:"center"}}>
//                         <View style={styles.button}>
//                             <Svg width="40" height="40" fill ="#fff"  svgXmlData={restart} />
//                         </View>
//                         <Text style={styles.buttontext}>重录</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity style={{alignItems:"center"}} onPress ={()=>this.goPage("CompletePage")}>
//                         <View style={styles.button}>
//                             <Svg width="45" height="45" fill ="#fff"  svgXmlData={finish} />
//                         </View>
//                         <Text style={styles.buttontext}>完成</Text>
//                     </TouchableOpacity>
//                 </View> */}
//             </View>
//         );
//     }
// }
 
// export default Index;


// const styles = StyleSheet.create({
//     buttontext:{
//         fontSize:pxToDp(14),
//         marginTop:(4),
//         color:"#4444889a"
//     },
//     button:{
//         height:pxToDp(60),
//         width:pxToDp(60),
//         borderRadius:40,
//         backgroundColor:"#ddddee",
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     flexContainer: {
//         flex: 1,
//         // 容器需要添加direction才能变成让子元素flex
//         flexDirection: 'row',
//         marginTop:pxToDp(500),
//         backgroundColor: '#cc0000',
//     },
//     flexFrame:{
//         flex: 1,
//         // 容器需要添加direction才能变成让子元素flex
//         // flexDirection: 'column',
//         backgroundColor: 'transparent',
//     },
//     cell: {
//         flex: 1,
//         height: 50,
//         justifyContent: 'center',
//         backgroundColor: '#aaaaaa',
//         // alignSelf:"center",
//     },
//     welcome: {
//         fontSize: 20,
//         textAlign: 'center',
//         margin: 10
//     },
//     cellfixed: {
//         height: 50,
//         width: "25%",
//         backgroundColor: '#fefefe'
//     },
//     icon_more: {
//         // height: 10,
//         // width: 10,
//         marginTop:pxToDp(50)
//     },
//     flexTopContainer: {
//         flex: 1,
//         // 容器需要添加direction才能变成让子元素flex
//         flexDirection: 'row',
//         backgroundColor: '#ccccee',
//         // marginTop:pxToDp(100),
//     },
//     cellfixedTop: {
//         height: 30,
//         width: 70,
//         alignSelf: "center"
//         // backgroundColor: '#fefefe'
//     },
//     control:{
//         height: 30,
//         width: 30,
//         alignSelf: "center"
        
//     },
//     play:{
//         height: 80,
//         width: 80,
//         alignSelf: "center"
//     },
//     flexMidContainer: {
//         flex: 1,
//         // 容器需要添加direction才能变成让子元素flex
//         flexDirection: 'row',
//         // backgroundColor: '#aaaaaa',
//         marginTop:pxToDp(350),
//     },
//     cellfixedMid: {
//         height: 40,
//         width: 110,
//         // backgroundColor: '#fefefe'
//     },
// });