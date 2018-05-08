/**
 * Created by fangyukui on 2018/3/3.
 */





import React,{Component} from 'react';

import {View, StyleSheet, Text} from 'react-native';

export default class Message extends Component {

    render() {
        return(
            <View style={styles.containers}>
                <Text>Message</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    }
});