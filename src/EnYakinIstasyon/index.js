import React, { Component } from 'react';
import { ListView, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import {
    Footer,
    FooterTab,
    List,
    ListItem, Item, Picker, Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content
} from 'native-base';
import { getIstasyonWithLatLon } from '../Service/FetchUser';

const tmis = require("../../assets/tmis.png");
const yoltarifi = require("../../assets/yoltarifi.png");
const pompa = require("../../assets/pompa.png");
const yagdegisim = require("../../assets/yagdegisim.png");
const bankamatik = require("../../assets/tasittanima.png");


export default class EnYakinIstasyon extends Component {
    constructor() {
        super();
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            userName: '',
            listViewData: [],
            tab1: false,
            tab2: false,
            error: null,
        }
    }
    toggleTab1() {
        this.setState({
            tab1: true,
            tab2: false,
            tab3: false,
            tab4: false
        });
        this.props.navigation.navigate("Harita");
    }
    toggleTab2() {
        this.setState({
            tab1: false,
            tab2: true,
            tab3: false,
            tab4: false
        });
        this.props.navigation.navigate("EnYakinIstasyon")
    }
    isAvailable() {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 3000, 'Request timed out');
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
    _getData() {
        try {
            this.isAvailable();
            this.setState({ loading: true })
            getIstasyonWithLatLon(this.state.latitude, this.state.longitude, 25).then((res) => {
                this.setState({ listViewData: res, loading: false });
                // console.log('res= ' + JSON.stringify(this.state.listViewData));
            })
        } catch (error) {
            Alert.alert('Hata', error);
        }
        finally {
            this.setState({ loading: false })
        }
    }
    /*
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
                this._getData();
                console.log('LAT: ' + this.state.latitude + ' Lon: ' + this.state.longitude);
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }
    */
    componentWillMount() {
        var self = this;
        this.setState({ loading: true })
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                    loading: false,
                });
                this._getData();
                console.log('LAT: ' + this.state.latitude + ' Lon: ' + this.state.longitude);
            },
            (error) => this.setState({
                error: error.message,
                latitude: 40.802095,
                longitude: 29.526954,
            },
                this._getLatLon()),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        this._getData();

    }
    GetItem(item) {
        console.log('item=' + item);
        this.props.navigation.navigate("Harita", { Id: item });
    }
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar style={{ color: '#fff' }} backgroundColor="transparent" barStyle="light-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('AnaSayfa')}>
                            <Icon name="arrow-back" style={{ color: '#fff' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>En Yakın İstasyon</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" style={{ color: '#fff' }} />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container1} >
                    <Image style={styles.logo} source={require('../../assets/tplogo.png')}
                    />
                    <Image style={{ width: '100%', height: 1, }} source={require('../../assets/cizgi.png')} />
                </View>
                <View style={styles.containerOrta}>

                    <View style={{ marginBottom: 10, marginTop: -10 }} >
                        <FlatList
                            data={this.state.listViewData}
                            renderItem={({ item }) =>
                                <Card key={item.AccountId} style={styles.cardmb}>
                                    <TouchableOpacity onPress={() => this.GetItem(item.AccountId)}>
                                        <CardItem cardBody>
                                            <Body>
                                                <View style={{ width: '100%', flexDirection: 'row', }}>
                                                    <Image style={{ width: 25, resizeMode: 'contain', marginLeft: 10, marginTop: -20 }} source={pompa} />
                                                    <Text style={styles.txt}>{item.name.trim().toUpperCase()}</Text>

                                                </View>
                                                <View style={{ backgroundColor: 'transparent' }}>
                                                    <Text style={styles.txt2}>{item.Adres.trim()}</Text>
                                                </View>
                                                <View style={{ width: '100%', flexDirection: 'row', marginTop: -10, marginLeft: 30 }}>
                                                    {item.yikama == true ? (<Image style={{ width: 40, height: 40, resizeMode: 'contain', marginLeft: 2, marginRight: 5, marginTop: 0, }} source={tmis} />) : false}
                                                    {item.yagdegisimi == true ? (<Image style={{ width: 30, height: 30, resizeMode: 'contain', marginLeft: 5, marginTop: 10, }} source={yagdegisim} />) : false}
                                                    {item.bankamatik == true ? (<Image style={{ width: 30, height: 30, resizeMode: 'contain', marginLeft: 5, marginTop: 10, }} source={bankamatik} />) : false}
                                                </View>
                                            </Body>
                                            <Right style={{ height: 80, width: 50 }}>
                                                <Image style={{ width: 30, resizeMode: 'contain', marginRight: 5, marginTop: -70, }} source={yoltarifi} />

                                            </Right>

                                        </CardItem>
                                    </TouchableOpacity>
                                </Card>

                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
                <View>
                    <Footer>
                        <FooterTab style={{ backgroundColor: 'red', }}>
                            <Button active={this.state.tab1} onPress={() => this.toggleTab1()}>
                                <Icon active={this.state.tab1} name="map" />
                                <Text style={{ color: 'white' }}>Harita</Text>
                            </Button>
                            <Button active={this.state.tab2} onPress={() => this.toggleTab2()}>
                                <Icon active={this.state.tab2} name="contact" />
                                <Text style={{ color: 'white' }}>Liste</Text>
                            </Button>

                        </FooterTab>
                    </Footer>

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
    },
    containerOrta: {
        flex: 8,
        backgroundColor: 'transparent',
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    containerBottom: {
        flex: 4,
        backgroundColor: 'transparent',
        // alignItems: 'center',
        //    flexDirection: 'column',
    },
    logo: {
        marginTop: 5,
        //  width: 150,
        height: '60%',
        resizeMode: 'contain',
        marginBottom: 5,
        alignSelf: 'center',
    },

    button: {
        resizeMode: 'contain',
        width: 20,
        height: 20,
        marginRight: 1,
        marginLeft: 5,
        marginBottom: 0,

    },
    txt: {
        marginLeft: 5,
        fontSize: 14,
        marginTop: 5,
        color: 'red',
        fontFamily: 'Myriadpro-Bold',
    },
    txt2: {
        marginLeft: 40,
        fontSize: 12,
        marginTop: -30,
        alignSelf: 'flex-start',
        fontFamily: 'Myriadpro-Regular',

    },
    cardmb: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});
