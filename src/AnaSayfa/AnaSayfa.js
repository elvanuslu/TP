
import React, { Component } from 'react';
import { Dimensions, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import Carousel from 'react-native-carousel-view';
import TextTicker from 'react-native-text-ticker'
import { getDuyuruListByUser, getStorage } from '../Service/FetchUser';

const k1 = require("../../assets/TP_AdimizdaUlkemiz.jpg")
const k2 = require("../../assets/BuTopraklarda.jpg");
const k3 = require("../../assets/KopukluKahve.jpg");
const k4 = require("../../assets/TP_App_Binek_1026x728-01.jpg")
const k5 = require("../../assets/TP_App_Ticari_1026x728-01.jpg");
const k6 = require("../../assets/TP_Mobil_hosgeldiniz_1026x768.jpg");
const k7 = require("../../assets/TP_MobilIndirim.jpg");
var Duyurular = [];
export default class AnaSayfa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            latlon: undefined,
            loading: false,
            data: [],
        }
    }

    componentDidMount() {
        this._getDuyuruListesi();
    }
    _getDuyuruListesi = async () => {
        try {
            //  this.setState({ loading: true })
            const uId = await getStorage('userId');
            getDuyuruListByUser(uId)
                .then((res) => {
                    if (res.status !== false) {
                        this.setState({ data: res, loading: false });
                        // console.log(JSON.stringify(res));

                    }
                    else {
                        this.setState({ loading: false }, () => {
                            setTimeout(() => {
                                Alert.alert(
                                    'Hata Oluştu',
                                    res.message,
                                    [
                                        { text: 'Tamam', onPress: () => '' },
                                    ],
                                    { cancelable: true },
                                )
                            }, 0);
                        });

                    }
                })
                .catch((error) =>
                    this.setState({ loading: false }, () => {
                        setTimeout(() => {
                            Alert.alert(
                                'Hata Oluştu',
                                error,
                                [

                                    { text: 'Tamam', onPress: () => '' },
                                ],
                                { cancelable: true },
                            )
                        }, 0);
                    }))
        } catch (error) {
            this.setState({ loading: false }, () => {
                setTimeout(() => {
                    Alert.alert(
                        'Hata Oluştu',
                        error,
                        [

                            { text: 'Tamam', onPress: () => '' },
                        ],
                        { cancelable: true },
                    )
                }, 0);
            });
        }

    }
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() =>  this.props.navigation.navigate("login")}>
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
                        height={295}>
                        <View >
                            <Image style={styles.banner} source={k6} />
                        </View>
                        <View >
                            <Image style={styles.banner} source={k7} />
                        </View>
                        <View >
                            <Image style={styles.banner} source={k1} />
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

                    </Carousel>
                </View>
                <View style={styles.container1}>
                    <TextTicker
                        style={styles.welcome}
                        duration={20000}
                        loop
                        bounce
                        repeatSpacer={50}
                        marqueeDelay={1000}>
                        {this.state.data.map((data, i) =>
                            (data.bm_kisaaciklama + '.  '))}

                    </TextTicker>
                </View>
                <View style={styles.containerBottom}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner
                            visible={this.state.loading}
                            textContent={'Yükleniyor...'}
                            textStyle={styles.spinnerTextStyle}
                        />
                    </View>
                    <View style={{ flex: 1, flexDirection: "column", backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', marginBottom: 20, backgroundColor: 'transparent' }}>
                            <Left style={{ marginLeft: 20 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("SatisIllce", { 'Tim': new Date() })}>
                                    <Image style={styles.button} source={require('../../assets/YakitAlYeni.png')} />
                                </TouchableOpacity>
                            </Left>
                            <Body>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("EnYakinIstasyon",{'Yer':'AnaSayfa'})}>
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
        flex: 0.15,
        backgroundColor: '#F4F6F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        // marginLeft: 20,
        // marginRight: 20,

    },
    containerOrta: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    containerBottom: {
        flex: 0.8,
        backgroundColor: 'transparent',
        flexDirection: 'row-reverse',
        marginBottom: 10,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {

        fontSize: 15,
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#4F4A49',
        fontFamily: 'FontAwesome',
        backgroundColor: '#F4F6F6'
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
        marginTop: -34,
        // marginBottom: 15,
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
