
import React, { Component } from 'react';
import { Alert, Switch, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Picker, Icon, Form, Content, Input, Item, Title, Left, Right, Button, Container, Header, Body, Card, CardItem } from 'native-base';
import Icon2 from "react-native-vector-icons";

import Spinner from 'react-native-loading-spinner-overlay';
import TextInputMask from 'react-native-text-input-mask';
import AsyncStorage from '@react-native-community/async-storage';
import { getContact, musteriGuncelle } from '../Service/FetchUser';

const pompa = require("../../assets/pompatabancakirmizi.png");
const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");

export default class KayitGuncelle extends Component {
    constructor() {
        super();
        this.state = {
            kullanici: '',
            formatted: '',
            extracted: '',
            Adi: '',
            Soyadi: '',
            eposta: '',
            tel: '',
            plaka: '',
            yakitTipi: undefined,
            yakitTipiDeger: undefined,
            Sifre: '',
            error: '',
            loading: false,
            isLoading: false,
            yakitTipleri: [],
            selected2: undefined,
            labelName: '',
            mobilKod: '',
            mobilKodFormatted: '',
            mobilextracted: '',
        }
    }
    componentDidMount() {
        this._retrieveKullanici();
    }
    _getUserInfo(userID) {

        console.log('kull: ' + this.state.kullanici + '  Kull2: ' + userID);
        getContact(this.state.kullanici)
            .then((res) => {
                console.log('Kontakte: ' + res.contacid);
                if (res.contactid !== undefined) {
                    this.setState({
                        Adi: res.firstname,
                        Soyadi: res.lastname,
                        eposta: res.emailaddress1,
                        tel: res.mobilephone,
                        Sifre: res.bm_sifre,
                    });
                }
            }).catch(error => console.log(error));
    }
    _retrieveKullanici = async () => {
        try {
            const value = await AsyncStorage.getItem('userId');
            if (value !== null) {
                this.setState({ kullanici: value });
                //  console.log("UserIdmKayıt " + this.state.kullanici);
                this._getUserInfo(this.state.kullanici);
            }
        } catch (error) {
            Alert.alert('Hata', error);
        }
    };

    onValueChange2(value, label) {

        this.setState(
            {
                selected2: value,
                labelName: label
            },
            () => {
                console.log('selectedValue: ' + this.state.labelName, ' Selected: ' + this.state.selected2)
            }
        )
    }


    _btnKayit() {
        try {
            this.setState({ loading: true });
            //   alert('kayit'+this.state.kullanici)
            musteriGuncelle(this.state.kullanici, this.state.Adi, this.state.Soyadi, this.state.eposta, this.state.tel, this.state.Sifre, this.state.mobilKod)
                .then((responseData) => {
                    
                    Alert.alert(
                        'Düzenleme!',
                        responseData.message,
                        [
            
                          { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: true },
                      );
                      this.setState({
                        loading: false,
                      });
                      this.setState({ loading: false })
                  //  Alert.alert('Düzenleme Başarılı.', responseData.message)
                   // console.log("response: " + JSON.stringify(responseData))
                    
                })
                .catch((err) => { Alert.alert('Hata.', err) });
        } catch (error) {
            Alert.alert('Hata!', error)
            console.log('hata oluştu: ' + error);
        } finally {
            this.setState({ loading: false })
        }
    }
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar style={{ color: '#fff' }} barStyle="dark-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("hesabim")}>
                            <Icon name="arrow-back" style={{ color: '#fff' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Bilgilerimi Güncelle</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" style={{ color: '#fff' }} />
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
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner
                            visible={this.state.loading}
                            textContent={'Yükleniyor...'}
                            textStyle={styles.spinnerTextStyle}
                        />
                    </View>
                    <Content style={{ backgroundColor: '#fff' }}>
                        <Body>
                                <Item regular style={styles.Inputs}>
                                    <Icon active name='person' underlayColor='#2089dc' color='#fff' />
                                    <Input placeholder='Ad'
                                        onChangeText={(value) => this.setState({ Adi: value })}
                                        value={this.state.Adi}
                                        placeholderTextColor="#efefef"
                                        underlineColorAndroid="transparent" />
                                </Item>
                                <Item regular style={styles.Inputs}>
                                    <Icon active name='person' underlayColor='#2089dc' color='#fff' />
                                    <Input placeholder='Soyad'
                                        onChangeText={(value) => this.setState({ Soyadi: value })}
                                        value={this.state.Soyadi}
                                        placeholderTextColor="#efefef"
                                        underlineColorAndroid="transparent" />
                                </Item>

                                <Item regular style={styles.Inputs}>
                                    <Icon active name='md-tablet-portrait' underlayColor='#2089dc' color='#fff' />
                                    <TextInputMask style={styles.Inputs1}
                                        placeholder="Telefon Giriniz..."
                                        placeholderTextColor="#efefef"
                                        keyboardType="phone-pad"
                                        refInput={ref => { this.input = ref }}
                                        value={this.state.tel}
                                        onChangeText={(formatted, extracted) => {
                                            this.setState({ tel: formatted })
                                        }}
                                        mask={"0 [000] [000] [00] [00]"}
                                    />

                                </Item>
                                <Item regular style={styles.Inputs}>
                                    <Icon active name='md-alarm' color='#fff' />
                                    <TextInputMask style={styles.Inputs1}
                                        autoCapitalize="characters"
                                        placeholder="Mobil Kod..."
                                        placeholderTextColor="#efefef"
                                        keyboardType="name-phone-pad"
                                        //   onChangeText={(value) => this.setState({ plaka: value })}
                                        value={this.state.plaka}
                                        underlineColorAndroid="transparent"

                                        refInput={ref => { this.input = ref }}
                                        onChangeText={(mobilKodFormatted, mobilextracted) => {
                                            this.setState({ mobilKod: mobilKodFormatted })
                                          //  console.log(mobilKodFormatted)
                                          //  console.log(mobilextracted)
                                        }}
                                    //  mask={"[00000000]-[0000]-[0000]-[0000]-[000000000000]"}
                                    />
                                </Item>
                                <Item regular style={styles.Inputs}>
                                    <Icon active name='key' underlayColor='#2089dc' color='#fff' />
                                    <Input placeholder='Şifre '
                                        // keyboardType="email-address"
                                        placeholderTextColor="#efefef"
                                        secureTextEntry={true}
                                        textContentType="password"
                                        onChangeText={(value) => this.setState({ Sifre: value })}
                                        value={this.state.Sifre}
                                        underlineColorAndroid="transparent" />
                                </Item>
                        </Body>

                        <Button block danger style={styles.mb15} onPress={() => this._btnKayit()}>
                            <Text style={styles.buttonText}>Güncelle</Text>
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
        flex: 8,
        alignItems: 'center',
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
        height: 50,
        borderColor: 'black',
    },
    Inputs1: {
        alignSelf: 'center',
        height: 40,
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
    spinnerTextStyle: {
        color: '#FFF'
      },
})