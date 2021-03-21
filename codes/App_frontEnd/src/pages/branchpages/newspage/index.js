import React,{Component} from 'react';
import { TouchableOpacity } from 'react-native';
import {View, Text, ImageBackground,StyleSheet,Button ,StatusBar,Image} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import TopNav from '../../../components/Topnav';
import {NavigationContext} from "@react-navigation/native";
import {pxToDp} from '../../../utils/stylesKits';

class Index extends Component {
    static contextType = NavigationContext;
    state = {  }
    goPage = ()=>{
        //newspage页面不足以调用
        console.log(this.props.navigation);
        // this.context = this.props.navigation
        this.context.navigate("NewsDetailPage");
    }
    render () {
        return(
            <View style={styles.container}>
                
                {/* <TopNav title ="视频播放"/> */}

                {/* <Text>显示了吗</Text> */}
                <StatusBar backgroundColor="transparent" translucent={true} ></StatusBar>
                <Swiper
                    cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
                    renderCard={(card) => {
                        return (
                            <TouchableOpacity style={styles.card}  onPress ={()=>this.goPage("NewsDetailPage")}>
                                {/* <Text style={styles.text}>{card}</Text> */}
                                <Image source={require("./images/Lovestory.jpg")}></Image>
                            </TouchableOpacity>
                        )
                    }}
                    onSwiped={(cardIndex) => {console.log(cardIndex)}}
                    onSwipedAll={() => {console.log('onSwipedAll')}}
                    cardIndex={0}
                    backgroundColor={'#ddddee'}
                    stackSize= {3}>
                    {/* <Button
                        onPress={() => {console.log('oulala')}}
                        title="Press me">
                        You can press me
                    </Button> */}
                    <View >
                        <StatusBar backgroundColor="transparent" translucent={true} ></StatusBar>
                        <ImageBackground 
                            source={require("../../../images/background_blue.jpg")}
                            style={{height:pxToDp(80),paddingTop:pxToDp(12),flexDirection:"row",alignItems:'center',justifyContent:"center"}}
                        >
                            <Text style={{color:"#fff",fontSize:pxToDp(24),fontWeight:'bold'}}> 动态 </Text>
                        </ImageBackground>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around',alignItems:'center' ,paddingTop:pxToDp(12) }}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttontext}>全部</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttontext}>热门</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttontext}>好友</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttontext}>教唱</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Swiper>
            </View>
        );
        
    }
}
 
export default Index;

const styles = StyleSheet.create({
    buttontext:{
        fontSize:pxToDp(14),
        color:"#ffffff"
    },
    button:{
        height:pxToDp(30),
        width:pxToDp(65),
        borderRadius:4,
        backgroundColor:"#3366aa",
        alignItems: 'center',
        alignContent:'center',
        justifyContent: 'center',
    },
    container: {
      flex: 1,
      flexDirection:"column",
      backgroundColor: "#ddddee"
    },
    card: {
      flex: 1,
      borderRadius: 14,
      borderWidth: 2,
      borderColor: "#E8E8E8",
      justifyContent: "center",
      backgroundColor: "white",
      marginTop: pxToDp(80),
    },
    text: {
      textAlign: "center",
      fontSize: 50,
      backgroundColor: "transparent"
    }
  });