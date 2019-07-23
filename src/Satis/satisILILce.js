
import React, { Component } from 'react';
import { Alert, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Switch, Form, Input, Item, Picker, Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content } from 'native-base';

import { campaignDetailList, getAracYakitTipi, getIstasyonByCityId, getPaymentTypes, getIstasyonWithLatLon, getYakitTipi, getPlakaList, getStorage, getCitybyId, getCityList } from '../Service/FetchUser';
import Spinner from 'react-native-loading-spinner-overlay';



const k1 = require("../../assets/Resim.png");
const logo = require("../../assets/logoGri.png");
const pompa = require("../../assets/pompatabancaGri.png");
const plaka = require("../../assets/plakaGri.png");
const pmpa = require("../../assets/pompaGri.png");
const odeme = require("../../assets/odemeTutar.png");
const kampanya = require("../../assets/kapmpanyaGri.png");
const OdemeIkon = require("../../assets/ikonlar-16.png");
const sehirIkon = require("../../assets/ikonlar-22.png");



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
            latitude: 40.802095,//41.001895,
            longitude: 29.526954,
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

        }
    }
    _getGps() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                    loading: false,
                });
            },
            (error) => this.setState({
                error: error.message,
                latitude: 40.802095,
                longitude: 29.526954,
            },
                this._getLatLon()),
            {
                enableHighAccuracy: true, timeout: 50000, maximumAge: 1000
            }
        );
    }
    _getCity = async () => {
        try {
            getCityList()
                .then((res) => {
                    // console.log('Şehirler ' + JSON.stringify(res))
                    var initialArr = { 'bm_sehirid': '00000000-0000-0000-0000-000000000001', 'bm_adi': 'Şehir' };
                    res.splice(0, 0, initialArr);
                    this.setState({
                        Sehirler: res,
                    })
                })
        } catch (error) {
            Alert.alert('Hata', error);
        }
    }
    getcampaignDetailList = async () => {
        try {
            const Id = await getStorage('userId');
            campaignDetailList(this.state.istasyonselectedId, his.state.selected2, this.state.OdemeTipi, this.state.Tutar ? this.state.Tutar : 0, Id, this.state.KuponKodu, this.state.PlakaSelectId)
                .then((res) => {
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
                })
        } catch (error) {

        }
        finally {

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
    onIlce(value, label) {
        this.setState({ loading: true, })
        this.setState(
            {
                Ilce: value,
                labelName: label,

            },
            () => {
               // console.log('Ilce Sci ' + this.state.Ilce)
                try {
                    getIstasyonByCityId(this.state.Ilce, 10)
                        .then((res) => {
                            if (res.status != false) {
                               // console.log('Istasyon By CITY ' + JSON.stringify(res));
                                this.setState({
                                    datas: res,
                                    loading: false,
                                })
                            }
                            else {
                                this.setState({istasyonselectedId:'', loading: false,datas:[{
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
                                  }] })
                                
                                 
                                //Alert.alert('Bulunamadı!', res.message);
                            }
                        })
                   // console.log('Ilce: ' + this.state.Ilce, ' Selected: ' + this.state.labelName)
                } catch (error) {
                    Alert.alert('Hata!', error.message);
                }
                finally {
                    this.setState({ loading: false, })
                }
            }
        )
    }
    _getCitybyId = () => {

        if (this.state.Sehir !== '00000000-0000-0000-0000-000000000001') {
            try {

                getCitybyId(this.state.Sehir)
                    .then((res) => {
                        //  console.log('İlçe= ' + JSON.stringify(res));
                        var initialArr = { 'bm_ilceid': '00000000-0000-0000-0000-000000000001', 'bm_adi': 'İlçe' };
                        res.splice(0, 0, initialArr);
                        if (this.state.Sehir !== undefined) {
                            this.setState({
                                IlceList: res,
                                loading: false,
                            })
                        }
                    })
            } catch (error) {
                Alert.alert('Hata', error);
            }
            finally {
                this.setState({ loading: false })
            }
        }
    }
    componentDidUpdate() {
        if (this.state.latitude === undefined)
            this._getGps();
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

                                        /*
                                        campaignDetailList(this.state.istasyonselectedId, this.state.selected2, this.state.OdemeTipi, this.state.Tutar, Id, '', this.state.KuponKodu, 0, this.state.PlakaSelectId)
                                            .then((res) => {
                                                this.setState({ loading: false })
                                                console.log('Kapmanya = ' + JSON.stringify(res));
                                                if (res.status == false) {
                                                    Alert.alert(
                                                        'Durum Bilgi!',
                                                        res.message,
                                                        [
                                                            { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                                                        ],
                                                        { cancelable: true },
                                                    );
                                                }
                                                //else 
                                                {
                                                    
                                                }
                                            }).catch((error) => Alert.alert('Hata!', error))
                                            .finally(
                                                this.setState({ loading: false })
                                            )
                                            */
                                    }
                                    else {
                                        this.setState({ loading: false })
                                        Alert.alert('Hata!', 'Tutar Girilmedi!');
                                    }
                                }

                            }
                            else {
                                this.setState({ loading: false })
                                Alert.alert('Hata!', 'Pompa Numarası Girilmedi!');
                            }
                        }
                        else {
                            this.setState({ loading: false })
                            Alert.alert('Hata!', 'Ödeme Tipi Seçilmedi!');
                        }

                    }
                    else {
                        this.setState({ loading: false })
                        Alert.alert('Hata!', 'Yakıt Seçilmedi!');
                    }
                }
                else {
                    this.setState({ loading: false })
                    Alert.alert('Hata!', 'Plaka Seçilmedi!');
                }

            }
            else {
                this.setState({ loading: false })
                Alert.alert('Hata!', 'Istasyon Seçilmedi!');
            }
        } catch (error) {
            this.setState({ loading: false })
            Alert.alert('Hata!', error);
        }
        finally {
            this.setState({ loading: false })
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
        this.setState({
            PlakaSelectId: value,
            PlakaName: label,
            PlakaName: this.state.Plaka.find(p => p.bm_musteriaraciid === value).bm_plaka,

        },
            () => {
                this._getAracYakitTipleri(value);
                this.setState({ loading: false })
                //       console.log('selectedValue: ' + this.state.PlakaSelectId, ' Selected: ' + this.state.PlakaName)
            })
    }

    _getAracYakitTipleri = (aracId) => {
        try {
            this.setState({ loading: true })
            getAracYakitTipi(aracId)
                .then((res) => {
                    //   console.log("Arac Yakit " + JSON.stringify(res));

                    var jsonBody = [
                        {
                            "bm_yakittipiid": '00000000-0000-0000-0000-000000000001',
                            "bm_yakittipiadi": 'Yakıt Tipi'
                        },
                        {
                            "bm_yakittipiid": res.bm_yakitcinsiid_1,
                            "bm_yakittipiadi": res.bm_yakittipiadi_1
                        },
                        {
                            "bm_yakittipiid": res.bm_yakitcinsiid_2,
                            "bm_yakittipiadi": res.bm_yakittipiadi_2
                        },
                    ]
                    this.setState({
                        yakitTipleri: jsonBody,
                        loading: false,
                    });
                   // console.log('Yakitlar ksonBody== ' + JSON.stringify(jsonBody));
                })
                .catch(e => {
                    this.setState({ loading: false })
                    console.log("hata: " + e);
                }).finally(this.setState({ loading: false }))

        } catch (error) {
            this.setState({ loading: false })
            Alert.alert('Hata', error);
        }
        finally {
            this.setState({ loading: false })
        }
    }
    onIstasyonId(val: string) {
        this.setState({ istasyonselectedId: val });
        // console.log('Id= ' + val);
    }
    onIstasyonName(value, label) {

        this.setState(
            {
                istasyonselectedId: value,
                istasyonName: label,
                IstasyonAdi: this.state.datas.find(branch => branch.AccountId === value).name,
            },
            () => {

                // console.log('selectedValue: ' + this.state.istasyonName, ' Selected: ' + this.state.istasyonselectedId + ' Name= ' + this.state.IstasyonAdi)

            }
        )
    }
    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }
    onValueChange2(value, label) {

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
            this.setState({ loading: true })
            getPaymentTypes()
                .then((res) => {
                    //   alert(JSON.stringify(res))
                    // console.log('Odeme Tipleri: ' + JSON.stringify(res))
                    var initialArr = { 'Value': '-1', 'Name': 'Ödeme Tipi' };
                    res.splice(0, 0, initialArr);
                    this.setState({ OdemeTipleri: res, loading: false })

                })
                .catch(e => {
                    this.setState({ loading: false })
                    Alert.alert('Hata' + e);
                })
                .finally(
                    this.setState({ loading: false }))

        } catch (error) {
            Alert.alert('getGetPaymentTypes Hata', error)
        }
        finally {
            this.setState({ loading: false });
        }
    }
    onYakitTipiValueChange(value: string) {
        this.setState({
            yakitTipi: value
        });
        //  console.log("Yakıt Tipi: " + this.state.yakitTipi);
        // console.log("Yakit Val: " + this.state.yakitTipiDeger);
    }

    //------------------------------------------------
    _getPlakaListesi = async () => {
        try {
            this.setState({ loading: true })
            const uId = await getStorage('userId');
            //  alert('Uid= ' + uId);
            getPlakaList(uId)
                .then((res) => {
                    //   console.log('Res= ' + JSON.stringify(res))
                    var initialArr = { 'bm_musteriaraciid': '00000000-0000-0000-0000-000000000001', 'bm_plaka': 'Plaka' };
                    res.splice(0, 0, initialArr);
                    this.setState({ Plaka: res, loading: false });
                })
                .catch(e => {
                    Alert.alert('Hata', e);
                })
                .finally(this.setState({ loading: false }))
        } catch (error) {
            Alert.alert('Hata', error);
        }
    }
    _getYakitTipleri() {
        try {
            this.setState({ loading: true })
            getYakitTipi()
                .then((res) => {
                    this.setState({
                        yakitTipleri: res,
                        loading: false,
                    });
                    //   console.log("Yakitlog Yakit" + JSON.stringify(this.state.yakitTipleri));
                    // console.log("Yakit Tipi: " + this.state.yakitTipleri[0].bm_yakittipiadi);
                })
                .catch(e => {
                    console.log("hata: " + e);
                }).finally(this.setState({ loading: false }))

        } catch (error) {
            Alert.alert('Hata', error);
        }
    }
    _retrieveKullanici = async () => {
        try {
            const value = await getStorage('userId');
            if (value !== null) {
                this.setState({ kullanici: value });
                console.log("UserId " + this.state.kullanici);

            }
        } catch (error) {
            Alert.alert('Hata', error);
        }
    };
    _getLocation = () => {
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
                    this._getLatLon();
                    console.log('LAT: ' + this.state.latitude + ' Lon: ' + this.state.longitude);
                },
                (error) => this.setState({
                    error: error.message,
                    latitude: 40.802095,
                    longitude: 29.526954,
                },
                    this._getLatLon()),

                { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 },
            );
            this.watchID = navigator.geolocation.watchPosition((position) => {
                //Will give you the location on location change
              //  console.log('watch ' + JSON.stringify(position));
                //  alert(JSON.stringify(position));
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                //getting the Latitude from the location json
                this.setState({ currentLongitude: currentLongitude });
                //Setting state Longitude to re re-render the Longitude Text
                this.setState({ currentLatitude: currentLatitude });
                //Setting state Latitude to re re-render the Longitude Text
                this.setState({ loading: false })
            });
        } catch (error) {
            Alert.alert('Hata', error);
        }
        finally {
            this._getLatLon();
        }
    }
    _getLatLon = () => {
        try {
            this.setState({ loading: true })
            getIstasyonWithLatLon(this.state.latitude, this.state.longitude, 10)
                .then((res) => {
                    if (status !== false) {
                      //  console.log('Istasyonlarım= ' + JSON.stringify(res));
                        this.setState({ datas: res, loading: false });
                       // Alert.alert('Data', JSON.stringify(res));
                       // console.log('Istasyonlar= ' + JSON.stringify(this.state.datas));
                    }
                    else {
                        Alert.alert('Hata', res.message);
                    }
                })
        } catch (error) {
            Alert.alert('Hata', error);
        }
        finally {
            this.setState({ loading: false })
        }
    }


    componentWillReceiveProps(nextProps) {
      //  console.log('recievr Props')
        // this.isAvailable();
        //  console.log('Did Mount');
      //  this._getLocation();
        this._retrieveKullanici();
        this._getYakitTipleri();
        this._getPlakaListesi();
        this._getPaymentTypes();
    }
    componentDidMount() {
        //   this.isAvailable();
        //  console.log('Did Mount');
      //  this._getLocation();
        this._retrieveKullanici();
        this._getYakitTipleri();
        this._getPlakaListesi();
        this._getPaymentTypes();
        this._getCity();
    }

    render() {
        return (
            <Container style={styles.container}>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('AnaSayfa')}>
                        <Image style={{marginLeft:-15, width: 50, height: 50, resizeMode: 'contain',}} source={require('../../assets/GeriDongri.png')} />
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
                    <Spinner
                        visible={this.state.loading}
                        textContent={'Yükleniyor...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                </View>
                <View style={styles.containerOrta}>
                    <Content>
                        <Form>
                            <Item picker style={styles.pickerInputs}>
                                <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={sehirIkon}></Image>
                                <Picker borderColor='black'
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
                            <Item picker style={styles.pickerInputs}>
                                <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={sehirIkon}></Image>
                                <Picker borderColor='black'
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
                            <Item regular style={styles.comboItem} >
                                <Image style={styles.logos} source={logo}></Image>
                                <Picker borderColor='black'
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="İstasyon"
                                    placeholderStyle={{ color: "black" }}
                                    placeholderIconColor="black"
                                    selectedValue={this.state.istasyonselectedId}
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
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="Yakıt Tipi"
                                    placeholderStyle={{ color: "gray" }}
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
}
/*
{
    "bm_istasyonid": "df827eaa-214b-e911-836a-000c29289d89",
    "bm_yakittipiid": "0161929d-0f4a-e911-836a-000c29289d89",
    "bm_gecerliodemetipi": "1",
    "TutarTL": 0,
    "ContactId": "f9abd025-258c-e911-838d-000c29289d89",
    "bm_kartId": "",
    "bm_kampanyakuponuId": "",
    "FraudIn": 0,
    "Plaka": "34 Ar 345"
  }
  */

const styles = StyleSheet.create({
    logos: {
        marginLeft: 5,
        width: 30, height: 30, resizeMode: 'contain'
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
