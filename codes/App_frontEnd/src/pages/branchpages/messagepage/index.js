import React,{Component} from 'react';
import {View,Text,Image,StatusBar,TouchableOpacity,ImageBackground,StyleSheet} from 'react-native';

import {pxToDp} from "../../../utils/stylesKits";
import Svg from 'react-native-svg-uri';
import {comment,gift,listener,bottle,rank} from '../../../res/fonts/iconSvg';

import {origin,adjust,restart,finish,svg_shezhi} from '../../../res/fonts/iconSvg';

import TopNav from '../../../components/Topnav';

class Index extends Component {
    state = {  }
    render() { 
        return (  
            <View >
                <View >                   
                <StatusBar backgroundColor="transparent" translucent={true} ></StatusBar>
                        <ImageBackground 
                            source={require("./images/background_blue.jpg")}
                            style={{height:pxToDp(80),paddingTop:pxToDp(12),flexDirection:"row",alignItems:'center',justifyContent:"center"}}
                        >
                            <Text style={{color:"#fff",fontSize:pxToDp(24),fontWeight:'bold'}}> 我的消息 </Text>
                        </ImageBackground>
                    
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around',alignContent:"center",backgroundColor:"#ddddeea9"}}>
                    <TouchableOpacity style={{alignItems:"center",padding:pxToDp(15)}}>
                        <View style={styles.button}>
                            <Svg width="35" height="35" fill ="#fff"  svgXmlData={comment} />
                        </View>
                        <Text style={styles.buttontext}>评论和点赞</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{alignItems:"center",padding:pxToDp(15)}}>
                        <View style={styles.button}>
                            <Svg width="40" height="40" fill ="#fff"  svgXmlData={gift} />
                        </View>
                        <Text style={styles.buttontext}>礼物</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{alignItems:"center",padding:pxToDp(15)}}>
                        <View style={styles.button}>
                            <Svg width="35" height="35" fill ="#fff"  svgXmlData={listener} />
                        </View>
                        <Text style={styles.buttontext}>最新听众</Text>
                    </TouchableOpacity>

                    
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start',alignContent:"center",backgroundColor:"transparent",borderColor:"#4466ffa9",borderBottomWidth:pxToDp(1)}}>
                    <TouchableOpacity style={{alignItems:"center",padding:pxToDp(15)}}>
                        <View style={styles.button_bottle}>
                            <Svg width="45" height="45" fill ="#fff"  svgXmlData={bottle} />
                        </View>
                        
                    </TouchableOpacity>
                    <View style={{flexDirection:"column"}}>
                        <Text style={styles.buttontext_bottle}>漂流瓶</Text>
                        <Text style={{}}>本周排行榜新鲜出炉</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start',alignContent:"center",backgroundColor:"transparent",borderColor:"#4466ffa9",borderBottomWidth:pxToDp(1)}}>
                    <TouchableOpacity style={{alignItems:"center",padding:pxToDp(15)}}>
                        <View style={styles.button_bottle}>
                            <Svg width="45" height="45" fill ="#fff"  svgXmlData={rank} />
                        </View>
                        
                    </TouchableOpacity>
                    <View style={{flexDirection:"column"}}>
                        <Text style={styles.buttontext_bottle}>好友排行</Text>
                        <Text style={{}}>本周排行榜新鲜出炉</Text>
                    </View>
                </View>
            </View>
               );
    }
}
 
export default Index;

const styles = StyleSheet.create({
    buttontext:{
        fontSize:pxToDp(14),
        marginTop:(4),
        color:"#4444889a"
    },
    button:{
        height:pxToDp(55),
        width:pxToDp(55),
        borderRadius:40,
        backgroundColor:"#aabbffa9",
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_bottle:{
        height:pxToDp(55),
        width:pxToDp(55),
        borderRadius:40,
        backgroundColor:"#4444ffa9",
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttontext_bottle:{
        fontSize:pxToDp(16),
        marginTop:(4),
        color:"#4444889a",
        paddingTop:pxToDp(15)
    },

});

