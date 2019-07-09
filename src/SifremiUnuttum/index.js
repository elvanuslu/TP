
import React, { Component } from 'react';
import { Alert, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Item, Title, Left, Right, Button, Container, Header, Body, Icon, Input, Content } from 'native-base';

import { SendPasswordByEmailAfterChangedPsw } from '../Service/FetchUser';
import Spinner from 'react-native-loading-spinner-overlay';
import TextInputMask from 'react-native-text-input-mask';

const k1 = require("../../assets/Resim.png");


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
                        console.log('Send email ' + JSON.stringify(res));
                        this.setState({ loading: false })
                        Alert.alert('Şifre Değiştirme', res.message)
                    })
                    .finally(
                        this.setState({ loading: false }))

            }
            else {
                this.setState({ loading: false });
                Alert.alert('Hata', 'Eposta alanı boş bırakılamaz.')
            }
        } catch (error) {
            this.setState({ loading: false })
            Alert.alert('Hata Oluştu', error)
        }
        finally {
            this.setState({ loading: false })
        }
    }
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar backgroundColor="transparent" barStyle="lyight-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("login")}>
                            <Icon name="arrow-back" style={{ color: '#fff' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Şifremi Unuttum</Title>
                    </Body>

                </Header>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner
                        visible={this.state.loading}
                        textContent={'Lütfen Bekleyiniz...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                </View>
                <View style={styles.container1}>
                    <View>
                        <Image style={{ resizeMode: 'contain', height: 80, marginTop: 5 }} source={require('../../assets/logo.png')}
                        />
                        <Image style={{ alignSelf: 'center', marginTop: 15, marginLeft: 30, marginRight: 30, width: '90%', height: 1, }} source={require('../../assets/cizgi.png')} />
                    </View>
                </View>
                <View style={styles.containerOrta}>
                    <Image source={k1} style={styles.logo}></Image>
                </View>
                <View style={styles.containerAlt}>
                    <Content style={{ backgroundColor: '#fff' }} >
                        <View style={{ alignItems: 'flex-start'}}>
                            <Text style={styles.textYazi}>Kayıtlı e-posta adresinizi ilgili alana girerek, şifrenizi e-posta adresinize gönderebilirsiniz.{'\n\n'} </Text>
                        </View>

                        <Item regular style={styles.Inputs}>
                            <Icon active name='mail' color='#fff' />
                            <TextInputMask style={styles.Inputs1}
                                placeholder='E-Posta adresinizi giriniz'
                                placeholderTextColor="#gray"
                                keyboardType="email-address"
                                refInput={ref => { this.input = ref }}
                                onChangeText={(formatted, extracted) => {
                                    this.setState({ eposta: formatted })
                                    //  console.log(formatted)
                                    // console.log(extracted)
                                }}
                            //  mask={"0 [000] [000] [00] [00]"}
                            />

                        </Item>
                        <TouchableOpacity onPress={() => this._SendPasswordByEmailAfterChangedPsw()}>
                            <Image
                                style={styles.button}
                                source={require('../../assets/gonder.png')}
                            />
                        </TouchableOpacity>
                    </Content>
                </View>




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
        marginTop: 1,
        marginBottom: 1,
        fontFamily: "Myriadpro-Regular",
    },
    container: {
        flex: 1,
        //  flexDirection: 'column',
    },
    container1: {
        flex: 1,
        //backgroundColor: 'red',
        // backgroundColor: '#efefef',
    },
  
    containerOrta: {
        flex: 2,
       // backgroundColor: 'red',
        // backgroundColor: '#efefef',
    },
    containerAlt: {
        flex: 3,
        alignItems: 'center',
        // marginTop: 0,
       // backgroundColor: 'yellow',


    },
    containerOrta: {
        flex: 3,

        //   backgroundColor: '#efefef',
    },
    logo: {
        width: '100%',
        height: 222,
        marginLeft: 0,
        marginRight: 0,
        //     marginBottom:10,
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
        marginTop: 5,
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