import React, {
    Component
} from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    BackHandler,
    ImageBackground
} from 'react-native';

import Video from 'react-native-video';
import { pxToDp } from './stylesKits';

function formatTime(second) {
    let h = 0, i = 0, s = parseInt(second);
    if (s > 60) {
        i = parseInt(s / 60);
        s = parseInt(s % 60);
    }
    // 补零
    let zero = function (v) {
        return (v >> 0) < 10 ? "0" + v : v;
    };
    console.log([zero(h), zero(i), zero(s)].join(":"));
    // return [zero(h), zero(i), zero(s)].join(":");
    return zero(s);
}

export default class VideoScreen extends Component {

    static navigationOptions = {
        header: null
    };

    // constructor(){
    //     const a = renderResizeModeControl();
    // }

    state = {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'contain',
        duration: 0.0,
        currentTime: 0.0,
        paused: false,
    };

    onLoad = (data) => {
        this.setState({duration: data.duration});
        console.log(data.duration + "xxx");
    };

    onProgress = (data) => {

        this.setState({currentTime: data.currentTime});
        console.log(data.currentTime + "hhh");
    };

    onEnd = () => {
        this.setState({paused: true})
        this.video.seek(0)
    };

    onAudioBecomingNoisy = () => {
        this.setState({paused: true})
    };

    // onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
    //     this.setState({paused: !event.hasAudioFocus})
    // };

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    };

    renderRateControl(rate) {
        const isSelected = (this.state.rate === rate);

        return (
            <TouchableOpacity onPress={() => {
                this.setState({rate})
            }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
                    {rate}x
                </Text>
            </TouchableOpacity>
        );
    }

    renderResizeModeControl(resizeMode) {
        const isSelected = (this.state.resizeMode === resizeMode);

        return (
            <TouchableOpacity onPress={() => {
                this.setState({resizeMode})
            }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
                    {resizeMode}
                </Text>
            </TouchableOpacity>
        )
    }

    renderVolumeControl(volume) {
        const isSelected = (this.state.volume === volume);

        return (
            <TouchableOpacity onPress={() => {
                this.setState({volume})
            }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
                    {volume * 100}%
                </Text>
            </TouchableOpacity>
        )
    }

    render() {
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

        return (
            <View style={styles.container}>
                {/* <ImageBackground style={{width:"100%",height:"100%"}} source={require("../images/background2.jpg")}> */}
                <TouchableOpacity

                    style={styles.fullScreen}
                    onPress={() => this.setState({paused: !this.state.paused})}>

                    <Video
                        ref="video"
                        /* For ExoPlayer */
                        source={require('../images/Lovestory.mp4')}
                        style={styles.fullScreen}//组件样式
                        rate={this.state.rate}//播放速率
                        paused={this.state.paused}//暂停
                        volume={this.state.volume}//调节音量
                        muted={this.state.muted}//控制音频是否静音
                        resizeMode={this.state.resizeMode}//缩放模式
                        onLoad={this.onLoad}//加载媒体并准备播放时调用的回调函数。
                        onProgress={this.onProgress}//视频播放过程中每个间隔进度单位调用的回调函数
                        onEnd={this.onEnd}//视频播放结束时的回调函数
                        onAudioBecomingNoisy={this.onAudioBecomingNoisy}//音频变得嘈杂时的回调 - 应暂停视频
                        onAudioFocusChanged={this.onAudioFocusChanged}//音频焦点丢失时的回调 - 如果焦点丢失则暂停
                        repeat={false}//确定在到达结尾时是否重复播放视频。
                    />

                </TouchableOpacity>
                {/* </ImageBackground> */}
                <View style={styles.textStyle}>
                    <Text style={styles.volumeControl}>
                        {formatTime(this.state.duration - this.state.currentTime)}
                    </Text>
                </View>

                <View style={styles.controls}>
                    <View style={styles.generalControls}>

                    </View>

                    <View style={styles.generalControls}>
                        <View style={styles.progress}>
                            <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]}/>
                            <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]}/>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        //背景颜色
        backgroundColor: 'black',
    },
    textStyle: {
        paddingLeft: 10,
        paddingTop: 25,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    btnStyle: {
        paddingRight: 10,
        paddingTop: 25,
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        position: 'absolute',
        bottom: pxToDp(200),
        left: 20,
        right: 20,
    },
    progress: {
        // height: pxToDp(200),
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10 ,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingTop: 10,
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    volumeControl: {
        fontSize: 25,
        color: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: 'white',
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
});
