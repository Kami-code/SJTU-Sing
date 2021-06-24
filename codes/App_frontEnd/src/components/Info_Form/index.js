import React, {Component} from 'react';
import { TouchableOpacity } from 'react-native';
import {View, Text, ImageBackground, StatusBar, TextInput } from 'react-native';
import {pxToDp} from '../../utils/stylesKits';
import Svg from 'react-native-svg-uri';
import {svg_search} from '../../res/fonts/iconSvg';
import TopNav from '../Topnav';
import Button from '../Button';
class Index extends Component {
    state={
        nickname:'',
        description:'',
        gender:'',
        birthday:''
    }

    // getInfo =()=>{
    //     let formData = new FormData();
    //     formData.append("username",global.account);
    //     console.log(formData);

    //     const url = `http://${global.IP}/downloadinfo`;
    //     fetch(url,{
    //     method:'POST',
    //     headers: {},
    //     body: formData,
    //     }).then(response =>response.json()
    //     ).then(data => {
    //         console.log(data)
    //         global.userinfo.nickname = data.nickname
    //         // console.log(global.userinfo.nickname);
    //         global.userinfo.birthday = data.birthday
    //         global.userinfo.gender = data.gender
    //         global.userinfo.description = data.description
    //     })
    //     .catch((error) =>{
    //         alert(error)
    //     })
    // }

    handinForm=()=>{
        console.log("handin")
        let formData = new FormData();
        formData.append("username",global.account);
        formData.append("nickname",this.state.nickname);
        if (this.state.nickname === ''){
            alert("昵称不能为空")
            return;
        }
        formData.append("gender",this.state.gender);
        if (this.state.gender === ''){
            alert("性别不能为空")
            return;
        }
        formData.append("birthday",this.state.birthday);
        if (this.state.birthday === ''){
            alert("生日不能为空")
            return;
        }
        formData.append("description",this.state.description);
        console.log(formData);

        const url = `http://${global.IP}/uploadinfo`;
        fetch(url,{
        method:'POST',
        headers: {},
        body: formData,
        }).then(response =>{
            console.log("get response from uploadinfo")
            // this.getInfo()
        }).then(data => {})
        .catch((error) =>{
        alert(error)
        })
        // alert("编辑成功")
        this.props.goBack()
    }


    render() { 
        return (  
            <View >
                <View style={{flexDirection:"row",height:pxToDp(60),borderBottomWidth:pxToDp(1),margin:pxToDp(20)}}>
                    <TextInput 
                        style={{backgroundColor:"transparent",flex:1,fontSize:pxToDp(20)}} 
                        placeholder="我的昵称"
                        onChangeText={nickname=>this.setState({nickname})}
                    />
                </View>
                <View style={{flexDirection:"row",height:pxToDp(60),borderBottomWidth:pxToDp(1),margin:pxToDp(20)}}>
                    <TextInput 
                        style={{backgroundColor:"transparent",flex:1,fontSize:pxToDp(20)}} 
                        placeholder="我的生日"
                        onChangeText={birthday=>this.setState({birthday})}
                    />
                </View>
                <View style={{flexDirection:"row",height:pxToDp(60),borderBottomWidth:pxToDp(1),margin:pxToDp(20)}}>
                    <TextInput 
                        style={{backgroundColor:"transparent",flex:1,fontSize:pxToDp(20)}} 
                        placeholder="我的性别"
                        onChangeText={gender=>this.setState({gender})}
                    />
                </View>
                <View style={{flexDirection:"row" ,height:pxToDp(60),borderBottomWidth:pxToDp(1),margin:pxToDp(20)}}>
                    <TextInput 
                        style={{backgroundColor:"transparent",flex:1,fontSize:pxToDp(20)}} 
                        placeholder="个性签名"
                        onChangeText={description=>this.setState({description})}
                    />
                </View>
                <View style ={{width:"80%",height:pxToDp(40),alignSelf:"center",marginTop:pxToDp(60)}}>
                    <Button onPress={this.handinForm} style={{borderRadius:pxToDp(20)}}>保存更改</Button>
                </View>
            </View>
        );
    }
}
 
export default Index;