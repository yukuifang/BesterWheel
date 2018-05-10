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
    DeviceEventEmitter,
    WebView
}from 'react-native'
export default class KyWebView extends PureComponent{
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
                <View style={styles.WebSeacherStyle}>
                    <Text style={{margin:15,fontSize:18,height:44,lineHeight:44}} onPress={()=>{
                        if (this.state.backButtonEnabled){
                            this.webView.goBack()
                        }else {
                            DeviceEventEmitter.emit('ACTION_HOME','showToast',{'text':'已经到顶了'})
                        }
                    }}>back</Text>
                    <TextInput style={{flex:1,backgroundColor:'white',fontSize:18,height:44}} defaultValue="https://www.youku.com" onChangeText={text=>this.inputText = text}/>
                    <Text style={{margin:15,fontSize:18,height:44,lineHeight:44}} onPress={()=>{
                        this.setState({
                            url: this.inputText
                        })
                    }}>go</Text>
                </View>
                <WebView
                    ref={webView=>this.webView = webView}
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

    },
    webViewStyle:{
        flex:1
    },
    WebSeacherStyle:{
        height:44,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }
})