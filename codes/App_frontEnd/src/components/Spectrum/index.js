import React, { Component } from 'react';
import { Shape, Surface, Path, Text as TextArt, Group } from '@react-native-community/art';
import { View, Text, Dimensions } from 'react-native';
import { pxToDp } from '../../utils/stylesKits';
import { TouchableOpacity } from 'react-native-gesture-handler';

export let DEVICE_WIDTH = Dimensions.get('window').width;
export let DEVICE_HEIGHT = Dimensions.get('window').height;

function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 

export default class Spectrum extends Component{
    constructor(props) {
        super(props);
        setInterval(()=>{
            if (this.props.pause) return;
            this.getNewRandom()//自动刷新
        },100);
    }
    state = {
        width: 1000,
        height: 80,
        shapeList: [],
        shadowList: [],
        ran: [60,60,60,60,60,60,60,60,60,60],
        barNum :10,
        pause: this.props.pause,
    };

    switchPause = ()=>{
        let state = this.state.pause;
        this.setState({
            pause :(!state)
        })
        console.log("pause switched")
    }

    getNewRandom=()=>{
        // if (this.state.pause) {
        //     return;
        // }
        let r =  randomNum(0,150) ;
        var nextr =[];
        var newList =[];
        for(let i=0;i< this.state.barNum;i++){
            nextr.push(randomNum(0,100));
            let rect = new Path()
                .moveTo(20+i*30, 120)
                .lineTo(40+i*30, 120)
                .lineTo(40+i*30, 120 - this.state.ran[i])
                .lineTo(20+i*30, 120 - this.state.ran[i])
                .close();
            newList.push(rect);
        }
        this.setState({
            ran: nextr,
            shapeList: newList
        })
        // console.log(this.state.ran);
    }

    render(){
        const {width, height, barNum} = this.state;
        let zhixian_path = new Path()
            .moveTo(0,5) // 改变起点为 0,5 。默认为0,0
            .lineTo(this.state.ran,5); // 目标点d
        return(
            <View style={{backgroundColor:"#00000099",alignItems:'center',flex:1}}>
                
                {/* <TouchableOpacity ></TouchableOpacity> */}
                <Surface width="90%" height={pxToDp(200)} style={{backgroundColor: 'transparent', marginTop: 60}}>
                    <Group>
                        {this.state.shapeList.map((item,index)=>{
                            return (
                                <Shape d={item} stroke="#000000" strokeWidth={1} fill="#9999ff" key={index}/>
                            );
                            })
                        }
                        {/* <Shape d={rectPath_0} stroke="#000000" strokeWidth={1} fill="#9999ffaa"/>
                        <Shape d={rectPath_1} stroke="#000000" strokeWidth={1} fill="#9999ffaa"/> */}
                        {/* <Shape d={zhixian_path} stroke="#000000" strokeWidth={1} /> */}
                    </Group>
                </Surface>
                {/* <TouchableOpacity onPress ={()=>this.switchPause()} style={{backgroundColor:"black"}}> </TouchableOpacity> */}
            </View>
            
        );
    }
    
}