import React, { Component} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
 
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
 
const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 3,
    borderColor: '#00000030',
    textAlign: 'center',
    color: '#F33'
  },
//   选中之后的效果
  focusCell: {
    borderColor: '#F33',
  },
});
 

class App extends Component {
    state = { 
        codeText:""
     }

    onCodeChangeText=(codeText)=>{
        this.setState({codeText});
    }     
    render() { 
        return (
            <CodeField
                // value:初始值
                value={this.state.codeText}
                onChangeText={this.onCodeChangeText}
                cellCount={6}
                rootStyle={styles.codeFieldRoot}
                //数字键盘
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
            />
          );
    }
}
 
export default App; 