import React, { Component } from 'react';
import { ImageBackground, Alert, Switch, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Footer, FooterTab, Picker, Form, Icon, Content, Input, Item, Title, Left, Right, Button, Container, Header, Body, Card, CardItem } from 'native-base';
import Icon1 from "react-native-vector-icons/FontAwesome";
import Spinner from 'react-native-loading-spinner-overlay';

import AsyncStorage from '@react-native-community/async-storage';
import { getIstasyonWithLatLon } from '../Service/FetchUser';

import MapView, { PROVIDER_GOOGLE, MAP_TYPES } from 'react-native-maps';
import { showLocation, Popup } from 'react-native-map-link'

const pompa = require("../../assets/pompatabancakirmizi.png");
const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");
const pin = require("../../assets/pin.png");
const background = require("../../assets/petroldetay.png");
const tasittanima = require("../../assets/tasittanima.png");
const telefon = require("../../assets/telefon.png");
const tmis = require("../../assets/tmis.png");
const tpgaz = require("../../assets/tpgaz.png");
const tsarj = require("../../assets/tsarj.png");
const yoltarifi = require("../../assets/yoltarifi.png");

const logo = require("../../assets/logo.png");
const logoFull = require("../../assets/logoFull.png");


export default class Harita extends Component {
    constructor() {
        super();
        this.state = {
            kullanici: '',
            latitude: 40.802095,//41.001895,
            longitude: 29.526954,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            datas: [],
            tab1: false,
            tab2: false,
            tab3: true,
            tab4: false,
            isVisible: false,
            hedefLat: undefined,
            hedefLon: undefined,
        }

    }
    toggleTab1() {
        this.setState({
            tab1: true,
            tab2: false,
            tab3: false,
            tab4: false
        });
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
    toggleTab3() {
        this.setState({
            tab1: false,
            tab2: false,
            tab3: true,
            tab4: false
        });
        this.props.navigation.navigate("Filtre")
    }
    toggleTab4() {
        this.setState({
            tab1: false,
            tab2: false,
            tab3: false,
            tab4: true
        });
    }

    _getData() {
        try {
            this.setState({ loading: true })
            getIstasyonWithLatLon(this.state.latitude, this.state.longitude, 25).then((res) => {
                this.setState({ datas: res, loading: false });
                console.log('Konumlar= ' + JSON.stringify(this.state.datas));
                //_showLocation();
            })
        } catch (error) {
            Alert.alert('Hata', error);
        }
        finally {
            this.setState({ loading: false })
        }
    }
    componentWillReceiveProps(nextProps) {
        try {
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
                    //     console.log('LAT: ' + this.state.latitude + ' Lon: ' + this.state.longitude);
                },
                (error) => this.setState({ error: error.message }),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
            );
        } catch (error) {
            Alert.alert('Hata', error);
        }
        finally {
            this.setState({ loading: false })
        }
    }
    componentDidMount() {
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
                //     console.log('LAT: ' + this.state.latitude + ' Lon: ' + this.state.longitude);
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }
    _showLocation() {
        showLocation({
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            sourceLatitude: this.state.latitude,  // optionally specify starting location for directions
            sourceLongitude: this.state.longitude,  // not optional if sourceLatitude is specified
            title: 'The White House',  // optional
            googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
            //googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58',  // optionally specify the google-place-id
            // alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
            dialogTitle: 'Harita Seç', // optional (default: 'Open in Maps')
            dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
            cancelText: 'Kapat', // optional (default: 'Cancel')
            //   appsWhiteList: ['google-maps'] // optionally you can set which apps to show (default: will show all supported apps installed on device)
            // app: 'uber'  // optionally specify specific app to use
        })
    }
    render() {
        <View>
            <Text>Başlık1</Text>
            <Text>Yazı</Text>
            <Image source={{ pin }} style={{ width: 100, resizeMode: 'contain' }}></Image>
        </View>
        return (
            <Container>
                <StatusBar style={{ color: '#fff' }} barStyle="dark-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("EnYakinIstasyon")}>
                            <Image style={{ marginLeft: -15, width: 50, height: 50, resizeMode: 'contain' }} source={require('../../assets/GeriDongri.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Harita</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" style={{ color: '#fff' }} />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container}>
                    <Popup
                        titleText='Harita Aç'
                        itemText='Hangi uygulama ile açalım.'
                        subtitleText='Hangi uygulama ile açalım.'
                        isVisible={this.state.isVisible}
                        onCancelPressed={() => this.setState({ isVisible: false })}
                        onAppPressed={() => this.setState({ isVisible: false })}
                        onBackButtonPressed={() => this.setState({ isVisible: false })}
                        modalProps={{ // you can put all react-native-modal props inside.
                            animationIn: 'slideInUp'
                        }}
                        cancelButtonText='Tamam'
                        appsWhiteList={[ /* Array of apps (apple-maps, google-maps, etc...) that you want
    to show in the popup, if is undefined or an empty array it will show all supported apps installed on device.*/ ]}
                        options={{
                            latitude: this.state.hedefLat,
                            longitude: this.state.hedefLon,
                            sourceLatitude: this.state.latitude,
                            sourceLongitude: this.state.longitude,
                            title: 'No Mans Land',
                            googleForceLatLon: false,

                            dialogTitle: 'Harita Seç',
                            // dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
                            cancelText: 'Kapat',
                        }}
                        style={{ /* Optional: you can override default style by passing your values. */ }}
                    />
                    <MapView //provider={PROVIDER_GOOGLE}

                        style={styles.map}
                        initialRegion={{
                            latitude: this.state.latitude, //41.001895,
                            longitude: this.state.longitude, //29.045486,
                            latitudeDelta: 0.99,
                            longitudeDelta: 0.99,

                        }}>
                        <MapView.Marker
                            coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}
                            Image={{ pin }}
                            title="Benim" description="Konumum">

                        </MapView.Marker>

                        {this.state.datas.map((data, i) => (
                            <MapView.Marker
                                key={i}
                                onPress={() => this.setState({
                                    isVisible: true,
                                    hedefLat: data.Address1_Latitude,
                                    hedefLon: data.Address1_Longitude
                                })}
                                coordinate={{
                                    latitude: data.Address1_Latitude,
                                    longitude: data.Address1_Longitude
                                }}
                                title={data.name} description={data.Adres}
                                Image={{ pin }}>
                                <View style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'transparent'
                                }}>
                                    <View
                                        style={{
                                            flexDirection: 'column'
                                        }} >
                                        <ImageBackground source={logoFull} style={{ width: 30, height: 30, resizeMode: 'contain' }}>

                                        </ImageBackground>
                                    </View>
                                </View>
                            </MapView.Marker>
                        ))}
                    </MapView>
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
                            <Button active={this.state.tab1} onPress={() => this.toggleTab3()}>
                                <Icon active={this.state.tab3} name="search" />
                                <Text style={{ color: 'white' }}>Filtre</Text>
                            </Button>
                        </FooterTab>
                    </Footer>

                </View>
            </Container>
        );
    }
}
/*
  /*</View>
                    <MapView.Marker coordinate = {this.state.userPosition} image = {require('../../Images/marker.png')}/>
    {this.state.datas.map((data) => (
        <MapView.Marker
            coordinate={{latitude: data.latitude, longitude: data.longitude}}
            image={require('../../Images/pin.png')}
        />
    ))}
</MapView>

navigator.geolocation.getCurrentPosition(
    (position) => {
        let location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };
        this.setstate({userPosition: location});
    },
(error) => alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
);

navigator.geolocation.getCurrentPosition(
    (position) => {
        let location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };
        this.setstate({userPosition: location});
    },
(error) => alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
);
*/

const styles = StyleSheet.create({
    txtHeader: {
        // marginLeft: 5,
        // textAlign:'left',
        marginTop: 10,
        fontFamily: 'Myriadpro-Bold',
        fontSize: 8,
        color: '#fff',
        alignSelf: 'center',
    },
    txtAdres: {
        marginLeft: 5,
        marginTop: 5,
        fontFamily: 'Myriadpro-Regular',
        fontSize: 8,
        color: '#fff',
        // alignSelf: 'center',
    },
    map: {
        flex: 6,
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
        backgroundColor: 'gray'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    container: {
        flex: 1,
    },
    container1: {
        height: '100%',
        width: '100%',
    },
    containerOrta: {
        flex: 10,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    containerBottom: {
        flex: 2,
        backgroundColor: 'transparent',
    },
    logo: {
        marginTop: 5,
        //  width: '100%',
        height: '90%',
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
})