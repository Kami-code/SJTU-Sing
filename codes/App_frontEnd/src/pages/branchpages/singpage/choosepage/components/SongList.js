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

import {NavigationContext} from "@react-navigation/native";
class SongList extends Component{
    static contextType = NavigationContext;
    constructor(props) {
        super(props);
        this.state={
            song: this.props.song,
        }
    }

    songChosen=()=>{
        console.log("songChosen");
        this.context.navigate("SingPage");
    }

    render(){
        const {song} = this.state;
        return (
        <View style={{height:pxToDp(80),backgroundColor:"#eef",flexDirection:'row',justifyContent:'space-between',borderTopWidth :pxToDp(1),borderTopColor:"#2244cc"}}>
            <Image source={{ uri: song.pic_big }} style={{height:pxToDp(80),width:pxToDp(80)}}></Image>
            <View style={{backgroundColor:"transparent",flexDirection:'column',width:"45%",justifyContent:"center"}}>
                <Text style={{color:'#222',fontSize:pxToDp(18)}}> {song.title} </Text>
                <Text style={{color:'#ccc',fontSize:pxToDp(16)}}> {song.date} </Text>
            </View>
            <View style={{backgroundColor:"#aaaacc22",flexDirection:'column',padding:pxToDp(15), alignItems:"flex-end"}}>
                <Text style={styles.button_text} onPress={()=>this.songChosen()}>  开始K歌 </Text>
                {/* <Text style={styles.button_text} >{song.love}</Text> */}
            </View>

        </View>
    )
    };
}

export default SongList;