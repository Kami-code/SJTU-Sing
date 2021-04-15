<<<<<<< HEAD
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
 
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
 
// 使用前需安装依赖、link依赖、获取录音权限（前两项已配置，可能遇到需要手动在手机设置中授权的情况）
// 本组件包括录音、保存、播放功能， 保存为.aac格式（应该能够选择），并可直接生成base64编码
// 生成文件名： test.aac
// 本地保存路径：
// 路径示例："audioFileURL": "file:///data/user/0/com.kgeapp/files/test.aac"


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: undefined, //授权状态
      audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac', // 文件路径
      recording: false, //是否录音
      pause: false, //录音是否暂停
      stop: false, //录音是否停止
      currentTime: 0, //录音时长
    };
  }
 
  componentDidMount() {
    // 请求授权
    AudioRecorder.requestAuthorization()
      .then(isAuthor => {
        console.log('是否授权: ' + isAuthor)
        if(!isAuthor) {
          return alert('请前往设置开启录音权限')
        }
        this.setState({hasPermission: isAuthor})
        this.prepareRecordingPath(this.state.audioPath);
        // 录音进展
        AudioRecorder.onProgress = (data) => {
          this.setState({currentTime: Math.floor(data.currentTime)});
        };
        // 完成录音
        AudioRecorder.onFinished = (data) => {
          // data 返回需要上传到后台的录音数据
          console.log(this.state.currentTime)
          console.log(data)
        };
      })
  };
 
  /**
   * AudioRecorder.prepareRecordingAtPath(path,option)
   * 录制路径
   * path 路径
   * option 参数
   */
  prepareRecordingPath = (path) => {
    const option = {
      SampleRate: 48000.0, //采样率
      Channels: 1, //通道
      AudioQuality: 'High', //音质
      AudioEncoding: 'wav', //音频编码
      // OutputFormat: 'wav', //输出格式
      MeteringEnabled: false, //是否计量
      MeasurementMode: false, //测量模式
      // AudioEncodingBitRate: 32000, //音频编码比特率
      IncludeBase64: true, //是否是base64格式
      // AudioSource: 0, //音频源
    }
    AudioRecorder.prepareRecordingAtPath(path,option)
  }
 
  // 开始录音
  _record = async () => {
    if(!this.state.hasPermission) {
      return alert('没有授权')
    }
    if(this.state.recording) {
      return alert('正在录音中...')
    }
    if(this.state.stop) {
      this.prepareRecordingPath(this.state.audioPath)
    }
    this.setState({recording: true,pause: false})
 
    try {
      await AudioRecorder.startRecording()
    } catch (err) {
      console.log(err)
    }
  }
 
  // 暂停录音
  _pause = async () => {
    if(!this.state.recording) {
      return alert('当前未录音')
    }
 
    try {
      await AudioRecorder.pauseRecording()
      this.setState({pause: true, recording: false})
    } catch (err) {
      console.log(err)
    }
  }
 
  // 恢复录音
  _resume = async () => {
    if(!this.state.pause) {
      return alert('录音未暂停')
    }
 
    try {
      await AudioRecorder.resumeRecording();
      this.setState({pause: false, recording: true})
    } catch (err) {
      console.log(err)
    }
  }
 
  // 停止录音
  _stop = async () => {
    this.setState({stop: true, recording: false, paused: false});
    try {
      await AudioRecorder.stopRecording();
    } catch (error) {
      console.error(error);
    }
  }
 
  // 播放录音
  _play = async () => {
    let whoosh = new Sound(this.state.audioPath, '', (err) => {
      if(err) {
        return console.log(err)
      }
      whoosh.play(success => {
        if(success) {
          console.log('success - 播放成功')
        }else {
          console.log('fail - 播放失败')
        }
      })
    })
  }
  
  render() {
    let { recording, pause, currentTime } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.text} onPress={this._record}> Record(开始录音) </Text>
        <Text style={styles.text} onPress={this._pause}> Pause(暂停录音) </Text>
        <Text style={styles.text} onPress={this._resume}> Resume(恢复录音) </Text>
        <Text style={styles.text} onPress={this._stop}> Stop(停止录音) </Text>
        <Text style={styles.text} onPress={this._play}> Play(播放录音) </Text>
        <Text style={styles.text}>
          {
            recording ? '正在录音' : 
            pause ? '已暂停' : '未开始'
          }
        </Text>
        <Text style={styles.text}>时长: {currentTime}</Text>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  }
=======
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
 
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

import MusicPlayer from '../../utils/MusicPlayer';
 
