import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions,Animated, Easing, } from 'react-native';
const { width, height } = Dimensions.get('window')
_this2 = null;
class Ready extends Component {
    constructor(props) {
        super(props);
        _this2 = this;
        this.state = {
            show:false,
            timing:5,
        };
        this.timer = null;
    }

    // componentDidMount(){ // 组件加载完成后启动动画
    //     _this.animationLoading = Animated.timing(
    //         this.state.rotateVal, // 初始值
    //         {
    //             toValue: 360, // 终点值
    //             easing: Easing.linear, // 这里使用匀速曲线，详见RN-api-Easing
    //             useNativeDriver: true,
    //         },
    //     );
    //     }
    static show = () => {
        _this2.setState({
            show: true,timing:5
        });
        _this2.timer = setInterval(()=>{
            _this2.state.timing = _this2.state.timing-1;
            _this2.setState({});
        }, 1000);
    };
    static hide = () => {
        _this2.setState({show: false})
        _this2.timer && clearInterval(_this2.timer);
    };
    render() {
        if (this.state.show) {
            if(this.state.timing==5){
                return (
                    <View style={styles.LoadingPage}>
                        <View style={{flex:1}}>
                        </View>
                        <Text style={{fontSize:60}}> Ready</Text>
                        <Text style={{fontSize:60}}> .....</Text>
                        <View style={{flex:1}}>
                        </View>
                    
                    </View>
                );
            }else if(this.state.timing==4){
                return (
                    <View style={styles.LoadingPage}>
                        <View style={{flex:1}}>
                        </View>
                        <Text style={{fontSize:60}}> Ready</Text>
                        <Text style={{fontSize:60}}> ....</Text>
                        <View style={{flex:1}}>
                        </View>
                    
                    </View>
                );
            }else if(this.state.timing==3){
                return (
                    <View style={styles.LoadingPage}>
                        <View style={{flex:1}}>
                        </View>
                        <Text style={{fontSize:60}}> Ready</Text>
                        <Text style={{fontSize:60}}> ...</Text>
                        <View style={{flex:1}}>
                        </View>
                    
                    </View>
                );
            }else if(this.state.timing==2){
                return (
                    <View style={styles.LoadingPage}>
                        <View style={{flex:1}}>
                        </View>
                        <Text style={{fontSize:60}}> Ready</Text>
                        <Text style={{fontSize:60}}> ..</Text>
                        <View style={{flex:1}}>
                        </View>
                    
                    </View>
                );
            }else if(this.state.timing==1){
                return (
                    <View style={styles.LoadingPage}>
                        <View style={{flex:1}}>
                        </View>
                        <Text style={{fontSize:60}}> Ready</Text>
                        <Text style={{fontSize:60}}> .</Text>
                        <View style={{flex:1}}>
                        </View>
                    
                    </View>
                );
            }else if(this.state.timing==0){
                return (
                    <View style={styles.LoadingPage}>
                        <View style={{flex:1}}>
                        </View>
                        <Text style={{fontSize:60}}> Ready</Text>
                        <Text style={{fontSize:60}}> </Text>
                        <View style={{flex:1}}>
                        </View>
                    
                    </View>
                );
            }        
        } else {
            return (<View></View>);
        }
    }
}
export default Ready;
const styles = StyleSheet.create({
    LoadingPage: {
        position: "absolute",
        left: 0,
        top: 0,
        backgroundColor: "rgba(0,0,0,0)",
        width: width,
        height: height,
        justifyContent: "center",
        alignItems: "center",
    },
});