
import React, { Component } from 'react';
import { Alert, Switch, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Picker, Form, Icon, Content, Input, Item, Title, Left, Right, Button, Container, Header, Body, Card, CardItem } from 'native-base';
import Icon1 from "react-native-vector-icons/FontAwesome";
import Spinner from 'react-native-loading-spinner-overlay';

import TextInputMask from 'react-native-text-input-mask';

import { checkActivation, getYakitTipi, MusteriKayit, getStorage, setStorage } from '../Service/FetchUser';


const pompa = require("../../assets/pompatabancakirmizi.png");
const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");
const odeme = require("../../assets/odemeTutar.png");

export default class Kodec extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: undefined,
            SmsDegeri: undefined,
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log('NextProps ' + JSON.stringify(nextProps));
        const Id = this.props.navigation.state.params.Id;
        this.setState({ user: Id });
    }
    componentDidMount() {
        console.log('NextProps ' + JSON.stringify(this.props));
        const Id = this.props.navigation.state.params.Id;
        this.setState({ user: Id });
    }
    _Aktivasyon() {
        try {
            console.log('Id = ' + this.state.user + ' SmS= ' + this.state.SmsDegeri)
            checkActivation(this.state.user, this.state.SmsDegeri)
                .then((res) => {
                    console.log('CheckAktivation ' + JSON.stringify(res));
                    if (res.status === true) {

                        Alert.alert(
                            'Kayıt İşlemi!',
                            'Aktivasyon Başarılı...',
                            [
                                {
                                    text: 'Tamam', onPress: () => {
                                        setStorage('userId', this.state.user)
                                        this.props.navigation.navigate("hesabim");
                                    }
                                },
                            ],
                            { cancelable: true },
                        );


                    }
                    else {
                        Alert.alert(
                            'Kayıt İşlemi!',
                            'Aktivasyon Hatası...',
                            [
                                {
                                    text: 'Tamam', onPress: () => {

                                        ''
                                    }
                                },
                            ],
                            { cancelable: true },
                        );
                    }
                })

            console.log('Ret Degeri = ' + this.state.SmsDegeri);
        } catch (error) {
            Alert.alert('Hata Oluştu', error);
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
                        <Title style={{ color: '#fff' }}>Kod Giriniz</Title>
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
                    <Card style={{marginLeft:30,marginRight:30}}>
                        <CardItem header>
                            <Text style={styles.txtYaz}>Lütfen Sms ile gelen Kodu giriniz...</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Item regular style={styles.Inputs1} >
                                    <Image style={styles.ImageShow} source={odeme}></Image>
                                    <Input placeholder='Sms Kodunuzu Giriniz...'
                                        keyboardType="decimal-pad"
                                        placeholderTextColor="#efefef"
                                        onChangeText={(value) => this.setState({ SmsDegeri: value })}
                                        value={this.state.SmsDegeri}
                                        underlineColorAndroid="transparent" />
                                </Item>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                        <Button block danger style={styles.mb15} onPress={() => this._Aktivasyon()}>
                            <Text style={styles.buttonText}>KAYIT OL</Text>
                        </Button>
                        </CardItem>
                    </Card>


                
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    ImageShow: {
        width: 30, height: 25, resizeMode: 'contain'
    },
    txtYaz: {
        color: 'gray',
        fontSize: 11,
        textAlign: 'left',
        fontFamily: "FontAwesome",

    },
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
        marginTop: 15,
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
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
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
        width: '90%',

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