// 使用前需安装依赖、link依赖、获取录音权限（前两项已配置，可能遇到需要手动在手机设置中授权的情况）
// 本组件包括录音、保存、播放功能， 保存为.aac格式（应该能够选择），并可直接生成base64编码
// 生成文件名： test.aac
// 本地保存路径：
// 路径示例："audioFileURL": "file:///data/user/0/com.kgeapp/files/test.aac"


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: undefined, //授权状态
      audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac', // 文件路径
      recording: false, //是否录音
      pause: false, //录音是否暂停
      stop: false, //录音是否停止
      currentTime: 0, //录音时长
      id:0,
      content:"",
    };
  }
 
  componentDidMount() {
    // 请求授权
    AudioRecorder.requestAuthorization()
      .then(isAuthor => {
        console.log('是否授权: ' + isAuthor)
        if(!isAuthor) {
          return alert('请前往设置开启录音权限')
        }
        this.setState({hasPermission: isAuthor})
        this.prepareRecordingPath(this.state.audioPath);
        // 录音进展
        AudioRecorder.onProgress = (data) => {
          this.setState({currentTime: Math.floor(data.currentTime)});
        };
        // 完成录音
        AudioRecorder.onFinished = (data) => {
          // data 返回需要上传到后台的录音数据
          console.log(this.state.currentTime)
          console.log(data)
        };
      })
  };
 
  /**
   * AudioRecorder.prepareRecordingAtPath(path,option)
   * 录制路径
   * path 路径
   * option 参数
   */
  prepareRecordingPath = (path) => {
    const option = {
      SampleRate: 44100.0, //采样率
      Channels: 2, //通道
      AudioQuality: 'High', //音质
      AudioEncoding: 'aac', //音频编码
      OutputFormat: 'mpeg_4', //输出格式
      MeteringEnabled: false, //是否计量
      MeasurementMode: false, //测量模式
      AudioEncodingBitRate: 32000, //音频编码比特率
      IncludeBase64: true, //是否是base64格式
      AudioSource: 0, //音频源
    }
    AudioRecorder.prepareRecordingAtPath(path,option)
  }
 
  // 开始录音
  _record = async () => {
    if(!this.state.hasPermission) {
      return alert('没有授权')
    }
    if(this.state.recording) {
      return alert('正在录音中...')
    }
    if(this.state.stop) {
      this.prepareRecordingPath(this.state.audioPath)
    }
    this.setState({recording: true,pause: false})
 
    try {
      await AudioRecorder.startRecording()
    } catch (err) {
      console.log(err)
    }
  }
 
  // 暂停录音
  _pause = async () => {
    if(!this.state.recording) {
      return alert('当前未录音')
    }
 
    try {
      await AudioRecorder.pauseRecording()
      this.setState({pause: true, recording: false})
    } catch (err) {
      console.log(err)
    }
  }
 
  // 恢复录音
  _resume = async () => {
    if(!this.state.pause) {
      return alert('录音未暂停')
    }
 
    try {
      await AudioRecorder.resumeRecording();
      this.setState({pause: false, recording: true})
    } catch (err) {
      console.log(err)
    }
  }
 
  // 停止录音
  _stop = async () => {
    this.setState({stop: true, recording: false, paused: false});
    try {
      await AudioRecorder.stopRecording();
    } catch (error) {
      console.error(error);
    }
  }
 
  // 播放录音
  _play = async () => {
    let whoosh = new Sound(this.state.audioPath, '', (err) => {
      if(err) {
        return console.log(err)
      }
      whoosh.play(success => {
        if(success) {
          console.log('success - 播放成功')
        }else {
          console.log('fail - 播放失败')
        }
      })
    })
  }

  // _upload =
  _upload = async ()=> {
    try {
      // 注意这里的await语句，其所在的函数必须有async关键字声明
      let response = await fetch(
          'http://121.4.86.24:8080/greeting?name=111',
      );
      let responseJson = await response.json();
      this.setState({
          id: responseJson.id,
          content: responseJson.content,
      });
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    let { recording, pause, currentTime ,content,id} = this.state
    return (
      <View style={styles.container}>
        <MusicPlayer/>
        <Text style={styles.text} onPress={this._record}> Record(开始录音) </Text>
        <Text style={styles.text} onPress={this._pause}> Pause(暂停录音) </Text>
        <Text style={styles.text} onPress={this._resume}> Resume(恢复录音) </Text>
        <Text style={styles.text} onPress={this._stop}> Stop(停止录音) </Text>
        <Text style={styles.text} onPress={this._play}> Play(播放录音) </Text>
        <Text style={styles.text} onPress={this._upload}> upload(上传录音) </Text>
        <Text style={styles.text}>
          {
            recording ? '正在录音' : 
            pause ? '已暂停' : '未开始'
          }
        </Text>
        <Text style={styles.text}>时长: {currentTime}</Text>
        <Text style={styles.text}>返回ID: {id}</Text>
        <Text style={styles.text}>返回内容: {content}</Text>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  }
>>>>>>> 8d31d73f9ce196f39dac5bb794bb011ea3b0c80c
})