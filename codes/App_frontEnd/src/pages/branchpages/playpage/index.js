import React,{Component} from 'react';
import { View ,Text } from "react-native";
import Video from 'react-native-video';

class Index extends Component {
    state = {  }
    render() { 
        return (  
            <View>
                <Text> 作品播放页面</Text>
                <Video
    source={{uri: "require:(\"../../../src/images/Lovestory.mp4\")"}}  
    poster={"url"}
/>
            </View>
        );
    }
}
 
export default Index;