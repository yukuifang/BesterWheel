import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    View,
    Image,
    Text,
    Alert,
    DeviceEventEmitter
} from 'react-native'
import SortableListView from 'react-native-sortable-listview'
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
import ArrayUtils from '../../util/ArrayUtils'

export default class SortKeyPage extends Component {

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
    constructor(props) {
        super(props);
        this.dataArray = [];
        this.sortResultArray = [];
        this.originalCheckedArray = [];
        this.state = {
            checkedArray: []
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            title:'排序标签',
            navigatePress:this._navigatePress,
            save:this._navigatePress
        })
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this._loadData();
    }

    _save=()=>{
        this._onBack()
    }
    _navigatePress = () => {
        this._onBack()
    }

    _loadData() {
        this.languageDao.fetch().then((data)=> {
            this.getCheckedItems(data);
        }).catch((error)=> {
            console.log(error);
        });
    }

    getCheckedItems(dataArray) {
        this.dataArray = dataArray;
        let checkedArray = [];
        for (let i = 0, j = dataArray.length; i < j; i++) {
            let data = dataArray[i];
            if (data.checked)checkedArray.push(data);
        }
        this.setState({
            checkedArray: checkedArray
        })
        this.originalCheckedArray = ArrayUtils.clone(checkedArray);
    }



    _onSave(haChecked) {
        if (!haChecked) {
            if (ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
                this.props.navigation.goBack()
                return;
            }
        }
        this._getSortResult()
        this.languageDao.save(this.sortResultArray)
        this.props.navigation.goBack()

    }
    _getSortResult() {
        this.sortResultArray = ArrayUtils.clone(this.dataArray);
        for (let i = 0, j = this.originalCheckedArray.length; i < j; i++) {
            let item = this.originalCheckedArray[i];
            let index = this.dataArray.indexOf(item);
            this.sortResultArray.splice(index, 1, this.state.checkedArray[i]);
        }
    }

    _onBack() {
        if (!ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
            Alert.alert(
                '提示',
                '是否要保存修改呢?',
                [
                    {
                        text: '否', onPress: () => {
                            this.props.navigation.goBack()
                        }
                    }, {
                    text: '是', onPress: () => {
                        this._onSave(true);
                    }
                }
                ]
            )
        } else {
            this.props.navigation.goBack()
        }
    }

    render() {
        let title = this.props.flag === FLAG_LANGUAGE.flag_language ? '语言排序' : '标签排序';

        return (

                <SortableListView
                    style={{flex:1}}
                    data={this.state.checkedArray}
                    order={Object.keys(this.state.checkedArray)}
                    onRowMoved={(e) => {
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
                        this.forceUpdate()

                    }}
                    renderRow={row => <SortCell data={row}/>}
                />

        )
    }

}

class SortCell extends Component {
    render() {
        return <TouchableHighlight
            underlayColor={'#eee'}
            style={this.props.data.checked ? styles.item : styles.hidden}
            {...this.props.sortHandlers}>
            <View style={{marginLeft: 10, flexDirection: 'row'}}>
                <Image source={require('./img/ic_sort.png')} resizeMode='stretch' style={[{
                    opacity: 1,
                    width: 16,
                    height: 16,
                    marginRight: 10,
                    tintColor:'#2196F3'
                }]}/>
                <Text>{this.props.data.name}</Text>
            </View>
        </TouchableHighlight>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2'
    },
    hidden: {
        height: 0
    },
    item: {
        backgroundColor: "#F8F8F8",
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 50,
        justifyContent: 'center'
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
})
