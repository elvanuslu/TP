import React, { Component } from 'react';
import {
    ImageBackground, Dimensions,
    BackHandler, Alert, KeyboardAvoidingView, NetInfo, ToastAndroid,
    Platform, StyleSheet, Text, View, Image, Switch, TouchableOpacity
} from 'react-native';
import { Button,Container, } from 'native-base';




export default class SplasScreen extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount(){
      
       
    }
    _handleGo = () => {
        setTimeout(() => {
            return (
                this.props.navigation.navigate("login")
            )
        }, 5000)
    }
    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <ImageBackground source={require('../assets/TPSplash.jpg')}
                        style={{ 
                            width: "100%",
                            height: "100%",
                        }} />
                    {
                        this._handleGo()

                    }

                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})