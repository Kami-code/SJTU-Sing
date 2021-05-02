import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions,Animated, Easing, } from 'react-native';
const { width, height } = Dimensions.get('window')
_this = null;
class Loading extends Component {
    constructor(props) {
        super(props);
        _this = this;
        this.state = {
            show:false,
            rotateVal: new Animated.Value(0), 
        };
    }

    componentDidMount(){ // 组件加载完成后启动动画
        _this.animationLoading = Animated.timing(
            this.state.rotateVal, // 初始值
            {
                toValue: 360, // 终点值
                easing: Easing.linear, // 这里使用匀速曲线，详见RN-api-Easing
            }
        );
        }
    static show = () => {
        _this.setState({show: true})
        Animated.loop(_this.animationLoading).start(); // 开始动画
        setTimeout(Animated.loop(_this.animationLoading).stop, 5000); // 5秒后停止动画，可用于任意时刻停止动画
    };
    static hide = () => {
        _this.setState({show: false})
    };
    render() {
        if (this.state.show) {
            return (
                <View style={{flex:9,backgroundColor: 'rgba(252, 252, 252, 1)',flexDirection:"column"}}>
                    <View style={{flex:1}}>
                    </View>
                    <Animated.Text 
                    style={{
                        textAlign: 'center',
                        fontSize: 34,
                        fontFamily: 'iconfont',
                        transform: [{ // 动画属性
                            rotate: this.state.rotateVal.interpolate({
                                inputRange: [0, 360],
                                outputRange: ['0deg', '360deg'],
                            })
                        }]
                    }}>
                    {'\ue6ae'}
                    </Animated.Text>
                    <View style={{flex:1}}>
                    </View>
                
                </View>
            );
        } else {
            return (<View></View>);
        }
    }
}
export default Loading;
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