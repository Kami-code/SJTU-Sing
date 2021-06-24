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
class Index extends Component {
    static contextType = NavigationContext;
    constructor(props) {
        super(props);
        this.state={
            songs: null,
            pic_big: '', 
            cards:[],
            count:0,
        }
    }
    goPage = ()=>{
        //newspage页面不足以调用
        console.log(this.props.navigation);
        // this.context = this.props.navigation
        this.context.navigate("NewsDetailPage");
    }

    songChosen=(id)=>{
        const song = this.state.song
        console.log("fetching_--")
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
                showPlayer: true
            })
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
        const url = `http://${global.IP_NEW}/user/${global.account}`;
        fetch(url,{
            method:'GET',
            headers: {},
            // body: formData,
        }).then(response =>response.json()
        ).then(data => {
            console.log("In mePage in goWorkPage, receive response")
            console.log(data)
            this.setState({
                songs:data.recordList
            })
            Loading.hide()
            // this.context.navigate("WorksPage");
        })
        .catch((error) =>{
            alert(error)
            Loading.hide()
        })
    }

    songLike=()=>{
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
        })
        .catch((error) =>{
            alert(error)
        })
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
        else return(
            <View style={styles.container}>
                <StatusBar backgroundColor="transparent" translucent={true} ></StatusBar>
                <Swiper
                    cards={this.state.songs}
                    renderCard={(card) => {
                        return (
                            <View style={styles.card}  onPress ={()=>this.goPage("NewsDetailPage")}>
                                <ImageBackground 
                                    style={{flex:1}}
                                    imageStyle={{borderRadius:pxToDp(14)}}
                                    source={require('../../../images/background3.jpg')}>
                                    
                                    <Text>{card.song.name}</Text>
                                    <View style={{flex:1,backgroundColor:"#00000020"}}>
                                        <Image
                                            source={{url: card.song.picture}}
                                            style={{height:pxToDp(90),width:pxToDp(90),borderRadius:50}}
                                        />
                                    </View>
                                    <View style={{flex:1,backgroundColor:"transparent",borderRadius:pxToDp(14),marginTop:pxToDp(400),flexDirection:"row"}}>
                                        <TouchableOpacity style={{flex:1,backgroundColor:"#ccccff40",borderBottomLeftRadius:pxToDp(14),alignItems:"center",justifyContent:"center"}}>
                                            <Svg width="40" height = "40"  fill ="#fff" svgXmlData={heart}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{flex:1,backgroundColor:"#ccccff40",borderBottomRightRadius:pxToDp(14),alignItems:"center",justifyContent:"center"}}>
                                            <Svg width="50" height = "50"  fill ="#fff" svgXmlData={svg_bubble}/>
                                        </TouchableOpacity>
                                    </View>
                                </ImageBackground>
                            </View>
                        )
                    }}
                    onSwiped={(cardIndex) => {console.log(cardIndex)}}
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
      flexDirection: 'column',
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