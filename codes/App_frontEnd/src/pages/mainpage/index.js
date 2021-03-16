import React,{Component} from 'react';
import {View,Text,Image,StatusBar} from 'react-native';

import {pxToDp} from "../../utils/stylesKits";
import Button  from "../../components/Button";
import Button_Icon1 from "../../components/Button_Icon/Button1"; 
import Button_Icon2 from "../../components/Button_Icon/Button2"; 
import Button_Icon3 from "../../components/Button_Icon/Button3"; 
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
            <View style={styles.flexFrame}>
                <ImageBackground style={{width:"100%",height:"100%",flexDirection:"row"}} source={require("../../images/background2.jpg")}>
                    <View style={styles.flexContainer}>
                        <StatusBar backgroundColor="transparent" translucent={true} ></StatusBar>
                        <View style={styles.cellfixed}>
                            <Button_Icon2 onPress={this.goSelectPage} style={{borderRadius:pxToDp(20),alignSelf:"center"}}></Button_Icon2>
                        </View>
                        <View style={styles.cell}>
                            <Button_Icon1 onPress={this.goSingPage} style={{borderRadius:pxToDp(20),alignSelf:"center"}}></Button_Icon1>
                        </View>
                        <View style={styles.cellfixed}>
                            <Button_Icon3 onPress={this.goPlayPage} style={{borderRadius:pxToDp(20),alignSelf:"center"}}></Button_Icon3>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            
        );
    }
}
 
export default Index;


styles = {
    flexContainer: {
        flex: 1,
        // 容器需要添加direction才能变成让子元素flex
        flexDirection: 'row',
        marginTop:pxToDp(600),
        // backgroundColor: '#aaaaaa',
    },
    flexFrame:{
        flex: 1,
        // 容器需要添加direction才能变成让子元素flex
        flexDirection: 'row',
    },
    cell: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        // backgroundColor: '#aaaaaa',
        // alignSelf:"center",
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    cellfixed: {
        height: 50,
        width: 100,
        // backgroundColor: '#fefefe'
    } 
}