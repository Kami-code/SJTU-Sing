import React, {Component} from 'react';
import { Button } from 'react-native';
import {View,Text,TextInput,TouchableOpacity} from 'react-native';
import Svg from 'react-native-svg-uri';
import {svg_search} from '../../res/fonts/iconSvg';
import { pxToDp } from '../../utils/stylesKits';
class Index extends Component {
    state = {  }

    render() { 
        return (  
            <View style={{flexDirection:"row" ,height:pxToDp(40),borderRadius:pxToDp(20),backgroundColor:"#fff",position:'relative',...this.props.style}}>
                <TextInput 
                    style={{backgroundColor:"transparent",paddingLeft:pxToDp(40),flex:1}} 
                    placeholder="搜索伴奏/用户/作品"
                    value = {this.props.value}
                    onChangeText={this.props.onChangeText}
                />
                <Svg width="17" height="17" fill ="#444"  svgXmlData={svg_search} style={{position:"absolute",left:pxToDp(10),top:pxToDp(10)}} />
                <TouchableOpacity 
                    style={{backgroundColor:"#2244cccc",width:pxToDp(80),borderRadius:pxToDp(30),justifyContent:"center",alignItems:"center"}}
                    onPress={this.props.onSearch}
                >
                    <Text style={{fontSize:17,color:"#fff"}}>搜索</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
 
export default Index;