import React, { Component } from 'react';
import { StyleSheet, View, Button,DeviceEventEmitter } from 'react-native';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Video from 'react-native-video';
//import AudioRecord from 'react-native-audio-record';
import {saveAudio} from '../../utils/audio-api';
import AudioRecord from '../../utils/audioRecord';
import RNFS from "react-native-fs";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.data = new Array();
    this.fragTable = new Array();
    this.data[0]=0;
  }
  state = {
    audioFile: '',
    recording: false,
    chunk: '',
    frag: false,
    start: false,
    savePath: `${RNFS.ExternalStorageDirectoryPath}/test/raw_audio.wav`,
  };


  async componentDidMount() {
    await this.checkPermission();
    const options = {
      sampleRate: 48000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'test.wav'
    };

    this.pauseListener =DeviceEventEmitter.addListener('RecordPause',(flag)=>{
        this.pause();
        if (flag>=1){
          this.state.frag = false;
          console.log("clear chunk")
        }
        if(flag==2){
          this.data = new Array();
        }
    });


    this.startListener =DeviceEventEmitter.addListener('RecordStart',()=>{
      if(this.state.recording){return;}
      if(!this.state.start){
        this.start();
      }
      this.resume();
    });

    this.finishListener =DeviceEventEmitter.addListener('RecordFinish',async(param)=>{
      if(this.state.start){
        await AudioRecord.stop();
        this.state.start = false;
      }
      if(param==='return'){
        DeviceEventEmitter.emit('RecordStopped',0);
      }else{
        let line = param.fragNum;
        let time = param.fragTime;
        this.fragTable[line+1] = time; //第i句话从fragtable[i]开始，到fragtable[i+1]结束
        this.data[line]=this.state.chunk; //把缓存保存入句子组
        this.state.frag = false;
        let path = `${RNFS.ExternalStorageDirectoryPath}/test/record${line}.wav`
        await saveAudio(path,this.data[line]); //保存句子到本地
        global.ACC[line+6] = path;
        console.log("frag"+line);
        
        let song = '';
        for(let i = 0;i<this.data.length;++i){
          song = song + this.data[i];
        }
        this.data = new Array();
        
        global.ACC[2] = this.state.savePath;
        
        await saveAudio(this.state.savePath,song);
        console.log("finish"+this.data.length);
        DeviceEventEmitter.emit('RecordStopped',this.state.savePath);

      }
      
    });

      this.fetchListener =DeviceEventEmitter.addListener('fetchChunk',async (param)=>{
        let line = param.fragNum;
        let time = param.fragTime;
        this.fragTable[line+1] = time; //第i句话从fragtable[i]开始，到fragtable[i+1]结束
        this.data[line]=this.state.chunk; //把缓存保存入句子组
        this.state.frag = false;
        let path = `${RNFS.ExternalStorageDirectoryPath}/test/record${line}.wav`
        await saveAudio(path,this.data[line]); //保存句子到本地
        global.ACC[line+6] = path;
        console.log("frag"+line);
          
      });

    AudioRecord.init(options);
    


    this.dataListener =DeviceEventEmitter.addListener('data',(data)=>{
      if(this.state.recording==true){
        if(this.state.frag==false){
          // 数据刚刚被填入句子，清空缓存重新装
          this.state.frag=true;
          this.state.chunk = data;
        }else{
          // 继续填充缓存
          this.state.chunk = this.state.chunk + data;
        }
      }
      this.initListener = DeviceEventEmitter.addListener('RecordInit',()=>{
        if(!this.state.start){
          this.state.start = true;
          this.start();
        }
      });
      
    });

  }
  componentWillUnmount(){
    this.pauseListener && this.pauseListener.remove();
    this.startListener && this.startListener.remove();
    this.finishListener && this.finishListener.remove();
    this.fetchListener && this.fetchListener.remove();
    this.dataListener && this.dataListener.remove();
  }

  checkPermission = async () => {
    const p = await Permissions.check('microphone');
    console.log('permission check', p);
    if (p === 'authorized') return;
    return this.requestPermission();
  };

  requestPermission = async () => {
    const p = await Permissions.request('microphone');
    console.log('permission request', p);
  };

  start = () => {
    console.log('start record');
    this.setState({ audioFile: '', start: true});
    AudioRecord.start();
  };

  stop = async () => {
    if (!this.state.recording) return;
    console.log('stop record');
    let audioFile = await AudioRecord.stop();
    console.log('audioFile', audioFile);
    this.setState({ recording: false });
    // wait till file is saved, else react-native-video will load incomplete file
    setTimeout(() => {
      this.setState({ audioFile });
    }, 1000);
  };


  pause = () => {
    if (!this.state.recording) return;
    console.log('record pause');
    this.setState({recording: false });
    // AudioRecord.stop();
  };

  resume = () => {
    if (this.state.recording) return;
    console.log('record resume');
    this.setState({recording: true });
    // AudioRecord.stop();
  };


  render() {
    return (
      <View >
      </View>
    );
  }
}

