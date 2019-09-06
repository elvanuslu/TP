
import React, { Component } from 'react';
import { Dimensions, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import Carousel from 'react-native-carousel-view';

const k1 = require("../../assets/TP_AdimizdaUlkemiz.jpg")
const k2 = require("../../assets/BuTopraklarda.jpg");
const k3 = require("../../assets/KopukluKahve.jpg");
const k4 = require("../../assets/TP_App_Binek_1026x728-01.jpg")
const k5 = require("../../assets/TP_App_Ticari_1026x728-01.jpg");
const k6 = require("../../assets/TP_Mobil_hosgeldiniz_1026x768.jpg");
const k7 = require("../../assets/TP_MobilIndirim.jpg");

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

                <View style={styles.containerOrta}>
                <Carousel 
                   width={Math.round(Dimensions.get('window').width)}
                   delay={3000}
                   height={310} >
                    <View>
                       <Image style={styles.banner} source={k6} />
                   </View>
                   <View>
                       <Image style={styles.banner} source={k7} />
                   </View>
                   <View>
                       <Image style={styles.banner} source={k1} />
                   </View>
                
                   <View>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    container1: {
        flex: 0.13,
        backgroundColor: 'transparent',
        //marginBottom: 10,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    containerOrta: {
        flex: 1,
        backgroundColor: 'transparent',
       justifyContent:'flex-start',
        // marginTop: -20,
        // marginBottom: 60,
    },
    containerBottom: {
        flex: 1,
        backgroundColor: 'transparent',
        // flexDirection: 'column-reverse',
        marginBottom: 5,
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
        height: Math.round(Dimensions.get('window').height) / 2,
        resizeMode: 'contain',
       marginTop:-35,
    },
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
