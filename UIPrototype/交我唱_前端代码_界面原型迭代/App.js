import React,{Component} from 'react';
import {View,Text} from 'react-native';
import Nav from "./src/nav";
import Layout from "./src/components/Layout";
class App extends Component{
    render(){
        return(
          <View style ={{flex:1}}>
            {/* <View style ={{height:"100%", width:"100%" ,position: 'absolute', zIndex: 1}}> */}
              {/* <Layout> */}
                <Nav></Nav>
              {/* </Layout> */}
            {/* </View> */}
            {/* <View style ={{position: 'absolute', zIndex: 2}}> */}
              
            {/* </View> */}
          </View>
        );
    }
} 
//nav.js 规划界面   
//flex:1 使得大小适应屏幕
export default App;