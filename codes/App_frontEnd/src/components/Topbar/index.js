import React, {Component} from 'react';
import { TouchableOpacity } from 'react-native';
import {View, Text, ImageBackground, StatusBar } from 'react-native';
import {pxToDp} from '../../utils/stylesKits';
import Svg from 'react-native-svg-uri';
import {goback} from '../../res/fonts/iconSvg';
class Index extends Component {
    render() { 
        return (  
            <View >
                <StatusBar backgroundColor="transparent" translucent={true} ></StatusBar>
                <ImageBackground 
                    source={require("../../images/background_blue.jpg")}
                    style={{height:pxToDp(80),paddingTop:pxToDp(12),flexDirection:"row",alignItems:'center',justifyContent:"space-between"}}
                >
                <TouchableOpacity 
                    style={{flexDirection:"row",alignItems:'center',width:pxToDp(80)}}
                    onPress = {this.props.goBack}
                >
                    <View>
                        <Svg width="16" height = "16"  fill ="#fff" svgXmlData={goback} />
                    </View>
                    <Text style={{color:"#fff",fontSize:pxToDp(16),marginLeft:pxToDp(5)}}>返回</Text>
                </TouchableOpacity>

                <Text style={{color:"#fff",fontSize:pxToDp(20),fontWeight:'bold'}}>{this.props.title}</Text>
                <Text style={{width:pxToDp(80)}}></Text>

                </ImageBackground>
                {/* <Text>自己的导航</Text> */}
            </View>
        );
    }
}
 
export default Index;