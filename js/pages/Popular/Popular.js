/**
 * Created by fangyukui on 2018/3/11.
 */

import React,{Component,PureComponent} from 'react'
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
import RepositoryCell from '../../Cell/RepositoryCell'
import DataRepository , {FLAG_STORAGE} from '../../expand/dao/DataRepository'
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import Utils from '../../util/Utils'
var dataRepository = new DataRepository(FLAG_STORAGE.flag_popular)
const Url = 'https://api.github.com/search/repositories?q='
const Query = '&sort=stars'

export default class Popular extends Component{
    constructor(props){
        super(props)
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
        this.state = {
            languages:[]

        }
    }
    componentDidMount() {
        this._loadLanguage()
    }
    _loadLanguage(){
        this.languageDao.fetch()
            .then(result=>{
                console.log(result)
                this.setState({
                    languages:result
                })
            })
            .catch(error=>{

            })
    }

    render(){
        if (this.state.languages.length === 0) return null
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    renderTabBar={()=><ScrollableTabBar/>}
                    tabBarBackgroundColor="#2196F3"
                    tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
                    tabBarActiveTextColor="red"
                    tabBarInactiveTextColor="white"
                >
                    {
                        this.state.languages.map((result,i,arr)=>{
                            let lan = arr[i]
                            return lan.checked==true ? <TabVC key={i} tabLabel={lan.name}>{lan.name}</TabVC>: null
                        })
                    }

                </ScrollableTabView>
            </View>

        )
    }

}

class TabVC extends Component{
    constructor(props){
        super(props)

        this.state = {
            result:[],
            isLoading:false
        }
    }
    render(){
        return (
            <View style={styles.container}>
                <FlatList
                    data={ this.state.result }
                    keyExtractor={ this._keyExtractor }
                    renderItem={ this._renderItem }
                    onEndReachedThreshold={0.1}
                    onEndReached={ this._onEndReached }
                    refreshing={this.state.isLoading}
                    onRefresh = {()=>{
                        this._loadData()
                    }}
                />

            </View>
        )

    }
    componentDidMount() {
        this._loadData()

    }

    _keyExtractor = (item, index) => index;

    // 加载item布局
    _renderItem = ({item}) =>{
        return(
            <RepositoryCell item={item}/>

        );
    }

    _onEndReached = () => {

    }
    _loadData(){
        this.setState({
            isLoading:true
        })
        let url = this.getUrl(this.props.tabLabel)
        dataRepository
            .fetchRepository(url)
            .then(result=> {
                let res = result && result.items ? result.items : result ? result : [];
                this.setState({
                    result: res,
                    isLoading:false
                })

                if (result && result.update_date && !Utils.checkDate(result.update_date)){
                    DeviceEventEmitter.emit('ACTION_HOME','showToast',{'text':'数据过期'})
                    return dataRepository.fetchNetRepository(url)
                }else {
                    DeviceEventEmitter.emit('ACTION_HOME','showToast',{'text':'显示本地数据'})
                }
            })
            .then((items)=> {
                if (!items || items.length === 0)return;
                DeviceEventEmitter.emit('ACTION_HOME','showToast',{'text':'显示网络数据'})
                this.setState({
                    result: items,
                    isLoading:false

                })

            })
            .catch(error=> {
                console.log(error);
                this.setState({
                    isLoading:true
                })
            })

    }
    getUrl(key){
        return Url + key + Query
    }
}



const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    itemContainer:{

    }

})
