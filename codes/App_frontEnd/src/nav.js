import React from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from "./pages/account/login";
import MainPage from "./pages/mainpage"; 
import SingPage from "./pages/branchpages/singpage";
import InfoPage from "./pages/branchpages/infopage";
import PlayPage from "./pages/branchpages/playpage";
import SelectPage from "./pages/branchpages/selectpage";
import DemoPage from "./pages/demopage";
import Layout from "./components/Layout";
function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="MainPage">     
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="SingPage" component={SingPage} />
        <Stack.Screen name="InfoPage" component={InfoPage} />
        <Stack.Screen name="PlayPage" component={PlayPage} />
        <Stack.Screen name="SelectPage" component={SelectPage} />

        <Stack.Screen name="DemoPage" component={DemoPage} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
//initialRouteName决定了打开软件时进入的页面
//headerMode决定标题样式（用"none"隐藏）
export default Nav;
