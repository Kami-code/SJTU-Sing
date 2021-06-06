import React, { Component } from "react";
import { StyleSheet, AppRegistry, View, Text } from 'react-native';
import Loading from './Loading';
import Ready from "./Ready";
const originRegister = AppRegistry.registerComponent;
AppRegistry.registerComponent = (appKey, component) => {
    return originRegister(appKey, function () {
        const OriginAppComponent = component();
        return class extends Component {
            render() {
                return (
                    <View style={styles.container}>
                        {/* 这个一定要放在最上面 */}
                        <OriginAppComponent />
                        <Ready></Ready>
                        <Loading></Loading>
                        {/* //加载动画 */}
                        
                    </View>
                );
            };
        };
    });
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
});