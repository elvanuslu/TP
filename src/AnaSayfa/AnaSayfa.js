
import React, { Component } from 'react';
import { Dimensions, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
<<<<<<< HEAD
import Carousel from 'react-native-carousel-view';
//const k1 = require("../../assets/Resim.png");
const k1 = require("../../assets/TP_Mobil_indirim_App1_1136X640px.jpg")
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");
=======

import Carousel from 'react-native-carousel-view';

//const k1 = require("../../assets/Resim.png");
//const k1 = require("../../assets/TP_Mobil_indirim_App1_1136X640px.jpg")
//const k2 = require("../../assets/Kampanya-2.png");
//const k3 = require("../../assets/Kampanya-3.png");

const k1 = require("../../assets/TP_Mobil_indirim_App1_1136X640px.jpg")
const k2 = require("../../assets/TP_Urun_Binek_1792X828px.jpg");
const k3 = require("../../assets/TP_Urun_Ticari_1334X750px.jpg");
>>>>>>> b5d42c502031f0db2e934eae2c863a9184fbf5ba

export default class AnaSayfa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            latlon: undefined,
            loading: false,
        }
    }
    _getGps1() {
        try {
            navigator.geolocation.getCurrentPosition(
                //Will give you the current location
                (position) => {
                    console.log('currentLongitude' + position.coords.longitude)
                    const currentLongitude = (position.coords.longitude);
                    const currentLatitude = JSON.stringify(position.coords.latitude);
                    this.setState({ latlon: position.coords.longitude });

                },
                (error) => '',
                {
                    enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
                }
            );
        } catch (error) {

        }
        finally {

        }
    }
    _getGps() {
        try {
            this.setState({ loading: true })
            navigator.geolocation.getCurrentPosition(
                //Will give you the current location
                (position) => {
                    console.log('currentLongitude' + position.coords.longitude)
                    const currentLongitude = (position.coords.longitude);
                    const currentLatitude = JSON.stringify(position.coords.latitude);
                    this.setState({ latlon: position.coords.longitude });
                    if (this.state.latlon !== undefined) {
                        this.props.navigation.navigate("Satis");
                    }
                    else {
                        this.props.navigation.navigate("SatisIllce", { 'Tim': new Date() });

                    }
                },
                (error) => {
                    this.props.navigation.navigate("SatisIllce", { 'Tim': new Date() });
                },
                {
                    enableHighAccuracy: true, timeout: 2000, maximumAge: 1000
                }
            );
        } catch (error) {

        }

    }
    componentWillReceiveProps(nextProps) {
        //  this._getGps1();
    }
    componentDidMount() {
        //  alert(Math.round(Dimensions.get('window').width))
    }
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Image style={{ marginLeft: -15, width: 50, height: 50, resizeMode: 'contain' }} source={require('../../assets/GeriDongri.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Ana Sayfa</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" style={{ color: '#fff' }} />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container1}>
                    <Image style={styles.logo} source={require('../../assets/logo.png')} />
                </View>
                <View style={styles.containerOrta}>
                <Carousel
                       width={Math.round(Dimensions.get('window').width)}
<<<<<<< HEAD
                       height={300}>
=======
                       height={300}
                      >
>>>>>>> b5d42c502031f0db2e934eae2c863a9184fbf5ba
                        <View >
                            <Image style={styles.banner} source={k1} />
                        </View>
                        <View >
                            <Image style={styles.banner} source={k2} />
                        </View>
                        <View >
                            <Image style={styles.banner} source={k3} />
                        </View>
                    </Carousel>
<<<<<<< HEAD
                    
=======
>>>>>>> b5d42c502031f0db2e934eae2c863a9184fbf5ba
                </View>
                <View style={styles.containerBottom}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner
                            visible={this.state.loading}
                            textContent={'Yükleniyor...'}
                            textStyle={styles.spinnerTextStyle}
                        />
                    </View>
                    <View style={{ flex: 3, flexDirection: "column", backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', marginBottom: 20, backgroundColor: 'transparent' }}>
                            <Left style={{ marginLeft: 20 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("SatisIllce", { 'Tim': new Date() })}>
                                    <Image style={styles.button} source={require('../../assets/yakitalldpi.png')} />
                                </TouchableOpacity>
                            </Left>
                            <Body>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("EnYakinIstasyon")}>
                                    <Image style={styles.button} source={require('../../assets/istasyonlarldpi.png')} />
                                </TouchableOpacity>
                            </Body>
                            <Right style={{ marginRight: 20 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("kampanya")}>
                                    <Image style={styles.button} source={require('../../assets/kampanyalarldpi.png')} />
                                </TouchableOpacity>
                            </Right>

                        </View>
                        <View style={{ flexDirection: 'row', backgroundColor: 'transparent', }}>
                            <Left style={{ marginLeft: 20, }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Duyurular")}>
                                    <Image style={styles.button} source={require('../../assets/duyurularldpi.png')} />
                                </TouchableOpacity>
                            </Left>
                            <Body >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("hesabim")}>
                                    <Image style={styles.button} source={require('../../assets/hesabımldpi.png')} />
                                </TouchableOpacity>
                            </Body>
                            <Right style={{ marginRight: 20, }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Yardim")}>
                                    <Image style={styles.button} source={require('../../assets/BizeUlasin.png')} />
                                </TouchableOpacity>
                            </Right>

                        </View>
                    </View>
                </View>

            </Container>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    container1: {
        flex: 2,
        backgroundColor: 'transparent',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerOrta: {
        flex: 4,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        //alignItems: 'center',
    },
    containerBottom: {
        flex: 7,
        backgroundColor: 'transparent',
        flexDirection: 'row-reverse',
        marginBottom: 10,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    Inputs: {
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 5,
        marginBottom: 15,
        //color:'black',
        borderColor: 'black',
    },
    logo: {
        marginTop: 5,
        width: '100%',
        height: 80,
        resizeMode: 'contain',
        marginBottom: 6,
        alignSelf: 'center'
    },
  
    banner: {
        // alignSelf: 'center',
        width: Math.round(Dimensions.get('window').width),
        height:  Math.round(Dimensions.get('window').height) / 2,
        resizeMode: 'contain',
        marginBottom: 15,
    },
    switchcontainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginRight: 31,
        alignItems: 'center',

    },

    button: {
        resizeMode: 'contain',
        width: 90,
        height: 90,
        backgroundColor: 'transparent'
        //  marginRight: 30,
        //  marginLeft: 30,
        // marginBottom: -60,


    },
    buttona: {
        resizeMode: 'contain',
        width: 90,

        //  marginRight: 30,
        //  marginLeft: 30,
        // marginBottom: -60,


    },
    button1: {
        resizeMode: 'contain',
        width: 320,
        height: 50,
        // marginRight: 30,
        //     marginLeft: 30,
        marginTop: 5,

    },
    button2: {

        alignSelf: 'center',
        marginTop: 0,
        backgroundColor: 'transparent',
    },
    mb15: {
        marginBottom: 10
    },
});
