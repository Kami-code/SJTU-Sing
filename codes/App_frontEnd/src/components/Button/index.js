import React,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
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
      <TouchableOpacity onPress={this.props.onPress} style ={{width:"100%",height:"100%",...this.props.style,overflow:"hidden"}}>
        {/* start和and构成矢量决定渐变方向 */}
        <LinearGradient start={{x:0,y:0}} end={{x:1,y:0}} colors={['#FF0000', '#7093DB']} style={styles.linearGradient}>
          <Text style={{...styles.buttonText,...this.props.textStyle}}>
          {this.props.children}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    
    );
  }
}
 

//以下区域修改按钮样式
const styles = StyleSheet.create({
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