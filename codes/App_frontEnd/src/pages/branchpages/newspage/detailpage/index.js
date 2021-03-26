import React,{Component} from 'react';
import {View, Text, ImageBackground,StyleSheet,Button ,StatusBar} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import TopNav from '../../../../components/Topnav';
import {NavigationContext} from "@react-navigation/native";
import VideoScreen from '../../../../utils/VideoPlayer';
class Index extends Component {
    static contextType =NavigationContext;
    state = {  }
    render () {
        return(
            <View style={styles.container}>
                <TopNav title ="视频播放"/>
                <View style={{height:"100%",weight:"100%"}} >
                    <VideoScreen/>
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