
import React, { Component } from 'react';
import { Alert, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar, } from 'react-native';
import { Form, Input, Item, Picker, Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content } from 'native-base';
import TextInputMask from 'react-native-text-input-mask';
import Spinner from 'react-native-loading-spinner-overlay';

const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");

const pompa = require("../../assets/pompaGri.png");
//const pompa = require("../../assets/pompatabancakirmizi.png");
const plaka = require("../../assets/plakaGri.png");
//const plaka = require("../../assets/plakaKirmizi.png");
//const pmpa = require("../../assets/pompaKirmizi.png");
const araba = require("../../assets/arac.png");

import { getYakitTipi, getAracMarkaList, getStorage, getCardById, postMusteriArac, MusteriKayit } from '../Service/FetchUser';

export default class PlakaEkle extends Component {
    constructor() {
        super();
        this.state = {
            userId: undefined,
            plaka1: undefined,
            plaka2: '',
            plaka3: '',
            yakitTipi: undefined,
            yakitTipi2: undefined,
            araba: '--Seçiniz--',
            arabaId: undefined,
            markalar: [],
            loading: false,
            yakitlst: [],
            selected2: undefined,
            selected3: '--Seçiniz--',
            labelName: '',
            labelname2: '',
            card: [],
            cardSelected: undefined,
            cardLabel: '',


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
    onValueChange2(value, label) {

        this.setState(
            {
                selected2: value,
                labelName: label
            },
            () => {
                console.log('Yakit 1: ' + this.state.labelName, ' Selected: ' + this.state.selected2)
            }
        )
    }
    onCardChange(value, label) {

        this.setState(
            {
                cardSelected: value,
                cardLabel: label
            },
            () => {
                console.log('CardVal: ' + this.state.cardSelected, ' Selected: ' + this.state.cardLabel)
            }
        )
    }
    onValueChange3(value, label) {

        this.setState(
            {
                selected3: value,
                labelName2: label
            },
            () => {
                console.log('Yakit 2: ' + this.state.labelName2, ' Selected: ' + this.state.selected3)
            }
        )
    }
    onYakitTipiValueChange(value: string) {
        this.setState({
            yakitTipi: value
        });
    }
    onYakitTipi2ValueChange(value: string) {
        this.setState({
            yakitTipi2: value
        });
    }
    onArabaValueChange(value, label) {
        this.setState({
            araba: value,
            arabaId: label,
        },
            () => {
                console.log('Araba Val: ' + this.state.araba, ' Selected: ' + this.state.arabaId)
            }
        );
    }
    _getAracMarkaList = async () => {
        try {
            this.setState({ loading: true })
            getAracMarkaList()
                .then((res) => {
                    var initialArr = { 'bm_aracmarkasiid': '-1', 'bm_adi': 'Marka  Seçin' };
                    res.splice(0, 0, initialArr);
                    this.setState({ markalar: res, loading: false, araba: 'Marka Seç' })

                    // console.log(JSON.stringify(this.state.markalar))
                })
                .catch((error) => {
                    this.setState({ loading: false })
                    Alert.alert(
                        'Araç markalar Servis Hatası!',
                        error,
                        [
                            { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: true },
                    );
                })
        } catch (error) {
            this.setState({ loading: false })
            Alert.alert(
                'Hata!',
                error,
                [
                    { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: true },
            );
        }

    }
    _getYakitTipi = async () => {
        try {
            this.setState({ loading: true })
            getYakitTipi()
                .then((res) => {
                    var initialArr = { 'bm_yakittipiid': '-1', 'bm_yakittipiadi': 'Yakıt Tipi Seçin' };
                    res.splice(0, 0, initialArr);
                    this.setState({ yakitlst: res, loading: false, selected2: 'Yakıt Tipi Seçin' })
                    console.log('Yakıtlar ' + JSON.stringify(res))
                })
                .catch((error) => {
                    this.setState({ loading: false })
                    Alert.alert(
                        'Yakıt Servis Hatası!',
                        error,
                        [
                            { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: true },
                    );
                })
        } catch (error) {
            this.setState({ loading: false })
            Alert.alert(
                'Hata!',
                error,
                [
                    { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: true },
            );
        }
    }
    _getCard = async () => {
        try {
            this.setState({ loading: true })
            const Id = await getStorage('userId');
            getCardById(Id)
                .then((res) => {
                    this.setState({ card: res, loading: false })
                }).catch((error) => {
                    this.setState({ loading: false })
                    Alert.alert(
                        'getCard Servis Hatası!',
                        error,
                        [
                            { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: true },
                    );
                })
        } catch (error) {
            this.setState({ loading: false })
            Alert.alert(
                'Hata!',
                error,
                [
                    { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: true },
            );
        }
    }
    _mKayit = () => {
        alert('calıştı' + this.state.plaka1);
    }
    isAvailable() {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 5000, 'Zaman aşımı');
        });
        const request = fetch('http://85.105.103.4:8096');
        return Promise
            .race([timeout, request])
            .then(response => '')
            .catch(error => {
                Alert.alert('Bağlantı Hatası', 'İnternet bağlantınızı kontrol edin.')
                this.setState({ loading: false })
            });
    }
    _Kaydet() {
        try {

            this.setState({ loading: true })
            if (this.state.plaka1 != undefined) {
                postMusteriArac(this.state.userId, this.state.plaka1, this.state.selected2, this.state.selected3, this.state.araba)
                    .then((responseData) => {
                        this.setState({ loading: false })
                        if (responseData.status === true) {
                            Alert.alert(
                                'Araç Kayıt!',
                                responseData.message,
                                [
                                    { text: 'Tamam', onPress: () => this.props.navigation.navigate("Plakalarim") },
                                ],
                                { cancelable: true },
                            );
                            // console.log("response: " + JSON.stringify(responseData)) 
                        }
                        else {
                            Alert.alert(
                                'Araç Kayıt!',
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
                        Alert.alert(
                            'Araç Kayıt!',
                            err,
                            [

                                { text: 'Tamam', onPress: () => console.log('False') },
                            ],
                            { cancelable: true },
                        );

                        console.log(err);
                    })

            }
        } catch (error) {
            this.setState({ loading: false })
            Alert.alert(
                'Hata!',
                error,
                [
                    { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: true },
            );

        }
      
    }
    componentDidMount = async () => {
        //   this.isAvailable();
        const Id = await getStorage('userId');
        this.setState({ userId: Id })
        this._getAracMarkaList();
        this._getYakitTipi();
        this._getCard();
    }
    render() {
        <StatusBar translucent backgroundColor='transparent' color='white' barStyle="light-content" />
        return (

            <Container style={styles.container}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner
                        visible={this.state.loading}
                        textContent={'Lütfen Bekleyiniz...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                </View>
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("Plakalarim")}>
                            <Image style={{ marginLeft: -15, width: 50, height: 50, resizeMode: 'contain' }} source={require('../../assets/GeriDongri.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Plaka Ekle</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" style={{ color: '#fff' }} />
                        </Button>
                    </Right>
                </Header>
               

                <View style={styles.containerBottom}>
                <View>
                    <Image style={styles.logo} source={require('../../assets/logo.png')} />
                    <Image style={{ marginBottom: 20, marginLeft: 30, marginRight: 30, width: '90%', height: 1, }} source={require('../../assets/cizgi.png')} />
                </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <Item picker style={styles.Inputs2}>
                            <Image style={{ marginLeft: 5, width: 30, height: 30, resizeMode: 'contain' }} source={araba}></Image>
                            <Picker style={styles.Inputs2} borderColor='black'
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Araç Marka/model"
                                placeholderStyle={{ color: "black" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.araba}
                                onValueChange={this.onArabaValueChange.bind(this)}>
                                {
                                    this.state.markalar.map((item, key) => (
                                        <Picker.Item
                                            label={item.bm_adi}
                                            value={item.bm_aracmarkasiid}
                                            key={item.bm_aracmarkasiid}
                                        />
                                    ))
                                }
                            </Picker>
                        </Item>


                        <Item regular style={styles.Inputs2}>
                            <Image style={{ marginLeft: 5, width: 30, height: 30, resizeMode: 'contain', marginRight:5 }} source={plaka}></Image>
                            <TextInputMask style={styles.Inputs1}
                                autoCapitalize="characters"
                                placeholder="Plaka Girin"
                                placeholderTextColor="black"
                                keyboardType="name-phone-pad"
                                refInput={ref => { this.input = ref }}
                                onChangeText={(formatted, extracted) => {
                                    this.setState({ plaka1: formatted })
                                    // console.log(formatted)
                                    // console.log(extracted)
                                }}
                            // mask={"[00] [AAa] [0000]"}
                            />

                        </Item>
                        <Item picker style={styles.Inputs2}>
                            <Image style={{ marginLeft: 5, width: 30, height: 30, resizeMode: 'contain' }} source={pompa}></Image>

                            <Picker borderWidt='1' borderColor='black'
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Yakıt Tipi"
                                placeholderStyle={{ color: "black" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected2}
                                onValueChange={this.onValueChange2.bind(this)}>
                                {
                                    this.state.yakitlst.map((item, key) => (
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
                        <Item picker style={styles.Inputs2}>
                            <Image style={{ marginLeft: 5, width: 30, height: 30, resizeMode: 'contain' }} source={pompa}></Image>

                            <Picker borderWidt='1' borderColor='black'
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Yakıt Tipi"
                                placeholderStyle={{ color: "black" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected3}
                                onValueChange={this.onValueChange3.bind(this)}>
                                {
                                    this.state.yakitlst.map((item, key) => (
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
                        <View style={{marginTop:20,marginLeft:15,marginRight:15}}>
                            <TouchableOpacity onPress={() => this._Kaydet()}>
                                <Image
                                    style={styles.button}
                                    source={require('../../assets/plakaekle.png')}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    container1: {
        flex: 1,
        backgroundColor: 'transparent',

    },
    containerOrta: {
        flex: 2,
        backgroundColor: 'transparent',

    },
    containerBottom: {
        flex: 4,
        backgroundColor: 'transparent',

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
        // marginBottom: 5,
        marginTop: 5,
        width: 100,
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
    /*
    logo: {
        marginTop: 5,
        // width: '100%',
        height: '70%',
        resizeMode: 'contain',
        marginBottom: 10,
        alignItems: 'center',
    },
    */
    banner: {
        // marginTop: 2,
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
        marginBottom: 5,
        overflow: 'hidden',
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
        marginRight: 35,
        marginLeft: 35,
        marginBottom: 0,
        marginTop: -40,

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

    Inputs1: {
        alignSelf: 'center',
        height: 50,
        borderRadius: 5,
        width: '90%',
        fontSize:16,
        //color:'black',
        borderColor: 'black',
    },
    Inputs2: {
        fontSize:14,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 10,
        height: 40,
        width: '70%',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderWidth: 1,
        //color:'black',
        borderColor: 'black',
    },
});
