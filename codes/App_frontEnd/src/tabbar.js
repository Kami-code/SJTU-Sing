import React, {Component} from 'react';
import {View,Text} from 'react-native';
import Svg from 'react-native-svg-uri';
import TabNavigator from 'react-native-tab-navigator';
import {svg_bubble, svg_huatong,svg_letter,svg_search,svg_shezhi,svg_touxiang,svg_touxiang_small,svg_yinfu} from './res/fonts/iconSvg';
import SingPage from './pages/branchpages/singpage';
import NewsPage from './pages/branchpages/newspage';
import MePage from './pages/branchpages/mepage';
import MessagePage from './pages/branchpages/messagepage';
import FindPage from './pages/branchpages/findpage';
import MainPage from './pages/mainpage';
import MusicPlayer from './utils/MusicPlayer'
class Index extends Component {
    state = {  
        selectedTab:"home"
    }
    render() { 
        return ( 
            // <View>
            //      <Text> 导航栏</Text>
            // </View>
            <View style={{flex:1}}>
                {/* <Text> 导航栏</Text> */}
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'bubble'}
                        title="动态"
                        renderIcon={() => <Svg width="25" height = "25"  fill ="#77a" svgXmlData={svg_bubble} />}
                        // renderSelectedIcon={() => <Svg width="20" height = "20" svgXmlData={svg_shezhi} />}
                        // renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({ selectedTab: 'bubble' })}>
                        {/* {profileView} */}
                        <View style={{flex:1,flexDirection:'column'}}>
                            <NewsPage />
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'search'}
                        title="发现"
                        renderIcon={() => <Svg width="20" height = "20" fill ="#77a"  svgXmlData={svg_search} />}
                        // renderSelectedIcon={() => <Svg width="20" height = "20" svgXmlData={svg_shezhi} />}
                        // renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({ selectedTab: 'search' })}>
                        {/* {profileView} */}
                        <View style={{flex:1,flexDirection:'column'}} >
                            <FindPage/>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        // title="Home"
                        renderIcon={() => <Svg width="70" height = "70" fill ="#77a"  svgXmlData={svg_huatong} />}
                        // renderSelectedIcon={() => <Svg width="20" height = "20" svgXmlData={svg_yinfu} />}
                        // badgeText="1"
                        onPress={() => this.setState({ selectedTab: 'home' })}>
                        <View style={{flex:1,flexDirection:'column'}} >
                            {/* <Text> 111</Text> */}
                            {/* < MusicPlayer></MusicPlayer> */}
                            <SingPage/>
                        </View>
                        
                        {/* <Text> 1111</Text> */}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'message'}
                        title="消息"
                        renderIcon={() => <Svg width="25" height = "25" fill ="#77a"  svgXmlData={svg_letter} />}
                        // renderSelectedIcon={() => <Svg width="20" height = "20" svgXmlData={svg_shezhi} />}
                        // renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({ selectedTab: 'message' })}>
                        {/* {profileView} */}
                        <View style={{flex:1,flexDirection:'column'}} >
                            <MessagePage/>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'myinfo'}
                        title="我的"
                        renderIcon={() => <Svg width="25" height = "25" fill ="#77a" svgXmlData={svg_touxiang_small} />}
                        // renderSelectedIcon={() => <Svg width="20" height = "20" svgXmlData={svg_shezhi} />}
                        // renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({ selectedTab: 'myinfo' })}>
                        {/* {profileView} */}
                        <View style={{flex:1,flexDirection:'column'}} >
                            <MePage/>
                        </View>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}
 
export default Index;