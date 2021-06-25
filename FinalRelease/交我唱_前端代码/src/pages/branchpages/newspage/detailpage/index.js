import React,{Component} from 'react';
import {View, Text, ImageBackground,StyleSheet,Button ,StatusBar,ScrollView,TextInput,TouchableOpacity} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import TopNav from '../../../../components/Topnav';
import {NavigationContext} from "@react-navigation/native";
import VideoScreen from '../../../../utils/VideoPlayer';
import MusicPlayer from '../component/MusicPlayer';
import { pxToDp } from '../../../../utils/stylesKits';
import Svg from 'react-native-svg';
import {svg_search} from '../../../../res/fonts/iconSvg';
import Loading from '../../../../components/common/Loading';
class Index extends Component {
    static contextType =NavigationContext;
    state = { 
      txt:null,

    }

    onSearch =()=>{
      // alert("trying upload")
        
        const txt = this.state.txt;
        if (txt == null){
          alert("评论不能为空")
          return;
        }
        Loading.show();
        let formData = new FormData();
        formData.append("record_id",global.newsDetailCard.id);
        formData.append("remarker_name",global.account);
        formData.append("remark", txt);

        console.log(formData)
        console.log(`http://${global.IP_NEW}/record/${global.newsDetailCard.id}/remark`)
        fetch(`http://${global.IP_NEW}/record/${global.newsDetailCard.id}/remark`, 
        {
            method: 'POST',
            headers: {
            },
            body: formData,
            timeout: 5000 // 5s超时
        })
            .then(response =>{ 
                // response.json;
                console.log("get response");
                
                return (response.json());
            // console.log(response);
            })
            .then((json)=>{
                console.log(json)
                global.newsDetailCard = json
                this.setState({
                  // txt:null
                })
                Loading.hide();
                // console.log(ret);
            })
            .catch((error) => {
            console.log("failed");
            Loading.hide();
            return {error_code: -3, error_msg:'请求异常，请重试'}
        })
        console.log("fetch end");
    }

    renderRemark = ()=>{
      if (global.newsDetailCard.remark_items.length == 0){
        return (
          <View style={{padding:pxToDp(30)}}>
            <Text> 暂无评论，快来抢沙发</Text>
          </View>
        )
      }else return(
        <ScrollView style={{backgroundColor:"#9999cc66",padding:pxToDp(30),marginTop:pxToDp(20),borderRadius:pxToDp(15)}}>
          {global.newsDetailCard.remark_items.map((item,index)=>{
              return (
                <View style={{padding:pxToDp(3),borderBottomWidth:pxToDp(1),height:pxToDp(60),justifyContent:"center"}}>
                  <Text>用户{item.username}：{item.remark}</Text>
                </View>
              );
              })
          }
       </ScrollView>
      )
      
    }

    render () {
        return(
            <View style={{flex:1,backgroundColor:"#ddddffaa"}}>
              <TopNav title = "发现好声音"/>
              <View style ={{height:pxToDp(300)}}>
                <MusicPlayer song = {global.newsDetailSong}/>
              </View>
              <View style={{flex:1,flexDirection:"column",padding:pxToDp(15)}}>
                <Text style ={{fontSize:pxToDp(22)}}> 评论区 </Text>
              <View style={{flexDirection:"row" ,height:pxToDp(40),borderRadius:pxToDp(20),backgroundColor:"#fff",position:'relative',marginTop:pxToDp(10)}}>
                <TextInput 
                    style={{backgroundColor:"transparent",paddingLeft:pxToDp(40),flex:1}} 
                    placeholder="一起发现好声音"
                    value = {this.props.value}
                    onChangeText={txt=>this.setState({txt})}
                />
                <Svg width="17" height="17" fill ="#444"  svgXmlData={svg_search} style={{position:"absolute",left:pxToDp(10),top:pxToDp(10)}} />
                <TouchableOpacity 
                    style={{backgroundColor:"#2244cccc",width:pxToDp(80),borderRadius:pxToDp(30),justifyContent:"center",alignItems:"center"}}
                    onPress={this.onSearch}
                >
                    <Text style={{fontSize:17,color:"#fff"}}>发表</Text>
                </TouchableOpacity>
            </View>
                {this.renderRemark()}
              </View>
            </View>

        );
        
    }
}
 
export default Index;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:"column",
      backgroundColor: "#F5FCFF"
    },
    card: {
      flex: 1,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: "#E8E8E8",
      justifyContent: "center",
      backgroundColor: "white"
    },
    text: {
      textAlign: "center",
      fontSize: 50,
      backgroundColor: "transparent"
    }
  });