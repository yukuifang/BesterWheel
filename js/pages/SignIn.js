/**
 * Created by fangyukui on 2018/3/3.
 */

import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';


class SignIn extends PureComponent{
    static navigationOptions = {
        header: null,
    };
    render(){
        return(
            <View style={styles.container}>

                <Button title="登录" onPress={() =>
                    this.props.navigation.navigate('Tab')}
                />
                <Button title="注册" onPress={() =>
                    this.props.navigation.navigate('SignUp')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default SignIn;


