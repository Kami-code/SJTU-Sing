import React,{Component} from 'react';
import {View, Text, ImageBackground,StyleSheet,StatusBar,Image} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import TopNav from '../../../../components/Topnav';
import {NavigationContext} from "@react-navigation/native";
import VideoScreen from '../../../../utils/VideoPlayer';
import { TouchableOpacity } from 'react-native';
import Button from '../../../../components/Button';
import { pxToDp } from '../../../../utils/stylesKits';

import SONGS from '../../../../images/song';
import {encode,decode,mergeAudio,noiseSuppress,aecm, sox_test, toSingleChannel} from '../../../../utils/audio-api'
import MusicPlayer from "../../../../utils/MusicPlayer"
class Index extends Component {
    static contextType =NavigationContext;
    constructor(props) {
      super(props);
      this.state={
          songs: global.SONGS,
          pic_big: '', 
          proc_audio_wav: '/test/proc_audio.wav',
          proc_audio_mp3: '/test/proc_audio.mp3',
          finScore: global.SCORE,
      }
    }
    uploadFinalWork = async()=>{
      console.log("start uploading")
      //本函数上传id+user.wav文件
        //调用一次上次传一个，流程中需要调用两次，一次原唱一次用户（原唱应该只需要一次）
      let params = {
          path: global.ACC[5] // 根据自己项目修改参数哈
      }
      let {path} = params;
      let formData = new FormData();
      let soundPath = `file://${path}` ;  // 注意需要增加前缀 `file://`
      console.log(soundPath);
      let fileName = `${global.song_id_underprocess}user.wav`// 文件名，应后端要求进行修改
      console.log("Filename: "+ fileName);
      let file = { uri: soundPath , type: "multipart/form-data", name: fileName} // 注意 `uri` 表示文件地址，`type` 表示接口接收的类型，一般为这个，跟后端确认一下
      formData.append('file',file);
      formData.append('username',global.account);
      formData.append('songid',global.song_id_underprocess);
      formData.append('score',this.state.finScore);
      console.log(formData);
      
      // fetch(`http://${global.IP}/uploadproduct`, 
      fetch(`http://${global.IP_NEW}/record/upload`, 
      {
          method: 'POST',
          body:formData,
      })
      .then(response =>
        // response.json();
        // console.log(response);
        // console.log(response.info.result);
        // console.log(response.info.song);
        // console.log("Finalupload get response");
        // this.context.navigate("Tabbar");

        response.json()
      )
      .then(data => {
          console.log(data)
      })
      .catch(error => {
         alert(error)
          console.log("failed");
          return {error_code: -3, error_msg:'请求异常，请重试'}
      })
      console.log("fetch end");
    }

    goPage = ()=>{
      // this.context = this.props.navigation
      this.uploadFinalWork();
    }
    render () {
        return(
            <View style={styles.container}>
                <TopNav title ="结算页面"/>
                {/* <View style={{backgroundColor:"blue",height:100}}></View> */}
                <View>
                  {/* <Image source={{ uri: global.SONGS[global.SONGS.length-1].picture }} style={{ width: "100%", height: pxToDp(200),borderRadius:pxToDp(20),marginTop:pxToDp(30) }} /> */}
                  <Text style={{fontSize:pxToDp(60),color:"#6699ffa9",paddingLeft:pxToDp(48)}}> 得分：{Number(this.state.finScore)}</Text>
                </View>
                <View style={{flex: 1}}>
                  <MusicPlayer></MusicPlayer>
                </View>
                
                <View style={styles.BottomBar}>
                  <Text style={{color:"#fff",fontSize:pxToDp(16),paddingTop:pxToDp(20)}}>重录</Text>
                  <TouchableOpacity 
                      style={{flexDirection:"row",alignItems:'center',justifyContent:'center',width:pxToDp(120),height:pxToDp(40),backgroundColor:"#335577",borderRadius:pxToDp(14)}}
                      onPress ={()=>this.goPage("NewsPage")}
                  >
                      <Text style={{color:"#fff",fontSize:pxToDp(16)}}>生成作品</Text>
                  </TouchableOpacity>
                  <Text style={{color:"#fff",fontSize:pxToDp(16),paddingTop:pxToDp(20)}}>保存</Text>
                </View>
            </View>
        );
        
    }
}
 
export default Index;

const styles = StyleSheet.create({
    BottomBar:{

      flexDirection:"row",
      width:"100%",
      height:pxToDp(60),
      backgroundColor:"#cccccc",
      marginTop:pxToDp(320), 
      alignContent:"center",
      justifyContent:"space-around"
    },
    container: {
      flex: 1,
      flexDirection:"column",
      backgroundColor: "#F5FCFF",
    },
    card: {
      flex: 1,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: "#E8E8E8",
      justifyContent: "center",
      backgroundColor: "white"
    },
    text: {
      textAlign: "center",
      fontSize: 50,
      backgroundColor: "transparent"
    }
  });
