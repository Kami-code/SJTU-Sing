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
    DeviceEventEmitter,
    Alert,
    LogBox
} from 'react-native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import Icon from 'react-native-vector-icons'
import Slider from '@react-native-community/slider';
import Recorder_2 from '../../../components/Recorder2.0/Recorder_2';
let { width, height } = Dimensions.get('window');
import Video from 'react-native-video';
let lyrObj = []   // 存放歌词
import SONGS from '../../../images/song';
import Svg from 'react-native-svg-uri';
import {origin,adjust,restart,finish,svg_huatong,svg_shezhi} from '../../../res/fonts/iconSvg';
import {pxToDp} from '../../../utils/stylesKits';

import {NavigationContext} from "@react-navigation/native";
import { cos } from 'react-native-reanimated';
import Loading from "../../../components/common/Loading";
import Ready from "../../../components/common/Ready"
import "../../../components/common/RootView";
import {encode,decode,mergeAudio,noiseSuppress,aecm, default_sox, toSingleChannel, amplify} from '../../../utils/audio-api';
import RNFS, { stat } from 'react-native-fs';
//  http://rapapi.org/mockjsdata/16978/rn_songList
//  http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.lry&songid=213508
import Spectrum from '../../../components/Spectrum';
import { ImageBackground } from 'react-native';


export default class Singpage extends Component {
    static contextType = NavigationContext;

    constructor(props) {
        super(props);
        this._timer=null;
        this.scrollTimer=null;
        this.keepBuffer = 0;
        this.clearCurrentBuffer = 1;
        this.clearAllBuffer = 2;
        this.state = {
            songs: global.SONGS,   //数据源
            pic_small: '',    //小图
            pic_big: '',      //大图
            file_duration: 0,    //歌曲长度
            song_id: '',     //歌曲id
            title: '',       //歌曲名字
            author: '',      //歌曲作者
            file_link: '',   //歌曲播放链接
            songLyr: [],     //当前歌词
            sliderValue: 0,    //Slide的value
            scrolling: false,
            scrollValue: 0,
            pause: true,       //歌曲播放/暂停
            currentTime: 0.0,   //当前时间
            duration: 0.0,     //歌曲时间
            currentIndex: 0,    //当前第几首
            isplayBtn: require('./images/暂停.png'),  //播放/暂停按钮背景图
            currentLine: 0, //当前第几行
            firstPlay: true,
            // fragNum: 0,
            recordShift:0.2,
            lastFragTime: 0,

            accPath:"",
            //proc_audio_wav: `${RNFS.CachesDirectoryPath }/proc_audio.wav`,
            proc_audio_wav: `${RNFS.ExternalStorageDirectoryPath }/proc_audio.wav`,
            merge_audio_wav: `${RNFS.CachesDirectoryPath }/merge_audio.wav`,
            playACC:false,
            showSpectrum: 'none',
            myScore: 0,
            totalScore: 0,
            numOfScore: 0,
            effect: 0,
            
        }
    }

