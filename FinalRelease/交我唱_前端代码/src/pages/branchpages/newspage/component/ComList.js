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
import RNFetchBlob from 'react-native-fetch-blob';
import {NavigationContext} from "@react-navigation/native";
import {AudioRecorder, AudioUtils} from 'react-native-audio';

import Loading from "../../../../../components/common/Loading"
import "../../../../../components/common/RootView"
import {decodeToWav} from "../../../../../utils/audio-api"

import Svg from "react-native-svg-uri";
import {heart,origin,listener} from '../../../../../res/fonts/iconSvg';

import MusicPlayer from '../components/MusicPlayer';
import Video from 'react-native-video';
import Sound from 'react-native-sound';

class SongList extends Component{
    static contextType = NavigationContext;
    constructor(props) {
        super(props);
        this.state={
            song: this.props.song,
            retstatus: null,
            searchResult: null,
            downloadFinish: false,
            // downloadPath: AudioUtils.DocumentDirectoryPath + '/listen.mp3',
            downloadPath: '/storage/emulated/0/listen.mp3',
            showPlayer:false
        }
    }

    songLike=()=>{
        Loading.show();
        const url = `http://${global.IP_NEW}/record/${this.state.song.id}/like`;
        fetch(url,{
            method:'GET',
            headers: {},
        }).then(response =>response.json()
        ).then(data => {
            // console.log(data)
            console.log("点赞成功")
            let SONG = this.state.song
            SONG.likes = data.likes
            this.setState({
                song:SONG
            })
            Loading.hide()
        })
        .catch((error) =>{
            Loading.hide()
            alert(error)
        })
    }


    mutePlay=()=>{
        
        global.mutePlay = true
        this.setState({
            showPlayer: !global.mutePlay
        })
    }

    songChosen=()=>{

        // this.mutePlay()
        Loading.show();
        global.workSong = this.state.song

        const song = this.state.song
        console.log("fetching_--")
        let formData = new FormData();
        formData.append("username",global.account)
        formData.append("songid",song.songid)
        formData.append("number",song.number)
        console.log(JSON.stringify(formData))
        // /record/{recordid}/download
        // const url = `http://${global.IP}/downloadproduct/${song.productid}`;
        const url = `http://${global.IP_NEW}/record/${song.id}/download`;
        console.log(url);
        RNFetchBlob
        .config({
            useDownloadManager : true, 
            fileCache : true,
            path: this.state.downloadPath
        }).fetch('GET',url,{
        }).then(async(res) =>{
            console.log(res);
            // alert("Download");
            console.log('The file saved to ', res.path());
            console.log('before ', this.state.downloadPath);
            this.setState({
                downloadPath :res.path()
            });
            console.log('after ', this.state.downloadPath);
            global.listen =  this.state.downloadPath;
            Loading.hide();
            this.setState({
                // showPlayer: true
            })
            this.context.navigate("ShowPage");
        }).catch((error) =>{
            // console.log(error)
            Loading.hide();
            alert(error)
            console.log(error)
        })
    }

    renderPlayer=()=>{
        return(
            <View>
                <View>
                    {/* <Video
                        // source={{ uri: this.state.file_link }}   // Can be a URL or a local file.
                        source = {{uri:`file:///${global.listen}`}}
                        rate={1.0}                     // 0 is paused, 1 is normal.
                        volume={1.0}                   // 0 is muted, 1 is normal.
                    /> */}
                    <MusicPlayer song ={this.state.song}/>
                </View>
            </View>
        )
    }

    renderList=()=>{
        const {song} = this.state;
        return (
            <View key={song.name} style={{height:pxToDp(80),backgroundColor:"#eef",flexDirection:'row',justifyContent:'space-between',borderTopWidth :pxToDp(1),borderTopColor:"#2244cc"}}>
                <Image source={{ uri: song.song.picture }} style={{height:pxToDp(80),width:pxToDp(80)}}></Image>
                <View style={{backgroundColor:"transparent",flexDirection:'column',width:"45%",justifyContent:"center"}}>
                    <Text style={{color:'#222',fontSize:pxToDp(18)}}> {song.song.name} </Text>
                    <Text style={{color:'#ccc',fontSize:pxToDp(16)}}> {song.song.singer} </Text>
                </View>
                <View style={{backgroundColor:"#aaaacc22",flexDirection:'row', alignItems:"flex-end",justifyContent:"center"}}>
                    {/* <Text style={styles.button_text} onPress={this.songChosen}>  点击播放 </Text> */}

                    <TouchableOpacity onPress={this.songLike} style={{backgroundColor:"transparent",flexDirection:'column',alignItems:"center",alignSelf:"center",width:pxToDp(60)}}>
                        <Svg width="25" height="25" fill ="#fff"  svgXmlData={heart} />
                        <Text >{song.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.songChosen} style={{backgroundColor:"transparent",flexDirection:'column',alignItems:"center",alignSelf:"center",width:pxToDp(60)}}>
                        <Svg width="25" height="25" fill ="#fff"  svgXmlData={listener} />
                        <Text >播放</Text>
                    </TouchableOpacity>
                    {/* <Text style={styles.button_text} >{song.love}</Text> */}
                </View>
            </View>
        )
    }

    render(){
        return(
            <View>
                {this.renderList()}
            </View>
        )
    };
}

export default SongList;