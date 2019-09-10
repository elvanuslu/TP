
import React, { Component } from 'react';
import { Alert, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Item, Title, Left, Right, Button, Container, Header, Body, Icon, Input, Content } from 'native-base';

import { SendPasswordByEmailAfterChangedPsw } from '../Service/FetchUser';
import Spinner from 'react-native-loading-spinner-overlay';
import TextInputMask from 'react-native-text-input-mask';
import { ScrollView } from 'react-native-gesture-handler';

//const k1 = require("../../assets/Resim.png");
const k1 = require("../../assets/TP_AdimizdaUlkemiz.jpg")

export default class SifremiUnuttum extends Component {
    constructor() {
        super();
        this.state = {
            eposta: undefined,
            formatted: '',
            extracted: '',
            loading: false,
        }
    }

    _SendPasswordByEmailAfterChangedPsw = () => {
        try {

            this.setState({ loading: true })
            if (this.state.eposta != undefined) {
                SendPasswordByEmailAfterChangedPsw(this.state.eposta)
                    .then((res) => {
                        //  console.log('Send email ' + JSON.stringify(res));
                        // if(res.status===false) // {"status":false,"message":"Böyle bir kullanıcı yoktur!","bm_crmtrxuniqueid":0}


                        this.setState({ loading: false })
                        setTimeout(() => {

                            Alert.alert(
                                'Şifre Değiştirme',
                                res.message,
                                [

                                    { text: 'Tamam', onPress: () => this.props.navigation.navigate("login") },
                                ],
                                { cancelable: true },
                            )
                        }, 510);

                    })

            }
            else {
                this.setState({ loading: false });
                setTimeout(() => {
                    Alert.alert('Hata', 'Eposta alanı boş bırakılamaz.')
                }, 510);

            }
        } catch (error) {
            this.setState({ loading: false })
            setTimeout(() => {
                Alert.alert('Hata Oluştu', error)
            }, 510);

        }

    }
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar backgroundColor="transparent" barStyle="lyight-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("login")}>
                            <Image style={{ marginLeft: -15, width: 50, height: 50, resizeMode: 'contain', }} source={require('../../assets/GeriDongri.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Şifremi Unuttum</Title>
                    </Body>
                    <Right></Right>
                </Header>
                <ScrollView>
                    <Content>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Spinner
                                visible={this.state.loading}
                                textContent={'Lütfen Bekleyiniz...'}
                                textStyle={styles.spinnerTextStyle}
                            />
                        </View>

                       

                        <View style={styles.containerOrta}>
                            <Image source={k1} style={styles.logo}></Image>
                        </View>
                        <View style={styles.containerAlt}>

                            <View style={{ alignItems: 'flex-start', marginTop: 10 }}>
                                <Text style={styles.textYazi}>Kayıtlı e-posta adresinizi ilgili alana girerek, şifrenizi e-posta adresinize gönderebilirsiniz.{'\n\n'} </Text>
                            </View>

                            <Item regular style={styles.Inputs}>
                                <Icon active name='mail' color='#fff' />
                                <Input placeholder='E-Posta adresinizi giriniz'
                                    keyboardType="email-address"
                                    onChangeText={(value) => this.setState({ eposta: value })}
                                    value={this.state.eposta}
                                    placeholderTextColor="gray"
                                    underlineColorAndroid="transparent" />



                            </Item>
                            <TouchableOpacity onPress={() => this._SendPasswordByEmailAfterChangedPsw()}>
                                <Image
                                    style={styles.button}
                                    source={require('../../assets/gonder.png')}
                                />
                            </TouchableOpacity>

                        </View>
                        <View style={styles.container}>
                        </View>
                    </Content>
                </ScrollView>


            </Container>
        );
    }
}


const styles = StyleSheet.create({
    textYazi: {
        color: 'gray',
        fontSize: 12,
        textAlign: 'left',
        marginLeft: 30,
        marginTop: 5,
        marginBottom: 1,
        fontFamily: "Myriadpro-Regular",
    },
    container: {
        flex: 1,
       
    },
    container1: {
        flex: 2,
        //backgroundColor: 'red',
        // backgroundColor: '#efefef',
    },

    containerOrta: {
        flex: 1,
        // backgroundColor: 'red',
        // backgroundColor: '#efefef',
    },
    containerAlt: {
        flex: 3,
        //   alignItems: 'center',
        // marginTop: 0,
        backgroundColor: 'transparent',


    },

    logo: {
        marginTop:-10,
        width: '100%',
        height: 320,
        resizeMode: 'contain',
    },
    cardmb: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    textYazi2: {
        fontSize: 14,
        color: '#757575',
        textAlign: 'left',
        marginLeft: 25,
        marginRight: 20,
        marginBottom: 0,
        fontFamily: 'FontAwesome',
        fontWeight: 'normal',
    },
    textBaslik: {
        color: 'red',
        fontSize: 18,
        //  fontWeight:'bold',
        textAlign: 'left',
        marginLeft: 5,
        marginRight: 5,
        fontFamily: "Myriadpro-Bold",
        marginBottom: 10,
        marginTop: 15,
    },
    Inputs: {
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5,
        marginTop: 1,
        borderColor: 'black',
        borderWidth: 1,
        alignSelf: 'center',
        height: 50,
    },
    Inputs1: {
        alignSelf: 'center',
        //  height: 70,

        width: '90%',
        borderColor: 'black',
    },
    button: {
        resizeMode: 'contain',
        width: '90%',
        alignSelf: 'center',
        marginTop: 0,
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
})