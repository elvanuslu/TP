
import React, { Component } from 'react';
import { Dimensions, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import Carousel from 'react-native-carousel-view';


const k1 = require("../../assets/TP_AdimizdaUlkemiz.jpg")
const k2 = require("../../assets/BuTopraklarda.jpg");
const k3 = require("../../assets/KopukluKahve.jpg");
const k4 = require("../../assets/TP_App_Binek_1026x728-01.jpg")
const k5 = require("../../assets/TP_App_Ticari_1026x728-01.jpg");
const k6 = require("../../assets/TP_Mobil_hosgeldiniz_1026x768.jpg");
const k7 = require("../../assets/TP_MobilIndirim.jpg");

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

                <View style={styles.containerOrta}>
                    <Carousel
                        width={Math.round(Dimensions.get('window').width)}
                        delay={3000}
                        height={320}>
                        <View >
                            <Image style={styles.banner} source={k1} />
                        </View>
                        <View>
                            <Image style={styles.banner} source={k2} />
                        </View>
                        <View >
                            <Image style={styles.banner} source={k3} />
                        </View>
                        <View >
                            <Image style={styles.banner} source={k4} />
                        </View>
                        <View >
                            <Image style={styles.banner} source={k5} />
                        </View>
                        <View >
                            <Image style={styles.banner} source={k6} />
                        </View>
                        <View >
                            <Image style={styles.banner} source={k7} />
                        </View>
                    </Carousel>
                </View>
                <View style={styles.container1}>
                    <Text>Buraya Kayan Yazı Gelecek</Text>
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
                                    <Image style={styles.button} source={require('../../assets/YakitAlYeni.png')} />
                                </TouchableOpacity>
                            </Left>
                            <Body>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("EnYakinIstasyon")}>
                                    <Image style={styles.button} source={require('../../assets/istasyonlarldpi.png')} />
                                </TouchableOpacity>
                            </Body>
                            <Right style={{ marginRight: 20 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("kampanya")}>
                                    <Image style={styles.button} source={require('../../assets/KampanyalarYeni.png')} />
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
        flex: 1,
        backgroundColor: 'transparent',
        // marginTop:0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerOrta: {
        flex: 4,
        backgroundColor: 'transparent',
        // justifyContent: 'center',
        // alignItems: 'flex-start',
        marginTop: -30,
        marginBottom: 50,
        //alignItems: 'center',
    },
    containerBottom: {
        flex: 4,
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
    carosel: {

        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
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
        height: Math.round(Dimensions.get('window').height) / 2,
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
        width: 105,
        height: 105,
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
