/**
 * Created by fangyukui on 2018/3/3.
 */
import React,{Component} from 'react'
import {View, StyleSheet, Text ,ScrollView} from 'react-native'
import Toast, {DURATION} from 'react-native-easy-toast'
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'
export default class CustomKeyPage extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params?navigation.state.params.title:null,
        headerLeft:(
            <Text style={{marginLeft:15}} onPress={navigation.state.params?navigation.state.params.navigatePress:null}>
                返回
            </Text>
        ),
        headerRight:(
            <Text style={{marginRight:15}} onPress={navigation.state.params?navigation.state.params.save:null}>
                保存
            </Text>
        )
    });
    constructor(props){
        super(props)
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
        this.state = {
            dataArray:[]
        }
    }

    render() {
        return(
            <View style={styles.containers}>
                <ScrollView contentContainerStyle={styles.scrollStyle}>

                </ScrollView>
                <Toast ref="toast"/>
            </View>
        )
    }
    componentDidMount(){
        this.props.navigation.setParams({
            title:'自定义标签',
            navigatePress:this._navigatePress,
            save:this._save
        })
        this._loadData()
    }
    _loadData(){
        this.languageDao.fetch()
            .then(result=>{
                this.setState({
                    dataArray:result
                })
            })
            .catch(error=>{
                this.refs.toast.show(error)
            })
    }
    _renderView(){
        return (
            <Text>{JSON.stringify(this.state.dataArray)}</Text>
        )
    }
    _save(){
        alert('save');
    }
    _navigatePress = () => {
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
    },
    scrollStyle:{
        display:'flex',
        flex:1,
        backgroundColor:'red'
    }
});