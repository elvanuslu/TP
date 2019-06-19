
import React, { Component } from 'react';
import { Alert, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Switch, CheckBox, Form, Input, Item, Picker, Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content } from 'native-base';

import { getYakitTipi, getPlakaList, getStorage, campaignDetailList } from '../Service/FetchUser';

import Spinner from 'react-native-loading-spinner-overlay';

const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");

const logo = require("../../assets/logoKirmiz.png");
const pompa = require("../../assets/pompatabancakirmizi.png");
const plaka = require("../../assets/plakaKirmizi.png");
const pmpa = require("../../assets/pompaKirmizi.png");
const odeme = require("../../assets/odemeTutar.png");
const kampanya = require("../../assets/kapmpanyakirmizi.png");
const datas = [
    {
        bm_kampanyaid: 1,
        bm_pictureurl: k2,
        bm_kisaaciklama1: "Kumar Pratik",
        bm_kisaaciklama: "Its time to build a difference . .",
        time: "3:43 pm"
    },
    {
        bm_kampanyaid: 2,
        bm_pictureurl: k1,
        bm_kisaaciklama1: "Kumar Sanket",
        bm_kisaaciklama: "One needs courage to be happy and smiling all time . . ",
        time: "1:12 pm"
    },
    {
        bm_kampanyaid: 3,
        bm_pictureurl: k3,
        bm_kisaaciklama1: "Kumar Sanket",
        bm_kisaaciklama: "One needs courage to be happy and smiling all time . . ",
        time: "1:12 pm"
    },
];

export default class KampanyaSec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kullaniciId: undefined,
            datam: [],
            loading: false,
        }
    }
    _btnDevam=()=>{
        alert('devam');
    }
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar backgroundColor="transparent" barStyle="dark-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('hesabim')}>
                            <Icon name="arrow-back" style={{ color: '#fff' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Kampanya Seç</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" style={{ color: '#fff' }} />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container1}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner
                            visible={this.state.loading}
                            textContent={'Yükleniyor...'}
                            textStyle={styles.spinnerTextStyle}
                        />
                    </View>
                    <FlatList
                        data={datas}
                        renderItem={({ item }) =>
                            <Card key={item.bm_kampanyaid} style={styles.cardmb}>
                                <CardItem header>
                                    <Text style={styles.textBaslik}>{item.bm_kisaaciklama}</Text>
                                </CardItem>
                                <CardItem cardBody style={{ borderRadius: 10 }}>
                                    <Body>
                                        <TouchableOpacity style={styles.logo} onPress={() => this.GetItem(item.bm_kampanyaid)}>
                                            <Image style={styles.logo} source={{ uri: item.bm_pictureurl }} />
                                        </TouchableOpacity>
                                    </Body>
                                </CardItem>
                                <CardItem footer >
                                <Button block danger style={{ marginTop: 5, marginLeft: 5, marginRight: 5,width:'100%' }} onPress={() => this._btnDevam()}>
                                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>SEÇ VE DEVAM ET</Text>
                                </Button>
                                </CardItem>
                            </Card>

                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

            </Container>
        );
    }

}

const styles = StyleSheet.create({
    mb15: {
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    spinnerTextStyle: {
        color: '#FFF'
    },


    container: {
        flex: 1,
        //  flexDirection: 'column',
    },
    container1: {
        flex: 6,
        backgroundColor: '#efefef',
    },
    container2: {
        flex: 8,
    },
    logo: {
        width: '100%',
        height: 220,
        resizeMode: 'contain',
    },
    cardmb: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        borderRadius:10,
    },
})