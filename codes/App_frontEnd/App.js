import React,{Component} from 'react';
import {View,Text} from 'react-native';
import Nav from "./src/nav";
class App extends Component{
    render(){
        return(
          <View style ={{flex:1}}>
            <Nav></Nav>
          </View>
        );
    }
} 
//nav.js 规划界面   
//flex:1 使得大小适应屏幕
export default App;