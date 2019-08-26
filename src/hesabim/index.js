
import React, { Component } from 'react';
import { Dimensions, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import Carousel from 'react-native-carousel-view';

//const k1 = require("../../assets/Resim.png");
const k1 = require("../../assets/TP_Mobil_indirim_App1_1136X640px.jpg")
const k2 = require("../../assets/TP_Urun_Binek_1792X828px.jpg");
const k3 = require("../../assets/TP_Urun_Ticari_1334X750px.jpg");

export default class hesabim extends Component {
    constructor() {
        super();
        this.state = {
            userName: ''
        }
    }

    componentDidMount() {
        this._retrieveData();
    }
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('userId');
            if (value !== null) {
                // We have data!!
                console.log("we have data" + value);
            }
        } catch (error) {
            // Error retrieving data
        }
    };
    render() {
        const { navigation } = this.props;
        const otherParam = navigation.getParam('Data', '');
        //console.log("Datam=>" + otherParam.firstname + " " + otherParam.lastname)
        return (
            <Container style={styles.container}>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('AnaSayfa')}>
                            <Image style={{ marginLeft: -15, width: 50, height: 50, resizeMode: 'contain', }} source={require('../../assets/GeriDongri.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Hesabım</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" style={{ color: '#fff' }} />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container1}>
                    <View>
                        <Image style={styles.logo} source={require('../../assets/logo.png')} />
                    </View>
                </View>
                <View style={styles.containerOrta}>
                    <Carousel
                       width={Math.round(Dimensions.get('window').width)}
                       height={300}
                      >
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
                </View>
                <View style={styles.containerBottom}>

                    <TouchableOpacity style={{ justifyContent: 'center', height: 50, width: 320, marginTop: 5, marginLeft: 30, marginRight: 30, }} onPress={() => this.props.navigation.navigate("KayitGuncelle", { 'Id': new Date() })}>
                        <Image style={styles.button}
                            source={require('../../assets/bilgilerimiguncelle.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ justifyContent: 'center', height: 50, width: 320, marginTop: 5, marginLeft: 30, marginRight: 30, }} onPress={() => this.props.navigation.navigate("Plakalarim", { 'Id': new Date() })}>
                        <Image
                            style={styles.button}
                            source={require('../../assets/araclarim.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ justifyContent: 'center', height: 50, width: 320, marginTop: 5, marginLeft: 30, marginRight: 30, }} onPress={() => this.props.navigation.navigate("SatisVePuanGecmisi", { 'Id': new Date() })}>
                        <Image
                            style={styles.button}
                            source={require('../../assets/satisvepuan.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: 50, width: 320, marginTop: 5, marginLeft: 30, marginRight: 30, }} onPress={() => this.props.navigation.navigate("EnYakinIstasyon", { 'Id': new Date() })}>
                        <Image style={styles.button1} source={require('../../assets/EnYakinIstasyon.png')} />
                    </TouchableOpacity>


                </View>

            </Container>
        );
    }
}


/*
 
*/
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    container1: {
        flex: 2,
        backgroundColor: 'transparent',
        //marginBottom: 10,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    containerOrta: {
        flex: 4,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 10,
        //alignItems: 'center',
    },
    containerBottom: {
        flex: 7,
        backgroundColor: 'transparent',
        // flexDirection: 'column-reverse',
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    /*
    container1: {
        flex: 2,
        backgroundColor: 'red',
        // alignItems: 'center',
    },
    containerOrta: {
        flex: 3,
        backgroundColor: 'yellow',
        //alignItems: 'center',
    },
    containerBottom: {
        flex: 4,
        backgroundColor: 'green',
        alignSelf: 'center',
        marginBottom: 35,
        // justifyContent: 'center',
        // alignItems:'center',
        // flexDirection: 'column',
        //  width: '100%',

    },
    */
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
    /* logo: {
         marginTop: 5,
         //  width: 150,
         height: '75%',
         resizeMode: 'contain',
         marginBottom: 5,
     },
     */
    banner: {
        // alignSelf: 'center',
        width: Math.round(Dimensions.get('window').width),
        height: Math.round(Dimensions.get('window').height) / 2,
        resizeMode: 'contain',
        marginBottom: 15,
    },
    /*
    banner: {
        // marginTop: 2,
        width: '100%',
        height: 195,
        resizeMode: 'contain',
        marginBottom: 5,
    },
    */
    switchcontainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginRight: 31,
        alignItems: 'center',

    },

    button: {
        resizeMode: 'contain',
        width: 320,
        alignItems: 'center',
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
