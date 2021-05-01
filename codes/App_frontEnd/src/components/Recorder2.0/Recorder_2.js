import React, { Component } from 'react';
import { StyleSheet, View, Button,DeviceEventEmitter } from 'react-native';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Video from 'react-native-video';
//import AudioRecord from 'react-native-audio-record';
import {saveAudio} from '../../utils/audio-api';
import AudioRecord from '../../utils/audioRecord'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.data = new Array();
  }
  state = {
    audioFile: '',
    recording: false,
    chunk: '',
    frag: false,
    start: false,
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
      }else{
        this.resume();
      }
    });

    this.finishListener =DeviceEventEmitter.addListener('RecordFinish',async()=>{
      AudioRecord.stop();
      let song = '';
      for(let i = 0;i<this.data.length;++i){
        song = song + this.data[i];
      }
      await saveAudio('/test/record.wav',song);
      console.log("song"+this.data.length);
      DeviceEventEmitter.emit('audioSaved');
    });

      this.listener =DeviceEventEmitter.addListener('fetchChunk',async (line)=>{
        if(this.state.recording == true){
          //DeviceEventEmitter.emit('returnChunk',this.state.chunk);
          this.data[line]=this.state.chunk; //把缓存保存入句子组
          this.state.frag = false;
          await saveAudio('/test/record'+line+'.wav',this.data[line]); //保存句子到本地
          console.log("frag"+line);
        }
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
      
    });

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
    this.setState({ audioFile: '', recording: true ,start: true});
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

