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
      }
    }
    goPage = ()=>{
      // this.context = this.props.navigation
      this.context.navigate("Tabbar");
    }
    render () {
        return(
            <View style={styles.container}>
                <TopNav title ="结算页面"/>
                {/* <View style={{backgroundColor:"blue",height:100}}></View> */}
                <View>
                  {/* <Image source={{ uri: global.SONGS[global.SONGS.length-1].picture }} style={{ width: "100%", height: pxToDp(200),borderRadius:pxToDp(20),marginTop:pxToDp(30) }} /> */}
                  <Text style={{fontSize:pxToDp(60),color:"#6699ffa9",paddingLeft:pxToDp(48)}}> 得分：77</Text>
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