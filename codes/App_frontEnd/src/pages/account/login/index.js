import React,{Component} from 'react';

import {View,Text,Image,StatusBar,StyleSheet} from 'react-native';
import { color } from 'react-native-reanimated';
import {pxToDp} from "../../../utils/stylesKits";
import validator from "../../../utils/validator";

import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';

import Button  from "../../../components/Button";
import Toast from "../../../utils/Toast";
import {CodeField,Cursor} from 'react-native-confirmation-code-field';


// console.log("调试");
class Index extends Component{

    state ={
        //手机号
        phoneNumber:"15600000000",
        //是否合法
        phoneValid:true,
        //是否显示登录页面
        showLogin:true,
        //验证码输入值
        codeText:"",
        //倒计时文本显示
        btmText:"重新获取",
        //正在倒计时
        isCounting:false,
        //是新用户吗
        isNew: true
    }
    constructor (){
        super();
        Toast.showLoading("请求中");

        setTimeout(() => {
            Toast.hideLoading();
        }, 1000);
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
            //开始倒计时
            this.setState({isCounting:true});
            this.countDown();

        // }else{

        // }

    }

    //开始倒计时
    countDown=()=>{
        this.setState({isCounting: true });
        let seconds = 5;
        this.setState({ btnText: `重新获取（${seconds}s）` });
        let timeId = setInterval(() =>{
            seconds --;
            this.setState({ btnText: `重新获取（${seconds}s）` });
            if (seconds ===0){
                clearInterval(timeId);
                this.setState({ btnText:"重新获取",isCounting: false });
            }
        },1000);
    }

    //提交验证码后进入主界面
    enterMainPage=()=>{
        /*
        1.验证码长度合法
        2.手机号和验证码一起发送到后台
        3.后台返回 包含是否新用户
            1.新用户 跳转 填写个人信息
            2.老用户 跳转 首页
        */
        const { codeText, phoneNumber, isNew} =this.state;
        if (codeText.length!=6) {
            Toast.message("验证码错误",2000,"center");
            return;
        }
        if (!isNew){
            this.props.navigation.navigate("Tabbar");
        }
        else{
            this.props.navigation.navigate("Tabbar");
        }
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
        const {phoneNumber,phoneValid,showLogin, codeText,btnText,isCounting} =this.state;
        return <View>
            <View><Text style={{fontSize:pxToDp(30),color:"#666",fontWeight:"bold"}}>请输入6位验证码</Text></View>
            <View style={{marginTop:pxToDp(20)}}><Text style={{color:"#777"}}>已发送至：+86 {phoneNumber}</Text></View>

            <View>
                <CodeField
                // value:初始值
                value={codeText}
                onChangeText={this.onCodeChangeText}
                cellCount={6}
                rootStyle={styles.codeFieldRoot}
                //数字键盘
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
                />
            </View>

            <View style={{marginTop:pxToDp(30)}}>
                <Button onPress={this.phoneNumberSubmitEditing} style={{width:"80%",alignSelf:"center",height:pxToDp(40),borderRadius:pxToDp(20)}}>{btnText}</Button>
            </View>
            <View style={{marginTop:pxToDp(30)}}>
                <Button onPress={this.enterMainPage} style={{width:"80%",alignSelf:"center",height:pxToDp(40),borderRadius:pxToDp(20)}}>提交</Button>
            </View>
        </View>
    }

    //验证码输入改变
    onCodeChangeText=(codeText)=>{
        this.setState({codeText});
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
                <Image style={{width:"100%",height:200}} source={require("../../../images/background2.jpg")}></Image>
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

const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
      width: 40,
      height: 40,
      lineHeight: 38,
      fontSize: 24,
      borderBottomWidth: 3,
      borderColor: '#00000030',
      textAlign: 'center',
      color: '#F33'
    },
  //   选中之后的效果
    focusCell: {
      borderColor: '#F33',
    },
  });


export default Index;
