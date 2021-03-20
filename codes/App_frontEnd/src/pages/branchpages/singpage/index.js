import React,{Component} from 'react';
import {View,Text,Image,StatusBar} from 'react-native';

import {pxToDp} from "../../../utils/stylesKits";
import MusicPlayer from "../../../utils/MusicPlayer";
import Singrefer from "./components/singrefer";
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import { ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class Index extends Component {
    state = {  }
    render() { 
        return ( 
            <View style={styles.flexFrame}>
                <StatusBar backgroundColor="transparent" translucent={true} ></StatusBar>
                <MusicPlayer></MusicPlayer>
                {/* <Singrefer></Singrefer> */}

            </View>

        // <HeaderImageScrollView
        //     maxHeight={130}
        //     minHeight={44}
        //     headerImage={require("./images/background1.jpg")}
        //     renderForeground={() => (
        //     <View style={{ height: 130, justifyContent: "center", alignItems: "center" }} >
        //         {/* <TouchableOpacity onPress={() => console.log("tap!!")}>
        //         <Text style={{ backgroundColor: "transparent" }}>Tap Me!</Text>
        //         </TouchableOpacity> */}
        //     </View>
        //     )}
        // >
        // <View style={{ height: 1000 }}>
        // {/* 用来放首页剩下的部分 */}
        //         {/* <MusicPlayer></MusicPlayer> */}
        // </View>
        // </HeaderImageScrollView>
        );
    }
}
 
export default Index;


styles = {
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
        flexDirection: 'column',
        backgroundColor: '#ddddee',
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
}