import React,{Component} from 'react';
import {View, Text, ImageBackground,StyleSheet,StatusBar,Image,DeviceEventEmitter} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import TopNav from '../../../../components/Topnav';
import {NavigationContext} from "@react-navigation/native";
import VideoScreen from '../../../../utils/VideoPlayer';
import { TouchableOpacity } from 'react-native';
import Button from '../../../../components/Button';
import { pxToDp } from '../../../../utils/stylesKits';
import Slider from '@react-native-community/slider';
import SONGS from '../../../../images/song';
import {encode,decode,mergeAudio,noiseSuppress,aecm, default_sox, amplify} from '../../../../utils/audio-api'
import MusicPlayer from "../components/MusicPlayer_complete";
import SelectButton from "../components/selectButton";
import { EventEmitter } from 'react-native';
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
          reverbId:0,
          equalizerId:0,
          musicVol:100,
          audioVol:100
      }
    }
    resetAudio=(r,e)=>{
      if(r==-1){
       default_sox(global.ACC[2],global.ACC[3],this.state.reverbId,e);
       DeviceEventEmitter.emit('RecordInit');
      }else{
        default_sox(global.ACC[2],global.ACC[3],r,this.state.equalizerId);
        DeviceEventEmitter.emit('RecordInit');
      }
    }
    goPage = async ()=>{
      // this.context = this.props.navigation  
      DeviceEventEmitter.emit("stop");
      await amplify(global.ACC[1],global.ACC[1],-2-Math.round((this.state.audioVol-this.state.musicVol)/10));   
      await mergeAudio(global.ACC[1],global.ACC[3],global.ACC[4]);
      this.context.navigate("PlayPage");
    }
    render () {
        return(
            <View style={styles.container}>
                <TopNav title ={"得分："+Number(this.state.finScore)}/>
                {/* <View style={{backgroundColor:"blue",height:100}}></View> */}
                 {/* <Image source={{ uri: global.SONGS[global.SONGS.length-1].picture }} style={{ width: "100%", height: pxToDp(200),borderRadius:pxToDp(20),marginTop:pxToDp(30) }} /> */}
                {/* <View>
                  <Text style={{fontSize:pxToDp(60),color:"#6699ffa9",paddingLeft:pxToDp(48)}}> 得分：{Number(this.state.finScore)}</Text>
                </View> */}
                <View style={{height:150,marginBottom:40}}>
                  <MusicPlayer
                      audioVolumn={this.state.audioVol}
                      musicVolumn={this.state.musicVol}
                  />
                </View>
                <View style={styles.textBar}>
                  <Text style={{color:"#000",fontSize:pxToDp(16),paddingTop:pxToDp(20)}}>音量</Text>           
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around',marginTop: pxToDp(0),marginLeft:pxToDp(20),marginRight:pxToDp(10) }}>
                  <Text style={{color:"#000",fontSize:pxToDp(14)}}>人声音量</Text> 
                  <View style={{ flex:1}}>
                      <Slider
                          ref='audioVol'
                          value={100}
                          maximumValue={100}
                          disabled = {false}
                          step={1}
                          minimumTrackTintColor='#FFDB42'
                          onValueChange={(value) => {
                            this.setState({
                              audioVol: value
                          });
                          }}
                          onSlidingComplete={(value) => {                                
                          }}
                      />
                  </View>  
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around',marginTop: pxToDp(15),marginLeft:pxToDp(20),marginRight:pxToDp(10) }}>
                  <Text style={{color:"#000",fontSize:pxToDp(14)}}>伴奏音量</Text> 
                  <View style={{ flex:1}}>
                      <Slider
                          ref='musicVol'
                          value={100}
                          maximumValue={100}
                          disabled = {false}
                          step={1}
                          minimumTrackTintColor='#FFDB42'
                          onValueChange={(value) => {
                            this.setState({
                              musicVol: value
                          });
                          }}
                          onSlidingComplete={(value) => {                                
                          }}
                      />
                  </View>  
                </View>
                <View style={styles.textBar}>
                  <Text style={{color:"#000",fontSize:pxToDp(16),paddingTop:pxToDp(20)}}>混响</Text>
                </View>
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-around',marginTop: pxToDp(0),marginLeft:pxToDp(20),marginRight:pxToDp(10) }}>
                <SelectButton 
                    title={"录音棚"}
                    id={0} 
                    selectedId={this.state.reverbId}                                            
                    onPress={(button)=>{
                        var id = button.props.id;
                        this.setState({
                          reverbId:id
                        });
                        this.resetAudio(0,-1);
                    }}
                />

                <SelectButton 
                    title={"KTV"}
                    id={1} 
                    selectedId={this.state.reverbId}                                            
                    onPress={(button)=>{
                        var id = button.props.id;
                        this.setState({
                          reverbId:id
                        });
                        this.resetAudio(1,-1);
                    }}
                />
                
                <SelectButton 
                    title={"大剧场"}
                    id={2} 
                    selectedId={this.state.reverbId}                                            
                    onPress={(button)=>{
                        var id = button.props.id;
                        this.setState({
                          reverbId:id
                        });
                        this.resetAudio(2,-1);
                    }}
                />
                <SelectButton 
                    title={"山间"}
                    id={3} 
                    selectedId={this.state.reverbId}                                            
                    onPress={(button)=>{
                        var id = button.props.id;
                        this.setState({
                          reverbId:id
                        });
                        this.resetAudio(3,-1);
                    }}
                />
                  
                </View>
                <View style={styles.textBar}>
                  <Text style={{color:"#000",fontSize:pxToDp(16),paddingTop:pxToDp(20)}}>均衡</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around',marginTop: pxToDp(0),marginLeft:pxToDp(20),marginRight:pxToDp(10) }}>
                <SelectButton 
                    title={"默认"}
                    id={0} 
                    selectedId={this.state.equalizerId}                                            
                    onPress={(button)=>{
                        var id = button.props.id;
                        this.setState({
                          equalizerId:id
                        });
                        this.resetAudio(-1,0);
                    }}
                />

                <SelectButton 
                    title={"摇滚"}
                    id={1} 
                    selectedId={this.state.equalizerId}                                            
                    onPress={(button)=>{
                        var id = button.props.id;
                        this.setState({
                          equalizerId:id
                        });
                        this.resetAudio(-1,1);
                    }}
                />
                
                <SelectButton 
                    title={"蓝调"}
                    id={2} 
                    selectedId={this.state.equalizerId}                                            
                    onPress={(button)=>{
                        var id = button.props.id;
                        this.setState({
                          equalizerId:id
                        });
                        this.resetAudio(-1,2);
                    }}
                />
                <SelectButton 
                    title={"乡村"}
                    id={3} 
                    selectedId={this.state.equalizerId}                                            
                    onPress={(button)=>{
                        var id = button.props.id;
                        this.setState({
                          equalizerId:id
                        });
                        this.resetAudio(-1,3);
                    }}
                />
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
      marginTop:pxToDp(120), 
      alignContent:"center",
      justifyContent:"space-around"
    },
    textBar:{
      flexDirection:"row",
      width:"100%",
      height:pxToDp(50),
      //backgroundColor:"#cccccc",
      marginLeft:pxToDp(20)
      //alignContent:"center",
      //justifyContent:"space-around"
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