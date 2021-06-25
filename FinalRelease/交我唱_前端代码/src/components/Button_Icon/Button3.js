import React,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {pxToDp} from '../../utils/stylesKits'

class Index extends Component {

  static defaultProps={
    style:{},
    textStyle:{}
  }
  render() {
    return ( 
      //从外部传递style属性,父组件中传递事件属性
    <TouchableOpacity onPress={this.props.onPress} style ={{
        ...this.props.style,
        overflow:"hidden",
        alignItems:'center',
        justifyContent:'center',
        width: pxToDp (75),
        height:pxToDp (75),
        backgroundColor:'#f76260',
        borderColor:'green',
        borderStyle:'solid',
        borderRadius:150,
        paddingBottom:2 

          }} >
        {/* start和and构成矢量决定渐变方向 */}
        <Image source={require("../../images/icon_zuopin.jpg")} style={{width:"100%",height:"100%",flex:1}}></Image>
        <Text style={{color:"#fff"}}> 作品 </Text>
    </TouchableOpacity>

    );
  }
}
 

//以下区域修改按钮样式
const styles = StyleSheet.create({
  circle:{
      overflow:'hidden',
      marginRight:10,
      alignItems:'center',
      justifyContent:'center',
      width: pxToDp (90),
      height:pxToDp (90),
      backgroundColor:'#f76260',
      borderColor:'green',
      borderStyle:'solid',
      borderRadius:150,
      paddingBottom:2 
  },
  linearGradient: {
    flex: 1,
    paddingLeft: pxToDp(15),
    paddingRight: pxToDp(15),
    borderRadius: pxToDp(5),
    // 继承父类大小
    width:"100%",
    height:"100%",
    justifyContent:"center",
    alignItems:"center"
  },
  buttonText: {
    fontSize: pxToDp(18),
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#ffffff',
  },
});

export default Index;