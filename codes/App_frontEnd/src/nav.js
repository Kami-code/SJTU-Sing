import React from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from "./pages/account/login";
import MainPage from "./pages/mainpage";
import SingPage from "./pages/branchpages/singpage";
import CompletePage from "./pages/branchpages/singpage/completepage";
import ChoosePage from "./pages/branchpages/singpage/choosepage";
import InfoPage from "./pages/branchpages/infopage";
import PlayPage from "./pages/branchpages/playpage";
import SelectPage from "./pages/branchpages/selectpage";
import NewsPage from "./pages/branchpages/newspage";
import NewsDetailPage from "./pages/branchpages/newspage/detailpage";
import MePage from "./pages/branchpages/mepage";
import WorksPage from "./pages/branchpages/mepage/workspage";
import MessagePage from "./pages/branchpages/messagepage";
import FindPage from './pages/branchpages/findpage';
import DemoPage from "./pages/demopage";
import Layout from "./components/Layout";
import Tabbar from "./tabbar";

import Recorder1 from "./components/Recorder2.0/Recorder_1";
import Recorder2 from "./components/Recorder2.0/Recorder_2";

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
      {/* 录音模块放在 ./components/Recorder 中，含保存方法*/}
      <Stack.Navigator headerMode="none" initialRouteName="Recorder2">
        <Stack.Screen name="Login" component={Login} />
        {/* <Stack.Screen name="MainPage" component={MainPage} /> */}

        <Stack.Screen name="SingPage" component={SingPage} />
        <Stack.Screen name="CompletePage" component={CompletePage} />
        <Stack.Screen name="ChoosePage" component={ChoosePage} />

        <Stack.Screen name="InfoPage" component={InfoPage} />
        <Stack.Screen name="PlayPage" component={PlayPage} />
        <Stack.Screen name="NewsPage" component={NewsPage} />
        <Stack.Screen name="NewsDetailPage" component={NewsDetailPage} />
        <Stack.Screen name="SelectPage" component={SelectPage} />
        <Stack.Screen name="MePage" component={MePage} />
        <Stack.Screen name="WorksPage" component={WorksPage} />
        <Stack.Screen name="MessagePage" component={MessagePage} />
        <Stack.Screen name="FindPage" component={FindPage} />

        <Stack.Screen name="Tabbar" component={Tabbar} />

        <Stack.Screen name="DemoPage" component={DemoPage} />
        <Stack.Screen name="Recorder1" component={Recorder1} />
        <Stack.Screen name="Recorder2" component={Recorder2} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
//initialRouteName决定了打开软件时进入的页面
//headerMode决定标题样式（用"none"隐藏）
export default Nav;
