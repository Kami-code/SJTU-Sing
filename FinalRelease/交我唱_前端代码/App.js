import React,{Component} from 'react';
import {View,Text} from 'react-native';
import Nav from "./src/nav";
import Layout from "./src/components/Layout";
import global_Songs from "./src/global_Songs";//该操作引入全局变量，不可删去
import { MenuProvider } from 'react-native-popup-menu';

console.disableYellowBox = true;//该操作隐藏warning

class App extends Component{
    render(){
        return(
          <MenuProvider>
          <View style ={{flex:1}}>
                <Nav></Nav>
          </View>
          </MenuProvider>
        );
    }
} 
//nav.js 规划界面   
//flex:1 使得大小适应屏幕
export default App;