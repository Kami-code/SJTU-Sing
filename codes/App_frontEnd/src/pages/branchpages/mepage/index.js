import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import React,{Component} from 'react';
import {View, Text, StyleSheet, StatusBar, ImageBackground, TouchableOpacity, requireNativeComponent} from 'react-native';
import {pxToDp} from '../../../utils/stylesKits';
import { Image } from 'react-native';
import Button from '../../../components/Button';
import {NavigationContext} from "@react-navigation/native";

import Info_Form from '../../../components/Info_Form';
import Topbar from '../../../components/Topbar';
import Loading from '../../../components/common/Loading';
// Inside of a component's render() method:
class Index extends Component {
    static contextType = NavigationContext;
    state = { 
        showEdit: false,
        nickname: global.userinfo.nickname,
        gender: global.userinfo.gender,
        birthday: global.userinfo.birthday,
        description: global.userinfo.description
    }
    goWorksPage = ()=>{
        Loading.show()
        let formData = new FormData();
        formData.append("username",global.account);
        console.log("request sent");

        // const url = `http://${global.IP}/production`;
        const url = `http://${global.IP_NEW}/song/${global.account}`;
        fetch(url,{
        method:'POST',
        headers: {},
        // body: formData,
        }).then(response =>response.json()
        ).then(data => {
            console.log("In mePage in goWorkPage, receive response")
            console.log(data)
            global.userinfo.mysongs =  data;
            Loading.hide()
            this.context.navigate("WorksPage");
        })
        .catch((error) =>{
            alert(error)
            Loading.hide()
        })
    
        
    }

    goEditPage =()=>{
        console.log("pressed");
        this.setState({
            showEdit: true
        })
    }

    getInfo =()=>{
        let formData = new FormData();
        formData.append("username",global.account);
        console.log(formData);

        const url = `http://${global.IP}/downloadinfo`;
        fetch(url,{
        method:'POST',
        headers: {},
        body: formData,
        }).then(response =>response.json()
        ).then(data => {
            console.log(data)
            global.userinfo.nickname = data.nickname
            // console.log(global.userinfo.nickname);
            global.userinfo.birthday = data.birthday
            global.userinfo.gender = data.gender
            global.userinfo.description = data.description
            this.setState({
                nickname: global.userinfo.nickname,
                gender: global.userinfo.gender,
                birthday: global.userinfo.birthday,
                description: global.userinfo.description
            })
            this.setState({
                showEdit: false
            })

        })
        .catch((error) =>{
            alert(error)
        })
    }

    goBack =()=>{
        // alert("放弃当前编辑内容");
        this.getInfo();

    }

    renderEditPage =()=>{
        return(
            <View>
                <Topbar title ={"编辑个人信息"} goBack={this.goBack}/>
                <Info_Form goBack = {this.goBack}></Info_Form>
            </View>
        )
    }

    renderMePage =()=>{
        return (
            <View style={styles.container}>
                {/* <Text>我的信息</Text> */}
                    <StatusBar backgroundColor="transparent" translucent={true} ></StatusBar>
                    <ImageBackground 
                        source={require("../../../images/background_blue.jpg")}
                        style={{height:pxToDp(80),flexDirection:"row",alignItems:'center',justifyContent:"center"}}
                    >
                        <Text style={{color:"#fff",fontSize:pxToDp(24),paddingTop:pxToDp(12),fontWeight:'bold'}}> 我的 </Text>
                        
                    </ImageBackground>
                    <View style={{height:"18%",paddingTop:pxToDp(12),flexDirection:"row",alignItems:'center',justifyContent:'space-around',backgroundColor:"#aabbffa9"}}>
                        <Image 
                            source={require("./images/background1.jpg") }
                            style={{height:pxToDp(90),width:pxToDp(90),borderRadius:50}}
                        ></Image>
                        <View style={{height:"100%",paddingTop:pxToDp(20),flexDirection:"column"}}>
                            <Text style={{color:"#fff",fontSize:pxToDp(24),fontWeight:'bold'}}> {this.state.nickname} </Text>
                            <Text style={{color:"#fff",fontSize:pxToDp(16)}}> {this.state.gender} {this.state.birthday}</Text>
                            <Text style={{color:"#fff",fontSize:pxToDp(16)}}> 手机号: {global.account}</Text>
                            <Text style={{color:"#fff",fontSize:pxToDp(16)}}> </Text>
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
                        <Text style={{fontSize:pxToDp(18)}}> {global.userinfo.description}</Text>
                    </TouchableOpacity>
                    <View style={{height:"16%",paddingTop:pxToDp(12),flexDirection:"row",alignItems:'center',justifyContent:'space-around',backgroundColor:"#aabbffa9"}}>
                        <Button onPress={this.goWorksPage} style={{width:"80%",alignSelf:"center",height:pxToDp(40),borderRadius:pxToDp(20)}}>我的作品</Button>
                    </View>
                    <View style={{height:"16%",paddingTop:pxToDp(4),flexDirection:"row",alignItems:'center',justifyContent:'space-around',backgroundColor:"#aabbffa9"}}>
                        <Button onPress={this.goEditPage} style={{width:"80%",alignSelf:"center",height:pxToDp(40),borderRadius:pxToDp(20)}}>编辑信息</Button>
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

    render() {
        return (
            <View style={styles.container}>
                {this.state.showEdit? this.renderEditPage() : this.renderMePage()}
            </View>    
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
});