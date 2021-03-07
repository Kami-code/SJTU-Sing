import React,{Component} from 'react';

import {View,Text,Image,StatusBar} from 'react-native';
import { color } from 'react-native-reanimated';
import {pxToDp} from "../../../utils/stylesKits";
import validator from "../../../utils/validator";

import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';

import Button  from "../../../components/Button";

// console.log("调试");
class Index extends Component{

    state ={
        //手机号
        phoneNumber:"15600000000",
        //是否合法
        phoneValid:true,
        //是否显示登录页面
        showLogin:true,

    }
    //登录框手机号码输入,把phoneNumber弄成状态量
    phoneNumberChangeText=(phoneNumber)=>{
        this.setState({phoneNumber});
        console.log(phoneNumber);
    }

    //手机号码点击完成时触发
    phoneNumberSubmitEditing=()=>{
        console.log("点击完成")
    /*
        1. 验证手机号码合法
        2. 若通过，将号码发至后台
        3. 切换至验证码填写
    */
   
        const {phoneNumber} =this.state;
        const phoneValid = validator.validatePhone(phoneNumber);
        if(!phoneValid){
            this.setState({phoneValid});
            return;
        }

        // const res = await request.post(ACCOUNT_LOGIN, {phone:phoneNumber});
        // console.log(res);
        // if (res.code=="10000"){
        //     //请求成功
            this.setState({showLogin:false});
        // }else{

        // }

    }

    //提交验证码后进入主界面
    enterMainPage=()=>{
       this.props.navigation.navigate("MainPage");
    }

    //登陆页面渲染
    renderLogin=()=>{
        const {phoneNumber,phoneValid} =this.state;
        return <View>
        {/* title */}
        <View><Text style={{fontSize:pxToDp(30),color:"#888",fontWeight:"bold"}}>手机号登陆注册</Text></View>
        {/* input （使用ui框架：react-native-elements）*/}
        <View style={{marginTop:pxToDp(40)}}>
            <Input 
                placeholder ='请输入手机号码' 
                // maxLenth 用于限制输入长度
                maxLength= {11}
                // keyboardType 默认数字键盘，优化体验
                // value 可以设置默认值
                value ={phoneNumber}
                // inputStyle 设置打出的字体
                inputStyle={{color:"#444"}}
                // onChangeText 响应输入
                onChangeText = {this.phoneNumberChangeText}
                // errorMessage 错误提示
                errorMessage={ phoneValid ? "":"不是一个有效手机号"}
                //onSubmitEditing 用户输入完毕点击完成时触发
                onSubmitEditing={this.phoneNumberSubmitEditing}
                keyboardType="phone-pad"
                leftIcon={{type:'font-awesome', name:'phone',color:"#888", size:pxToDp(20)}}>
            </Input>
        </View>
        {/* 按钮 */}
        <View>
            <View style ={{width:"80%",height:pxToDp(40),alignSelf:"center"}}>
               <Button onPress={this.phoneNumberSubmitEditing} style={{borderRadius:pxToDp(20)}}>获取验证码</Button> 
            </View>
        </View>
    </View>
    }

    //验证码填写页面渲染
    renderCode=()=>{
        const {phoneNumber,phoneValid,showLogin} =this.state;
        return <View>
            <View><Text style={{fontSize:pxToDp(30),color:"#666",fontWeight:"bold"}}>请输入6位验证码</Text></View>
            <View style={{marginTop:pxToDp(20)}}><Text style={{color:"#777"}}>已发送至：+86 {phoneNumber}</Text></View>
            <View style={{marginTop:pxToDp(30)}}><Button style={{width:"80%",alignSelf:"center",height:pxToDp(40),borderRadius:pxToDp(20)}}>重新获取验证码（60s）</Button></View>
            <View style={{marginTop:pxToDp(30)}}>
                <Button onPress={this.enterMainPage} style={{width:"80%",alignSelf:"center",height:pxToDp(40),borderRadius:pxToDp(20)}}>提交</Button>
            </View>
        </View> 
    }
    render(){
        const {phoneNumber,phoneValid,showLogin} =this.state;
        return(
            <View>
                {/* 0.0 status 可以编辑状态栏显示，不用style，因为这是内部直接规定 */}
                    {/* transparent透明色不直接解决问题，需要translucent无视状态栏面积 */}
                <StatusBar backgroundColor="transparent" translucent={true}></StatusBar>
                {/* 0.0 status END */}

                {/* 1.0 background */}
                    {/* 图片设置中，直接用数字单位为dp 想要适配屏幕，要px -> dp转化单位 */}
                <Image style={{width:"100%",height:200}} source={require("../../../images/Trump.jpg")}></Image>
                {/* 1.0 background END */}

                {/* 2.0 content */}
                <View style={{padding:pxToDp(20)}}>
                    {/* 2.1 login */}
                    {showLogin ? this.renderLogin() : this.renderCode()}
                    {/* 2.1 login END */}
                </View>
                {/* 2.0 content END */}
            </View>
        );
    }
}
export default Index;