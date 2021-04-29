import React,{Component} from 'react';
import {View,Text,Image,StatusBar,StyleSheet} from 'react-native';

import {pxToDp} from "../../../utils/stylesKits";
import MusicPlayer from "../../../utils/MusicPlayer";
import Singrefer from "./components/singrefer";
import Svg from 'react-native-svg-uri';
import {origin,adjust,restart,finish} from '../../../res/fonts/iconSvg';
import CompletePage from './completepage';
import {NavigationContext} from "@react-navigation/native";

import TopNav from "../../../components/Topnav";

// import Recorder2 from "../../../components/Recorder2.0/Recorder_2";
class Index extends Component {
    static contextType = NavigationContext;
    state = {  }
    goPage = ()=>{
        // this.context = this.props.navigation
        this.context.navigate("CompletePage");
        
    }
    
    render() { 
        return ( 
            <View style={styles.flexFrame}>
                <StatusBar backgroundColor="transparent" translucent={true} ></StatusBar>
                <TopNav title ={"K歌"}/>
                <MusicPlayer></MusicPlayer>
                {/* <Singrefer></Singrefer> */}
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around',alignContent:"center" ,paddingBottom:pxToDp(50)}}>
                    <TouchableOpacity style={{alignItems:"center"}}>
                        <View style={styles.button}>
                            <Svg width="45" height="45" fill ="#fff"  svgXmlData={origin} />
                        </View>
                        <Text style={styles.buttontext}>原唱</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{alignItems:"center"}}>
                        <View style={styles.button}>
                            <Svg width="35" height="35" fill ="#fff"  svgXmlData={adjust} />
                        </View>
                        <Text style={styles.buttontext}>返听调音</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{alignItems:"center"}}>
                        <View style={styles.button}>
                            <Svg width="40" height="40" fill ="#fff"  svgXmlData={restart} />
                        </View>
                        <Text style={styles.buttontext}>重录</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{alignItems:"center"}} onPress ={()=>this.goPage("CompletePage")}>
                        <View style={styles.button}>
                            <Svg width="45" height="45" fill ="#fff"  svgXmlData={finish} />
                        </View>
                        <Text style={styles.buttontext}>完成</Text>
                    </TouchableOpacity>
                </View> */}
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
        height:pxToDp(60),
        width:pxToDp(60),
        borderRadius:40,
        backgroundColor:"#ddddee",
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexContainer: {
        flex: 1,
        // 容器需要添加direction才能变成让子元素flex
        flexDirection: 'row',
        marginTop:pxToDp(500),
        backgroundColor: '#cc0000',
    },
    flexFrame:{
        flex: 1,
        // 容器需要添加direction才能变成让子元素flex
        // flexDirection: 'column',
        backgroundColor: 'transparent',
    },
    cell: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#aaaaaa',
        // alignSelf:"center",
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    cellfixed: {
        height: 50,
        width: "25%",
        backgroundColor: '#fefefe'
    },
    icon_more: {
        // height: 10,
        // width: 10,
        marginTop:pxToDp(50)
    },
    flexTopContainer: {
        flex: 1,
        // 容器需要添加direction才能变成让子元素flex
        flexDirection: 'row',
        backgroundColor: '#ccccee',
        // marginTop:pxToDp(100),
    },
    cellfixedTop: {
        height: 30,
        width: 70,
        alignSelf: "center"
        // backgroundColor: '#fefefe'
    },
    control:{
        height: 30,
        width: 30,
        alignSelf: "center"
        
    },
    play:{
        height: 80,
        width: 80,
        alignSelf: "center"
    },
    flexMidContainer: {
        flex: 1,
        // 容器需要添加direction才能变成让子元素flex
        flexDirection: 'row',
        // backgroundColor: '#aaaaaa',
        marginTop:pxToDp(350),
    },
    cellfixedMid: {
        height: 40,
        width: 110,
        // backgroundColor: '#fefefe'
    },
});