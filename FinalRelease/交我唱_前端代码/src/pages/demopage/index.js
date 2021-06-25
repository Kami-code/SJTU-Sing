import React, { Component } from 'react';
import { Shape, Surface, Path, Text as TextArt, Group } from '@react-native-community/art';
import { View, Text, Dimensions } from 'react-native';
import { pxToDp } from '../../utils/stylesKits';
import { Button } from 'react-native';

import {DatePicker} from "react-native-common-date-picker";

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
            if (this.state.pause) return;
            this.getNewRandom()//自动刷新
        },100);
    }
    state = {
        width: 1000,
        height: 80,
        shapeList: [],
        ran: [60,60,60,60,60,60],
        barNum :6,
        pause: false,
    };

    getNewRandom=()=>{
        let r =  randomNum(50,300) ;
        var nextr =[];
        var newList =[];
        for(let i=0;i< this.state.barNum;i++){
            nextr.push(randomNum(0,200));
            let rect = new Path()
                .moveTo(20+i*50, DEVICE_WIDTH / 2)
                .lineTo(60+i*50, DEVICE_WIDTH / 2)
                .lineTo(60+i*50, DEVICE_WIDTH / 2 - this.state.ran[i])
                .lineTo(20+i*50, DEVICE_WIDTH / 2 - this.state.ran[i])
                .close();
            newList.push(rect);
        }
        this.setState({
            ran: nextr,
            shapeList: newList
        })
        // console.log(this.state.ran);
    }

    changePause =()=>{
        console.log("pressed")
        let tmp = this.state.pause
        this.setState({
            pause : !tmp
        })
    }

    fetchTest =()=>{
        const txt = this.state.txt;
        let name = 'mike'
        let formData = new FormData;
        formData.append('username',name)
        console.log(`http://${global.IP}/production`)
        fetch(`http://${global.IP}/production`, 
        {
            method: 'POST',
            headers: {
            },
            body: formData,
            timeout: 5000 // 5s超时
        }
        )
            .then(response =>{ 
                // response.json;
                console.log("get response");
                console.log(response);
                return (response.json());
            // console.log(response);
            })
            .then((json)=>{
                console.log(json[0])
            })
            .catch((error) => {
                console.log(error)
        })
        console.log("fetch end");
    }

    render(){
        const {width, height, barNum} = this.state;
        let zhixian_path = new Path()
            .moveTo(0,5) // 改变起点为 0,5 。默认为0,0
            .lineTo(this.state.ran,5); // 目标点
        
        return(
                <View style={{justifyContent:'center',alignContent:'center',backgroundColor:"transparent",alignItems:'center',flex:1}}>
                    {/* <Text> hello </Text> */}
                    
                    
                    <Surface width="90%" height={pxToDp(300)} style={{backgroundColor: 'transparent', marginTop: 10}}>
                        <Group>
                            {this.state.shapeList.map((item,index)=>{
                                return (
                                    <Shape d={item} stroke="#000000" strokeWidth={1} fill="#9999ffaa"  key={index}/>
                                );
                                })
                            }
                            {/* <Shape d={rectPath_0} stroke="#000000" strokeWidth={1} fill="#9999ffaa"/>
                            <Shape d={rectPath_1} stroke="#000000" strokeWidth={1} fill="#9999ffaa"/> */}
                            {/* <Shape d={zhixian_path} stroke="#000000" strokeWidth={1} /> */}
                        </Group>
                    </Surface>
                    <Button title="暂停" onPress={this.fetchTest}> </Button>
                    <DatePicker
                        confirm={date => {
                            console.warn(date)
                        }}
                        minDate="1950-1-1"
                    />
                </View>
            
        );
    }
    
}