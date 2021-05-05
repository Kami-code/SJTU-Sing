import React,{Component} from 'react';
import {View, Text, ImageBackground,StyleSheet,Button ,StatusBar,Image} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import TopNav from '../../../../components/Topnav';
import {NavigationContext} from "@react-navigation/native";
import VideoScreen from '../../../../utils/VideoPlayer';
import { pxToDp } from '../../../../utils/stylesKits';
import Svg from "react-native-svg-uri";
import {heart,origin} from '../../../../res/fonts/iconSvg';
import { TouchableOpacity } from 'react-native-gesture-handler';

import SONGS from '../../../../images/song';
class Index extends Component {
    static contextType =NavigationContext;
    constructor(props) {
        super(props);
        this.state={
            songs: SONGS,
            pic_big: '', 
        }
    }
    render () {
        return(
            <View style={styles.container}>
                <TopNav title ="我的作品"/>
                {/* 标题 */}
                <View style={{height:pxToDp(40),backgroundColor:"#ccd",flexDirection:'row',justifyContent:"space-between",paddingLeft:pxToDp(10),alignItems:"center"}} >
                    {/* <VideoScreen/>
                     */}
                    <Text style={{color:"#666"}}>高赞作品</Text>
                </View>
                {/* 内容 */}
                <TouchableOpacity style={{height:pxToDp(120),backgroundColor:"#eef",flexDirection:'row',justifyContent:'space-between'}}>
                    <Image source={{ uri: this.state.songs[0].pic_big }} style={{height:pxToDp(120),width:pxToDp(120)}}></Image>
                    <View style={{backgroundColor:"transparent",flexDirection:'column',paddingTop:pxToDp(30),flex:1}}>
                        <Text style={{color:'#222',fontSize:pxToDp(20)}}> {this.state.songs[0].title } </Text>
                        <Text style={{color:'#ccc',fontSize:pxToDp(16)}}> 2022.3.23 </Text>
                    </View>
                    <View style={{backgroundColor:"transparent",flexDirection:'column',paddingTop:pxToDp(30),paddingRight:pxToDp(30),alignItems:"center",width:pxToDp(60)}}>
                        <Svg width="40" height="40" fill ="#fff"  svgXmlData={heart} />
                        <Text >9.1k</Text>
                    </View>
                </TouchableOpacity>

                {/* 标题 */}
                {/* 标题 */}
                <View style={{height:pxToDp(40),backgroundColor:"#ccd",flexDirection:'row',justifyContent:"space-between",paddingLeft:pxToDp(10),alignItems:"center"}} >
                    {/* <VideoScreen/>
                     */}
                    <Text style={{color:"#666"}}>作品列表</Text>

                </View>
                <TouchableOpacity style={{height:pxToDp(120),backgroundColor:"#eef",flexDirection:'row',justifyContent:'space-between'}}>
                    <Image source={{ uri: this.state.songs[1].pic_big }} style={{height:pxToDp(120),width:pxToDp(120)}}></Image>
                    <View style={{backgroundColor:"transparent",flexDirection:'column',paddingTop:pxToDp(30),flex:1}}>
                        <Text style={{color:'#222',fontSize:pxToDp(20)}}> {this.state.songs[1].title } </Text>
                        <Text style={{color:'#ccc',fontSize:pxToDp(16)}}> 2022.3.23 </Text>
                    </View>
                    <View style={{backgroundColor:"transparent",flexDirection:'column',paddingTop:pxToDp(30),paddingRight:pxToDp(30),alignItems:"center",width:pxToDp(60)}}>
                        <Svg width="40" height="40" fill ="#fff"  svgXmlData={heart} />
                        <Text >9.1k</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{height:pxToDp(120),backgroundColor:"#eef",flexDirection:'row',justifyContent:'space-between'}}>
                    <Image source={{ uri: this.state.songs[2].pic_big }} style={{height:pxToDp(120),width:pxToDp(120)}}></Image>
                    <View style={{backgroundColor:"transparent",flexDirection:'column',paddingTop:pxToDp(30),flex:1}}>
                        <Text style={{color:'#222',fontSize:pxToDp(20)}}> {this.state.songs[2].title } </Text>
                        <Text style={{color:'#ccc',fontSize:pxToDp(16)}}> 2022.9.10 </Text>
                    </View>
                    <View style={{backgroundColor:"transparent",flexDirection:'column',paddingTop:pxToDp(30),paddingRight:pxToDp(30),alignItems:"center",width:pxToDp(60)}}>
                        <Svg width="40" height="40" fill ="#fff"  svgXmlData={heart} />
                        <Text >0.1k</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{height:pxToDp(120),backgroundColor:"#eef",flexDirection:'row',justifyContent:'space-between'}}>
                    <Image source={{ uri: this.state.songs[3].pic_big }} style={{height:pxToDp(120),width:pxToDp(120)}}></Image>
                    <View style={{backgroundColor:"transparent",flexDirection:'column',paddingTop:pxToDp(30),flex:1}}>
                        <Text style={{color:'#222',fontSize:pxToDp(20)}}> {this.state.songs[3].title } </Text>
                        <Text style={{color:'#ccc',fontSize:pxToDp(16)}}> 2022.7.3 </Text>
                    </View>
                    <View style={{backgroundColor:"transparent",flexDirection:'column',paddingTop:pxToDp(30),paddingRight:pxToDp(30),alignItems:"center",width:pxToDp(60)}}>
                        <Svg width="40" height="40" fill ="#fff"  svgXmlData={heart} />
                        <Text >2.1k</Text>
                    </View>
                
                </TouchableOpacity>
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