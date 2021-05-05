import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	StatusBar,
	Text,
    ImageBackground,
	Image,
	TouchableOpacity,
    TextInput
} from 'react-native';

import SearchInput from '../../../components/searchinput';
import {pxToDp} from '../../../utils/stylesKits';
import SONGS from '../../../images/song';

import Svg from 'react-native-svg-uri';
import {heart} from '../../../res/fonts/iconSvg';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state={
            txt: "",
            songs: SONGS,
            pic_big: '', 
        }
    }
	render(){
		return(
			<View style={styles.container}>
                <StatusBar backgroundColor="transparent" translucent={true} ></StatusBar>
                <ImageBackground 
                    source={require("../../../images/background_blue.jpg")}
                    style={{height:pxToDp(80),flexDirection:"row",alignItems:'center',justifyContent:"center"}}
                >
                    <Text style={{color:"#fff",fontSize:pxToDp(24),paddingTop:pxToDp(12),fontWeight:'bold'}}> 发现 </Text>
                    
                </ImageBackground>
				<SearchInput onChangeText={txt=>this.setState({txt})} value={this.state.txt} style={{marginTop:pxToDp(10)}}/>
                <View>
                    <Image source={{ uri: this.state.songs[0].pic_big }} style={{ width: "100%", height: pxToDp(200),borderRadius:pxToDp(20),marginTop:pxToDp(30) }} />
                </View>
                <View style={{height:pxToDp(40),backgroundColor:"#ccd",flexDirection:'row',justifyContent:"space-between",paddingLeft:pxToDp(10),alignItems:"center",marginTop:pxToDp(30)}} >
                    {/* <VideoScreen/>
                     */}
                    <Text style={{color:"#666"}}>为您推荐：</Text>
                </View>
                <TouchableOpacity style={{height:pxToDp(120),backgroundColor:"#eef",flexDirection:'row',justifyContent:'space-between'}}>
                    <Image source={{ uri: this.state.songs[1].pic_big }} style={{height:pxToDp(120),width:pxToDp(120)}}></Image>
                    <View style={{backgroundColor:"transparent",flexDirection:'column',paddingTop:pxToDp(30)}}>
                        <Text style={{color:'#222',fontSize:pxToDp(20)}}> Mojito </Text>
                        <Text style={{color:'#ccc',fontSize:pxToDp(16)}}> 2022.1.3 </Text>
                    </View>
                    <View style={{backgroundColor:"transparent",flexDirection:'column',paddingTop:pxToDp(30),paddingRight:pxToDp(30),alignItems:"center"}}>
                        <Svg width="40" height="40" fill ="#ff8866"  svgXmlData={heart} />
                        <Text >102.6k</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{height:pxToDp(120),backgroundColor:"#eef",flexDirection:'row',justifyContent:'space-between'}}>
                    <Image source={{ uri: this.state.songs[2].pic_big }} style={{height:pxToDp(120),width:pxToDp(120)}}></Image>
                    <View style={{backgroundColor:"transparent",flexDirection:'column',paddingTop:pxToDp(30)}}>
                        <Text style={{color:'#222',fontSize:pxToDp(20)}}> LoveStory </Text>
                        <Text style={{color:'#ccc',fontSize:pxToDp(16)}}> 2022.3.23 </Text>
                    </View>
                    <View style={{backgroundColor:"transparent",flexDirection:'column',paddingTop:pxToDp(30),paddingRight:pxToDp(30),alignItems:"center"}}>
                        <Svg width="40" height="40" fill ="#ff8866"  svgXmlData={heart} />
                        <Text >92.6k</Text>
                    </View>
                </TouchableOpacity>
			</View>
		);
	}
}

export default Index; 

const styles= StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"column",
        backgroundColor: "#ddddee"
    },
});