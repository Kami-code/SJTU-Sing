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
    paused: true,
    loaded: false,
    chunk: '',
    frag: false
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
        if(this.state.recording==true){
          this.pause();
          console.log("record paused");
        }
        if (flag==1){
          this.state.frag = false;
          console.log("clear chunk")
        }
    });


    this.startListener =DeviceEventEmitter.addListener('RecordStart',()=>{
      this.start();
    });

    this.finishListener =DeviceEventEmitter.addListener('RecordFinish',async()=>{
      this.state.recording = false;
      let song = '';
      for(let i = 0;i<this.data.length;++i){
        song = song + this.data[i];
      }
      await saveAudio('/test/record.wav',song);
      DeviceEventEmitter.emit('audioSaved');
    });

      this.listener =DeviceEventEmitter.addListener('fetchChunk',async (line)=>{
        if(this.state.recording == true){
          //DeviceEventEmitter.emit('returnChunk',this.state.chunk);
          this.data[line]=this.state.chunk;
          this.state.frag = false;
          await saveAudio('/test/record'+line+'.wav',this.state.chunk);
        }

      //  use param do something
      });

    AudioRecord.init(options);
    


    this.dataListener =DeviceEventEmitter.addListener('data',(data)=>{
      if(this.state.frag==false){
            // this.state.chunk = Buffer.from(data, 'base64');
            this.state.frag=true;
            this.state.chunk = data;
          }else{
            //this.state.chunk = Buffer.concat([this.state.chunk, Buffer.from(data,'base64')]);
            this.state.chunk = this.state.chunk + data;
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
    this.setState({ audioFile: '', recording: true });
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
    this.setState({recording: false });
    let audioFile = AudioRecord.stop();
  };


  render() {
    const { recording, audioFile, paused } = this.state;
    return (
      <View >
      </View>
    );
  }
}

