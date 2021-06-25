import React,{Component} from 'react';
import { TouchableOpacity } from 'react-native';
import {View, Text, ImageBackground,StyleSheet,Button ,StatusBar,Image} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import TopNav from '../../../components/Topnav';
import {NavigationContext} from "@react-navigation/native";
import {pxToDp} from '../../../utils/stylesKits';
import Svg from 'react-native-svg-uri';
import {heart,svg_bubble} from '../../../res/fonts/iconSvg'

import SONGS from '../../../images/song';
import Loading from '../../../components/common/Loading';
import {NavigationActions} from 'react-navigation';
import MusicPlayer from './component/MusicPlayer';
import RNFetchBlob from 'react-native-fetch-blob';

class Index extends Component {
    static contextType = NavigationContext;
    constructor(props) {
        super(props);
        this.state={
            songs: null,
            pic_big: '', 
            cards:[],
            count:0,
            liked: false,
            showDetail: -1,
            downloadPath: '/storage/emulated/0/listen.mp3',
        }
    }
    goPage = ()=>{
        //newspage页面不足以调用
        console.log(this.props.navigation);
        // this.context = this.props.navigation
        this.context.navigate("NewsDetailPage");
    }

    refreshInfo=(id)=>{
        const url = `http://${global.IP_NEW}/record/${id}/info`;
        fetch(url,{
            method:'GET',
            headers: {},
            // body: formData,
        }).then(response =>response.json()
        ).then(data => {
            console.log(data)
            global.newsDetailCard = data;
            // console.log(this.state.songs)
            Loading.hide()
            this.context.navigate("NewsDetailPage");
            // this.context.navigate("WorksPage");
        })
        .catch((error) =>{
            alert(error)
            Loading.hide()
        })
    }

