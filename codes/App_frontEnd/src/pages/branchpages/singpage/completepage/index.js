import React,{Component} from 'react';
import {View, Text, ImageBackground,StyleSheet,StatusBar} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import TopNav from '../../../../components/Topnav';
import {NavigationContext} from "@react-navigation/native";
import VideoScreen from '../../../../utils/VideoPlayer';
import { TouchableOpacity } from 'react-native';
import Button from '../../../../components/Button';
import { pxToDp } from '../../../../utils/stylesKits';
class Index extends Component {
    static contextType =NavigationContext;
    state = {  }
    goPage = ()=>{
      // this.context = this.props.navigation
      this.context.navigate("Tabbar");
  }
    render () {
        return(
            <View style={styles.container}>
                <TopNav title ="结算页面"/>
                {/* <View style={{flex:1,flexDirection:"row",width:"100%",height:pxToDp(80),backgroundColor:"#cccccc",marginTop:pxToDp(600)}}>
                  <View style={{width:pxToDp(100),height:pxToDp(80)}}>
                    <Text >重录</Text>
                  </View>
                  
                  <View style={{height:pxToDp(80)}}>
                    <Button> 生成作品</Button>
                  </View>
                  <View style={{width:pxToDp(100),height:pxToDp(80)}}> 
                    <Text >保存</Text>
                  </View>
                </View> */}
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
      flex:1,
      flexDirection:"row",
      width:"100%",
      height:pxToDp(60),
      backgroundColor:"#cccccc",
      marginTop:pxToDp(620), 
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