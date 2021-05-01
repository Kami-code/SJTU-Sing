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
            retstatus: null,
            searchResult: null,
        }
    }

    songChosen=()=>{
        
        console.log("songChosen");
        // this.context.navigate("SingPage");
        //搜索该歌曲完整信息
        const id = this.state.song.id;
        console.log(`http://121.4.86.24:8080/songs/${id}`)
        fetch(`http://121.4.86.24:8080/songs/${id}`, 
        {
            method: 'GET',
            headers: {
            },
            // body: "1111",
            timeout: 5000 // 5s超时
        }
        )
            .then(response =>{ 
                // response.json;
                console.log("get response");
                return (response.json());
            // console.log(response);
            })
            .then((json)=>{
                console.log(JSON.stringify(json))
                
                let ret = json.status
                this.setState({
                    retstatus: ret,
                    searchResult: JSON.stringify(json),
                    showSearchResult: true
                })
                if (this.state.retstatus == 500){
                    alert("非常抱歉，因版权问题，本歌曲不开放使用");
                }
                //填入globalsongs中
                // let mp3 = JSON.parse(this.state.searchResult).mp3;
                // console.log(mp3)
                const {song} = this.state;
                let newSong ={
                    picture: song.picture,
                    name: song.name,
                    singer: song.singer,
                    mp3: json.mp3,
                    lyric: json.lyric,
                    file_duration: 300, //等后端接口完成
                };
                global.SONGS.push(newSong);
                console.log("here here");
                console.log(global.SONGS[0].name);
                console.log(global.SONGS[1].name);
                //切换页面操作
                this.props.onChosen();
                
            })
            .catch((error) => {
            console.log("failed");
            return {error_code: -3, error_msg:'请求异常，请重试'}
        })
        console.log("fetch 2 end");
        
           

        
    }

    render(){
        const {song} = this.state;
        return (
        <View style={{height:pxToDp(80),backgroundColor:"#eef",flexDirection:'row',justifyContent:'space-between',borderTopWidth :pxToDp(1),borderTopColor:"#2244cc"}}>
            <Image source={{ uri: song.picture }} style={{height:pxToDp(80),width:pxToDp(80)}}></Image>
            <View style={{backgroundColor:"transparent",flexDirection:'column',width:"45%",justifyContent:"center"}}>
                <Text style={{color:'#222',fontSize:pxToDp(18)}}> {song.name} </Text>
                <Text style={{color:'#ccc',fontSize:pxToDp(16)}}> {song.singer} </Text>
            </View>
            <View style={{backgroundColor:"#aaaacc22",flexDirection:'column',padding:pxToDp(15), alignItems:"flex-end",justifyContent:"center"}}>
                <Text style={styles.button_text} onPress={this.songChosen}>  开始K歌 </Text>
                {/* <Text style={styles.button_text} >{song.love}</Text> */}
            </View>
        </View>
    )
    };
}

export default SongList;