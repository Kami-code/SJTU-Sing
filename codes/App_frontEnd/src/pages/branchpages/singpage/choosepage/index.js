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

import SearchInput from '../../../../components/searchinput';
import {pxToDp} from '../../../../utils/stylesKits';
import SONGS from '../../../../images/song';

import Svg from 'react-native-svg-uri';
import {heart} from '../../../../res/fonts/iconSvg';
import { ScrollView } from 'react-native-gesture-handler';

// import {SongList} from './components/SongList';

function RenderRecommendSongs({song}){
    return (
        <TouchableOpacity style={{height:pxToDp(120),backgroundColor:"#eef",flexDirection:'row',justifyContent:'space-between'}}>
                    <Image source={{ uri: song.pic_big }} style={{height:pxToDp(120),width:pxToDp(120)}}></Image>
                    <View style={{backgroundColor:"transparent",flexDirection:'column',paddingTop:pxToDp(30)}}>
                        <Text style={{color:'#222',fontSize:pxToDp(20)}}> {song.title} </Text>
                        <Text style={{color:'#ccc',fontSize:pxToDp(16)}}> {song.date} </Text>
                    </View>
                    <View style={{backgroundColor:"transparent",flexDirection:'column',paddingTop:pxToDp(30),paddingRight:pxToDp(30),alignItems:"center"}}>
                        <Svg width="40" height="40" fill ="#ff8866"  svgXmlData={heart} />
                        <Text >{song.love}</Text>
                    </View>
        </TouchableOpacity>
    );
}

    // const SongList = (props) =>{
    //     const List = props.songs.map((song) =>{
    //         return(
    //             <RenderRecommendSongs song = {song}/>
    //         )
    //     });

    //     return (
    //         {List}
    //     );
    // }

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
                
				<SearchInput onChangeText={txt=>this.setState({txt})} value={this.state.txt} style={{marginTop:pxToDp(10)}}/>
                <View>
                    <Image source={{ uri: this.state.songs[0].pic_big }} style={{ width: "100%", height: pxToDp(200),borderRadius:pxToDp(20),marginTop:pxToDp(30) }} />
                </View>
                <View style={{height:pxToDp(40),backgroundColor:"#ccd",flexDirection:'row',justifyContent:"space-between",paddingLeft:pxToDp(10),alignItems:"center",marginTop:pxToDp(30)}} >
                    {/* <VideoScreen/>
                     */}
                    <Text style={{color:"#666"}}>猜你喜欢：</Text>
                </View>
                <ScrollView>
                    {this.state.songs.map((item)=>{
                    return (
                        <RenderRecommendSongs song = {item}/>
                    );
                    })
                }
                </ScrollView>
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