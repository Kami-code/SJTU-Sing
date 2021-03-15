import React,{Component} from 'react';
import { View ,Text } from "react-native";
import Video from 'react-native-video';
import VideoScreen from '../../../utils/VideoPlayer';

class Index extends Component {
    state = {  }
    render() {
        return (
            <View>
                <Text> 作品播放页面</Text>

                <VideoScreen/>
            </View>
        );
    }
}

export default Index;
