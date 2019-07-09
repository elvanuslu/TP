
import React, { Component } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");

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
                        this.props.navigation.navigate("SatisIllce");

                    }
                },
                (error) => {
                    this.props.navigation.navigate("SatisIllce")
                },
                {
                    enableHighAccuracy: true, timeout: 2000, maximumAge: 1000
                }
            );
        } catch (error) {

        }
        finally {
            this.setState({ loading: false })
        }
    }
    componentWillReceiveProps(nextProps) {
        this._getGps1();
    }
    componentDidMount() {
        this._getGps1();
    }
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" style={{ color: '#fff' }} />
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
                    <View>
                        <Image style={styles.logo} source={require('../../assets/logo.png')}
                        />
                        <Image style={{ alignSelf: 'center', marginLeft: 30, marginRight: 30, width: '90%', height: 1, }} source={require('../../assets/cizgi.png')} />
                    </View>
                </View>
                <View style={styles.containerOrta}>
                    <Image style={styles.banner} source={k1} />
                </View>
                <View style={styles.containerBottom}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner
                        visible={this.state.loading}
                        textContent={'Yükleniyor...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                </View>
                    <View style={{ flex: 2, flexDirection: "column", backgroundColor: 'transparent', }}>
                        <View style={{ flex: 2, flexDirection: 'row', backgroundColor: 'transparent' }}>
                            <Left style={{ marginLeft: 20 }}>
                                <TouchableOpacity onPress={() =>  this.props.navigation.navigate("SatisIllce")}>
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
                        <View style={{ flex: 2, flexDirection: 'row', backgroundColor: 'transparent', }}>
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
                                    <Image style={styles.button} source={require('../../assets/musteriYardim.png')} />
                                </TouchableOpacity>
                            </Right>

                        </View>
                    </View>
                </View>
                <View style={styles.container}>

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

    },
    containerOrta: {
        flex: 8,
        backgroundColor: 'transparent',
        //alignItems: 'center',
    },
    containerBottom: {
        flex: 6,
        backgroundColor: 'transparent',
        //  marginTop:30,
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
        //  width: 150,
        height: '80%',
        resizeMode: 'contain',
        marginBottom: 5,
    },
    banner: {
        // marginTop: 2,
        width: '100%',
        height: 222,
        resizeMode: 'contain',
        marginBottom: 5,
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
