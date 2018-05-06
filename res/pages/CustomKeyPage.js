/**
 * Created by fangyukui on 2018/3/3.
 */
import React,{Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import Toast, {DURATION} from 'react-native-easy-toast'
export default class CustomKeyPage extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({

        title: navigation.state.params?navigation.state.params.title:null,
        headerLeft:(
            <Text onPress={navigation.state.params?navigation.state.params.navigatePress:null}>
                返回
            </Text>
        )
    });

    render() {
        return(
            <View style={styles.containers}>
                <Text>CustomKeyPage</Text>
                <Toast ref="toast"/>
            </View>
        )
    }
    componentDidMount(){
        this.props.navigation.setParams({
            title:'自定义Header',
            navigatePress:this.navigatePress
        })
    }
    navigatePress = () => {
        alert('点击headerRight');
        this.refs.toast.show('hello world!')
        this.props.navigation.goBack()

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