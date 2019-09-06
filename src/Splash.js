import React, { Component } from 'react';
import {
    ImageBackground, Dimensions,
    BackHandler, Alert, KeyboardAvoidingView, NetInfo, ToastAndroid,
    Platform, StyleSheet, Text, View, Image, Switch, TouchableOpacity
} from 'react-native';
import { Left, Right, Toast, Button, Container, Header, Content, Card, CardItem, Body, Item, Icon, Input } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';


export default class SplasScreen extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <ImageBackground source={require('../../assets/TP_AdımızdaUlkemiz_App_640X1136px.jpg')} 
                    style={{ width=Math.round(Dimensions.get('window').width), 
                    height =Math.round(Dimensions.get('window').height)
                    }} />

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