    jumpTo = (index) =>{
        DeviceEventEmitter.emit('RecordPause',this.clearCurrentBuffer); 
        Ready.show();  
            let lastFrag = lyrObj[index].total-this.state.recordShift+0.1;
            if(lastFrag>=5){ //如果上次分割点之前还有5秒，给予5秒的准备时间。
                this.state.currentTime = lastFrag-5;
                console.log("waaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1");
                this._timer=setInterval(()=>{
                    DeviceEventEmitter.emit('RecordStart');
                    Ready.hide();
                    console.log("waaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                    this._timer && clearInterval(this._timer); 
                },5000);
            }else{ //否则把时间拉到0，有多少时间给多少时间。
                this.state.currentTime = 0;
                this._timer=setInterval(()=>{
                    DeviceEventEmitter.emit('RecordStart');
                    Ready.hide();
                    this._timer && clearInterval(this._timer); 
                },lastFrag*1000);
            }
            this.refs.yuanchang.seek(this.state.currentTime);
            this.refs.banzou.seek(this.state.currentTime);
            this.state.sliderValue = this.state.currentTime;
            this.state.currentLine = index;
    }
    share = () =>{
            let facebook = <Icon name={'facebook'} color={'#3C5A9A'} size={6} family={'FontAwesome'} />
            let instagram = <Icon name={"instagram"} color={"#DD2E73"} size={6} family={"FontAwesome"} />;
            let skype = <Icon name={"skype"} color={"#10AEF3"} size={6} family={"FontAwesome"} />;
            let twitter = <Icon name={"twitter"} color={"#0000aa"} size={6} family={"FontAwesome"} />;
            let whatsapp = <Icon name={"whatsapp"} color={"#00ac00"} size={6} family={"FontAwesome"} />;
            let youtube = <Icon name={"youtube"} color={"#FE0000"} size={6} family={"FontAwesome"} />;
            let google = <Icon name={'google'} color={'#ff0000'} size={6} family={'FontAwesome'} />
            let linkedin = <Icon name={"linkedin"} color={"#0000ff"} size={6} family={"FontAwesome"} />;
        
        
            let GridView = RNBottomActionSheet.GridView
            GridView.Show({
              title: "Awesome!",
              items: [
                { title: "Facebook", icon: facebook },
                { title: "Instagram" ,icon:instagram},
                { title: "Skype", icon: skype },
                { title: "Twitter", icon: twitter },
                { title: "WhatsApp", icon: whatsapp },
                { title: "YouTube", icon: youtube },
                { title: "Google", icon: google },
                { title: "LinkedIn", icon: linkedin }
              ],
              theme: 'light',
              onSelection: (selection) => {
                console.log('selection: ' + selection)
              }
            });
    }



    //重唱上一句话
    setEffect = () => {
        let i0 = <Icon family={'FontAwesome'} name={'instagram'} color={'#000000'} size={30} />
        let i1 = <Icon family={'FontAwesome'} name={'instagram'} color={'#000000'} size={30} />
        let i2 = <Icon family={'FontAwesome'} name={'instagram'} color={'#000000'} size={30} />
        let i3 = <Icon family={'FontAwesome'} name={'instagram'} color={'#000000'} size={30} />
        if(this.state.effect==0){i0 = <Icon family={'FontAwesome'} name={'instagram'} color={'#ff0000'} size={30} />}
        else if (this.state.effect==1){i1 = <Icon family={'FontAwesome'} name={'instagram'} color={'#ff0000'} size={30} />}
        else if (this.state.effect==2){i2 = <Icon family={'FontAwesome'} name={'instagram'} color={'#ff0000'} size={30} />}
        else if (this.state.effect==3){i3 = <Icon family={'FontAwesome'} name={'instagram'} color={'#ff0000'} size={30} />}

        let SheetView = RNBottomActionSheet.SheetView;

        SheetView.Show({
        title: "效果",
        items: [
            { title: "录音室", value: 0, icon: i0 },
            { title: "KTV", value: 1, icon: i1 },
            { title: "音乐厅", value: 2, icon: i2 },
            { title: "空灵", value: 3, icon: i3 },
        ],
        theme: "light",
        selection: 3,
        onSelection: (index, value) => {
            this.setState({effect:index});
        },
        onCancel: () => console.log('Closing the bottom SheetView!!!')
        });
    }
    //全部初始化
    restart = () => {
        DeviceEventEmitter.emit('RecordPause',this.clearAllBuffer); 
        this.refs.yuanchang.seek(0);
        this.refs.banzou.seek(0);
        this.setState({
            currentTime: 0, 
            sliderValue: 0,
            currentLine: 0,
            lastFragTime:0,
            pause: true,       //歌曲播放/暂停
            isplayBtn: require('./images/暂停.png'),
            firstPlay: true,
        })
        this.loadSongInfo(0);
        if(!this.state.scrolling){
            this.scrollView.scrollTo({ x: 0, y: 0, animated: false });
        }
    }


    //播放/暂停
    playAction = () => {
        if(this.state.firstPlay){
            this.state.firstPlay = false;
            this.refs.yuanchang.seek(0);
            this.refs.banzou.seek(0);
        }
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
            global.RECORDING = true;
            
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
        let val = parseInt(data.currentTime);
        this.setState({
            sliderValue: val,
            currentTime: data.currentTime
        });
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
        // itemAry.push(
        //     <View key={0} style={styles.itemStyle}>
        //         <Text style={{ color: '#ff55559a',fontSize:18 }}> {} </Text>
        //     </View>
        // );
        if(!this.state.scrolling){
            
        for (let i = 0; i < lyrObj.length; i++) {
            let item = lyrObj[i].txt

            if (i==this.state.currentLine) {
                //正在唱的歌词
                itemAry.push(
                    <View key={i + 2} style={styles.itemStyle}>

                        <Text style={{ color: '#5555ff',fontSize:23 }}> {item} </Text>
                    </View>
                );
                if(this.state.currentTime > 0){this.scrollView.scrollTo({ x: 0, y: (40 * i), animated: true })};
                
            }
            else {
                //所有歌词
                itemAry.push(
                        <View key={i + 2} style={styles.itemStyle}>
                            <Text style={{ color: '#ff55559a',fontSize:19 }}> {item} </Text>
                        </View>
                )
            }
        }
        for (let i = 0; i < 5; i++) {
            itemAry.push(
                <View key={i + 100} style={styles.itemStyle}>
                    <Text style={{ color: '#ff55559a',fontSize:18 }}> {} </Text>
                </View>
            )
        }

        return itemAry;
        }else{
            let line = Math.round(this.state.scrollValue/40);
            for (let i = 0; i < lyrObj.length; i++) {
                let item = lyrObj[i].txt
    
                if (i==line) {
                    //正在唱的歌词
                    itemAry.push(
                        <View key={i + 2} style={styles.itemStyle}>
    
                            <Text style={{ color: '#5555ff',fontSize:23 }}> {item} </Text>
                        </View>
                    );                    
                }
                else {
                    //所有歌词
                    itemAry.push(
                        <View key={i + 2} style={styles.itemStyle}>
                            <Text style={{ color: '#ff55559a',fontSize:19 }}> {item} </Text>
                        </View>   
                    )
                }
            }
            for (let i = 0; i < 5; i++) {
                itemAry.push(
                    <View key={i + 100} style={styles.itemStyle}>
                        <Text style={{ color: '#ff55559a',fontSize:18 }}> {} </Text>
                    </View>
                )
            }
    
            return itemAry;
        }
    }
    // 播放器加载好时调用,其中有一些信息带过来
    onLoad = (data) => {
        this.setState({ duration: data.duration });
    }

    loadSongInfo = (index) => {
        //加载歌曲
        let local_song = this.state.songs[index];
        lyrObj = [];
        this.setState({
            pic_small: local_song.picture, //小图
            pic_big: local_song.picture,  //大图
            title: local_song.name,     //歌曲名
            author: local_song.singer,   //歌手
            file_link: local_song.mp3,   //播放链接
            song_id: local_song.id,
            //file_duration: local_song.file_duration, //歌曲长度
            currentLine: 0, //当前第几行
            firstPlay: true,
            currentTime:0,
            lastFragTime:0,

            file_duration: local_song.length //歌曲长度
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
        this.loadSongInfo(0);   //预先加载第一首
    }
    async componentDidMount() {
        LogBox.ignoreAllLogs(true)//关闭全部黄色警告
        DeviceEventEmitter.emit('RecordInit');
        //录音器保存完成后，跳转到下一个界面
        this.finishListener = DeviceEventEmitter.addListener('RecordStopped',async(param)=>{
            if(param===0){
                this.context.navigate("Tabbar");
            }else{
                global.ACC[8]=`${RNFS.CachesDirectoryPath}/audio_tmp.wav`;
                global.ACC[7]=`${RNFS.CachesDirectoryPath}/music_tmp.wav`;
                global.ACC[3] = this.state.proc_audio_wav;
                global.ACC[4] = this.state.merge_audio_wav;
                await default_sox(global.ACC[2],global.ACC[3],this.state.effect,0);
                await amplify(global.ACC[3],global.ACC[8],0);
                await amplify(global.ACC[1],global.ACC[7],0);
                await mergeAudio(global.ACC[7],global.ACC[8],global.ACC[4]);
                Loading.hide();
                global.SCORE = this.state.myScore;
                
                console.log ("finScore = ", global.SCORE);
                this.context.navigate("CompletePage");
            }
            
        });
        this.routerEvent = this.props.navigation.addListener("focus", payload => {
            this.loadSongInfo(0);
            DeviceEventEmitter.emit('RecordInit');
        });

        this.uploadListener = DeviceEventEmitter.addListener("RecordUpload",(param)=>{
            if(param.end>3){
                this.uploadUser(param.index,param.start,param.end);
            }
        });
        this.refreshTimer = setInterval(() => {
            //维护当前唱到的句子号
            if(this.state.pause==false){
                this.state.currentTime = this.state.currentTime+0.01;
            }
            if(this.state.currentLine<lyrObj.length-1){
                if (this.state.currentTime.toFixed(2) > (lyrObj[this.state.currentLine+1].total-this.state.recordShift)){
                    DeviceEventEmitter.emit('fetchChunk',{"fragNum":this.state.currentLine,"startTime":lyrObj[this.state.currentLine].total-this.state.recordShift,"fragTime":this.state.currentTime});
                    this.state.lastFragTime= this.state.currentTime;
                    this.state.currentLine = this.state.currentLine + 1;
                }
            }
        },10);
    }
    componentWillUnmount() {
        this.routerEvent && this.routerEvent();
        this.finishListener && this.finishListener.remove();
        this.refreshTimer && clearInterval(this.refreshTimer);
       }

    finish = ()=>{
        //告诉录音器结束了，等待录音器把完整的歌保存。
        DeviceEventEmitter.emit("RecordFinish",{"fragNum": this.state.currentLine, "fragTime": this.state.currentTime});
        if(this.state.pause==false){
            this.playAction();
        }
        Loading.show();
    }

    returnToMainPage = ()=>{
        console.log("0");
        DeviceEventEmitter.emit("RecordFinish",'return');
    }
    finishBtn = ()=>Alert.alert(
        '歌曲还没有结束，要直接完成吗？',
        '',
        [
          {
            text: '取消',
            style: 'cancel',
          },
          {text: '完成', onPress: () => {this.finish();}},
        ],
        {cancelable: false},
      );

      returnBtn = ()=>Alert.alert(
        '要退出唱歌吗？',
        '',
        [
          {
            text: '取消',
            style: 'cancel',
          },
          {text: '退出', onPress: () => {this.returnToMainPage();}},
        ],
        {cancelable: false},
      );

      restartBtn = ()=>Alert.alert(
        '要重唱本歌曲吗？',
        '',
        [
          {
            text: '取消',
            style: 'cancel',
          },
          {text: '重唱', onPress: () => {this.restart();}},
        ],
        {cancelable: false},
      );

    //打分
    getScore = async(start,end)=>{
        //一定要在upload之后调用，否则返回no reference, 高强度连续调用会返回Wait（并发为1，建议转个菊花）
        let formData = new FormData();
        formData.append("song_id",this.state.song_id);//歌的id，与upload中一致
        formData.append("username",global.account);
        formData.append("begin",start);//起讫时间测试中写死了，需要根据实际调整
        formData.append("end",end);
        
        console.log(formData);

        const url = `http://${global.IP}/score`;
        fetch(url,{
            method:'POST',
            body: formData,
        }).then(response =>response.json())
        .then(data => {
            console.log("get response score")
            console.log(data)
            console.log(data.score)//数据在这里，data.score
            let total = this.state.totalScore; 
            let times = this.state.numOfScore;
            this.setState({
                myScore: data.score,
                totalScore: total + data.score,
                numOfScore: times + 1,
            })
        })
        .catch((error) =>{
            console.log(error)
            // alert(error)
        })
    }

    //上传用户作品段
    uploadUser = async(i,start,end)=>{
        //本函数上传id+user.wav文件
        //调用一次上次传一个，流程中需要调用两次，一次原唱一次用户（原唱应该只需要一次）
        let params = {
            path: global.ACC[i+6] // 根据自己项目修改参数哈
        }
        console.log(this.state.audioFile);
        let {path} = params;
        let formData = new FormData();
        let soundPath = `file://${path}` ;  // 注意需要增加前缀 `file://`
        console.log(soundPath);
        let fileName = `${this.state.song_id}user.wav`// 文件名，应后端要求进行修改
        console.log("Filename: "+ fileName);
        let file = { uri: soundPath , type: "multipart/form-data", name: fileName} // 注意 `uri` 表示文件地址，`type` 表示接口接收的类型，一般为这个，跟后端确认一下
        formData.append('file',file);
        formData.append('username',global.account);
        formData.append('songid',this.state.song_id);
        
        fetch(`http://${global.IP}/upload`, 
        {
            method: 'POST',
            body:formData,
            // body: "1111",
            timeout: 5000 // 5s超时
        }
        )
            .then(response =>{ 
            response.json();
            console.log("get response");
            // console.log(response.contentLength());
            // console.log('');
            this.getScore(start,end)
            })
            .then(formData => formData)
            .catch(error => {
            console.log("failed");
                return {error_code: -3, error_msg:'请求异常，请重试'}
        }).catch((error) =>{
            console.log(error)
        })
        console.log("fetch end");
    }

    switchSource =()=>{
        let state = this.state.playACC
        this.setState({
            playACC: (!state)
        })
        console.log(this.state.playACC)
    }
    handleScroll= (event: Object)=> {
        this.setState({
            scrollValue:event.nativeEvent.contentOffset.y
        });
    }

    switchBackground =()=>{
        let sta = this.state.showSpectrum
        if (sta === 'none'){
            sta = 'flex'
        }
        else if (sta === 'flex'){
            sta = 'none'
        }
        this.setState({
            showSpectrum: sta
        })
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
                    {/* <Text>{this.context.state.params.id}</Text> */}
                    {/* 顶部栏 */}
                    <View style={styles.playingInfo}>
                        {/* 返回键 */}
                        <TouchableOpacity onPress={() => this.returnToMainPage()}>
                            <Image source={require('./images/上一首.png')} style={{ width: 25, height: 25,marginTop:10}} />
                        </TouchableOpacity>
                        {/* 歌曲名称 */}
                        <Text style={{fontSize:20,marginTop:10}}> {this.state.title}</Text>
                        {/* 切换下一首歌（以后可以换成菜单键） */}
                        <TouchableOpacity  style={{ width: 25, height: 25 }} onPress={() => {}}>
                
                        </TouchableOpacity>             
                    </View>
                    {/* 图片，可以换成五线谱 */}
                    <TouchableOpacity onPress={()=> this.switchBackground()}>
                        <ImageBackground source={{ uri: this.state.pic_big }} style={{ width: width, height: 200 }} >
                            <View style={{flex:1, display: this.state.showSpectrum }}>
                                <Spectrum pause ={this.state.pause}/>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    
                    <View>
                        <Text> 当前得分： {this.state.myScore}</Text>
                        <Text> 当前平均得分： {this.state.numOfScore?this.state.totalScore/this.state.numOfScore:0}</Text>
                    {/* {(this.state.playACC)?  */}
                        <Video
                            // source={{uri: this.state.file_link }}   //原唱
                            source = {{uri:`file:///${global.ACC[0]}`}}//伴奏
                            ref='banzou'                           // Store reference
                            rate={1.0}                     // 0 is paused, 1 is normal.
                            volume={1.0}                   // 0 is muted, 1 is normal.
                            muted={this.state.playACC}                  // Mutes the audio entirely.
                            paused={this.state.pause}                 // Pauses playback entirely.
                            onProgress={(e) => this.onProgress(e)}
                            onLoad={(e) => this.onLoad(e)}
                            onEnd={() => {
                                // DeviceEventEmitter.emit('fetchChunk',this.state.fragNum);
                                this.finish();
                            }}
                        />
                        <Video
                            source={{uri: this.state.file_link }}   //原唱
                            // source = {{uri:`file:///${global.ACC[0]}`}}//伴奏
                            ref='yuanchang'                           // Store reference
                            rate={1.0}                     // 0 is paused, 1 is normal.
                            volume={1.0}                   // 0 is muted, 1 is normal.
                            muted={!this.state.playACC}                  // Mutes the audio entirely.
                            paused={this.state.pause}                 // Pauses playback entirely.
            
                        />
                    </View>


                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around',marginTop: pxToDp(12),marginLeft:pxToDp(10),marginRight:pxToDp(10) }}>
                        <Text>{this.formatTime(Math.floor(this.state.currentTime))} | {this.formatTime(Math.floor(this.state.duration))}</Text>
                        <View style={{ flex:1}}>
                            <Slider
                                ref='slider'
                                value={this.state.sliderValue}
                                maximumValue={this.state.duration}
                                disabled = {true}
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
                    </View>

                    {/* 歌词界面设置 */}
                    <View style={{ height: 320,alignItems: 'center' ,marginTop:20, flex:1}}>
                        <ScrollView style={{ position: 'relative' ,width:"100%"}}
                                    ref={(scrollView) => { this.scrollView = scrollView }}
                                    showsVerticalScrollIndicator = {false}
                                    snapToInterval = {15}
                                    onScrollBeginDrag = {()=>{
                                        this.scrollTimer && clearInterval(this.scrollTimer); 
                                        this.state.scrolling=true;
                                    }}
                                    onScroll = {this.handleScroll}
                                    onScrollEndDrag = {()=>{
                                        this.scrollTimer=setInterval(()=>{
                                            this.state.scrolling=false;
                                            let index = Math.round(this.state.scrollValue/40);
                                            if(index<this.state.currentLine&&this.state.pause==false){
                                                this.jumpTo(index);
                                            }
                                            this.scrollTimer && clearInterval(this.scrollTimer); 
                                        },200);
                                    }}
                                    snapToAlignment = {'center'}
                        >
                            {this.renderItem()}
                        </ScrollView>
                    </View>
                    {/* 添加底部按钮 */}
                    <View style={{ flexDirection: 'row',marginTop:pxToDp(20),marginBottom:pxToDp(20), justifyContent: 'space-around' }}>


                        {/* 切换原唱 */}
                        <TouchableOpacity style={{alignItems:"center"}}onPress ={()=>this.switchSource()}>
                            <View style={styles.button}>
                                <Svg width="45" height="45" fill ="#fff"  svgXmlData={origin} />
                            </View>
                            {(this.state.playACC)?
                                <Text style={styles.buttontext}>伴唱</Text>:
                                <Text style={styles.buttontext}>原唱</Text>
                            }
                            
                        </TouchableOpacity>

                                                 {/* 重唱上一句 */}
                                                 <TouchableOpacity onPress={()=>{this.setEffect();}}>
                            <View style={styles.button}>
                            <Svg width="40" height="40" fill ="#fff"  svgXmlData={svg_shezhi} />
                                {/* <Image source={require('./images/上一首.png')} style={{ width: 30, height: 30}} />      */}
                            </View>
                            <Text style={styles.buttontext}>  调音</Text>
                        </TouchableOpacity>
                        

                        {/* 开始暂停 */}
                        <TouchableOpacity onPress={() => this.playAction()}>
                            <View style={styles.mainButton}>
                                <Image source={this.state.isplayBtn} style={{ width: 40, height: 40 }} />
                            </View>
                        </TouchableOpacity>

                        {/* 重录歌曲 */}
                        <TouchableOpacity style={{alignItems:"center"}} onPress ={()=>this.restart()}>
                            <View style={styles.button}>
                                <Svg width="40" height="40" fill ="#fff"  svgXmlData={restart} />
                            </View>
                            <Text style={styles.buttontext}>重录</Text>
                        </TouchableOpacity>
                        
                        {/* 完成录制 */}
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
        backgroundColor: '#c2ccd0',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 0,
        marginBottom: 0,
        height:60
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
        //flexDirection: 'row',
        alignItems: 'center',
        flex:1
    }
})

