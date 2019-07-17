import React, { Component } from 'react';
import { ListView, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import {
    Switch, List, ListItem, Item, Picker, Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import { getSatisPuanDetay, getStorage } from '../Service/FetchUser';

const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");

export default class SatisVePuanDetay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            kullanici: '',
            formatted: '',
            extracted: '',
            data: [],
            pomp: undefined,
            oldId: '',
        }
    }

    _getSatisPuanDetay = async (pompaId) => {
        try {
            this.setState({ loading: true })
            const uId = await getStorage('userId');
            // const pompaId = await getStorage('pompaId');

            getSatisPuanDetay(pompaId)
                .then((res) => {
                    //console.log('res= '+JSON.stringify(res))
                    this.setState({ data: res, loading: false })
                    //   console.log('Data=' + JSON.stringify(this.state.data));
                })
                .catch((error) => alert(error))
        } catch (error) {
            alert('Hata Oluştu ' + error)
        }

    }


    componentDidMount() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('pompaID', '');
        this._getSatisPuanDetay(itemId);
            this.setState({ oldId: itemId })

    }
    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('pompaID', '');

        if (itemId !== this.state.oldId) {
            console.log('mPompaId= ' + itemId + ' Old Id= ' + this.state.oldId);
            this._getSatisPuanDetay(itemId);
            this.setState({ oldId: itemId })
        }
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
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner
                        visible={this.state.loading}
                        textContent={'Yükleniyor...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                </View>

                <View style={styles.containerBottom}>
                    <Content style={{ marginLeft: 5, marginRight: 5 }}>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#fff" }}>
                                    <Image style={{ width: 20, resizeMode: 'contain', }} source={require('../../assets/tarih_1.png')} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Tarih:</Text>
                            </Body>
                            <Right>
                                <Text>{this.state.data.bm_islemtarihi}</Text>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#fff" }}>
                                    <Image style={{ width: 18, resizeMode: 'contain', }} source={require('../../assets/miktar_1.png')} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Miktar:</Text>
                            </Body>
                            <Right>
                                <Text>{this.state.data.bm_litre} LT</Text>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#fff" }}>
                                    <Image style={{ width: 20, resizeMode: 'contain', }} source={require('../../assets/ucret_1.png')} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Ücret:</Text>
                            </Body>
                            <Right>
                                <Text>{this.state.data.bm_toplamtutar} TL</Text>
                            </Right>
                        </ListItem>

                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#fff" }}>
                                    <Image style={{ width: 22, resizeMode: 'contain', }} source={require('../../assets/pomp.png')} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Ürün:</Text>
                            </Body>
                            <Right>
                                <Text>{this.state.data.productname}</Text>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#fff" }}>
                                    <Image style={{ width: 20, resizeMode: 'contain', }} source={require('../../assets/arac.png')} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Plaka:</Text>
                            </Body>
                            <Right>
                                <Text>{this.state.data.bm_plaka}</Text>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#fff" }}>
                                    <Image style={{ width: 20, resizeMode: 'contain', }} source={require('../../assets/istasyon_1.png')} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>İstasyon:</Text>
                            </Body>
                            <Right>
                                <Text>{this.state.data.istasyonname}</Text>
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
        //alignItems: 'center',
       // marginBottom: 5,
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
        width: '100%',
        height: 80,
        resizeMode: 'contain',
        marginBottom: 6,
        alignSelf:'center'
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
