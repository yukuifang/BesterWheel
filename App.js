/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View ,Image,Button,TouchableOpacity} from 'react-native'
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation'
import Home from './js/pages/Home'
import Nearby from './js/pages/Nearby'
import Message from './js/pages/Message'
import Profile from './js/pages/Profile/Profile'
import SignIn from './js/pages/SignIn'
import Popular from './js/pages/Popular'
import CustomKeyPage from './js/pages/Profile/CustomKeyPage'
import SortKeyPage from './js/pages/Profile/SortKeyPage'
import TestComponent from  './Test'


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
        }

    }
);

export default class App extends Component {
    render() {
        return (
            <Navigator/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon:{
        width:20,
        height:20
    }
});
