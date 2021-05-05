import React,{Component} from 'react';
import { View ,Text , ImageBackground} from "react-native";
import Video from 'react-native-video';
import { pxToDp } from '../../../utils/stylesKits';
import VideoScreen from '../../../utils/VideoPlayer';

class Index extends Component {
    state = {  }
    render() {
        return (
            <View style={{height:"100%",weight:"100%"}}>
                {/* <Text> 作品播放页面</Text> */}
                <View style={{height:"100%",weight:"100%"}} >
                    <VideoScreen/>
                    
                </View>
                
            </View>
        );
    }
}

export default Index;
