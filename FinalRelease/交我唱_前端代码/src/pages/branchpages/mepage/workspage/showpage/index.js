import React,{Component} from 'react';
import {View, Text, ImageBackground,StyleSheet,Button ,StatusBar} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import TopNav from '../../../../../components/Topnav';
import {NavigationContext} from "@react-navigation/native";
import MusicPlayer from '../components/MusicPlayer';
import { pxToDp } from '../../../../../utils/stylesKits';
class Index extends Component {
    static contextType =NavigationContext;
    state = {  }
    render () {
        return(
            <View style={{flex:1,backgroundColor:"#ddddffaa"}}>
                <TopNav title="作品信息"/>
                <View style={{height:pxToDp(340), backgroundColor:"transparent"}}>
                    <MusicPlayer song = {global.workSong}/>
                </View>
                <View style={{padding:pxToDp(30)}}>
                    <Text style={{fontSize:pxToDp(30)}}>统计信息：</Text>
                    <Text style={{fontSize:pxToDp(20)}}>作品得分：{global.workSong.score}</Text>
                    <Text style={{fontSize:pxToDp(20)}}>收到点赞：{global.workSong.likes}</Text>
                    <Text style={{fontSize:pxToDp(20)}}>收到评论：{global.workSong.remark_items.length}</Text>
                </View>
            </View>
            
        );
        
    }
}
 
export default Index;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:"column",
      backgroundColor: "#F5FCFF"
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