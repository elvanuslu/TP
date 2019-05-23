import React, { Component } from 'react';
import { ListView, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import {
    Switch, List, ListItem, Item, Picker, Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content
} from 'native-base';


const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");

export default class SatisVePuanDetay extends Component {
    constructor() {
        super();
        this.state = {
            kullanici: '',
            formatted: '',
            extracted: '',
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <StatusBar style={{ color: '#fff' }} backgroundColor="transparent" barStyle="light-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("SatisVePuanGecmisi")}>
                            <Icon name="arrow-back" style={{ color: '#fff' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Satış/Puan Detay</Title>
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
                    <Content style={{ marginLeft: 5, marginRight: 5 }}>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "transparent" }}>
                                    <Image style={{ width: 20, resizeMode: 'contain', }} source={require('../../assets/tarih_1.png')} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Tarih:</Text>
                            </Body>
                            <Right>
                                <Text>04.05.2019 16:23:15</Text>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "transparent" }}>
                                    <Image style={{ width: 18, resizeMode: 'contain', }} source={require('../../assets/miktar_1.png')} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Miktar:</Text>
                            </Body>
                            <Right>
                                <Text>16.5LT</Text>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "transparent" }}>
                                    <Image style={{ width: 20, resizeMode: 'contain', }} source={require('../../assets/ucret_1.png')} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Ücret:</Text>
                            </Body>
                            <Right>
                                <Text>105TL</Text>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "transparent", alignItems: 'center' }}>
                                    <Image style={{ width: 22, resizeMode: 'contain', }} source={require('../../assets/tparalogo.png')} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>T-Para:</Text>
                            </Body>
                            <Right>
                                <Text>5TP</Text>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "transparent" }}>
                                    <Image style={{ width: 22, resizeMode: 'contain', }} source={require('../../assets/pomp.png')} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Ürün:</Text>
                            </Body>
                            <Right>
                                <Text>Benzin</Text>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "transparent" }}>
                                    <Image style={{ width: 20, resizeMode: 'contain', }} source={require('../../assets/arac.png')} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Plaka:</Text>
                            </Body>
                            <Right>
                                <Text>34-TP-3434</Text>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "transparent" }}>
                                    <Image style={{ width: 20, resizeMode: 'contain', }} source={require('../../assets/istasyon_1.png')} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>İstasyon:</Text>
                            </Body>
                            <Right>
                                <Text>4.Levent No 4</Text>
                            </Right>
                        </ListItem>
                    </Content>
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
        flex: 2,
        backgroundColor: 'transparent',
        alignItems: 'center',
        marginBottom: 5,
    },
    containerOrta: {
        flex: 4,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerBottom: {
        flex: 5,
        backgroundColor: 'transparent',

        // alignItems: 'center',
        //    flexDirection: 'column',
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
        //  height: '100%',
        resizeMode: 'contain',
        marginBottom: 30,
    },
    switchcontainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginRight: 31,
        alignItems: 'center',

    },

    button: {
        resizeMode: 'contain',
        width: 20,
        height: 20,
        marginRight: 1,
        marginLeft: 5,
        marginBottom: 0,

    },
    button1: {
        resizeMode: 'contain',
        width: 320,
        marginRight: 30,
        marginLeft: 30,
        marginBottom: 5,
    },
    button2: {

        alignSelf: 'center',
        marginTop: 0,
        backgroundColor: 'transparent',
    },
    mb15: {
        marginBottom: 10
    },
    txt: {
        marginLeft: 15,
        fontSize: 14,

    }
});
