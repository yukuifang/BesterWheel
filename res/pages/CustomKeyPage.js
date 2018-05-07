/**
 * Created by fangyukui on 2018/3/3.
 */
import React,{Component} from 'react'
import {View, StyleSheet, Text ,ScrollView} from 'react-native'
import Toast, {DURATION} from 'react-native-easy-toast'
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'
import CheckBox from 'react-native-check-box'
import ArrayUtils from '../util/ArrayUtils'
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
        this.changeValues = []
        this.state = {
            dataArray:[]
        }
    }

    render() {
        return(
            <View style={styles.containers}>
                <ScrollView contentContainerStyle={styles.scrollStyle}>
                    {this._renderView()}

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

        if (!this.state.dataArray || this.state.dataArray.length === 0) return null
        var views=[]
        let len = this.state.dataArray.length
        for (let i=0;i<len-1;i+=2){
            views.push(
                <View key={i} style={styles.item}>
                    {this._renderCheckBox(this.state.dataArray[i])}
                    {this._renderCheckBox(this.state.dataArray[i+1])}
                    <View style={{position:'absolute',left:10,right:10,bottom:-10, height:1,backgroundColor:'gray'}}/>
                </View>
            )
        }
        return views;
    }
    _renderCheckBox(data){
        return (
            <CheckBox
                style={{flex:1,margin:10}}
                leftText={data.name}
                isChecked={data.checked}
                onClick={()=>this._checkClick(data)}
            ></CheckBox>
        )
    }
    _checkClick(data){
        data.checked = !data.checked
        ArrayUtils.updateArray(this.changeValues,data)

    }
    _save=()=>{
        if (this.changeValues && this.changeValues.length > 0 ){
            this.languageDao.save(this.state.dataArray)
        }
        this.props.navigation.goBack()


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
        flex:1,
        width:375,
        backgroundColor:'white'
    },
    item:{
        flexDirection:'row',
        justifyContent:'center'
    }
});