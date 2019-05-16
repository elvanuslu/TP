
import React, { Component } from 'react';
import { Switch, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import {Picker,Form, Icon, Content, Input, Item, Title, Left, Right, Button, Container, Header, Body, Card, CardItem } from 'native-base';
import Icon1 from "react-native-vector-icons/FontAwesome";

import TextInputMask from 'react-native-text-input-mask';
import AsyncStorage from '@react-native-community/async-storage';

const pompa = require("../../assets/pompatabancakirmizi.png");
const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");

export default class yenikayit extends Component {
    constructor() {
        super();
        this.state = {
            kullanici: '',
            formatted: '',
            extracted: '',
            eposta: '',
            tel: '',
            plaka: '',
            akaryakit: '',
            Sifre: '',
        }
    }
    componentDidMount() {
        this._retrieveKullanici();
    }
    _retrieveKullanici = async () => {
        try {
            const value = await AsyncStorage.getItem('userId');
            if (value !== null) {
                this.setState({ kullanici: value });
                console.log("UserId " + this.state.kullanici);
            }
        } catch (error) {
            // Error retrieving data
        }
    };
    _SifreKontrol = async () => {
        try {

        } catch (error) {

        }
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
                <StatusBar barStyle="dark-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("hesabim")}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Yeni Kayıt</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container1}>
                    <View>
                        <Image style={styles.logo} source={require('../../assets/tplogo.png')}
                        />
                        <Image style={{ marginBottom: 5, alignSelf: 'center', marginLeft: 30, marginRight: 30, width: '90%', height: 1, }} source={require('../../assets/cizgi.png')} />
                    </View>
                </View>
                <View style={styles.containerOrta}>
                    <Content style={{ backgroundColor: '#fff' }}>
                        <Body>
                            <Form>
                                <Item regular style={styles.Inputs}>
                                    <Icon active name='person' underlayColor='#2089dc' color='#fff' />
                                    <Input placeholder='Ad'
                                        // keyboardType="email-address"
                                        placeholderTextColor="#efefef"
                                        underlineColorAndroid="transparent" />
                                </Item>
                                <Item regular style={styles.Inputs}>
                                    <Icon active name='person' underlayColor='#2089dc' color='#fff' />
                                    <Input placeholder='Soyad'
                                        // keyboardType="email-address"
                                        placeholderTextColor="#efefef"
                                        underlineColorAndroid="transparent" />
                                </Item>
                                <Item regular style={styles.Inputs}>
                                    <Icon active name='mail' underlayColor='#2089dc' color='#fff' />
                                    <Input placeholder='e-posta adresi giriniz...'
                                        keyboardType="email-address"
                                        placeholderTextColor="#efefef"
                                        underlineColorAndroid="transparent" />
                                </Item>
                                <Item regular style={styles.Inputs}>
                                    <Icon active name='person' underlayColor='#2089dc' color='#fff' />
                                    <TextInputMask style={styles.Inputs1}
                                        placeholder="Telefon Giriniz..."
                                        placeholderTextColor="#efefef"
                                        keyboardType="phone-pad"
                                        refInput={ref => { this.input = ref }}
                                        onChangeText={(formatted, extracted) => {
                                            console.log(formatted)
                                            console.log(extracted)
                                        }}
                                        mask={"+90 ([000]) [000] [00] [00]"}
                                    />

                                </Item>
                                <Item regular style={styles.Inputs}>
                                    <Icon active name='person' underlayColor='#2089dc' color='#fff' />
                                    <Input placeholder='Plaka Giriniz...'
                                        autoCapitalize='characters'
                                        // keyboardType="email-address"
                                        placeholderTextColor="#efefef"
                                        underlineColorAndroid="transparent" />
                                </Item>
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
                                <Item regular style={styles.Inputs}>
                                    <Icon active name='key' underlayColor='#2089dc' color='#fff' />
                                    <Input placeholder='Şifre '
                                        // keyboardType="email-address"
                                        placeholderTextColor="#efefef"
                                        underlineColorAndroid="transparent" />
                                </Item>
                                <Item regular style={styles.Inputs}>
                                    <Icon active name='key' underlayColor='#2089dc' color='#fff' />
                                    <Input placeholder='Şifre (tekrar)... '
                                        // keyboardType="email-address"
                                        placeholderTextColor="#efefef"
                                        underlineColorAndroid="transparent" />
                                </Item>
                            </Form>
                        </Body>
                        <View style={styles.switchcontainer}>
                            <View style={{ alignContent: 'center' }}>
                                <Text style={styles.switcText}>Beni Hatırla</Text>
                            </View>
                            <Switch
                                onValueChange={this.toggleSwitch1}
                                value={this.switch1Value} />

                        </View>
                        <View style={styles.switchcontainer}>
                            <View style={{ alignContent: 'center' }}>
                                <Text style={styles.switcText}>Sözleşmeyi Okudum Onaylıyorum</Text>
                            </View>
                            <Switch
                                onValueChange={this.toggleSwitch1}
                                value={this.switch1Value} />
                        </View>
                        <View style={styles.switchcontainer}>
                            <View style={{ alignContent: 'center' }}>
                                <Text style={styles.switcText}>Kampanya ve duyurular için benimle{"\n"}iletişime geçilmesine izin veriyorum</Text>
                            </View>
                            <Switch
                                onValueChange={this.toggleSwitch1}
                                value={this.switch1Value} />
                        </View>
                        <Button block danger style={styles.mb15}>
                            <Text style={styles.buttonText}>KAYIT OL</Text>
                        </Button>
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
        flex: 3,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    containerOrta: {
        flex: 12,
        backgroundColor: 'transparent',
    },
    containerBottom: {
        flex: 2,
        backgroundColor: 'transparent',
    },
    logo: {
        marginTop: 5,
        //  width: '100%',
        height: '90%',
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
    Inputs: {
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 5,
        marginBottom: 10,
        //color:'black',
        borderColor: 'black',
    },
    Inputs1: {

        borderRadius: 5,
        marginBottom: 10,
        width: '90%',
        //color:'black',
        borderColor: 'black',
    },
    switchcontainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginRight: 31,
        alignItems: 'center',

    },
    switcText: {
        textAlign: 'right',
        fontSize: 12,
        fontWeight: '300',
        color: 'gray',
        marginRight: 5,
    },
    mb15: {
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '800',
    },
    comboItem: {
        marginRight: 40,
        marginLeft: 40,
        borderColor: 'black',
        //   marginBottom: 15,
        borderWidth: 1,
        marginTop: 5,
 
    },
})