/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {Platform, StyleSheet, Text, View, Image, Button, TouchableOpacity, DeviceEventEmitter} from 'react-native'
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation'
import Home from './js/pages/Home'
import Nearby from './js/pages/Nearby'
import Message from './js/pages/Message'
import Profile from './js/pages/Profile/Profile'
import SignIn from './js/pages/SignIn'
import Popular from './js/pages/Popular/Popular'
import CustomKeyPage from './js/pages/Profile/CustomKeyPage'
import SortKeyPage from './js/pages/Profile/SortKeyPage'
import KyWebView from './js/pages/Popular/KyWebView'
import Toast,{DURATION} from 'react-native-easy-toast'
import TestComponent from  './Test'

export const ACTION_HOME={A_SHOW_TOAST:'showToast',A_RESTART:'restart',A_THEME:'theme'};
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
type Props = {};

const Tab = TabNavigator(
    {
        Home:{
            screen: Home,
            navigationOptions: ({ navigation }) => ({

                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require("./js/images/wode.jpg")}
                        style={styles.icon}
                    />
                ),
            }),
        },
        Nearby:{
            screen: Popular,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: 'Popular',
                headerTitle:'Popular',
                headerStyle:{backgroundColor:'#2196F3'},
                shadowOpacity:0,
                headerTintColor:"white",
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require("./js/images/wode.jpg")}
                        style={styles.icon}
                    />
                ),
            }),
        },
        Message:{
            screen: Message,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: 'Message',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require('./js/images/wode.jpg')}
                        style={ styles.icon}
                    />
                ),
            }),
        },
        Profile:{
            screen: Profile,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: 'Profile',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require("./js/images/wode.jpg")}
                        style={styles.icon}
                    />
                ),
            }),
        },
    },
    {
        tabBarComponent:TabBarBottom,
        tabBarPosition:'bottom',
        swipeEnabled:false,
        animationEnabled:false,
        lazy:true,
        tabBarOptions:{
            activeTintColor:'#06c1ae',
            inactiveTintColor:'#979797',
            style:{backgroundColor:'#ffffff',},
            labelStyle: {
                fontSize: 10, // 文字大小
            },
        }

    },
);

const Navigator = StackNavigator(
    {
        Tab: {
            screen: Tab,
        },
        CustomKeyPage: {
            screen: CustomKeyPage
        },
        SortKeyPage: {
            screen: SortKeyPage
        },
        KyWebView:{
            screen:KyWebView
        }

    }
);

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Navigator/>
                <Toast ref={(toast)=>this.toast=toast}/>
            </View>

        );
    }
    componentDidMount(){

        this.listener = DeviceEventEmitter.addListener('ACTION_HOME',
            (action,params) => {

                this._onAction(action,params)
            })

    }
    componentWillUnmount(){

        if (this.listener) {
            this.listener.remove();
        }
    }
    _onAction(action,params){
        if(ACTION_HOME.A_RESTART===action){

        }else if(ACTION_HOME.A_SHOW_TOAST===action){
            this.toast.show(params.text,DURATION.LENGTH_LONG);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    icon:{
        width:20,
        height:20
    }
});
