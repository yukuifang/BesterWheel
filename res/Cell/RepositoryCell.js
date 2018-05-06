/**
 * Created by fangyukui on 2018/3/11.
 */

import React,{PureComponent} from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    FlatList,
    TouchableOpacity,
    Image
}from 'react-native'

export default class RepositoryCell extends PureComponent{
    render(){
        return (
            <View>
                <TouchableOpacity
                    onPress={this._onPress}>
                    <View style={styles.container}>
                        <Text style={{fontSize:18,color:'blue',fontWeight:'bold'}}>{this.props.item.full_name}</Text>
                        <Text style={{fontSize:13}}>{this.props.item.description}</Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text>autho: </Text>
                            <Image style={{width:35,height:35,borderRadius:17,marginRight:44}} source={{uri:this.props.item.owner.avatar_url}}/>
                            <Text>star: {this.props.item.stargazers_count}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

        )
    }

}

const styles =StyleSheet.create({
    container:{
        flexDirection:'column',
        margin:8,
        padding:10,
        borderColor:'#dddddd',
        borderWidth:0.5,
        shadowColor:'gray',
        shadowOffset:{width:0.5,height:0.5},
        shadowRadius:1,
        shadowOpacity:0.4


    }
})


