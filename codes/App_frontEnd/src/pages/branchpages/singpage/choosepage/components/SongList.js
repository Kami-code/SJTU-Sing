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

class SongList extends Component{
    static contextType = NavigationContext;
    constructor(props) {
        super(props);
        this.state={
            song: this.props.song,
            retstatus: null,
            searchResult: null,
            downloadFinish: false,
            downloadPath: AudioUtils.DocumentDirectoryPath + '/download.wav',
        }
    }

    downloadAcc = ()=>{
    // 以下为下载方法（本段已废弃）
        // const id = this.state.song.id;
        // console.log("downloadACC start",`http://121.4.86.24:8080/download/flask/${id}.wav`);
        // RNFetchBlob
        // // .config({
        // //     useDownloadManager : true, 
        // //     fileCache : true,
        // //     path: this.state.downloadPath
        // // })    
        // // .
        // fetch('GET', `http://121.4.86.24:8080/download/flask/${id}.wav`, {})
        // .then((res) => {
            // console.log(res);
            // // alert("Download");
            // console.log('The file saved to ', res.path());
            // console.log('before ', this.state.downloadPath);
            // this.setState({
            //     downloadPath :res.path()
            // });
            // console.log('after ', this.state.downloadPath);
            // global.ACC.push( this.state.downloadPath);
            // console.log('On global: ', global.ACC[0]);

            // this.props.onChosen();
        // }).catch(err => err)

        // let formData = new FormData();
        // formData.append("filename","music.mp3");
    //-------------------------------------------------------------
    //以下为音频(伴奏)下载方法：
        const id = this.state.song.id;
        const url = `http://121.4.86.24:8080/download/${id}`;
        console.log(url);
        RNFetchBlob
        .config({
            useDownloadManager : true, 
            fileCache : true,
            path: this.state.downloadPath
        }).fetch('GET',url,{

        }).then((res) =>{
            console.log(res);
            alert("Download");
            console.log('The file saved to ', res.path());
            console.log('before ', this.state.downloadPath);
            this.setState({
                downloadPath :res.path()
            });
            console.log('after ', this.state.downloadPath);
            global.ACC.push( this.state.downloadPath);
            console.log('On global: ', global.ACC[0]);
            this.props.onChosen();
        //   response.json();
        //   console.log("1111");
          // this.setState({responseInformation: response.json});
        }).catch((error) =>{
            // console.log(error)
            // alert(error)
        })
    //-------------------------------------------------------------------
    //以下为音频上传方法
        // let params = {
        //     path: global.ACC[0] // 根据自己项目修改参数哈
        //   }
        //   //console.log("1111");
        //   console.log(this.state.audioFile);
        //   let {path} = params;
        //   let formData = new FormData();
        //   let soundPath = `file://${path}` ;  // 注意需要增加前缀 `file://`
        //   console.log(soundPath);
        //   let fileName = path.substring(path.lastIndexOf('/') + 1, path.length) // 文件名，应后端要求进行修改
        //   console.log("Filename: "+ fileName);
        //   let file = { uri: soundPath , type: "multipart/form-data", name: fileName} // 注意 `uri` 表示文件地址，`type` 表示接口接收的类型，一般为这个，跟后端确认一下
        //   formData.append('file',file);
      
        //   fetch('http://121.4.86.24:8080/upload', 
        //     {
        //       method: 'POST',
        //       body:formData,
        //       // body: "1111",
        //       timeout: 5000 // 5s超时
        //     }
        //   )
        //       .then(response =>{ 
        //         response.json();
        //         console.log("get response");
        //         // console.log(response.contentLength());
        //         // console.log('');
        //       })
        //       .then(formData => formData)
        //       .catch(error => {
        //         console.log("failed");
        //           return {error_code: -3, error_msg:'请求异常，请重试'}
        //   })
        //   console.log("fetch end");
    }

    getAcc = ()=>{
        const id = this.state.song.id;
        console.log("download start",`http://121.4.86.24:8080/flask/${id}`);
        fetch(`http://121.4.86.24:8080/flask/${id}`, {
            method: 'GET',
            timeout: 10000,
        })
        .then(response =>{ 
            // response.json;
            console.log("request status: ", response);
            this.downloadAcc();
        // console.log(response);
        })
        .catch((error) => {
            console.log("failed: ",error);
            return {error_code: -3, error_msg:'请求异常，请重试'}
        })
        console.log("fetch finish");
        
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
                    id: song.id,
                    picture: song.picture,
                    name: song.name,
                    singer: song.singer,
                    mp3: json.mp3,
                    lyric: json.lyric,
                    file_duration: json.length, //时长已完成
                };
                global.SONGS.push(newSong);
                console.log("here here");
                console.log(global.SONGS[0].name);
                console.log(global.SONGS[1].name);
                //切换页面操作
                this.getAcc();
                // this.props.onChosen();
                
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