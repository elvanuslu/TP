
import React, { Component } from 'react';
import { Alert, Switch, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Picker, Form, Icon, Content, Input, Item, Title, Left, Right, Button, Container, Header, Body, Card, CardItem } from 'native-base';
import Icon1 from "react-native-vector-icons/FontAwesome";
import Spinner from 'react-native-loading-spinner-overlay';

import TextInputMask from 'react-native-text-input-mask';
import AsyncStorage from '@react-native-community/async-storage';
import { getYakitTipi, MusteriKayit, setStorage } from '../Service/FetchUser';

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
            Adi: '',
            Soyadi: '',
            eposta: '',
            tel: '',
            plaka: '',
            yakitTipi: undefined,
            yakitTipiDeger: undefined,
            Sifre: '',
            Sifre2: '',
            error: '',
            isLoading: false,
            yakitTipleri: [],
            selected2: undefined,
            labelName: '',
            loading: false,
            SwitchOnValueHolder: false,
            SozlesmeOkudum: false,
            KampanyaDuyurular: false,
            smsIzni: true,
            mobilKod: '',
            mobilKodFormatted: '',
            mobilextracted: '',
        }
    }
    KapmanyaDuyuru = (value) => {
        this.setState({
            KampanyaDuyurular: value,
            smsIzni: true,
        })
        if (value == true) {
            // Alert.alert("Switch is On.");
        }
        else {
            //   Alert.alert("Switch is Off.");
        }

    }
    OkudumOnayladim = (value) => {
        this.setState({
            SozlesmeOkudum: value
        })
        if (value == true) {
            //  Alert.alert("Switch is On.");
        }
        else {
            //Alert.alert("Switch is Off.");
        }

    }
    ShowAlert = (value) => {
        this.setState({
            SwitchOnValueHolder: value
        })
        if (value == true) {
            //  Alert.alert("Switch is On.");
        }
        else {
            // Alert.alert("Switch is Off.");
        }

    }
    componentDidMount() {
        this._retrieveKullanici();
        this._getYakitTipleri();
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
    onBeniHatirla() {

    }
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
    onYakitTipiValueChange(value: string) {
        this.setState({
            yakitTipi: value
        });
        console.log("Yakıt Tipi: " + this.state.yakitTipi);
        console.log("Yakit Val: " + this.state.yakitTipiDeger);
    }
    onArabaValueChange(value: string) {
        this.setState({
            araba: value,

        },
            () => { console.log('Araba: ' + this.state.araba) }
        );
    }
    _getYakitTipleri() {
        getYakitTipi()
            .then((res) => {
                this.setState({
                    yakitTipleri: res,
                });
                //        console.log("Yakit" + ("log Yakit" + JSON.stringify(this.state.yakitTipleri)));
                //        console.log("Yakit Tipi: " + this.state.yakitTipleri[0].bm_yakittipiadi);
            })
            .catch(e => {
                console.log("hata: " + e);
            });
    }
    _btnKayit() {
        try {
            if (this.state.SozlesmeOkudum === true && this.state.KampanyaDuyurular === true) {

                // console.log('Adı: ' + this.state.Adi.length);
                if (this.state.Adi.length >= 3) {
                    if (this.state.Soyadi.length >= 3) {
                        if (this.state.eposta !== '') {
                            if (this.state.tel.length >= 11) {
                                if (this.state.plaka.length >= 7) {
                                    if (this.state.Sifre.length > 5) {
                                        if (this.state.Sifre === this.state.Sifre2) {
                                            this.setState({ loading: true })
                                            MusteriKayit(this.state.Adi, this.state.Soyadi, this.state.eposta, this.state.tel,
                                                this.state.Sifre, this.state.plaka, this.state.selected2, this.state.selected2,
                                                this.state.smsIzni, this.state.KampanyaDuyurular, this.state.SozlesmeOkudum, this.state.mobilKod)
                                                .then((responseData) => {
                                                    let response = JSON.stringify(responseData);
                                                    console.log('responseData=' + response)
                                                    this.setState({ loading: false })
                                                    if (responseData.status == true) {
                                                        setStorage('kullaniciId', responseData.message);
                                                        this.props.navigation.navigate("Kodec", { 'Id': responseData.message });
                                                        /*
                                                        Alert.alert(
                                                            'Kayıt İşlemi!',
                                                            responseData.message,
                                                            [

                                                                { text: 'Tamam', onPress: () => { 

                                                                    this.props.navigation.navigate("Kodec");
                                                                } },
                                                            ],
                                                            { cancelable: true },
                                                        );
                                                        */
                                                        // console.log("response: " + JSON.stringify(responseData)) 
                                                    }
                                                    else {
                                                        Alert.alert(
                                                            'Kayıt İşlemi!',
                                                            responseData.message,
                                                            [

                                                                { text: 'Tamam', onPress: () => console.log('False') },
                                                            ],
                                                            { cancelable: true },
                                                        );
                                                    }
                                                })
                                                .catch((err) => {
                                                    this.setState({ loading: false })
                                                    console.log(err);
                                                });
                                        }
                                        else {
                                            Alert.alert(
                                                'Kayıt İşlemi!',
                                                'Girilen Şifre birbirinden farklı.',
                                                [

                                                    { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                                                ],
                                                { cancelable: true },
                                            );
                                        }
                                    }
                                    else {
                                        Alert.alert(
                                            'Kayıt İşlemi!',
                                            'Şifre boş bırakılamaz, en az 6 karakter olmalı',
                                            [

                                                { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                                            ],
                                            { cancelable: true },
                                        );
                                    }
                                }//Plaka...
                                else {
                                    Alert.alert(
                                        'Kayıt İşlemi!',
                                        'Plaka alanı boş bırakılamaz.',
                                        [

                                            { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                                        ],
                                        { cancelable: true },
                                    );
                                }
                            } // Tel...
                            else {
                                Alert.alert(
                                    'Kayıt İşlemi!',
                                    'Telefon alanı boş bırakılamaz.',
                                    [

                                        { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                                    ],
                                    { cancelable: true },
                                );
                            }
                        } //E-Posta...
                        else {
                            Alert.alert(
                                'Kayıt İşlemi!',
                                'E-Posta alanı boş bırakılamaz.',
                                [

                                    { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                                ],
                                { cancelable: true },
                            );
                        }
                    }// Soyadı...
                    else {
                        Alert.alert(
                            'Kayıt İşlemi!',
                            'Soyadı alanı boş bırakılamaz.',
                            [

                                { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                            ],
                            { cancelable: true },
                        );
                    }
                }//Adı...
                else {
                    Alert.alert(
                        'Kayıt İşlemi!',
                        'Adınızı girmelisiniz.',
                        [

                            { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: true },
                    );
                }
            }
            else {
                Alert.alert(
                    'Onay İşlemi!',
                    '* Sözleşmeyi Okudum onayladım \n* Kampanya ve Duyurular için benimle iletişime geçilmesine izin veriyorum.'
                    + '\n Onaylamalısınız.',
                    [

                        { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: true },
                );
            }
        } catch (error) {
            this.setState({ loading: false })
            console.log('hata oluştu: ' + error);
        } finally {
            this.setState({ loading: false })
        }
    }
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar style={{ color: '#fff' }} barStyle="light-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("hesabim")}>
                            <Icon name="arrow-back" style={{ color: '#fff' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Yeni Kayıt</Title>
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
                            textContent={'Lütfen Bekleyiniz...'}
                            textStyle={styles.spinnerTextStyle}
                        />
                    </View>
                    <Content style={{ backgroundColor: '#fff', }}>
                        <Body>
                            <Form>
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
                                    <Icon active name='mail' underlayColor='#2089dc' color='#fff' />
                                    <Input placeholder='e-posta adresi giriniz...'
                                        keyboardType="email-address"
                                        placeholderTextColor="#efefef"
                                        onChangeText={(value) => this.setState({ eposta: value })}
                                        value={this.state.eposta}
                                        underlineColorAndroid="transparent" />
                                </Item>
                                <Item regular style={styles.Inputs}>
                                    <Icon active name='person' color='#fff' />
                                    <TextInputMask style={styles.Inputs1}
                                        placeholder="Telefon Giriniz..."
                                        placeholderTextColor="#efefef"
                                        keyboardType="phone-pad"
                                        refInput={ref => { this.input = ref }}
                                        onChangeText={(formatted, extracted) => {
                                            this.setState({ tel: formatted })
                                            //  console.log(formatted)
                                            //  console.log(extracted)
                                        }}
                                        mask={"0 [000] [000] [00] [00]"}
                                    />

                                </Item>
                                <Item regular style={styles.Inputs}>
                                    <Icon active name='person' underlayColor='#2089dc' color='#fff' />
                                    <Input placeholder='Plaka Giriniz...'
                                        autoCapitalize='characters'
                                        keyboardType="name-phone-pad"
                                        placeholderTextColor="#efefef"
                                        onChangeText={(value) => this.setState({ plaka: value })}
                                        value={this.state.plaka}
                                        underlineColorAndroid="transparent" />
                                    <TextInputMask style={styles.Inputs1}
                                        autoCapitalize="characters"
                                        placeholder="Plaka Giriniz..."
                                        placeholderTextColor="#efefef"
                                        keyboardType="name-phone-pad"
                                        //   onChangeText={(value) => this.setState({ plaka: value })}
                                        value={this.state.plaka}
                                        underlineColorAndroid="transparent"

                                        refInput={ref => { this.input = ref }}
                                        onChangeText={(formatted, extracted) => {
                                            this.setState({ plaka: formatted })
                                            //  console.log(formatted)
                                            //  console.log(extracted)
                                        }}
                                    // mask={"[00] [AAa] [0000]"}
                                    />
                                </Item>
                                <Item picker style={styles.Inputs}>
                                    <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={pompa}></Image>
                                    <Picker borderColor='black'
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Yakıt Tipi"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        //   selectedValue={this.state.yakitTipi}
                                        //    onValueChange={this.onYakitTipiValueChange.bind(this)}
                                        // onValueChange={(itemValue, itemIndex) => this.setState({ yakitTipi: itemValue, yakitTipiDeger:itemIndex },this.onYakitTipiValueChange.bind(this))}
                                        selectedValue={this.state.selected2}
                                        onValueChange={this.onValueChange2.bind(this)}>
                                        {
                                            this.state.yakitTipleri.map((item, key) => (
                                                //  console.log("ttip: " + item.bm_yakittipiadi),
                                                //  console.log("ttip: " + item.bm_yakittipiid),
                                                <Picker.Item
                                                    label={item.bm_yakittipiadi}
                                                    value={item.bm_yakittipiid}
                                                    key={item.bm_yakittipiid} />)
                                            )
                                        }
                                    </Picker>
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
                                            console.log(mobilKodFormatted)
                                            console.log(mobilextracted)
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
                                        onChangeText={(value) => this.setState({ Sifre: value })}
                                        value={this.state.Sifre}
                                        underlineColorAndroid="transparent" />
                                </Item>
                                <Item regular style={styles.Inputs}>
                                    <Icon active name='key' underlayColor='#2089dc' color='#fff' />
                                    <Input placeholder='Şifre (tekrar)... '
                                        // keyboardType="email-address"
                                        placeholderTextColor="#efefef"
                                        secureTextEntry={true}
                                        onChangeText={(value) => this.setState({ Sifre2: value })}
                                        value={this.state.Sifre2}
                                        underlineColorAndroid="transparent" />
                                </Item>
                            </Form>
                        </Body>

                        <View style={styles.switchcontainer}>
                            <View style={{ alignContent: 'center' }}>
                                <Text style={styles.switcText}>Sözleşmeyi Okudum Onaylıyorum</Text>
                            </View>

                            <Switch
                                onValueChange={(value) => this.OkudumOnayladim(value)}
                                style={{ marginBottom: 0 }}
                                value={this.state.SozlesmeOkudum} />
                        </View>
                        <View style={styles.switchcontainer}>
                            <View style={{ alignContent: 'center', marginBottom: 5 }}>
                                <Text style={styles.switcText}>Kampanya ve duyurular için benimle{"\n"}iletişime geçilmesine izin veriyorum</Text>
                            </View>

                            <Switch
                                onValueChange={(value) => this.KapmanyaDuyuru(value)}
                                style={{ marginBottom: 0 }}
                                value={this.state.KampanyaDuyurular} />
                        </View>
                        <Button block danger style={styles.mb15} onPress={() => this._btnKayit()}>
                            <Text style={styles.buttonText}>KAYIT OL</Text>
                        </Button>
                    </Content>
                </View>

            </Container>
        );
    }
}


const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    container: {
        flex: 1,
    },
    container1: {
        flex: 2,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    containerOrta: {
        flex: 10,
        flexDirection: 'column',
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
        height: '80%',
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
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 5,
        marginBottom: 10,
        height: 40,
        width: 300,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderWidth: 1,
        //color:'black',
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
})