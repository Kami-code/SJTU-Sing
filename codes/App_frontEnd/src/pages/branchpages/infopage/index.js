import React,{Component} from 'react';
import { View ,Text } from "react-native";
import {Input} from 'react-native-elements';
import { pxToDp } from '../../../utils/stylesKits';
import Button from '../../../components/Button';

class Index extends Component {
    state = { 
        nameValid :true,
        codeValid :true,
        repeatValid:true
    }
    nameChangeText=()=>{
        //确认昵称是否占用
    }
    nameSubmitEditing=()=>{
        //保存用户信息，有变更则提交至服务器
    }
    codeChangeText=()=>{
        //评估密码强度
    }
    codeSubmitEditing=()=>{
        //填写重复密码
    }
    repeatChangeText=()=>{
        
    }
    repeatSubmitEditing=()=>{
        //确认密码，与昵称一并提交
    }
    enterMainPage=()=>{
        //直接退回主页
        this.props.navigation.navigate("MainPage");
    }
    saveInfo=()=>{
        //保存并返回到主页
        this.props.navigation.navigate("MainPage");
    }
    render() { 
        const {nameValid,codeValid,repeatValid} = this.state;
        return (  
            
            <View style = {{backgroundColor:"#FFF", flex :1, padding:pxToDp(20)}}>
                <Text style={{fontSize:pxToDp(30),color:"#999",fontWeight:"bold"}}> 我的主页</Text>
                <Text style={{fontSize:pxToDp(20),color:"#333",fontWeight:"bold",marginTop:pxToDp(50)}}> 我的昵称：</Text>
                <Input
                    placeholder ='请输入昵称' 
                    // maxLenth 用于限制输入长度
                    maxLength = {10}
                    // keyboardType 默认数字键盘，优化体验
                    // value 可以设置默认值
                    value ={"鲍铁柱"}
                    // inputStyle 设置打出的字体
                    inputStyle={{color:"#444"}}
                    // onChangeText 响应输入
                    onChangeText = {this.nameChangeText}
                    // errorMessage 错误提示
                    errorMessage={ nameValid ? "":"含非法字符"}
                    //onSubmitEditing 用户输入完毕点击完成时触发
                    onSubmitEditing={this.nameSubmitEditing}
                    keyboardType="default"
                    // leftIcon={{type:'font-awesome', name:'phone',color:"#888", size:pxToDp(20)}}
                    >
                </Input>
                <Text style={{fontSize:pxToDp(20),color:"#333",fontWeight:"bold",marginTop:pxToDp(20)}}> 设置密码：</Text>
                <Input
                    placeholder ='请输入密码' 
                    // maxLenth 用于限制输入长度
                    maxLength = {10}
                    // keyboardType 默认数字键盘，优化体验
                    // value 可以设置默认值
                    value ={""}
                    // inputStyle 设置打出的字体
                    inputStyle={{color:"#444"}}
                    // onChangeText 响应输入
                    onChangeText = {this.codeChangeText}
                    // errorMessage 错误提示
                    errorMessage={ codeValid ? "":"密码强度过低"}
                    //onSubmitEditing 用户输入完毕点击完成时触发
                    onSubmitEditing={this.codeSubmitEditing}
                    keyboardType="default"
                    // leftIcon={{type:'font-awesome', name:'phone',color:"#888", size:pxToDp(20)}}
                    >
                </Input>
                <Text style={{fontSize:pxToDp(20),color:"#333",fontWeight:"bold",marginTop:pxToDp(20)}}> 重复密码：</Text>
                <Input
                    placeholder ='请输入密码' 
                    // maxLenth 用于限制输入长度
                    maxLength = {10}
                    // keyboardType 默认数字键盘，优化体验
                    // value 可以设置默认值
                    value ={""}
                    // inputStyle 设置打出的字体
                    inputStyle={{color:"#444"}}
                    // onChangeText 响应输入
                    onChangeText = {this.repeatChangeText}
                    // errorMessage 错误提示
                    errorMessage={ repeatValid ? "":"密码不正确"}
                    //onSubmitEditing 用户输入完毕点击完成时触发
                    onSubmitEditing={this.repeatSubmitEditing}
                    keyboardType="default"
                    // leftIcon={{type:'font-awesome', name:'phone',color:"#888", size:pxToDp(20)}}
                    >
                </Input>
                <View style={{marginTop:pxToDp(30)}}>
                    <Button onPress={this.saveInfo} style={{width:"80%",alignSelf:"center",height:pxToDp(40),borderRadius:pxToDp(20)}}>保存信息</Button>
                </View>
                <View style={{marginTop:pxToDp(30)}}>
                    <Button onPress={this.enterMainPage} style={{width:"80%",alignSelf:"center",height:pxToDp(40),borderRadius:pxToDp(20)}}>返回首页</Button>
                </View>
            </View>
        );
    }
}
 
export default Index;