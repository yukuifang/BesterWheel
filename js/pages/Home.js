/**
 * Created by fangyukui on 2018/3/3.
 */

/**
 * Created by fangyukui on 2018/3/3.
 */


import React,{ PureComponent } from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet,Image} from 'react-native';

export default class Home extends PureComponent {
    // 配置页面导航选项
    static navigationOptions = ({navigation}) => (
        console.log(navigation),
        {
        title: 'HOME',
        titleStyle: {color: '#ff00ff'},
        headerStyle:{backgroundColor:'#000000'}
    });

    // 数据容器，用来存储数据
    dataContainer = [];
    constructor(props) {
        super(props);
        this.state = {
            // 存储数据的状态
            sourceData : [],
            selected: (new Map(): Map<String, boolean>),
            refreshing: false
        }
    }
    render() {
        return(
            <FlatList
                data={ this.state.sourceData }
                // 实现PureComponent时使用
                extraData={ this.state.selected }
                keyExtractor={ this._keyExtractor }
                renderItem={ this._renderItem }
                // 决定当距离内容最底部还有多远时触发onEndReached回调；数值范围0~1，例如：0.5表示可见布局的最底端距离content最底端等于可见布局一半高度的时候调用该回调
                onEndReachedThreshold={0.1}
                // 当列表被滚动到距离内容最底部不足onEndReacchedThreshold设置的距离时调用
                onEndReached={ this._onEndReached }
                ListHeaderComponent={ this._renderHeader }
                ListFooterComponent={ this._renderFooter }
                ItemSeparatorComponent={ this._renderItemSeparatorComponent }
                ListEmptyComponent={ this._renderEmptyView }
                refreshing={ this.state.refreshing }
                onRefresh={ this._renderRefresh }
                // 是一个可选的优化，用于避免动态测量内容，+1是加上分割线的高度
                getItemLayout={(data, index) => ( { length: 40, offset: (40 + 1) * index, index } )}
            />
        );
    }
    // 当视图全部渲染完毕之后执行该生命周期方法
    componentDidMount() {
        // 创造模拟数据
        for (let i = 0; i < 10; i ++) {
            let obj = {
                id: i
                ,title: i + '只柯基'
            };
            //  将模拟数据存入数据容器中
            this.dataContainer.push(obj);
        }
        // 将存储的数据赋予状态并更新页面
        this.setState({
            sourceData: this.dataContainer
        });
    }
    // 这里指定使用数组下标作为唯一索引
    _keyExtractor = (item, index) => index;

    // 加载item布局
    _renderItem = ({item}) =>{
        return(
            <FlatListItem
                id={item.id}
                onPressItem={ this._onPressItem }
                selected={ !!this.state.selected.get(item.id) }
                title={ item.title }
            />
        );
    };
    // Header布局
    _renderHeader = () => (
        <View><Text>Header</Text></View>
    );

    // Footer布局
    _renderFooter = () => (
        <View><Text>Footer</Text></View>
    );
    // 空布局
    _renderEmptyView = () => (
        <View><Text>EmptyView</Text></View>
    );
    // 自定义分割线
    _renderItemSeparatorComponent = ({highlighted}) => (
        <View style={{ height:0.5, backgroundColor:'gray' }}></View>
    );
    // 下拉刷新
    _renderRefresh = () => {
        this.setState({refreshing: true}) // 开始刷新
        // 这里模拟请求网络，拿到数据，3s后停止刷新
        setTimeout(() => {
            // TODO 提示没有可刷新的内容！
            this.setState({refreshing: false});
        }, 3000);
    };
    // 上拉加载更多
    _onEndReached = () => {
        // 以下是制造新数据
        let newData = [];
        let beginCount = this.state.sourceData.length;
        for (let i = beginCount; i < beginCount+30; i ++) {
            let obj = {
                id: i
                ,title: i + '生了只小柯基'
            };

            newData.push(obj);
        }

        // 将新数据添加到数据容器中
        this.dataContainer = this.dataContainer.concat(newData);
        // 将新数据集合赋予数据状态并更新页面
        this.setState({
            sourceData: this.dataContainer
        });
    };



    _onPressItem = (id) => {
        console.log(id)
        this.setState((state) => {
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id));
            return {selected}
        });
    };



}

// 封装Item组件
class FlatListItem extends PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        return(
            <TouchableOpacity

                onPress={this._onPress}

            >
                <View style={styles.itemContainer}>
                    <Image style={styles.itemImage} source={require('../images/wode.jpg')}></Image>
                    <Text style={styles.itemText}>{this.props.title}</Text>
                </View>

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    itemImage:{
       width:80,
        height:80,
        margin:8,
    },
    itemText:{
       fontSize:15

    }

});
