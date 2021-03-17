import React, { Component} from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import MusicPlayer from '../../utils/MusicPlayer';




class App extends Component {

    render() {
        return (
            <View>
                <View style={{width:"60%",height:"40%",flexDirection:"row"}}>
                    <MusicPlayer/>
                </View>
            </View>
          );
    }
}

export default App;
