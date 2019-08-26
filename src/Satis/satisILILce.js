
import React, { Component } from 'react';
import { Alert, FlatList, StyleSheet, View, Image, Text, StatusBar, PermissionsAndroid, Platform, ToastAndroid, Toast } from 'react-native';
import { Switch, Form, Input, Item, Picker, Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content } from 'native-base';

import {
    getCitybyLocation, getCitylocationbyId, checkConnection,
    campaignDetailList, getAracYakitTipi, getIstasyonByCityId, getPaymentTypes,
    getIstasyonWithLatLon, getYakitTipi, getPlakaList, getStorage, getCitybyId, getCityList
} from '../Service/FetchUser';
import Spinner from 'react-native-loading-spinner-overlay';
import { tryStatement } from '@babel/types';
import { multipleValidOptions } from 'jest-validate/build/condition';
import Geolocation from 'react-native-geolocation-service';

import Permissions from 'react-native-permissions';

const k1 = require("../../assets/Resim.png");
const logo = require("../../assets/logoGri.png");
const pompa = require("../../assets/pompatabancaGri.png");
const plaka = require("../../assets/plakaGri.png");
const pmpa = require("../../assets/pompaGri.png");
const odeme = require("../../assets/odemeTutar.png");
const kampanya = require("../../assets/kapmpanyaGri.png");
const OdemeIkon = require("../../assets/ikonlar-16.png");
const sehirIkon = require("../../assets/ikonlar-22.png");


