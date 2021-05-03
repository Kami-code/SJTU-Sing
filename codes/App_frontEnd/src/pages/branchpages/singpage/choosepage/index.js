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

import SingPage from '../index';

class Index extends Component {
    static contextType = NavigationContext;
    constructor(props) {
        super(props);
        this.state={
            txt: "",
            songs: global.RECOMMEND,
            searchResult: null,
            pic_big: '', 
            my_id: 666,
            showSearchResult: false,
            showSingPage: false,
            retstatus: 0
        }
    }

    chosen(id) {
        this.setState({my_id:id});
    }
    
    onSearch= () =>{
        
        const txt = this.state.txt;
        console.log(`http://121.4.86.24:8080/search/${txt}`)
        fetch(`http://121.4.86.24:8080/search/${txt}`, 
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
                let ret = json[0].status
                this.setState({
                    retstatus: ret,
                    searchResult: JSON.stringify(json)
                })
                this.setState({
                    showSearchResult: true
                })
                // console.log(ret);
            })
            .catch((error) => {
            console.log("failed");
            alert("没有相关资源，换一个试试吧");
            return {error_code: -3, error_msg:'请求异常，请重试'}
        })
        console.log("fetch end");
    }

    onChosen= () =>{
        this.setState({
            showSearchResult: false
        })
        console.log("songChosen");
        this.context.navigate("SingPage");
        
        //选定歌曲后再次请求，得到完整数据
        // const id = 
    }

    // renderSingPage = ()=>{
    //     return(
    //         <SingPage/>
    //     )
    // }

    renderChoosePage=()=>{
        return(
			<View style={styles.container}>
                <StatusBar backgroundColor="transparent" translucent={true} ></StatusBar>
                
				<SearchInput onChangeText={txt=>this.setState({txt})} onSearch={this.onSearch} value={this.state.txt} style={{marginTop:pxToDp(50)}}/>
                <View>
                    <Image source={{ uri: this.state.songs[0].picture }} style={{ width: "100%", height: pxToDp(200),borderRadius:pxToDp(20),marginTop:pxToDp(30) }} />
                </View>
                <View style={{height:pxToDp(40),backgroundColor:"#ccd",flexDirection:'row',justifyContent:"space-between",paddingLeft:pxToDp(10),alignItems:"center",marginTop:pxToDp(30)}} >
                    {/* <VideoScreen/>
                     */}
                    <Text style={{color:"#666"}}>猜你喜欢：</Text>
                </View>
                <ScrollView>
                    {global.RECOMMEND.map((item)=>{
                        return (
                            <SongList song = {item} onChosen={this.onChosen}/>
                        );
                        })
                    }
                </ScrollView>
			</View>
		);
    }

    renderSearchResult=()=>{
        if (this.state.ret == 404) alert("没有相关资源，换一个试试吧");
        // if (this.state.ret == 404) return(<View><Text>空列表</Text></View>)
        // console.log(this.state.searchResult)
        let list =JSON.parse(this.state.searchResult);
        if (list == null || list == undefined) return(<View><Text>空列表</Text></View>)
        else{
            return(
            <View>
                {/* <Text> {list}</Text> */}
                <ScrollView>
                    {list.map((item)=>{
                        return (
                            <SongList song = {item} onChosen={this.onChosen}/>
                            // <Text>{item.id}</Text>
                        );
                        })
                    }
                </ScrollView>
            </View>
            )
        }
        
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