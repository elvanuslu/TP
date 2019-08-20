
import React, { Component } from 'react';
import { Alert, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar, Linking } from 'react-native';
import { Content, Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem } from 'native-base';

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
            var data = [];
            this.setState({ loading: true })
            getSSS(4)
                .then((response) => {
                    if (response.status !== false) {
                        this.setState({ datam: response, loading: false })
                        console.log(JSON.stringify(response))
                    }
                    else {
                        this.setState({ loading: false })
                        Alert.alert('Hata', response.message)
                    }
                })
                .catch((error) => {
                    this.setState({ loading: false })
                    Alert.alert('Servis Hatası', error)
                })
        } catch (error) {
            this.setState({ loading: false })
            Alert.alert('Hata Oluştu', error)
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
                            <Image style={{ marginLeft: -15, width: 50, height: 50, resizeMode: 'contain', }} source={require('../../assets/GeriDongri.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Bize Ulaşın</Title>
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
                               
                                <CardItem cardBody style={{ borderRadius: 10 }}>
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

/*
 <CardItem header style={{ borderRadius: 10 }}>
                                    <Text style={styles.textBaslik}>{item.bm_kisaaciklama}</Text>
                                </CardItem>

 <Button style={styles.txtYazi}
                                            title={item.bm_uzunaciklama}
                                            onPress={() => Linking.openURL("https://www.skptricks.com")}
                                        />

*/
const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    txtYazi: {
        color: 'black',
        fontSize: 14,
        //  fontWeight:'bold',
        textAlign: 'left',
        margin: 10,
        fontFamily: "MyriadSemiBold",//"Myriadpro-Regular",
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