import {Dimensions} from "react-native";

// 用来处理px到dp的单位转换问题
//屏幕的宽与高
export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;
//单位转换
export const pxToDp =(elePx)=>screenWidth * elePx / 375;
// 除以设计稿的宽度