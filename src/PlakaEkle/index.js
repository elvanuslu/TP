
import React, { Component } from 'react';
import { Alert, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar, } from 'react-native';
import { Form, Input, Item, Picker, Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content } from 'native-base';
import TextInputMask from 'react-native-text-input-mask';
import Spinner from 'react-native-loading-spinner-overlay';

const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");

const pompa = require("../../assets/pompatabancakirmizi.png");
const plaka = require("../../assets/plakaKirmizi.png");
const pmpa = require("../../assets/pompaKirmizi.png");
const araba = require("../../assets/araba.png");

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
            getAracMarkaList()
                .then((res) => {
                    this.setState({ markalar: res, loading: false })
                    console.log(JSON.stringify(this.state.markalar))
                })
                .catch((error) => {
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
            getYakitTipi()
                .then((res) => {
                    this.setState({ yakitlst: res, loading: false })
                    //  console.log(JSON.stringify(res))
                })
                .catch((error) => {
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
            const Id = await getStorage('userId');
            getCardById(Id)
                .then((res) => {
                    this.setState({ card: res, loading: false })
                }).catch((error) => {
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
        alert('calıştı'+this.state.plaka1);
    }
    _Kaydet() {
        try {

            this.setState({ loading: true })
            if (this.state.plaka1 != undefined) {
            
                postMusteriArac(this.state.userId, this.state.plaka1, this.state.selected2, this.state.selected3, this.state.araba, this.state.cardSelected)
                    .then((responseData) => {
                        // let response = JSON.stringify(responseData);
                        // console.log('responseData=' + responseData.status)
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
        finally {
            this.setState({ loading: false })
        }
    }
    componentDidMount = async () => {
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

                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("Plakalarim")}>
                            <Icon name="arrow-back" style={{ color: '#fff' }} />
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
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner
                            visible={this.state.loading}
                            textContent={'Lütfen Bekleyiniz...'}
                            textStyle={styles.spinnerTextStyle}
                        />
                    </View>
                    <Form>
                        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                            <Item picker style={styles.Inputs2}>
                                <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={araba}></Image>

                                <Picker borderWidt='1' borderColor='black'
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="Kart Seç..."
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.cardSelected}
                                    onValueChange={this.onCardChange.bind(this)}>
                                    {
                                        this.state.card.map((item, key) => (
                                            <Picker.Item
                                                label={item.bm_kartno}
                                                value={item.bm_kartid}
                                                key={item.bm_kartid} />)
                                        )
                                    }
                                </Picker>
                            </Item>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                            <Item regular style={styles.Inputs2}>
                                <Image style={{ width: 35, height: 35, resizeMode: 'contain', marginRight: 10 }} source={plaka}></Image>
                                <TextInputMask style={styles.Inputs1}
                                    autoCapitalize="characters"
                                    placeholder="Plaka Giriniz..."
                                    placeholderTextColor="#efefef"
                                    keyboardType="name-phone-pad"
                                    refInput={ref => { this.input = ref }}
                                    onChangeText={(formatted, extracted) => {
                                        this.setState({ plaka1: formatted })
                                        // console.log(formatted)
                                        // console.log(extracted)
                                    }}
                                    mask={"[00] [AAa] [0000]"}
                                />

                            </Item>

                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                            <Item picker style={styles.Inputs2}>
                                <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={pompa}></Image>

                                <Picker borderWidt='1' borderColor='black'
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="Yakıt Tipi"
                                    placeholderStyle={{ color: "#bfc6ea" }}
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
                                <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={pompa}></Image>

                                <Picker borderWidt='1' borderColor='black'
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="Yakıt Tipi"
                                    placeholderStyle={{ color: "#bfc6ea" }}
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
                            <Item picker style={styles.Inputs2}>
                                <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={araba}></Image>
                                <Picker style={styles.Inputs2} borderColor='black'
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="Araç Marka/model..."
                                    placeholderStyle={{ color: "#bfc6ea" }}
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
                            <View>
                                <TouchableOpacity onPress={() => this._Kaydet()}>
                                    <Image
                                        style={styles.button}
                                        source={require('../../assets/plakaekle.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Form>
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
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        marginBottom: 30,
    },
    containerOrta: {
        flex: 5,
        backgroundColor: 'transparent',
        marginBottom: 10,
    },
    containerBottom: {
        flex: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'

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
        marginTop: 5,
        width: 100,
        //color:'black',
        borderColor: 'black',
    },
    logo: {
        marginTop: 5,
        // width: '100%',
        height: 70,
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
        marginBottom: 10,
        width: '90%',
        //color:'black',
        borderColor: 'black',
    },
    Inputs2: {
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 5,
        marginBottom: 10,
        height: 50,
        width: 300,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderWidth: 1,
        //color:'black',
        borderColor: 'black',
    },
});
