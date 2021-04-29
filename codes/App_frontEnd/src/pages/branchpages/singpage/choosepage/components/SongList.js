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

import {pxToDp} from '../../../../../utils/stylesKits';

import Svg from 'react-native-svg-uri';
import {heart} from '../../../../../res/fonts/iconSvg';


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

const SongList = (props) =>{
    const List = props.songs.map((song) =>{
        return(
            <RenderRecommendSongs song = {song}/>
        )
    });

    return (
        {List}
    );
}

export default SongList;