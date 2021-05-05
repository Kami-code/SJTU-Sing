import React, {Component} from 'react';
import {View,Text} from 'react-native';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
class Index extends Component {
    state = {  }
    
 
// Inside of a component's render() method:
render() {
  return (
    <HeaderImageScrollView
      maxHeight={130}
      minHeight={44}
      headerImage={require("../../../../images/background1.jpg")}
      renderForeground={() => (
        <View style={{ height: 150, justifyContent: "center", alignItems: "center" }} >
          <TouchableOpacity onPress={() => console.log("tap!!")}>
            <Text style={{ backgroundColor: "transparent" }}>Tap Me!</Text>
          </TouchableOpacity>
        </View>
      )}
    >
      <View style={{ height: 1000 }}>
        {/* 用来放首页剩下的部分 */}
      </View>
    </HeaderImageScrollView>
  );
}
}
 
export default Index;