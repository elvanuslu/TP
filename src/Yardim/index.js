
import React, { Component } from 'react';
import { Alert, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import {Content, Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem } from 'native-base';

import { getSSS } from '../Service/FetchUser';
import Spinner from 'react-native-loading-spinner-overlay';



const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");

export default class Yardim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datam: [],
            loading: false
        }
    }
    _getYardim = async () => {
        try {
            this.setState({ loading: true })
            getSSS(4)
                .then((response) => {
                    this.setState({ datam: response, loading: false })
                    // console.log(JSON.stringify(response))
                })
                .catch((error) => {
                    Alert.alert('Servis Hatası!', error)
                })
        } catch (error) {
            Alert.alert('Hata Oluştu!', error)
        }
    }
    componentDidMount() {
        this._getYardim();
    }

    render() {
        return (
            <Container style={styles.container}>
                <StatusBar backgroundColor="transparent" barStyle="dark-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('AnaSayfa')}>
                            <Icon name="arrow-back" style={{ color: '#fff' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Yardım/SSS</Title>
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
                        data={this.state.datam}
                        renderItem={({ item }) =>
                            <Card key={item.bm_mobilcerikId} style={styles.cardmb}>
                                <CardItem header>
                                    <Text style={styles.textBaslik}>{item.bm_kisaaciklama}</Text>
                                </CardItem>
                                <CardItem cardBody style={{ borderRadius: 5 }}>
                                    <Content>
                                        <Text style={styles.txtYazi}>{item.bm_uzunaciklama}</Text>
                                    </Content>

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
    spinnerTextStyle: {
        color: '#FFF'
    },
    txtYazi: {
        color: 'black',
        fontSize: 12,
        //  fontWeight:'bold',
        textAlign: 'left',
        margin: 10,
        fontFamily: "Myriadpro-Regular",
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
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 20,
        marginTop: 15,
        borderRadius: 10,
    },
})