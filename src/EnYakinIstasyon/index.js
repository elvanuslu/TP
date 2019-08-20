import React, { Component } from 'react';
import { ListView, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar, PermissionsAndroid, Platform,ToastAndroid} from 'react-native';
import {
    Footer,
    FooterTab,
    List,
    ListItem, Item, Picker, Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content,Toast
} from 'native-base';
import { getIstasyonWithLatLon } from '../Service/FetchUser';
import Spinner from 'react-native-loading-spinner-overlay';

import Geolocation from 'react-native-geolocation-service';
import IonIcon from 'react-native-vector-icons/AntDesign';

const tmis = require("../../assets/tmis.png");
const yoltarifi = require("../../assets/yoltarifi.png");
const pompa = require("../../assets/pompa.png");
const yagdegisim = require("../../assets/yagdegisim.png");
const bankamatik = require("../../assets/tasittanima.png");


export default class EnYakinIstasyon extends Component {
    watchId = null;
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            userName: '',
            listViewData: [],
            tab1: false,
            tab2: false,
            tab3: false,
            error: null,
            latitude: undefined,
            longitude: undefined
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
    toggleTab3() {
        this.setState({
            tab1: false,
            tab2: false,
            tab3: true,
            tab4: false
        });
        this.props.navigation.navigate("Filtre")
    }
    _getData() {
        try {
            //    this.isAvailable();
            this.setState({ loading: true })
            getIstasyonWithLatLon(this.state.latitude, this.state.longitude, 5)
                .then((res) => {
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
   
    //---------------------------------------------------------------
    hasLocationPermission = async () => {
        if (Platform.OS === 'ios' ||
            (Platform.OS === 'android' && Platform.Version < 23)) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (hasPermission) return true;

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            Toast.show('Location permission denied by user.', Toast.LONG);
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            Toast.show('Location permission revoked by user.', Toast.LONG);
        }

        return false;
    }
    getLocation = async () => {
        const hasLocationPermission = await this.hasLocationPermission();

       // if (!hasLocationPermission) return;
       if (!hasLocationPermission){
        Alert.alert(
            'Konum İzni Gerekiyor',
            'Cihazınızdan Türkiye Petrolleri uygulaması için konum izni vermelisiniz.',
            [

                {
                    text: 'Tamam', onPress: () => {
                        this.setState({
                            loading: false,
                            baglanti: false,
                        })
                        this.props.navigation.navigate("hesabim")
                    }
                },
            ],
            { cancelable: true },
        )
        return
    } 

        this.setState({ loading: true }, () => {
            Geolocation.getCurrentPosition(
                (position) => {
                    this.setState({ location: position, loading: false });
                    console.log('Konumlar: ' + JSON.stringify(position));
                  /*  Toast.show({
                        text: "Latitude: " +  position.coords.latitude,
                        buttonText: "Tamam",
                        type: 'danger'
                      })
                      Toast.show({
                        text: "Longitude: " + position.coords.longitude,
                        buttonText: "Tamam",
                        type: 'danger'
                      })
                 */
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    })
                    this._getData();
                },
                (error) => {
                    this.setState({ location: error, loading: false });
                    console.log(error);
                },
                { enableHighAccuracy: true, timeout: 50000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true }
            );
        });
    }
    getLocationUpdates = async () => {
        const hasLocationPermission = await this.hasLocationPermission();

        if (!hasLocationPermission) return;

        this.setState({ loading: true }, () => {
            this.watchId = Geolocation.watchPosition(
                (position) => {
                    this.setState({ location: position, loading: false });
                    console.log('Update Konumlar: ' + JSON.stringify(position));
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    })
                },
                (error) => {
                    this.setState({ location: error });
                    console.log(error);
                },
                { enableHighAccuracy: true, distanceFilter: 0, interval: 5000, fastestInterval: 2000 }
            );
        });
    }

    removeLocationUpdates = () => {
        if (this.watchId !== null) {
            Geolocation.clearWatch(this.watchId);
            this.setState({ loading: false })
        }
    }
    //-------------------------------------------------------------
    _getGeoLOcation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
               // alert(JSON.stringify(position));
             /*   console.log('My POsition: ' + JSON.stringify(position));
                console.log('Lat: ' + position.coords.latitude)
                console.log('Lon: ' + position.coords.longitude)
                */
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
                this._getData();
            },
            (error) => {
                alert('GPS Error', error.code, error.message)
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 50000, maximumAge: 10000 }
        );
    }
    _getkoordinat = () => {
        try {
            this.setState({ loading: true })
            // this.callLocation(this);

            if (Platform.OS === 'ios') {

                this.callLocation(this);
            }
            else {
                //alert('android')
                this.requestLocationPermission();
            }

            this.setState({ loading: false })
        } catch (error) {

        }
    }
    callLocation(that) {
        this.setState({ loading: true })
        this._getGeoLOcation();
        that.watchID = Geolocation.watchPosition((position) => {
            console.log('Watch Pos: ' + position);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            const currentLatitude = JSON.stringify(position.coords.latitude);
            that.setState({ latitude: currentLongitude });
            that.setState({ longitude: currentLatitude });
        });
        this.setState({ loading: false })
    }
    /*
    async  requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                    'title': 'Konum İzni Gerekli.',
                    'message': 'Türkiye Petrolleri Konum Bilginizi kullanacak'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
 
                that.callLocation(this);
            } else {
                alert("Permission Denied");
            }
        } catch (error) {
           
            alert("Hata: " + error);
            console.warn(error)
        }
        finally{
            that.callLocation(this);
        }
    }
    */
    _getCoord = () => {
        try {
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
                    //  console.log('LAT: ' + this.state.latitude + ' Lon: ' + this.state.longitude);
                },
                (error) => this.setState({
                    error: error.message,
                    latitude: 40.802095,
                    longitude: 29.526954,
                    loading: false,
                }),
                { enableHighAccuracy: false, timeout: 60000, maximumAge: 3600000 },
            );
            this._getData();
        } catch (error) {
            Alert.alert('Hata', error);
        }

    }
