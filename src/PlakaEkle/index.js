
import React, { Component } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import {Input, Item, Picker, Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content } from 'native-base';


const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");

const pompa = require("../../assets/pompatabancakirmizi.png");
const plaka = require("../../assets/plakaKirmizi.png");
const pmpa = require("../../assets/pompaKirmizi.png");
const araba = require("../../assets/araba.png");

export default class PlakaEkle extends Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            plaka1: undefined,
            plaka2:'',
            plaka3:'',
            yakitTipi: undefined,
            araba: undefined,

        }
    }
    convertTextToUpperCase = () => {
        var text = this.state.plaka2;
        var uppercasetext = text.toUpperCase();
        this.setState({ plaka2: uppercasetext });
      };
    onPlakaValueChange(value: string) {
        this.setState({
            plaka: value
        });
    }
    onYakitTipiValueChange(value: string) {
        this.setState({
            yakitTipi: value
        });
    }
    onArabaValueChange(value: string) {
        this.setState({
            araba: value
        });
    }
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar backg roundColor="transparent" barStyle="light-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("Plakalarim")}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Plaka Ekle</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container1}>
                    <View>
                        <Image style={styles.logo} source={require('../../assets/logo.png')}
                        />
                        <Image style={{ marginBottom: 5, marginLeft: 30, marginRight: 30, width: '90%', height: 1, }} source={require('../../assets/cizgi.png')} />
                    </View>
                </View>
                <View style={styles.containerOrta}>
                    <Image style={styles.banner} source={k1} />
                </View>
                <View style={styles.containerBottom}>
                    <View style={{ flexDirection: 'row' }}>
                        <Item regular style={styles.Inputs}>
                            <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={plaka}></Image>
                            <Input placeholder='Plaka'
                                keyboardType="number-pad"
                                placeholderTextColor="#efefef"
                                underlineColorAndroid="transparent" />
                        </Item>
                        <Item regular style={styles.Inputs}>
                            <Image style={{ width: 35, height: 35, resizeMode: 'contain' }} source={plaka}></Image>
                            <Input placeholder='Plaka'
                                // keyboardType="email-address"
                                placeholderTextColor="#efefef"
                                autoCapitalize="characters"
                                underlineColorAndroid="transparent" />
                        </Item>
                        <Item regular style={styles.Inputs}>
                            <Image style={{ width: 35, height: 35, resizeMode: 'contain' }} source={plaka}></Image>
                            <Input placeholder='Plaka'
                                 keyboardType="number-pad"
                                placeholderTextColor="#efefef"
                                underlineColorAndroid="transparent" />
                        </Item>
                    </View>

                    <Item picker style={styles.comboItem}>
                        <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={pompa}></Image>

                        <Picker borderColor='black'
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Yakıt Tipi"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.yakitTipi}
                            onValueChange={this.onYakitTipiValueChange.bind(this)}
                        >
                            <Picker.Item label="Benzin" value="key0" />
                            <Picker.Item label="Dizel" value="key1" />
                            <Picker.Item label="Lpg" value="key2" />
                        </Picker>
                    </Item>
                    <Item picker style={styles.comboItem}>
                        <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={araba}></Image>
                        <Picker borderColor='black'
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Araç Marka/model..."
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.araba}
                            onValueChange={this.onArabaValueChange.bind(this)}
                        >
                            <Picker.Item label="Vw" value="key0" />
                            <Picker.Item label="Audi" value="key1" />
                            <Picker.Item label="Dacia" value="key2" />
                        </Picker>
                    </Item>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("hesabim")}>
                            <Image
                                style={styles.button}
                                source={require('../../assets/plakaekle.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>

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
    },
    containerOrta: {
        flex: 5,
        backgroundColor: 'transparent',
    },
    containerBottom: {
        flex: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column',
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
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 5,
        marginBottom: 5,
        marginTop:5,
        width: 100,
        //color:'black',
        borderColor: 'black',
    },
    logo: {
        marginTop: 5,
        // width: '100%',
        height: 80,
        resizeMode: 'contain',
        marginBottom: 5,
    },
    banner: {
        // marginTop: 2,
        width: '100%',
        height: 220,
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
        width: 320,
        marginRight: 30,
        marginLeft: 30,
        marginBottom: -50,

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
    comboItem: {
        marginRight: 40,
        marginLeft: 40,
        borderColor: 'black',
        //   marginBottom: 15,
        borderWidth: 1,
        marginTop: 5,

    },
});
