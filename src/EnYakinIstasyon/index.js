import React, { Component } from 'react';
import { ListView, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import {
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
        }
    }
    _getData() {
        getIstasyonWithLatLon(this.state.latitude, this.state.longitude, 5).then((res) => {
            this.setState({ listViewData: res });
            console.log('res= ' + JSON.stringify(this.state.listViewData));
        })
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
        this._getData();

    }
    GetItem(item) {
        console.log('item='+item);
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
                 
                    <View style={{marginBottom:10,marginTop:-10}} >
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
                                                    {item.yikama == true ? (<Image style={{ width: 50,height:50, resizeMode: 'contain', marginLeft: 2, marginRight: 5, marginTop: 0, }} source={tmis} />) : false}
                                                    {item.yagdegisimi == true ? (<Image style={{ width: 30,height:30, resizeMode: 'contain', marginLeft: 5,  marginTop: 10, }} source={yagdegisim} />) : false}
                                                    {item.bankamatik == true ? (<Image style={{ width: 30,height:30, resizeMode: 'contain', marginLeft: 5,  marginTop: 10, }} source={bankamatik} />) : false}
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
