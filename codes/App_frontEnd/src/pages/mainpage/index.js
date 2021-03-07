import React,{Component} from 'react';
import {View,Text,Image,StatusBar} from 'react-native';

import {pxToDp} from "../../utils/stylesKits";
import Button  from "../../components/Button";
import { ImageBackground } from 'react-native';

class Index extends Component {
    state = {  }

    goSingPage=()=>{
        this.props.navigation.navigate("SingPage");
    }
    goInfoPage=()=>{
        this.props.navigation.navigate("InfoPage");
    }
    goPlayPage=()=>{
        this.props.navigation.navigate("PlayPage");
    }
    goSelectPage=()=>{
        this.props.navigation.navigate("SelectPage");
    }

    render() { 
        return ( 
            <View>
                <ImageBackground style={{width:"100%",height:"105%"}} source={require("../../images/background2.jpg")}>
                {/* 0.0 status */}
                <StatusBar backgroundColor="transparent" translucent={true}></StatusBar>
                {/* 0.0 status END */}
                {/* 1.0 contents */}
                    {/* 1.1 buttons */}
                    <View style ={{width:"30%",height:pxToDp(40),alignSelf:"center"}}>
                        <Button onPress={this.goSingPage} style={{borderRadius:pxToDp(20) ,marginTop:pxToDp(500)}}> 开始录歌</Button>
                    </View>
                    <View style ={{width:"30%",height:pxToDp(40),alignSelf:"center",marginTop:pxToDp(20)}}>
                        <Button onPress={this.goSelectPage} style={{borderRadius:pxToDp(20) ,marginTop:pxToDp(500)}}> 歌曲点播</Button>
                    </View>
                    <View style ={{width:"30%",height:pxToDp(40),alignSelf:"center",marginTop:pxToDp(20)}}>
                        <Button onPress={this.goInfoPage} style={{borderRadius:pxToDp(20) ,marginTop:pxToDp(500)}}> 信息管理</Button>
                    </View>
                    <View style ={{width:"30%",height:pxToDp(40),alignSelf:"center",marginTop:pxToDp(20)}}>
                        <Button onPress={this.goPlayPage} style={{borderRadius:pxToDp(20) ,marginTop:pxToDp(500)}}> 作品播放</Button>
                    </View>
                    {/* 1.1 buttons END */}
                {/* 1.0 contents END */}

                </ImageBackground>
            </View>
        );
    }
}
 
export default Index;