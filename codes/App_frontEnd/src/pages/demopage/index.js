import React, { Component} from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import MusicPlayer from '../../utils/MusicPlayer';
import { LogLevel, RNFFmpeg, RNFFprobe } from 'react-native-ffmpeg';
import RNFS from 'react-native-fs';






class App extends Component {  
  
    render() {
      const ffmpegWatermarkCommand = '-i ' + RNFS.ExternalStorageDirectoryPath+ '/test/wx_camera_1582897957311.mp4 ';


        RNFFmpeg.execute(ffmpegWatermarkCommand).then(result => console.log(`FFmpeg process exited with rc=${result}.`));
        //RNFFprobe.getMediaInformation(movie).then(information => {
          //console.log('Result: ' + JSON.stringify(information));
      //});
        return (
            <View>
                {/*<Text>fuck my ass</Text>*/}
                {/*<View style={{width:"60%",height:"40%",flexDirection:"row"}}>*/}
                <MusicPlayer/>
                {/*</View>*/}
            </View>
          );
    }
}

export default App;
