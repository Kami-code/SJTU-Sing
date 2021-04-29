import React, {Component} from 'react';
import {View,Text,TextInput} from 'react-native';
import Svg from 'react-native-svg-uri';
import {svg_search} from '../../res/fonts/iconSvg';
import { pxToDp } from '../../utils/stylesKits';
class Index extends Component {
    state = {  }
    render() { 
        return (  
            <View style={{height:pxToDp(40),borderRadius:pxToDp(20),backgroundColor:"#fff",position:'relative',...this.props.style}}>
                <TextInput 
                    style={{backgroundColor:"transparent",paddingLeft:pxToDp(40)}} 
                    placeholder="搜索伴奏/用户/作品"
                    value = {this.props.value}
                    onChangeText={this.props.onChangeText}
                />
                <Svg width="17" height="17" fill ="#444"  svgXmlData={svg_search} style={{position:"absolute",left:pxToDp(10),top:pxToDp(10)}} />
            </View>
        );
    }
}
 
export default Index;