componentWillUnmount(){
    this.removeLocationUpdates();
}
    componentDidMount() {
        this.getLocation();
        // this._getkoordinat();
        // console.log('Property= '+JSON.stringify(this.props)); //(this.props.navigation.state.routeName));
        //  this._getCoord();
    }
    componentWillReceiveProps(nextProps) {
        console.log('Receive Props' + JSON.stringify(nextProps))
        this.getLocation();
    }
    // GetItem(item) 
    GetItem(item, name, lat, lon, adres) {
        // console.log('item=' + item);
        // console.log('Lisyt Data: ' + JSON.stringify(this.state.listViewData))
        this.setState({ latitude: lat })
        this.props.navigation.navigate("Harita", { 'Id': item, 'name': name, 'lat': lat, 'lon': lon, 'adres': adres, 'Para': 'Filtre', 'Tumu': this.state.listViewData });
    }
    _HaritaFooter() {
        //console.log('Lato: '+this.state.latitude)
        // if (this.state.latitude !== undefined) {
        return (
            <Button active={this.state.tab1} onPress={() => this.toggleTab1()}>
                <Icon active={this.state.tab1} name="map" />
                <Text style={{ color: 'white' }}>Harita</Text>
            </Button>
        )
        /*  }
 
  else {
      return (
          <Button disabled active={this.state.tab1} onPress={() => this.toggleTab1()}>
              <Icon active={this.state.tab1} name="map" />
              <Text style={{ color: 'white' }}>Harita</Text>
          </Button>
      )
  }
  */
    }
    render() {
        //console.log('Positions: ' + this.state.latitude + '  Lon: ' + this.state.longitude)
        return (
            <Container style={styles.container}>
                <StatusBar style={{ color: '#fff' }} backgroundColor="transparent" barStyle="light-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('AnaSayfa')}>
                            <Image style={{ marginLeft: -15, width: 50, height: 50, resizeMode: 'contain' }} source={require('../../assets/GeriDongri.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>En Yakın İstasyon</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.getLocation()}>
                            <IonIcon name="find" style={{ color: '#fff' }} />
                        </Button>
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
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner
                        visible={this.state.loading}
                        textContent={'Konum aranıyor...'}
                        textStyle={styles.spinnerTextStyle} />
                </View>
                <View style={styles.containerOrta}>

                    <View style={{ marginBottom: 10, marginTop: -10 }} >
                        <FlatList
                            data={this.state.listViewData}
                            renderItem={({ item }) =>
                                <Card key={item.AccountId} style={styles.cardmb}>
                                    <TouchableOpacity onPress={() => this.GetItem(item.AccountId, item.name, item.Address1_Latitude, item.Address1_Longitude, item.Adres)}>

                                        <CardItem cardBody>
                                            <Body>
                                                <View style={{ width: '100%', flexDirection: 'row', paddingBottom: 15, }}>
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
