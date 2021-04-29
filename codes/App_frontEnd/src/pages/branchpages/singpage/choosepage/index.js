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

import { ScrollView } from 'react-native-gesture-handler';
import {NavigationContext} from "@react-navigation/native";

import SongList from './components/SongList';

class Index extends Component {
    static contextType = NavigationContext;
    constructor(props) {
        super(props);
        this.state={
            txt: "",
            songs: SONGS,
            pic_big: '', 
            my_id: 666,
            showSearchResult: false
        }
    }

    chosen(id) {
        this.setState({my_id:id});
    }
    
    onSearch(){
        // this.setState({
        //     showSearchResult: true
        // }
        // )
    }

    renderChoosePage=()=>{
        return(
			<View style={styles.container}>
                <StatusBar backgroundColor="transparent" translucent={true} ></StatusBar>
                
				<SearchInput onChangeText={txt=>this.setState({txt})} onSearch={this.onSearch()} value={this.state.txt} style={{marginTop:pxToDp(50)}}/>
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
                            <SongList song = {item}/>
                        );
                        })
                    }
                </ScrollView>
			</View>
		);
    }

    renderSearchResult=()=>{
        return(
            <View>
                <Text> 搜出来这些</Text>
            </View>
        )
    }


	render(){
		return(
			<View style={styles.container}>
                {this.state.showSearchResult ? this.renderSearchResult() : this.renderChoosePage()}
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
    button_text: {
        color:'#fffe',
        fontSize:pxToDp(16),
        borderWidth:pxToDp(1),
        borderRadius:pxToDp(15),
        borderTopColor:"#2244cc",
        backgroundColor:"#4444889a",
        margin :pxToDp(2),
        padding:pxToDp(1),

    }
});