/**
 * Created by fangyukui on 2018/3/3.
 */


import React,{Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'

export default class Profile extends Component {


    render() {
        const {navigate} = this.props.navigation
        return(
            <View style={styles.containers}>
                <Text>Profile</Text>
                <Text
                    onPress={()=>{
                        navigate('CustomKeyPage',{user:'666'})
                    }}
                >自定义标签</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
    }
});