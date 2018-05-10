import React, {Component, PureComponent} from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    RefreshControl,
    DeviceEventEmitter
}from 'react-native'
export default class TemplateComponent extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {};
    }
    render(){
        return (
            <View style={styles.container}>hello</View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'red'
    }
})