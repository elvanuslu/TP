import React, { Component } from 'react';
import { ImageBackground, Alert, Switch, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar, PermissionsAndroid, Platform, ToastAndroid } from 'react-native';
import { Footer, FooterTab, Picker, Form, Icon, Content, Input, Item, Title, Left, Right, Button, Container, Header, Body, Card, CardItem } from 'native-base';
import Icon1 from "react-native-vector-icons/FontAwesome";
import Spinner from 'react-native-loading-spinner-overlay';

import AsyncStorage from '@react-native-community/async-storage';
import { getIstasyonWithLatLon ,getHaritaIstasyonWithLatLon} from '../Service/FetchUser';

import MapView, { PROVIDER_GOOGLE, MAP_TYPES } from 'react-native-maps';
import { showLocation, Popup } from 'react-native-map-link'
import Geolocation from 'react-native-geolocation-service';
import IonIcon from 'react-native-vector-icons/AntDesign';


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

let HaritaDatasi = [];
let myHedefLat = undefined;
let myHedeflon = undefined;
export default class Harita extends Component {

    constructor(props) {
        super(props);
        this.state = {
            kullanici: '',
            latitude: number = 0,//40.802095,//41.001895,
            longitude: number = 0,// 29.526954,
            latitudeDelta: 1,
            longitudeDelta: 1,
            datas: [],
            tab1: false,
            tab2: false,
            tab3: true,
            tab4: false,
            isVisible: false,
            hedefLat: undefined,
            hedefLon: undefined,
            watchID: number = null,
        }

    }
    getInitialState = () => {
        return {
            initialPosition: 'unknown',
            lastPosition: 'unknown',
        };
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

     _internaGetData= (lat, lon)=>{
        try {
            this.setState({ loading: true })
            console.log('this.state.latitud:'+lat+' Longi: '+lon);
        //    HaritaDatasi = [];
        getHaritaIstasyonWithLatLon(lat, lon, 15)
            .then((res) => {
                this.setState({ loading: false });
                HaritaDatasi.push(res);
                this.setState({datas:res})
                console.log('Harita Length: '+ JSON.stringify(HaritaDatasi))
                //console.log('Harita Konumları= ' + JSON.stringify(res));
               // HaritaDatasi.push(this.sta);
            })
           
        } catch (error) {
            Alert.alert('Hata Oluştu', error);
        }
    }
    _getData=(datan = [],lat,lon) =>{
        try {
          
            this.setState({ loading: true })
            console.log('Datalar: ', datan)
             console.log('datan: ' + JSON.stringify(datan))
           console.log('this.state.latitud:'+this.state.latitude+' Longi: '+this.state.longitude)
            HaritaDatasi = [];
            getHaritaIstasyonWithLatLon(lat, lon, 15)
                .then((res) => {
                    this.setState({ datas: res, loading: false });
                  //  console.log('Harita Konumlar= ' + JSON.stringify(res));
                    //_showLocation();
                })
               // .error((error)=>{alert('GetIstasyon Hata!'+error)})

           this.state.datas.push(datan);
         //   console.log('Datan Length: '+datan.length)
          //  console.log('Datan: '+JSON.stringify(datan))
            if (datan.length>0) {       
                HaritaDatasi.push(datan);
                //this.setState({ datas: datan })
            /*    HaritaDatasi[0].map((data, i) => (
                    console.log('Data: ', data.name, ' index: ', i),
                    console.log('Lat: ', data.Address1_Latitude),
                    console.log('Lon: ', data.Address1_Longitude, ' index: ', i)
                ))
                */
            }
            else{
                HaritaDatasi.push(this.state.datas);
             //   console.log('get data Haritam Length: '+ JSON.stringify(HaritaDatasi))
              //  alert('HaritaDatası 0: '+JSON.stringify(HaritaDatasi))
                //this.setState({ datas: datan })
              /*  HaritaDatasi[0].map((data, i) => (
                    console.log('Else Data: ', data.name, ' index: ', i),
                    console.log('Lat: ', data.Address1_Latitude),
                    console.log('Lon: ', data.Address1_Longitude, ' index: ', i)

                ))
                */
            }
        } catch (error) {
            Alert.alert('Get Hata', error);
        }
        finally {
            this.setState({ loading: false })
        }
    }
    componentWillReceiveProps(nextProps) {
        try {
          //  console.log('Will receive Props: ', JSON.stringify(nextProps.navigation.state.params))
            var AccountId = nextProps.navigation.state.params.Id;
            var name = nextProps.navigation.state.params.name;
            var lat = nextProps.navigation.state.params.lat;
            var lon = nextProps.navigation.state.params.lon;
            var adres = nextProps.navigation.state.params.adres;
            var Param = nextProps.navigation.state.params.Para;
            console.log('componentWillReceiveProps Account ID=' + AccountId + ' name= ' + name + ' lat=' + lat + ' lon= ' + lon + ' Adres=' + adres, ' Param: ' + Param);
            //   console.log('Param: ', Param);
            this.setState({ loading: true, latitude: lat, longitude: lon })
            if (Param === 'Filtre') {
                this.setState({ latitude: lat, longitude: lon })
                this._getData(nextProps.navigation.state.params.Tumu,lat,lon);
            }
            else {
                this._getkoordinat();
            }
        } catch (error) {
            Alert.alert('Genel Hata', error);
        }

    }
    componentWillMount() {
        var AccountId = this.props.navigation.getParam('Id', '');
        var name = this.props.navigation.getParam('name', '');
        var lat = this.props.navigation.getParam('lat', '');
        var lon = this.props.navigation.getParam('lon', '');
        var adres = this.props.navigation.getParam('adres', '');
        var Param = this.props.navigation.getParam('Para');

        console.log('componentWillMount Account ID 1=' + AccountId + ' name= ' + name + ' lat=' + lat + ' lon= ' + lon + ' Adres=' + adres + ' Param:' + Param);
        this.setState({ loading: true, latitude: lat, longitude: lon })
        HaritaDatasi = [];
        if (Param === 'Filtre') {
           // console.log('Filterim: ',this.props.navigation.state.params.Tumu)
            this._getData(this.props.navigation.state.params.Tumu,lat,lon);
        } else {
            console.log('getkoordinat')
            this._getkoordinat();

        }
    }
  
   
    _getkoordinat = () => {
        //console.log('OS=' + Platform.OS)
        try {
            this.setState({ loading: true })
            if (Platform.OS === 'ios') {
                this.callLocation(this);
            }
            else {
                this.requestLocationPermission();
            }
            //   
        } catch (error) {
            this.setState({ loading: false })
        }
    }
    removeLocationUpdates = () => {
        if (this.watchId !== null) {
            Geolocation.clearWatch(this.watchId);
            this.setState({ loading: false })
        }
    }
    callLocation= (that) =>{
        this.setState({ loading: true })
        // alert('callLocation Called');
        Geolocation.getCurrentPosition(
            (position) => {
              console.log('My POsition: ' + JSON.stringify(position)+' Zaman: '+new Date().getDate());
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
                 this._internaGetData(position.coords.latitude,position.coords.longitude);
                this.setState({ loading: false })
            },
            (error) => {
                alert('GPS Error', error.code, error.message)
            },
            { enableHighAccuracy: true, timeout: 50000, maximumAge: 10000 }
        );
      
    }
    componentWillUnmount() {
        this.removeLocationUpdates();
    }
    async  requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                    'title': 'Location Access Required',
                    'message': 'This App needs to Access your location'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.callLocation(this);
            } else {
                alert("Permission Denied");
            }
        } catch (error) {
            this.setState({ loading: false })
            alert("Request Permission Hata" + error);
            // console.warn(err)
        }
    }
    _showLocation() {
        showLocation({
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            sourceLatitude: this.state.latitude,  // optionally specify starting location for directions
            sourceLongitude: this.state.longitude,  // not optional if sourceLatitude is specified
            title: '',  // optional
            googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
            //googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58',  // optionally specify the google-place-id
            // alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
            dialogTitle: 'Harita Seç', // optional (default: 'Open in Maps')
            dialogMessage: '', // optional (default: 'What app would you like to use?')
            cancelText: 'Kapat', // optional (default: 'Cancel')
            //   appsWhiteList: ['google-maps'] // optionally you can set which apps to show (default: will show all supported apps installed on device)
            // app: 'uber'  // optionally specify specific app to use
        })
    }
    _HaritaFooter() {

        return (
            <Button active={this.state.tab1} onPress={() => this.toggleTab1()}>
                <Icon active={this.state.tab1} name="map" />
                <Text style={{ color: 'white' }}>Harita</Text>
            </Button>
        )
    }
    _showHaritaStandart() {
        //  console.log('Latima: ' + this.state.latitude + '  Long: ' + this.state.hedefLat)

        if (this.state.latitude !== '') {
            if ((this.state.hedefLat === undefined) || (this.state.hedefLat === '')) {
               // console.log(' sundefined')
                myHedefLat = this.state.latitude;
                myHedeflon = this.state.longitude

            }
            else {
                console.log('sdefined')
            }
           // console.log('hedef Latima: ' + myHedefLat + '  hedef Long: ' + myHedeflon)
            return (
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
                        appsWhiteList={[]}
                        options={{
                            latitude: this.state.hedefLat,
                            longitude: this.state.hedefLon,
                            sourceLatitude: this.state.latitude,
                            sourceLongitude: this.state.longitude,
                            title: 'Mevcut Konum',
                            googleForceLatLon: false,
                            dialogTitle: 'Harita Seç',
                            cancelText: 'Kapat',
                        }}
                        style={{}}
                    />
                      
                    <MapView //provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{
                            latitude: Number(this.state.latitude), //41.001895,
                            longitude: Number(this.state.longitude), //29.045486,
                            latitudeDelta: 3,
                            longitudeDelta: 3,

                        }}>
         
                        <MapView.Marker
                            coordinate={{ latitude: Number(this.state.latitude), longitude: Number(this.state.longitude) }}
                            Image={{ pin }}
                            title="" description="Konumum">
                        </MapView.Marker>
                        {
                            HaritaDatasi.length > 0 ?
                                HaritaDatasi[0].map((data, i) => (
                                    //  console.log('Component Data: ',data.name),
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
                                )) : <View>

                                </View>
                        }
                    </MapView>
                </View>
            )
        }
        else {
            console.log('Else Çalıştı')
            return (
                <View style={{ flex: 1 }}>
                    <MapView
                        liteMode
                        key={1}
                        style={styles.map}
                    //initialRegion={SAMPLE_REGION}
                    />

                </View>
            )
        }
    }
    render() {
        <View>

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
                    <Button transparent onPress={() => this._getkoordinat()}>
                            <IonIcon name="find" style={{ color: '#fff' }} />
                        </Button>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" style={{ color: '#fff' }} />
                        </Button>
                    </Right>
                </Header>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner style={{ flex: 1, backgroundColor: 'red' }}
                        visible={this.state.loading}
                        textContent={'Konum aranıyor...'}
                        textStyle={styles.spinnerTextStyle} />
                </View>
                {this._showHaritaStandart()}
                <View style={{ flexDirection: 'column-reverse' }}>
                    <Footer>
                        <FooterTab style={{ backgroundColor: 'red', }}>
                            {
                                this._HaritaFooter()
                            }
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
Apple Maps – apple-maps
Google Maps – google-maps
Citymapper – citymapper
Uber – uber
Lyft – lyft
The Transit App – transit
Waze – waze
Yandex.Navi – yandex
Moovit – moovit
Yandex Maps – yandex-maps
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