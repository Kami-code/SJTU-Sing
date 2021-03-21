import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import React,{Component} from 'react';
import {View, Text, StyleSheet, StatusBar, ImageBackground, TouchableOpacity, requireNativeComponent} from 'react-native';
import {pxToDp} from '../../../utils/stylesKits';
import { Image } from 'react-native';
import Button from '../../../components/Button';
import {NavigationContext} from "@react-navigation/native";

// Inside of a component's render() method:
class Index extends Component {
    static contextType = NavigationContext;
    state = {  }
    goWorksPage = ()=>{
        this.context.navigate("WorksPage");
    }
    render() {
        return (
            <View style={styles.container}>
                {/* <Text>我的信息</Text> */}
                    <StatusBar backgroundColor="transparent" translucent={true} ></StatusBar>
                    <ImageBackground 
                        source={require("../../../images/background_blue.jpg")}
                        style={{height:pxToDp(100),flexDirection:"column",alignItems:'center',justifyContent:"center"}}
                    >
                        <Text style={{color:"#fff",fontSize:pxToDp(24),fontWeight:'bold'}}> 我的 </Text>
                        
                    </ImageBackground>
                    <View style={{height:"18%",paddingTop:pxToDp(12),flexDirection:"row",alignItems:'center',justifyContent:'space-around',backgroundColor:"#aabbffa9"}}>
                        <Image 
                            source={require("./images/Trump.jpg") }
                            style={{height:pxToDp(90),width:pxToDp(90),borderRadius:50}}
                        ></Image>
                        <View style={{height:"100%",paddingTop:pxToDp(20),flexDirection:"column"}}>
                            <Text style={{color:"#fff",fontSize:pxToDp(24),fontWeight:'bold'}}> 川普 </Text>
                            <Text style={{color:"#fff",fontSize:pxToDp(16)}}> 男 广东 22岁</Text>
                            <Text style={{color:"#fff",fontSize:pxToDp(16)}}> Fack News!!</Text>
                        </View>
                        <TouchableOpacity style ={{borderColor:"#000"}}>
                            <Text>+ 添加账号 </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:"16%",paddingTop:pxToDp(12),flexDirection:"row",alignItems:'center',justifyContent:'space-around',backgroundColor:"#aabbffa9"}}>
                        <TouchableOpacity style={{height:"100%",paddingTop:pxToDp(20),flexDirection:"column"}}>
                            <Text style={styles.text1}>20.1k</Text>
                            <Text style={styles.text1}>粉丝</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{height:"100%",paddingTop:pxToDp(20),flexDirection:"column"}}>
                            <Text style={styles.text1}>2</Text>
                            <Text style={styles.text1}>关注</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{height:"100%",paddingTop:pxToDp(20),flexDirection:"column"}}>
                            <Text style={styles.text1}>0</Text>
                            <Text style={styles.text1}>好友</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{height:"5%",paddingTop:pxToDp(10),paddingLeft:pxToDp(20),flexDirection:"column",backgroundColor:"#aabbffa9"}}>
                        <Text> 点击设置个性签名</Text>
                    </TouchableOpacity>
                    <View style={{height:"16%",paddingTop:pxToDp(12),flexDirection:"row",alignItems:'center',justifyContent:'space-around',backgroundColor:"#aabbffa9"}}>
                        <Button onPress={this.goWorksPage} style={{width:"80%",alignSelf:"center",height:pxToDp(40),borderRadius:pxToDp(20)}}>我的作品</Button>
                    </View>

            </View>
            
            // <HeaderImageScrollView
            // maxHeight={130}
            // minHeight={44}
            // headerImage={require("../../../images/background_blue.jpg")}
            // renderForeground={() => (
            //     <View style={{ height: 130, justifyContent: "center", alignItems: "center" }} >

            //     </View>
            // )}
            // >
            // <View style={{ height: 1000 }}>
            //     {/* 剩余结构 */}
            //     {/* <TriggeringView onHide={() => console.log("text hidden")}>
            //     <Text>Scroll Me!</Text>
            //     </TriggeringView> */}
            // </View>
            // </HeaderImageScrollView>
        );
    }

}
 
export default Index;

const styles = StyleSheet.create({
    text1:{
        color:"#fff",
        fontSize:pxToDp(20)
    },
    buttontext:{
        fontSize:pxToDp(14),
        color:"#ffffff"
    },
    container: {
        flex: 1,
        flexDirection:"column",
        backgroundColor: "#ddddee"
    },
})