    songChosen=(card)=>{
        let id = card.id
        console.log(id)
        Loading.show();
        console.log("fetching_--")
        const url = `http://${global.IP_NEW}/record/${id}/download`;
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
                // showDetail: id
            })
            global.newsDetailSong = this.state.chosen
            global.newsDetailCard = card

            this.refreshInfo(id);

            // this.context.navigate("NewsDetailPage");

            
        }).catch((error) =>{
            // console.log(error)
            alert(error)
            console.log(error)
        })
    }

    getRandom =()=>{
        Loading.show()
        let formData = new FormData();
        formData.append("username",global.account);
        console.log("request sent");

        // const url = `http://${global.IP}/production`;
        const url = `http://${global.IP_NEW}/record/random`;
        fetch(url,{
            method:'GET',
            headers: {},
            // body: formData,
        }).then(response =>response.json()
        ).then(data => {
            console.log("In mePage in goWorkPage, receive response")
            // console.log(data)
            this.setState({
                songs:data
            })
            console.log(this.state.songs)
            Loading.hide()
            // this.context.navigate("WorksPage");
        })
        .catch((error) =>{
            alert(error)
            Loading.hide()
        })
    }

    songLike=(card)=>{
        const id = card.id
        // console.log(id);
        const url = `http://${global.IP_NEW}/record/${id}/like`;
        fetch(url,{
            method:'GET',
            headers: {},
        }).then(response =>response.json()
        ).then(data => {
            console.log(data)
            console.log("点赞成功")

            this.setState({
                // liked: true,
                song: this.state.song
            })
            // this.setState(Object.assign({}, this.state, {
            //     card: data,
            // }));


        })
        .catch((error) =>{
            alert(error)
        })
    }
    
    resetLike=()=>{
        console.log("reset like")
        this.setState({
            liked: false
        })
    }

    goDetail =(card)=>{
        console.log("goDetail?")
        this.setState({
            chosen: card.song
        })
        // this.props.navigation.navigate("NewsDetailPage");
        this.songChosen(card);
    }

    renderNews = ()=>{
        // if (this.state.songs == undefined || this.state.songs == null) return
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor="transparent" translucent={true} ></StatusBar>
                <Swiper
                    
                    cards={this.state.songs}
                    renderCard={(card) => {
                        // if (card.song == undefined || card.song == null) return
                        return (
                            <View style={styles.card}  onPress ={()=>this.goPage()}>
                                <ImageBackground 
                                    style={{flex:1}}
                                    imageStyle={{borderRadius:pxToDp(14)}}
                                    // source={require('../../../images/background3.jpg')}
                                    source={{uri: card.song.picture}}
                                    >
                                    <TouchableOpacity style={{flex:1,backgroundColor:"transparent",height:pxToDp(200)}} onPress={()=>this.goDetail(card)}>
                                        <Text style ={{fontSize:pxToDp(60),color:"#ffffff",padding:pxToDp(30)}}>{card.song.name}</Text>
                                        {/* <Text style ={{fontSize:pxToDp(24),color:"#ffffffda",padding:pxToDp(10)}}>原唱：{card.song.singer}</Text> */}
                                        {/* <Text style ={{fontSize:pxToDp(24),color:"#ffffffda",padding:pxToDp(10)}}>专辑：{card.song.album}</Text> */}
                                        {/* <Text style ={{fontSize:pxToDp(24),color:"#ffffffda",padding:pxToDp(10)}}>翻唱：{card.nickname}</Text> */}
                                    </TouchableOpacity>
                                    {/* <View style ={{flex:1,backgroundColor: "black"}}></View> */}

                                    {/* <Image source={{uri: card.song.picture}} style={{flex:1}}/> */}
                                    <View style={{backgroundColor:"transparent",borderRadius:pxToDp(14),height:pxToDp(120),flexDirection:"row"}}>
                                        <TouchableOpacity onPress={()=>{this.songLike(card);this.goDetail(card)}} style={{flex:1,backgroundColor:"#ccccffee",borderBottomLeftRadius:pxToDp(14),alignItems:"center",justifyContent:"center"}}>
                                            {this.state.liked ? <Svg width="40" height = "40"  fill ="#f00" svgXmlData={heart}/>:<Svg width="40" height = "40"  fill ="#fff" svgXmlData={heart}/>}
                                            <Text style ={{fontSize:pxToDp(24),color:"#ffffff"}}>{card.likes}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{flex:1,backgroundColor:"#ccccffee",borderBottomRightRadius:pxToDp(14),alignItems:"center",justifyContent:"center"}} onPress={()=>this.goDetail(card)}>
                                            <Svg width="50" height = "50"  fill ="#fff" svgXmlData={svg_bubble}/>
                                            <Text style ={{fontSize:pxToDp(24),color:"#ffffff"}}>{card.remark_items.length}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ImageBackground>
                            </View>
                        )
                    }}
                    onSwiped={(cardIndex) => {
                        console.log(cardIndex)
                        this.resetLike()
                    }}
                    onSwipedAll={() => {console.log('onSwipedAll')}}
                    infinite={true}
                    cardIndex={0}
                    backgroundColor={'#ddddee'}
                    stackSize= {3}>
                </Swiper>
                <View >
                        <StatusBar backgroundColor="transparent" translucent={true} ></StatusBar>
                        <ImageBackground 
                            source={require("../../../images/background_blue.jpg")}
                            style={{height:pxToDp(80),paddingTop:pxToDp(12),flexDirection:"row",alignItems:'center',justifyContent:"center"}}
                        >
                            <Text style={{color:"#fff",fontSize:pxToDp(24),fontWeight:'bold'}}> 动态 </Text>
                        </ImageBackground>
                </View>
            </View>
        );
    }

    renderDetail =()=>{
        return(
            <View style={{flex:1,backgroundColor:"#ddddffaa"}}>
                <MusicPlayer song = {this.state.chosen}/>
            </View>
        )
    }


    render () {
        if (this.state.songs == null){
            // alert("empty!")
            this.getRandom()
            return (
                <View>
                    <Text> Loading ...</Text>
                </View>
            )
        }
        else if(this.state.showDetail == -1){
            return(
                this.renderNews()
            )
        }else {
            return(
                this.renderDetail()
            )
        }
        
    }
}
 
export default Index;

const styles = StyleSheet.create({
    buttontext:{
        fontSize:pxToDp(14),
        color:"#ffffff"
    },
    button:{
        height:pxToDp(30),
        width:pxToDp(65),
        borderRadius:4,
        backgroundColor:"#3366aa",
        alignItems: 'center',
        alignContent:'center',
        justifyContent: 'center',
    },
    container: {
      flex: 1,
      flexDirection:"column",
      backgroundColor: "#ddddee"
    },
    card: {
      flex: 1,
      borderRadius: 14,
      borderWidth: 2,
      borderColor: "#E8E8E8",
      justifyContent: "center",
      backgroundColor: "white",
      marginTop: pxToDp(80),
    },
    text: {
      textAlign: "center",
      fontSize: 50,
      backgroundColor: "transparent"
    }
  });