let adet = 0;
export default class SatisIllce extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kullanici: undefined,
            selected2: undefined,
            yakitTipi: undefined,
            yakitTipiDeger: undefined,
            yakitTipleri: [],
            yakitTipi: [],
            Istasyon: [],
            Plaka: [],
            labelName: '',
            latitude: number = 0, //40.802095,//41.001895,
            longitude: number = 0, //29.526954,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            istasyonselectedId: undefined,
            istasyonName: '',
            IstasyonAdi: '',
            datas: [],
            PlakaSelectId: undefined,
            PlakaName: '',
            fulle: false,
            SwitchOnValueHolder: false,
            OdemeTipleri: [],
            OdemeTipi: undefined,
            OdemeLabel: '',
            PompaNo: undefined,
            KuponKodu: '',
            Tutar: undefined,
            userId: undefined,
            loading: false,
            YakitAdi: undefined,
            OdemeAdi: undefined,
            Sehir: undefined,
            Sehirler: [],
            Ilce: undefined,
            IlceList: [],
            showCancel: false,
            hasError: false,
        }
    }

    _getCity = async () => {
        try {
            var SehirLst = [];
            getCitybyLocation()
                .then((res) => {

                    // console.log('Şehirler ' + JSON.stringify(res))
                    if (res instanceof Array) {
                        SehirLst = res;
                        var initialArr = { 'bm_sehirid': '00000000-0000-0000-0000-000000000001', 'bm_adi': 'Şehir' };
                        SehirLst.splice(0, 0, initialArr);
                        this.setState({
                            Sehirler: SehirLst,
                        })
                    }
                    else {
                        SehirLst = [];
                        /*  Daha Sonra Açabiliriz hata görmek istiyorsak.
                        Alert.alert(
                            'Hata Oluştu!',
                            '1Şehirler Getirilemedi.',
                            [
            
                                { text: 'Tamam', onPress: () => '' },
                            ],
                            { cancelable: true },
                        );
                        */
                    }
                })
                .catch(e => {
                    Alert.alert(
                        'Hata Oluştu',
                        e,
                        [
                            { text: 'Tamam', onPress: () => '' },
                        ],
                        { cancelable: true },
                    );
                })

        } catch (error) {
            this.setState({ hasError: true, loading: false })
            Alert.alert('Şehirler', error);
        }
    }
    getcampaignDetailList = async () => {
        try {
            const Id = await getStorage('userId');
            campaignDetailList(this.state.istasyonselectedId, his.state.selected2, this.state.OdemeTipi, this.state.Tutar ? this.state.Tutar : 0, Id, this.state.KuponKodu, this.state.PlakaSelectId)
                .then((res) => {
                    if (res) {
                        if (res[0].bm_kampanyaId === '00000000-0000-0000-0000-000000000000') {
                            if (this.state.SwitchOnValueHolder == true) { // Tutar 
                                this.setState({ loading: false })
                                this.props.navigation.navigate("OzetBilgi", {
                                    'Parametre': {
                                        'Istasyon': this.state.istasyonselectedId,
                                        'IstasyonAdi': this.state.IstasyonAdi,
                                        'Plaka': this.state.PlakaSelectId,
                                        'PlakaName': this.state.PlakaName,
                                        'Yakit': this.state.selected2,
                                        'YakitAdi': this.state.YakitAdi,
                                        'OdemeTipi': this.state.OdemeTipi,
                                        'OdemeAdi': this.state.OdemeAdi,
                                        'PompaNo': this.state.PompaNo,
                                        'KuponKodu': this.state.KuponKodu,
                                        'Tutar': 0,
                                    }
                                });

                            }
                            //    this.props.navigation.navigate("OzetBilgi", { 'Parametre': this.props.navigation.state.params, 'birimFiyat': undefined });
                        }
                    }
                    else {
                        Alert.alert(
                            'Kampanya',
                            'Kampanya Bulunamadı.',
                            [

                                { text: 'Tamam', onPress: () => '' },
                            ],
                            { cancelable: true },
                        );
                    }
                })
                .catch(e => {
                    Alert.alert(
                        'Hata Oluştu',
                        e,
                        [
                            { text: 'Tamam', onPress: () => '' },
                        ],
                        { cancelable: true },
                    );
                })
        } catch (error) {
            this.setState({ hasError: true, loading: false })
        }

    }
    onSehir(value, label) {

        this.setState(
            {
                Sehir: value,
                labelName: label
            },
            () => {
                this._getCitybyId();
                //console.log('Sehir: ' + this.state.Sehir, ' Selected: ' + this.state.labelName)
            }
        )
    }
    //Lat: 41.0019
    // Lon: 29.0455
    onIlce(value, label) {
        if (value) {
            this.setState({ loading: true, })
            this.setState(
                {
                    Ilce: value,
                    labelName: label,

                },
                () => {
                    // console.log('Ilce Sci ' + this.state.Ilce)
                    try {
                        getIstasyonByCityId(this.state.Ilce, 3)
                            .then((res) => {
                                if (res) {
                                    if (res instanceof Array) {
                                        if (res.status != false) {
                                            // console.log('Istasyon By CITY ' + JSON.stringify(res));
                                            this.setState({
                                                datas: res,
                                                loading: false,
                                            })
                                        }
                                        else {
                                            this.setState({
                                                istasyonselectedId: '', loading: false, datas: [{
                                                    "AccountId": "00000000-0000-0000-0000-000000000000",
                                                    "name": "",
                                                    "Mesafe_KM": 0,
                                                    "Address1_Latitude": 0,
                                                    "Address1_Longitude": 0,
                                                    "Adres": "",
                                                    "sira": 1,
                                                    "market": false,
                                                    "yikama": false,
                                                    "yagdegisimi": false,
                                                    "bankamatik": false,
                                                    "restaurant": false,
                                                    "odegec": false,
                                                    "KisaAdres": "",
                                                    "telefon": ""
                                                }]
                                            })
                                        }
                                    }
                                }
                                else {
                                    Alert.alert(
                                        'Hata Oluştu',
                                        'Şehirler Getirilemedi.',
                                        [

                                            { text: 'Tamam', onPress: () => '' },
                                        ],
                                        { cancelable: true },
                                    );
                                }
                            })
                            .catch((e) => {
                                Alert.alert(
                                    'Hata Oluştu',
                                    e,
                                    [

                                        { text: 'Tamam', onPress: () => '' },
                                    ],
                                    { cancelable: true },
                                );
                            })
                        // console.log('Ilce: ' + this.state.Ilce, ' Selected: ' + this.state.labelName)
                    } catch (error) {
                        Alert.alert('İlçe', error.message);
                    }
                    finally {
                        this.setState({ loading: false, })
                    }
                }
            )
        }
        else {
            Alert.alert(
                'Hata Oluştu',
                'Ilçeler Getirilemedi.',
                [

                    { text: 'Tamam', onPress: () => '' },
                ],
                { cancelable: true },
            );
        }
    }
    _getCitybyId = () => {
        if (this.state.Sehir !== '00000000-0000-0000-0000-000000000001') {
            try {
                //  getCitybyId(this.state.Sehir)
                var Ilcelst = [];
                getCitylocationbyId(this.state.Sehir)
                    .then((res) => {
                        console.log('İlçe= ' + JSON.stringify(res));
                        if (res instanceof Array) {
                            Ilcelst = res;
                            console.log('ilçe res is array: ' + this.state.Sehir);
                            var initialArr = { 'bm_ilceid': '00000000-0000-0000-0000-000000000001', 'bm_adi': 'İlçe' };
                            Ilcelst.splice(0, 0, initialArr);
                            if (this.state.Sehir !== undefined) {
                                this.setState({
                                    IlceList: Ilcelst,
                                    loading: false,
                                })
                            }
                        }
                    })
                    .catch((e) => {
                        Alert.alert(
                            'Hata Oluştu',
                            e,
                            [

                                { text: 'Tamam', onPress: () => '' },
                            ],
                            { cancelable: true },
                        );
                    })
            } catch (error) {
                this.setState({ hasError: true, loading: false })
                Alert.alert('getcity', error);
            }
            finally {
                //this.setState({ hasError: true, loading: false })
            }
        }
    }

    _FormuTemizleyiverBirZahmet() {
        console.log('_FormuTemizleyiverBirZahmet')
        this.setState({
            istasyonselectedId: undefined,
            PlakaSelectId: '',
            PlakaName: '',
            selected2: '',
            YakitAdi: '',
            OdemeTipi: '',
            OdemeAdi: '',
            PompaNo: '',
            KuponKodu: '',
            Tutar: '',
        })

    }
    _clearComponents() {
        try {

            this.setState({
                istasyonselectedId: null,
                PlakaSelectId: null,
                selected2: null,
                OdemeTipi: null,
                PompaNo: null,
                Sehir: null,
                Ilce: null,
                KuponKodu: null,
                OdemeTipi: null,
                Tutar: null,

            })

        } catch (error) {

        }
    }
    _campaignDetailList = async () => {
        try {
            //this.getcampaignDetailList();
            this.setState({ loading: true })
            const Id = await getStorage('userId');
            if (this.state.istasyonselectedId != undefined) { //istasyon
                if (this.state.PlakaSelectId != undefined) { // Plaka
                    if (this.state.selected2 != undefined) { // Yakıt
                        if (this.state.OdemeTipi != undefined) { // Ödeme Tipi
                            if (this.state.PompaNo != undefined) { // Pompa No 

                                if (this.state.SwitchOnValueHolder == true) { // Tutar 
                                    this.setState({ loading: false })
                                    this.props.navigation.navigate("KampanyaSec", {
                                        'Istasyon': this.state.istasyonselectedId,
                                        'IstasyonAdi': this.state.IstasyonAdi,
                                        'Plaka': this.state.PlakaSelectId,
                                        'PlakaName': this.state.PlakaName,
                                        'Yakit': this.state.selected2,
                                        'YakitAdi': this.state.YakitAdi,
                                        'OdemeTipi': this.state.OdemeTipi,
                                        'OdemeAdi': this.state.OdemeAdi,
                                        'PompaNo': this.state.PompaNo,
                                        'KuponKodu': this.state.KuponKodu,
                                        'Tutar': 0,
                                    });
                                    this._clearComponents();
                                }
                                else {
                                    if (this.state.Tutar != undefined) { // Tutar 
                                        this.setState({ loading: false })
                                        this.props.navigation.navigate("KampanyaSec", {
                                            'Istasyon': this.state.istasyonselectedId,
                                            'IstasyonAdi': this.state.IstasyonAdi,
                                            'Plaka': this.state.PlakaSelectId,
                                            'PlakaName': this.state.PlakaName,
                                            'Yakit': this.state.selected2,
                                            'YakitAdi': this.state.YakitAdi,
                                            'OdemeTipi': this.state.OdemeTipi,
                                            'OdemeAdi': this.state.OdemeAdi,
                                            'PompaNo': this.state.PompaNo,
                                            'KuponKodu': this.state.KuponKodu,
                                            'Tutar': this.state.Tutar,

                                        });
                                        this._clearComponents();
                                    }
                                    else {
                                        this.setState({ loading: false })
                                        Alert.alert('Hata', 'Tutar Girilmedi');
                                    }
                                }
                                // this._clearComponents();
                            }
                            else {
                                this.setState({ loading: false })
                                Alert.alert('Hata', 'Pompa Numarası Girilmedi');
                            }
                        }
                        else {
                            this.setState({ loading: false })
                            Alert.alert('Hata', 'Ödeme Tipi Seçilmedi');
                        }

                    }
                    else {
                        this.setState({ loading: false })
                        Alert.alert('Hata', 'Yakıt Seçilmedi');
                    }
                }
                else {
                    this.setState({ loading: false })
                    Alert.alert('Hata', 'Plaka Seçilmedi');
                }

            }
            else {
                this.setState({ loading: false })
                Alert.alert('Hata', 'Istasyon Seçilmedi');
            }
        } catch (error) {
            this.setState({ loading: false })
            Alert.alert('Hata', error);
        }

    }
    ShowAlert = (value) => {
        this.setState({
            SwitchOnValueHolder: value
        })
        if (value == true) {
            //  Alert.alert("Switch is On.");
        }
        else {
            //Alert.alert("Switch is Off.");
        }

    }
    onChecked = () => {
        this.setState({ fulle: this.state.fulle == true ? false : true })
        //  console.log('fulle ' + this.state.fulle);
    }
    onPlaka(value, label) {
        if (value) {
            if (value !== '00000000-0000-0000-0000-000000000001') {
                this.setState({
                    PlakaSelectId: value,
                    PlakaName: label,
                    PlakaName: this.state.Plaka.find(p => p.bm_musteriaraciid === value).bm_plaka,

                },
                    () => {
                        this._getAracYakitTipleri(value);
                        this.setState({ loading: false })
                        console.log('selectedValue: ' + this.state.PlakaSelectId, ' Selected: ' + this.state.PlakaName)
                    })
            }
        }
        else {
            Alert.alert(
                'Hata Oluştu',
                'Araçlar Getirilemedi.',
                [

                    { text: 'Tamam', onPress: () => '' },
                ],
                { cancelable: true },
            );
        }
    }

    _getAracYakitTipleri = (aracId) => {
        try {
            var Yakit = '';
            var jsonBody = '';
            this.setState({ loading: true })
            getAracYakitTipi(aracId)
                .then((res) => {
                    Yakit = res;
                    console.log('Yakitt: ' + JSON.stringify(Yakit));
                    // console.log("Arac Yakit " + JSON.stringify(res));

                    if (Yakit) {

                        if (Yakit.bm_yakitcinsiid_2 != '00000000-0000-0000-0000-000000000000') {
                            if (Yakit.bm_yakitcinsiid_1 !== Yakit.bm_yakitcinsiid_2) {
                                jsonBody = [
                                    {
                                        "bm_yakittipiid": '00000000-0000-0000-0000-000000000001',
                                        "bm_yakittipiadi": 'Yakıt Tipi'
                                    },
                                    {
                                        "bm_yakittipiid": Yakit.bm_yakitcinsiid_1,
                                        "bm_yakittipiadi": Yakit.bm_yakittipiadi_1
                                    },
                                    {
                                        "bm_yakittipiid": Yakit.bm_yakitcinsiid_2,
                                        "bm_yakittipiadi": Yakit.bm_yakittipiadi_2
                                    },
                                ]
                            }
                            else {
                                jsonBody = [
                                    {
                                        "bm_yakittipiid": '00000000-0000-0000-0000-000000000001',
                                        "bm_yakittipiadi": 'Yakıt Tipi'
                                    },
                                    {
                                        "bm_yakittipiid": Yakit.bm_yakitcinsiid_1,
                                        "bm_yakittipiadi": Yakit.bm_yakittipiadi_1
                                    },
                                ]
                            }
                          
                        }
                        else {
                            jsonBody = [
                                {
                                    "bm_yakittipiid": '00000000-0000-0000-0000-000000000001',
                                    "bm_yakittipiadi": 'Yakıt Tipi'
                                },
                                {
                                    "bm_yakittipiid": Yakit.bm_yakitcinsiid_1,
                                    "bm_yakittipiadi": Yakit.bm_yakittipiadi_1
                                },
                            ]
                        }
                        this.setState({selected2:jsonBody[1].bm_yakittipiid})
                        console.log('JsonBody Yakıt: '+ jsonBody[1].bm_yakittipiid)
                        this.setState({
                            yakitTipleri: jsonBody,
                            loading: false,
                        });
                        // console.log('Yakitlar ksonBody== ' + JSON.stringify(jsonBody));
                    }
                })
                .catch(e => {
                    this.setState({ hasError: true, loading: false })
                    console.log("hata: " + e);
                })

        } catch (error) {
            this.setState({ hasError: true, loading: false })
            Alert.alert('Hata', error);
        }

    }
    onIstasyonId(val: string) {
        this.setState({ istasyonselectedId: val });
        // console.log('Id= ' + val);
    }
    onIstasyonName(value, label) {
        //alert(value)
        if (value) {
            if (value !== '00000000-0000-0000-0000-000000000000') {
                this.setState(
                    {
                        istasyonselectedId: value,
                        istasyonName: label,
                        IstasyonAdi: this.state.datas.find(branch => branch.AccountId === value).name,
                    },
                    () => {

                        console.log('selectedValue: ' + this.state.istasyonName, ' Selected: ' + this.state.istasyonselectedId + ' Name= ' + this.state.IstasyonAdi)

                    }
                )
            }
        }
        else {
            Alert.alert(
                'Hata Oluştu',
                'İstasyonlar Getirilemedi.',
                [

                    { text: 'Tamam', onPress: () => '' },
                ],
                { cancelable: true },
            );
        }
    }
    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }
    onValueChange2(value, label) {
        if (value) {
            if (value !== '00000000-0000-0000-0000-000000000001') {
                this.setState(
                    {
                        selected2: value,
                        labelName: label,
                        YakitAdi: this.state.yakitTipleri.find(p => p.bm_yakittipiid === value).bm_yakittipiadi,
                    },
                    () => {
                        //  console.log('YakıtId: ' + this.state.YakitAdi, ' Selected: ' + this.state.selected2)
                    }
                )
            }
        }
        else {
            Alert.alert(
                'Hata Oluştu',
                'Yakıt Tipleri Getirilemedi.',
                [

                    { text: 'Tamam', onPress: () => '' },
                ],
                { cancelable: true },
            );
        }
    }
    onOdemeTipi(value, label) {
        this.setState(
            {
                OdemeTipi: value,
                OdemeLabel: label,
                OdemeAdi: this.state.OdemeTipleri.find(p => p.Value === value).Name,
            },
            () => {
                // console.log('Nakit: ' + this.state.OdemeTipi, ' Selected: ' + this.state.OdemeAdi)
            }
        )
    }
    _getPaymentTypes() {
        try {
            //  console.log('Payment Types')
            {
                this.setState({ loading: true })
                getPaymentTypes()
                    .then((res) => {
                        //   alert(JSON.stringify(res))
                        // console.log('Odeme Tipleri: ' + JSON.stringify(res))
                        if (res) {
                            var initialArr = { 'Value': '-1', 'Name': 'Ödeme Tipi' };
                            res.splice(0, 0, initialArr);
                            this.setState({ OdemeTipleri: res, loading: false })
                        }
                    })
                    .catch(e => {
                        this.setState({ hasError: true, loading: false })
                        Alert.alert('Hata' + e);
                    })
            }
         

        } catch (error) {
            this.setState({ hasError: true, loading: false })
            Alert.alert('getGetPaymentTypes Hata', error)
        }

    }
    onYakitTipiValueChange(value: string) {
        this.setState({
            yakitTipi: value
        });
    }

    //------------------------------------------------
    _getPlakaListesi = async () => {
        try {
            //  console.log('_getPlakaListesi')
            this.setState({ loading: true })
            const uId = await getStorage('userId');
            //  alert('Uid= ' + uId);
            getPlakaList(uId)
                .then((res) => {
                    // console.log('Res= ' + JSON.stringify(res))
                    this.setState({ loading: false }, () => {
                        setTimeout(() => {
                            if (res) {
                                var initialArr = { 'bm_musteriaraciid': '00000000-0000-0000-0000-000000000001', 'bm_plaka': 'Plaka' };
                                res.splice(0, 0, initialArr);
                                this.setState({ Plaka: res, loading: false });
                            }
                            else {
                                this.setState({ loading: false }, () => {
                                    setTimeout(() => {
                                        Alert.alert(
                                            'Bağlantı Hatası',
                                            'İnternet Bağlantınızı Kontrol Edin',
                                            [

                                                { text: 'Tamam', onPress: () => { this.setState({ loading: false }) } },
                                            ],
                                            { cancelable: true },
                                        );
                                    }, 510);
                                });
                            }
                        }, 510);
                    });

                })
                .catch(e => {
                    Alert.alert('Hata', e);
                })

        } catch (error) {
            Alert.alert('Hata', error);
        }
    }

    _retrieveKullanici = async () => {
        try {
            const value = await getStorage('userId');
            if (value !== null) {
                this.setState({ kullanici: value });
                //  console.log("UserId " + this.state.kullanici);

            }
        } catch (error) {
            Alert.alert('Hata', error);
        }
    };

    _getLatLon = () => {
        try {
            this.setState({ loading: true })
            //    console.log('this.state.latitude: ' + this.state.latitude, ' this.state.longitude:' + this.state.longitude)

            getIstasyonWithLatLon(this.state.latitude, this.state.longitude, 3)
                .then((res) => {
                    //console.log('Istasyonlarım= ' + JSON.stringify(res));

                    if (res.status !== false && res.length > 1) {
                        var initialArr = { 'AccountId': '00000000-0000-0000-0000-000000000000', 'name': 'İstasyon Seç' };
                        res.splice(0, 0, initialArr);
                        this.setState({ datas: res });
                        // Alert.alert('Data', JSON.stringify(res));
                        // console.log('Istasyonlar= ' + JSON.stringify(this.state.datas));
                    }
                    else {
                        Alert.alert('Hata', res.message);
                    }
                    this.setState({ loading: false })
                })
        } catch (error) {
            this.setState({ loading: false })
            Alert.alert('Hata Konum', error);
        }

    }
    componentWillUnmount() {
        console.log('Unmount çalıştı...')
        this.removeLocationUpdates();
    }
    /*
    componentDidUpdate(nextProps, nexState) {
       // console.log('NextProps: ' + JSON.stringify(nextProps))
        if (this.state.longitude <= 0 && (adet<=20)){
            adet++
            console.log('lon calıstı')
            this.getLocation();
        }
        (this.state.longitude >0)
        {
            adet=0;
        }
    }
    */
    componentWillReceiveProps(nextProps) {
        try {

            this.getLocation();
            this._retrieveKullanici();
            this._getPlakaListesi();
            this._getPaymentTypes();
            this._getCity();
        } catch (error) {

        }
    }
    componentDidMount() {
        try {
            //  console.log('Did Mount' + new Date())
            this.setState({ loading: true })
            this.getLocation();
            this._retrieveKullanici();
            this._getPlakaListesi();
            this._getPaymentTypes();
            //  console.log('this.state.OdemeTipleri.length: ' + this.state.OdemeTipleri.length)
            this.state.OdemeTipleri.length > 0 ? this._getPaymentTypes() : '' // Payment Types Çaktı
            this._getCity();

            this.setState({ loading: false })
        } catch (error) {
            this.setState({ loading: false })
            return (
                <View>
                    <Container style={styles.container}>
                        <StatusBar backgroundColor="transparent" barStyle="light-content" />
                        <Header style={{ backgroundColor: 'red' }}>
                            <Left>
                                <Button transparent onPress={() => this.props.navigation.navigate('AnaSayfa')}>
                                    <Image style={{ marginLeft: -15, width: 50, height: 50, resizeMode: 'contain', }} source={require('../../assets/GeriDongri.png')} />
                                </Button>
                            </Left>
                            <Body >
                                <Title style={{ color: '#fff' }}>Satış</Title>
                            </Body>
                            <Right>
                                <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                    <Icon name="menu" style={{ color: '#fff' }} />
                                </Button>
                            </Right>
                        </Header>
                    </Container>
                    <View style={styles.container1}>
                        <Image style={styles.logo} source={require('../../assets/tplogo.png')} />
                        <Image style={{ alignSelf: 'center', marginLeft: 30, marginRight: 30, width: '90%', height: 1, }} source={require('../../assets/cizgi.png')} />
                    </View>
                    <View style={styles.containerOrta}>
                    </View>
                </View>
            )
        }
    }
    _SehirIlceGoster() {
        //console.log('his.state.longitude: ' + this.state.longitude)
        if (this.state.longitude <= 0) {
            return (
                <Item picker style={styles.pickerInputs}>
                    <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={sehirIkon}></Image>
                    <Picker
                        headerBackButtonText="Geri"
                        iosHeader="Seçin"
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        // style={{ width: undefined }}
                        placeholder="Şehir"
                        placeholderStyle={{ color: "black" }}
                        placeholderIconColor="black"
                        selectedValue={this.state.Sehir}
                        onValueChange={this.onSehir.bind(this)}>
                        {
                            this.state.Sehirler.map((item, key) => (
                                // console.log("Sehirler: " + item.bm_sehirid),
                                // console.log("Sehirler: " + item.bm_adi),
                                <Picker.Item
                                    label={item.bm_adi}
                                    value={item.bm_sehirid}
                                    key={item.bm_sehirid} />)
                            )
                        }
                    </Picker>
                </Item>
            )
        }
    }
    //40.8021
    //29.527
    _IlceGoster() {
        // console.log('Lat Ilce: '+this.state.longitude);
        if (this.state.longitude <= 0) {
            return (
                <Item picker style={styles.pickerInputs}>
                    <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={sehirIkon}></Image>
                    <Picker borderColor='black'
                        headerBackButtonText="Geri"
                        iosHeader="Seçin"
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="İlçe"
                        placeholderStyle={{ color: "black" }}
                        placeholderIconColor="black"
                        selectedValue={this.state.Ilce}
                        onValueChange={this.onIlce.bind(this)}>
                        {
                            this.state.IlceList.map((item, key) => (
                                // console.log("Sehirler: " + item.bm_sehirid),
                                // console.log("Sehirler: " + item.bm_adi),
                                <Picker.Item
                                    label={item.bm_adi}
                                    value={item.bm_ilceid}
                                    key={item.bm_ilceid} />)
                            )
                        }
                    </Picker>
                </Item>
            )
        }
    }
    //---------------------------------------------------------------
    hasLocationPermission = async () => {
        if (Platform.OS === 'ios' ||
            (Platform.OS === 'android' && Platform.Version < 23)) {
            return true;
        }
        // var PermissionRequests =  PermissionRequest();
        //console.log('PermissionRequest: '+PermissionRequests)
        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (hasPermission) return true;

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            Toast.show('Location permission denied by user.', ToastAndroid.LONG);
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            Toast.show('Location permission revoked by user.', ToastAndroid.LONG);
        }

        return false;
    }
    getLocation = async () => {
        const hasLocationPermission = await this.hasLocationPermission();

        /*  Permissions.checkMultiple('location', ).then(response => {
              alert('Konum İzni: '+ JSON.stringify(response));
            })
  */
        //   alert('Konum İzni: ' + JSON.stringify(hasLocationPermission));
        if (!hasLocationPermission) {
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
            return;
        }

        this.setState({ loading: true }, () => {
            Geolocation.getCurrentPosition(
                (position) => {
                    this.setState({ location: position, loading: false });
                    // alert('Long: '+ JSON.stringify(position))
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
                    this._getLatLon();
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
                    //  console.log('Update Konumlar: ' + JSON.stringify(position));
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
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, info) {
        console.log('Catch: ' + error, info);
    }
    render() {
        if (this.state.hasError !== true) {
            return (
                <Container style={styles.container}>
                    <StatusBar backgroundColor="transparent" barStyle="light-content" />
                    <Header style={{ backgroundColor: 'red' }}>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.navigate('AnaSayfa')}>
                                <Image style={{ marginLeft: -15, width: 50, height: 50, resizeMode: 'contain', }} source={require('../../assets/GeriDongri.png')} />
                            </Button>
                        </Left>
                        <Body >
                            <Title style={{ color: '#fff' }}>Satış</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name="menu" style={{ color: '#fff' }} />
                            </Button>
                        </Right>
                    </Header>
                    <View style={styles.container1}>

                        <Image style={styles.logo} source={require('../../assets/tplogo.png')} />
                        <Image style={{ alignSelf: 'center', marginLeft: 30, marginRight: 30, width: '90%', height: 1, }} source={require('../../assets/cizgi.png')} />

                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner style={{ flex: 1, backgroundColor: 'red' }}
                            visible={this.state.loading}
                            textContent={'Yükleniyor...'}
                            textStyle={styles.spinnerTextStyle}
                        />
                    </View>
                    <View style={styles.containerOrta}>
                        <Content>
                            <Form>

                                {this._SehirIlceGoster()}
                                {this._IlceGoster()}
                                <Item regular style={styles.comboItem} >
                                    <Image style={styles.logos} source={logo}></Image>
                                    <Picker borderColor='black'
                                        headerBackButtonText="Geri"
                                        iosHeader="Seçin"
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="İstasyon"
                                        placeholderStyle={{ color: "black" }}
                                        placeholderIconColor="black"
                                        selectedValue={this.state.istasyonselectedId === undefined ? 0 : this.state.istasyonselectedId}
                                        onValueChange={this.onIstasyonName.bind(this)}>
                                        {
                                            this.state.datas.map((item, itemIndex) => (
                                                //   console.log("ttip: " + item.name),
                                                //   console.log("ttip: " + item.AccountId),
                                                <Picker.Item
                                                    label={item.name}
                                                    value={item.AccountId}
                                                    key={itemIndex} />)
                                            )
                                        }
                                    </Picker>

                                </Item>

                                <Item picker style={styles.comboItem}>
                                    <Image style={{ marginLeft: 5, width: 30, height: 30, resizeMode: 'contain' }} source={plaka}></Image>
                                    <Picker borderColor='black'
                                        mode="dropdown"
                                        headerBackButtonText="Geri"
                                        iosHeader="Seçin"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Plaka"
                                        placeholderStyle={{ color: "black" }}
                                        placeholderIconColor="black"
                                        selectedValue={this.state.PlakaSelectId}
                                        onValueChange={this.onPlaka.bind(this)}>
                                        {
                                            this.state.Plaka.map((item, key) => (
                                                // console.log("Plaka: " + item.bm_plaka),
                                                // console.log("plaka Id: " + item.bm_musteriaraciid),
                                                <Picker.Item
                                                    label={item.bm_plaka}
                                                    value={item.bm_musteriaraciid}
                                                    key={item.bm_musteriaraciid} />)
                                            )
                                        }
                                    </Picker>
                                </Item>
                                <Item picker style={styles.comboItem}>
                                    <Image style={{ marginLeft: 5, width: 30, height: 30, resizeMode: 'contain' }} source={pompa}></Image>
                                    <Picker borderColor='black'
                                        mode="dropdown"
                                        headerBackButtonText="Geri"
                                        iosHeader="Seçin"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Yakıt Tipi"
                                        placeholderStyle={{ color: "black" }}
                                        placeholderIconColor="black"
                                        selectedValue={this.state.selected2}
                                        onValueChange={this.onValueChange2.bind(this)}>
                                        {
                                            this.state.yakitTipleri.map((item, key) => (
                                                //  console.log("ttip: " + item.bm_yakittipiadi),
                                                //  console.log("ttip: " + item.bm_yakittipiid),
                                                <Picker.Item
                                                    label={item.bm_yakittipiadi}
                                                    value={item.bm_yakittipiid}
                                                    //  label={item.bm_yakittipiadi_1}
                                                    //  value={item.bm_yakitcinsiid_1}
                                                    key={item.bm_yakittipiid} />)
                                            )
                                        }
                                    </Picker>
                                </Item>
                                <Item regular style={styles.Inputs}>
                                    <Image style={{ marginLeft: 5, width: 30, height: 30, resizeMode: 'contain' }} source={pmpa}></Image>

                                    <Input placeholder='Pompa No' style={{ fontSize: 15 }}
                                        keyboardType="number-pad"
                                        placeholderTextColor="black"
                                        onChangeText={(value) => this.setState({ PompaNo: value })}
                                        value={this.state.PompaNo}
                                        underlineColorAndroid="transparent" />
                                </Item>
                                <Item regular style={styles.Inputs}>
                                    <Image style={{ marginLeft: 5, width: 30, height: 30, resizeMode: 'contain' }} source={kampanya}></Image>

                                    <Input placeholder='Kupon Kodu' style={{ fontSize: 15, color: 'black' }}
                                        //keyboardType="phone-pad"
                                        placeholderTextColor="black"
                                        onChangeText={(value) => this.setState({ KuponKodu: value })}
                                        value={this.state.KuponKodu}
                                        underlineColorAndroid="transparent" />
                                </Item>

                                <Item picker style={styles.comboItem}>
                                    <Image style={{ marginLeft: 5, width: 30, height: 30, resizeMode: 'contain' }} source={pompa}></Image>
                                    <Picker borderColor='black'
                                        headerBackButtonText="Geri"
                                        iosHeader="Seçin"
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Ödeme Tipi"
                                        placeholderStyle={{ color: "black" }}
                                        placeholderIconColor="black"
                                        selectedValue={this.state.OdemeTipi}
                                        onValueChange={this.onOdemeTipi.bind(this)}>
                                        {
                                            this.state.OdemeTipleri.map((item, key) => (
                                                <Picker.Item
                                                    label={item.Name}
                                                    value={item.Value}
                                                    key={item.Value} />)
                                            )

                                        }
                                    </Picker>
                                </Item>
                                <View style={styles.switchcontainer}>
                                    <Switch
                                        onValueChange={(value) => this.ShowAlert(value)}
                                        style={{ marginBottom: 0 }}
                                        value={this.state.SwitchOnValueHolder} />
                                    <View style={{ marginLeft: 5, alignContent: 'center' }}>
                                        <Text style={styles.switcText}>Depoyu Doldur</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', alignContent: 'flex-start' }}>
                                    <Item regular style={[styles.Inputs1, this.state.SwitchOnValueHolder ? styles.hidden : styles.Inputs1]} >
                                        <Image style={[styles.ImageShow, this.state.SwitchOnValueHolder ? styles.hidden : styles.ImageShow]} source={OdemeIkon}></Image>
                                        <Input placeholder='Ödeme Tutarı' style={{ width: '90%', backgroundColor: 'transparent', fontSize: 15, color: 'black' }}
                                            keyboardType="decimal-pad"
                                            placeholderTextColor="black"
                                            onChangeText={(value) => this.setState({ Tutar: value })}
                                            value={this.state.Tutar}
                                            underlineColorAndroid="transparent" />
                                    </Item>

                                </View>

                                <View style={{ flex: 1, marginBottom: 10 }}>
                                    <Text style={styles.textYazi}>*Doğru istasyonu ve doğru pompa numarasını işaretlediğinizden emin olun. </Text>

                                    <Button block danger style={{ marginTop: 5, marginLeft: 30, marginRight: 30 }} onPress={() => this._campaignDetailList()}>
                                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>DEVAM</Text>
                                    </Button>

                                </View>
                                <View style={{ flex: 1 }}>

                                </View>
                            </Form>
                        </Content>
                    </View>
                </Container>
            );
        }
        return this.props.children;
    }
}


const styles = StyleSheet.create({
    logos: {
        marginLeft: 5,
        width: 30, height: 30, resizeMode: 'contain'
    },
    pickerInputsAll: {
        height: 100,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    pickerInputs: {
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 5,
        marginBottom: 10,
        height: 40,
        borderColor: 'black',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderWidth: 1,

    },
    textYazi: {
        color: 'red',
        fontSize: 10,
        textAlign: 'left',
        marginLeft: 30,
        marginTop: 10,
        marginBottom: 10,
        fontFamily: "Myriadpro-Regular",
    },
    ImageShow: {
        width: 30, height: 25, resizeMode: 'contain'
    },
    hidden: {
        width: 0,
        height: 0,
        marginTop: -12
    },
    switchcontainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginLeft: 31,
        alignItems: 'center',

    },
    switcText: {
        alignSelf: 'flex-end',
        fontSize: 12,
        // fontWeight: '300',
        color: 'gray',
        marginRight: 1,
        marginTop: -5,
        fontFamily: "Myriadpro-Regular",
    },
    txtYazi: {
        marginTop: -10,
        marginLeft: 35,
        marginRight: 30,
        textAlign: 'left',
        color: 'red',
        fontSize: 14,
        marginBottom: -25,
    },
    container: {
        flex: 1,

    },
    container1: {
        flex: 1,
        backgroundColor: 'transparent',
        marginBottom: 15,
    },
    containerOrta: {
        flex: 5,
        backgroundColor: '#fff',
    },
    containerBottom: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        flexDirection: 'column',
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
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 5,
        marginBottom: 15,
        borderColor: 'black',
        height: 40,
    },
    Inputs1: {
        marginLeft: 30,
        width: '85%',
        height: 40,
        marginRight: 30,
        borderRadius: 5,
        borderColor: 'black',
    },
    logo: {
        marginTop: 5,
        width: '100%',
        height: 80,
        resizeMode: 'contain',
        marginBottom: 10,
        alignSelf: 'center'
    },
    /*  logo: {
          marginTop: 5,
          width: '100%',
          height: 80,
          resizeMode: 'contain',
          marginBottom: 6,
      },
  */
    banner: {
        // marginTop: 2,
        width: '100%',
        height: 220,
        resizeMode: 'contain',
        marginBottom: 5,
    },


    button: {
        resizeMode: 'contain',
        width: 320,
        marginRight: 30,
        marginLeft: 30,
        marginBottom: 10,

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
    comboItem: {
        marginRight: 30,
        marginLeft: 30,
        borderColor: 'black',
        marginBottom: 15,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
    },
    comboItemRow: {
        marginRight: 30,
        marginLeft: 30,
        borderColor: 'black',
        marginBottom: 15,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        flexDirection: 'row',
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});
