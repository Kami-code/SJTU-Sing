import React, { Component } from 'react';
import { StyleSheet, View, Button,DeviceEventEmitter } from 'react-native';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Video from 'react-native-video';
<<<<<<< HEAD
import AudioRecord from 'react-native-audio-record';
import RNFetchBlob from 'react-native-fetch-blob';

import {AudioRecorder, AudioUtils} from 'react-native-audio';
=======
//import AudioRecord from 'react-native-audio-record';
import {savePcm} from '../../utils/audio-api';
import AudioRecord from '../../utils/audioRecord'
>>>>>>> 7377d1ac677483a74af58a6cc945485b9ef27ab2

export default class App extends Component {
  state = {
    audioFile: '',
    recording: false,
    paused: true,
    loaded: false,
<<<<<<< HEAD
    downloadPath: AudioUtils.DocumentDirectoryPath + '/download.wav',
=======
    chunk: null,
    frag: false
>>>>>>> 7377d1ac677483a74af58a6cc945485b9ef27ab2
  };


  async componentDidMount() {
    await this.checkPermission();
    const options = {
      sampleRate: 48000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'test.wav'
    };

    this.pauseListener =DeviceEventEmitter.addListener('RecordPause',()=>{
        this.pause();
    });


    this.startListener =DeviceEventEmitter.addListener('RecordStart',()=>{
      this.start();
    });

      this.listener =DeviceEventEmitter.addListener('fetchChunk',async (line)=>{
        if(this.state.recording == true){
          //DeviceEventEmitter.emit('returnChunk',this.state.chunk);
          this.state.frag = false;
          await savePcm('/test/record'+line+'.wav',this.state.chunk);
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


  onLoad = data => {
    console.log('onLoad', data);
  };

  onProgress = data => {
    console.log('progress', data);
  };

  onEnd = () => {
    console.log('finished playback');
    this.setState({ paused: true, loaded: false });
  };

  onError = error => {
    console.log('error', error);
  };

  linktest = async ()=>{
    let formData = new FormData();
    formData.append("name","Bob");
    formData.append("id","10086");
    // console.log(formData);

    // var upjson = [{name:"Bob",id:"10086"}]
    
    let params = {"name":"admin","id":"1233"};

    const url = 'http://121.4.86.24:8080/greeting';
    fetch(url,{
      method:'POST',
      headers: {
        // 　　　　 "Accept": "application/json",
                // "Content-Type": 'application/json',   
                // "Connection": "close",   
                // "type": "getUserData",
      　　　　 },
      // body:JSON.stringify(params),
      // body: 'name = Bob&id = 10086',
      body: formData,
    }).then(response =>{
      response.json();
      console.log("1111");
      // this.setState({responseInformation: response.json});
    }).catch((error) =>{
      alert(error)
    })
  }

  upload = async()=>{

    let params = {
      path: this.state.audioFile // 根据自己项目修改参数哈
    }
    //console.log("1111");
    console.log(this.state.audioFile);
    let {path} = params;
    let formData = new FormData();
    let soundPath = `file://${path}` ;  // 注意需要增加前缀 `file://`
    console.log(soundPath);
    let fileName = path.substring(path.lastIndexOf('/') + 1, path.length) // 文件名
    console.log("Filename: "+ fileName);
    let file = { uri: soundPath , type: "multipart/form-data", name: fileName} // 注意 `uri` 表示文件地址，`type` 表示接口接收的类型，一般为这个，跟后端确认一下
    // let file = { uri: 'file:///storage/emulated/0/Pictures/test.png' , type:'application/octet-stream', name: 'test.png'} 
    formData.append('file',file);
    // return await UploadRequest('http://121.4.86.24:8080/video', formData) // `UploadRequest` 上传也是封装过，具体参考下面
    // this.play;

    // fetch('http://121.4.86.24:8080/video', 
    //   {
    //     method: 'POST',
    //     headers: {
    //         // 'Content-Type': 'multipart/form-data;boundary=<calculated when request is sent>',
    //         // 'Content-Type': 'multipart/form-data; charset = utf-8',
    //         // 'Content-Type': '<calculated when request is sent>',
    //         // 'Host':'<calculated when request is sent>',
    //         // 'User-agent':'PostmanRuntime/7.26.10'

    //     },
    //     body:formData,
    //     // body: "1111",
    //     timeout: 5000 // 5s超时
    //   }
    // )
    //     .then(response =>{ 
    //       response.json();
    //       console.log("get response");
    //       console.log(response.contentLength());
    //       // console.log('');
    //     })
    //     .then(formData => formData)
    //     .catch(error => {
    //       console.log("failed");
    //         return {error_code: -3, error_msg:'请求异常，请重试'}
    // })
    // console.log("fetch end");


    // RNFetchBlob
    // .config({
    //     useDownloadManager : true, 
    //     fileCache : true,
    //     path: this.state.downloadPath
    // })    
    // .fetch('POST', 'http://121.4.86.24:8080/download', {})
    // .then((res) => {

    //     console.log(res);
    //     // alert("Download");
    //     console.log('The file saved to ', res.path());
    //     console.log('before ', this.state.audioFile);
    //     this.setState({audioFile :res.path()});
    //     console.log('after ', this.state.audioFile);
    // }).catch(err => err)


    let name = "最炫"
    console.log(`http://121.4.86.24:8080/getapi/${name}`)
    fetch(`http://121.4.86.24:8080/getapi/${name}`, 
      {
        method: 'GET',
        headers: {
        },
        // body: "1111",
        timeout: 5000 // 5s超时
      }
    )
        .then(response =>{ 
          response.json();
          console.log("get response");
          console.log(response);
        })
        .then(formData => formData)
        .catch(error => {
          console.log("failed");
            return {error_code: -3, error_msg:'请求异常，请重试'}
    })
    console.log("fetch end");
  }

  render() {
    const { recording, audioFile, paused } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
<<<<<<< HEAD
          <Button onPress={this.linktest} title="Test" disabled={recording} />
          <Button onPress={this.start} title="Record" disabled={recording} />
          <Button onPress={this.stop} title="Stop" disabled={!recording} />
          {paused ? (
            <Button onPress={this.play} title="Play" disabled={!audioFile} />
          ) : (
            <Button onPress={this.pause} title="Pause" disabled={!audioFile} />
          )}
          <Button onPress={this.upload} title="Upload" disabled={recording} />
=======
          {/* <Button onPress={this.start} title="Record" disabled={recording} />
          <Button onPress={this.stop} title="Stop" disabled={!recording} />  */}
          {/* {paused ? (
            <Button onPress={this.play} title="Play" disabled={!audioFile} />
          ) : (
            <Button onPress={this.pause} title="Pause" disabled={!audioFile} />
          )} */}
>>>>>>> 7377d1ac677483a74af58a6cc945485b9ef27ab2
        </View>
        {!!audioFile && (
          <Video
            ref={ref => (this.player = ref)}
            source={{ uri: audioFile }}
            paused={paused}
            ignoreSilentSwitch={'ignore'}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            onError={this.onError}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});