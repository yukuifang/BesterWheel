import React, {Component, PureComponent} from 'react'
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
export default class TemplateComponent extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            url: "https://www.baidu.com",
            status: 'No Page Loaded',
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
            scalesPageToFit: true,
        };
    }
    render(){
        return (
            <View style={styles.container}>
                <WebView
                    ref="webview"
                    automaticallyAdjustContentInsets={false}
                    style={styles.webViewStyle}
                    source={{uri: this.state.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    onNavigationStateChange={this._onNavigationStateChange}
                    onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest}
                    startInLoadingState={true}
                    scalesPageToFit={this.state.scalesPageToFit}
                />
            </View>
        )
    }
    _onShouldStartLoadWithRequest = (event) => {

        return true;
    };

    _onNavigationStateChange = (navState) => {
        this.setState({
            backButtonEnabled: navState.canGoBack,
            forwardButtonEnabled: navState.canGoForward,
            url: navState.url,
            status: navState.title,
            loading: navState.loading,
            scalesPageToFit: true
        });
    };
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'red'
    },
    webViewStyle:{
        flex:1
    }
})