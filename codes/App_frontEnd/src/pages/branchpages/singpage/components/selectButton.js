import React, { Component} from 'react';
import PropTypes from 'prop-types';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity

} from 'react-native';
import { pxToDp } from '../../../../utils/stylesKits';

export default class SelectButton extends Component {
    
    static propTypes = {
        // 普通状态
        title:PropTypes.string,
        id:PropTypes.int,

        imageUri:PropTypes.string,
        titleStyle:PropTypes.object,
        imageStyle:PropTypes.object,


        // 监听点击
        onPress:PropTypes.func,

        // 选中状态
        selected:PropTypes.bool,
        selectedId:PropTypes.int,

        // 按钮样式
        buttonStyle:PropTypes.object

    };

    constructor(props){
        super(props);

        this.state = {
            selected:1
        }
    }

    render() {
        
            return (

                <TouchableOpacity 
                style={(this.props.id == this.props.selectedId) ?styles.selectedStyle:styles.buttonStyle}
                onPress={()=>{
                        if (this.props.onPress){
                            this.props.onPress(this);
                        }

                    }}
                >
                {this.props.title?<Text style={{color:"#fff",fontSize:pxToDp(14)}}>{this.props.title}</Text>:null}
                {this.props.imageUri?<Image source={this.props.imageUri} style={[styles.imageStyle,this.props.imageStyle]}/> : null}
                </TouchableOpacity>
            );

        
    }


}

var styles = StyleSheet.create({
    buttonStyle:{
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'center',
        width:pxToDp(60),
        height:pxToDp(60),
        backgroundColor:"#33557799",
        borderRadius:pxToDp(5)
    },
    selectedStyle:{
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'center',
        width:pxToDp(60),
        height:pxToDp(60),
        backgroundColor:"#335577dd",
        borderRadius:pxToDp(5),
        borderColor:"brown",
        borderWidth:pxToDp(3)
    },
    imageStyle:{
        marginLeft:3
    }
});