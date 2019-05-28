import React, { Component } from 'react';
import { Alert, Switch, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Picker, Form, Icon, Content, Input, Item, Title, Left, Right, Button, Container, Header, Body, Card, CardItem } from 'native-base';
import Icon1 from "react-native-vector-icons/FontAwesome";
import Spinner from 'react-native-loading-spinner-overlay';

import TextInputMask from 'react-native-text-input-mask';
import AsyncStorage from '@react-native-community/async-storage';
import { getYakitTipi, MusteriKayit } from '../Service/FetchUser';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const pompa = require("../../assets/pompatabancakirmizi.png");
const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");
const pin = require("../../assets/pin.png");

export  default class Harita extends Component{
    constructor() {
        super();
        this.state = {
            kullanici: '',
            latitude:37.755388,
            longitude: -122.426123,
        }
    }

    render() {
        return(
              
              <MapView provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                  latitude: 41.001895,
                  longitude: 29.045486,
                  latitudeDelta: 0.0922,
                  longitudeDelta:0.0421,
              }}>
              <MapView.Marker coordinate={{latitude: 41.001895, longitude: 29.045486}} title="Türk Petrol" description="description" />
               </MapView> 
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
    map: {
        flex: 6,
        ...StyleSheet.absoluteFillObject,
        width:'100%',
        height:'100%',
        backgroundColor:'gray'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    container: {
        flex: 1,
    },
    container1: {
        height:'100%',
        width:'100%',
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
    Inputs: {
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 5,
        marginBottom: 10,
        height: 40,
        width: 300,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderWidth: 1,
        //color:'black',
        borderColor: 'black',
    },
    Inputs1: {
        alignSelf: 'center',
        height: 40,
        borderRadius: 5,
        marginBottom: 10,
        width: '90%',
        //color:'black',
        borderColor: 'black',
    },
    switchcontainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginRight: 31,
        alignItems: 'center',

    },
    switcText: {
        textAlign: 'right',
        fontSize: 12,
        fontWeight: '300',
        color: 'gray',
        marginRight: 5,
    },
    mb15: {
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '800',
    },
    comboItem: {
        marginRight: 40,
        marginLeft: 40,
        borderColor: 'black',
        //   marginBottom: 15,
        borderWidth: 1,
        marginTop: 5,

    },
})