
import React, { Component } from 'react';
import { DatePickerAndroid, DatePickerIOS, NetInfo, Platform, Alert, TextInput, Switch, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { DatePicker, Picker, Icon, Form, Content, Input, Item, Title, Left, Right, Button, Container, Header, Body, Card, CardItem } from 'native-base';
import Icon2 from "react-native-vector-icons";

import Spinner from 'react-native-loading-spinner-overlay';
import TextInputMask from 'react-native-text-input-mask';
import AsyncStorage from '@react-native-community/async-storage';
import { getContact, musteriGuncelle, getCityList, getCitybyId, getStorage, handleError, checkConnection } from '../Service/FetchUser';



const pompa = require("../../assets/pompatabancakirmizi.png");
const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");
const odeme = require("../../assets/odemeTutar.png");
const sehirIkon = require("../../assets/ikonlar-22.png");

const medeniDurum = [{
    'Id': 0,
    'Adi': 'Medeni Durum',
},
{
    'Id': 1,
    'Adi': 'Bekar',
},
{
    'Id': 2,
    'Adi': 'Evli'
}]
const cinsiyet = [{
    'Id': 0,
    'Adi': 'Seçin',
},
{
    'Id': 1,
    'Adi': 'Erkek',
},
{
    'Id': 2,
    'Adi': 'Kadın'
}]

export default class KayitGuncelle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kullanici: '',
            formatted: '',
            extracted: '',
            Adi: '',
            Soyadi: '',
            eposta: '',
            tel: '',
            plaka: '',
            yakitTipi: undefined,
            yakitTipiDeger: undefined,
            Sifre: undefined,
            Sifre2: undefined,
            error: '',
            loading: false,
            isLoading: false,
            yakitTipleri: [],
            selected2: undefined,
            labelName: '',
            mobilKod: undefined,
            mobilKod2: undefined,
            mobilKodFormatted: '',
            mobilextracted: '',
            Sehir: undefined,
            Sehirler: [],
            MedeniDurum: undefined,
            mobilgrupadi: undefined,
            Cinsiyet: undefined,
            Adres: undefined,
            Ilce: undefined,
            IlceList: [],
            chosenDate: new Date(),
            tarihSec: false,
            tarihplace: 'Doğum Tarihiniz',
            baglanti: false,
        }
        this.setDate = this.setDate.bind(this);
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate, tarihSec: true });
        console.log('Doğum Tarih= ' + this.state.chosenDate);
        //  var date = new Date(newDate) //.toDateString("dd-MM-YYY");
        // var formattedDate = new Date(date);
        // var Yeni = formattedDate.getDay() + "." + formattedDate.getMonth() + "." + formattedDate.getYear();
        // console.log('Tarih 2= ' + Yeni);

    }
    componentWillReceiveProps(nextProps) {
        NetInfo.isConnected.fetch().then(async (isConnected) => {
            if (!isConnected) {
                Alert.alert(
                    'Bağlantı Hatası!',
                    'Internet Bağlantınızı Kontrol Edin.',
                    [

                        {
                            text: 'Tamam', onPress: () => {
                                this.setState({
                                    loading: false,
                                    baglanti: false
                                })
                                this.props.navigation.navigate("hesabim")
                            }
                        },
                    ],
                    { cancelable: true },
                )
                return false;
            }
            else {
                this.setState({
                    loading: false,
                    baglanti: true,
                })
                return true;
            }
        });
        this._retrieveKullanici();
    }
    componentDidMount() {

        NetInfo.isConnected.fetch().then(async (isConnected) => {
            if (!isConnected) {
                Alert.alert(
                    'Bağlantı Hatası!',
                    'Internet Bağlantınızı Kontrol Edin.',
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
                return false;
            } else {
                this.setState({
                    loading: false,
                    baglanti: true,
                })
                return true;
            }
        });
        //   this._getCity();
        //  this._getCitybyId();

        this._retrieveKullanici();

    }
    onSehir(value, label) {
        if (value) {
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
    }
    onMedeniDurum(val, label) {
        if (val) {
            this.setState({
                MedeniDurum: val,
            },
                () => {
                    console.log('Medeniyet Durumu : ' + this.state.MedeniDurum)
                })
        }
    }
    onCinsiyet(val, label) {
        if (val) {
            this.setState({
                Cinsiyet: val,
            },
                () => {
                    console.log('Cinsi Durumu : ' + this.state.Cinsiyet)
                })
        }
    }
    onIlce(value, label) {
        if (value) {
            this.setState(
                {
                    Ilce: value,
                    labelName: label
                },
                () => {
                    console.log('Ilce: ' + this.state.Ilce, ' Selected: ' + this.state.labelName)
                }
            )
        }
    }
    _getCitybyId() {
        if (this.state.Sehir !== '00000000-0000-0000-0000-000000000000') {
            try {
                if (this.state.Sehir !== undefined) {
                    getCitybyId(this.state.Sehir)
                        .then((res) => {
                            // console.log('İlçe= ' + JSON.stringify(res));
                            if (res) {
                                var initialArr = { 'bm_ilceid': '00000000-0000-0000-0000-000000000000', 'bm_adi': 'İlçe' };
                                res.splice(0, 0, initialArr);
                                if (this.state.Sehir !== undefined) {
                                    this.setState({
                                        IlceList: res,
                                    })
                                }
                            }
                        })

                }
                else {
                    //Alert.alert('Hata', 'Şehir Seçim');
                }
            } catch (error) {
                // handleError(error, false);
                Alert.alert('Hata', error);
            }
        }
    }
    /*ls -la /App
     getUserInfo(onSuccess, onFail) {
        return new Promise((resolve,reject)=>{
            this.setState({loading:true});
            console.log('Promise çağrıldı....');
            _getUserInfo(this.state.kullanici)
            .then((res)=>{
                if(res){
                    if(res!==false){
                        console.log('Kullanıcı Bilgileri Promise: ' + JSON.stringify(res))
                    }
                }
            })
        })
    }
*/
    datamodel = () => {
        this.setState({
            Adi: null,
            Soyadi: null,
            eposta: null,
            tel: null,
            Sifre: null,
            mobilKod: null,
            mobilKod2: null,
            mobilgrupadi: null,
            Cinsiyet: null,
            MedeniDurum: null,
            //   chosenDate: new Date(res.birthdate) ? new Date(res.birthdate) : null,
            Adres: null,
            Sehir: 0,
            Sifre2: null,
            loading: false,
            //Ilce: res.bm_ilceid,
        });
    }
    componentDidCatch(error, errorInfo) {

        console.log('Did cacth error: ' + error + ' , , ' + errorInfo)
    }
    _getUserInfo = (userID) => {
        try {
            this.setState({ loading: true });
            console.log('kull: ' + this.state.kullanici + '  Kull2: ' + userID);
            // getContact(this.state.kullanici)

            getContact(userID)
                .then((res) => {

                    console.log('Kullanıcı Bilgileri: ' + JSON.stringify(res))
                    if (res) {
                        if (res !== false) {
                            var dtarih = new Date(res.birthdate);
                            console.warn('Dogum Tarihi: ' + dtarih)
                            if (res.contactid !== undefined) {
                                this.setState({
                                    Adi: res.firstname,
                                    Soyadi: res.lastname,
                                    eposta: res.emailaddress1,
                                    tel: res.mobilephone,
                                    Sifre: res.bm_sifre,
                                    mobilKod: res.bm_mobilkod,
                                    mobilKod2: res.bm_mobilkod,
                                    mobilgrupadi: res.bm_mobilgrupadi,
                                    Cinsiyet: res.gendercode,
                                    MedeniDurum: res.familystatuscode,
                                    //   chosenDate: new Date(res.birthdate) ? new Date(res.birthdate) : null,
                                    Adres: res.address1_line1,
                                    Sehir: res.bm_sehirid,
                                    Sifre2: res.bm_sifre,
                                    loading: false,
                                    //Ilce: res.bm_ilceid,
                                });
                                if (res.birthdate !== null) {
                                    this.setDate(new Date(res.birthdate))
                                }
                                else {
                                    this.setState({ chosenDate: '' })
                                }

                                this._getCity();
                                this.setState({ Ilce: res.bm_ilceid })
                                // console.log('Ilce: ' + this.state.Ilce)
                                if (this.state.Ilce !== '') {
                                    this._getCitybyId();
                                    // console.log('Ilce: ' + this.state.Ilce)
                                }

                            }
                            //  console.log('MedeniDurum: ' + this.state.chosenDate.toLocaleDateString())
                        }
                        else {
                            this.datamodel();
                            this.setState({ loading: false }, () => {
                                setTimeout(() => {
                                    Alert.alert(
                                        'Bağlantı Hatası!',
                                        'İnternet Bağlantınızı Kontrol Edin',
                                        [

                                            { text: 'Tamam', onPress: () => { this.setState({ loading: false }) } },
                                        ],
                                        { cancelable: true },
                                    );
                                }, 510);
                            });
                        }
                    }
                    else {
                        this.datamodel();
                        this.setState({ loading: false }, () => {
                            setTimeout(() => {
                                Alert.alert(
                                    'Kullanici Bilgileri!',
                                    'Kullanıcı Bilgileri Getirilemedi.',
                                    [

                                        { text: 'Tamam', onPress: () => { this.setState({ loading: false }) } },
                                    ],
                                    { cancelable: true },
                                );
                            }, 510);
                        });
                    }
                }).catch(error => {
                    throw new Error(error);
                    this.setState({ loading: false }, () => {
                        setTimeout(() => {
                            Alert.alert(
                                'Hata!',
                                'Bğlantı Hatası',
                                [

                                    { text: 'Tamam', onPress: () => { this.setState({ loading: false }) } },
                                ],
                                { cancelable: true },
                            );
                        }, 510);
                    });

                });


        } catch (error) {
            this.datamodel();
            this.setState({ loading: false }, () => {
                setTimeout(() => {
                    Alert.alert(
                        'Hata!',
                        error,
                        [

                            { text: 'Tamam', onPress: () => { this.setState({ loading: false }) } },
                        ],
                        { cancelable: true },
                    );
                }, 510);
            });
        }


    }
    _getCity() {
        try {
            getCityList()
                .then((res) => {
                    if (res) {
                        var initialArr = { 'bm_sehirid': '00000000-0000-0000-0000-000000000000', 'bm_adi': 'Şehir' };
                        res.splice(0, 0, initialArr);
                        this.setState({
                            Sehirler: res,
                        })
                    }
                    else {
                        this.setState({ loading: false }, () => {
                            setTimeout(() => {
                                Alert.alert(
                                    'Bağlantı Hatası!',
                                    'Şehirler Getirilemedi.',
                                    [

                                        { text: 'Tamam', onPress: () => { this.setState({ loading: false }) } },
                                    ],
                                    { cancelable: true },
                                );
                            }, 510);
                        });
                    }
                })
        } catch (error) {
            this.setState({ loading: false })
            Alert.alert('Hata', error);
        }
    }
    _retrieveKullanici = async () => {
        try {
            this.setState({ loading: true });
            const value = await getStorage('userId');
            //  alert(value)
            if (value) {
                this.setState({ kullanici: value });
                //  console.log("UserIdmKayıt " + this.state.kullanici);
                this._getUserInfo(value);
            }
            else {

            }

        } catch (error) {
            this.setState({ loading: false });
            //handleError(error, false);
            Alert.alert('Hata', error);
        }
    };

    onValueChange2(value, label) {
        if (value) {
            this.setState(
                {
                    selected2: value,
                    labelName: label
                },
                () => {
                    console.log('selectedValue: ' + this.state.labelName, ' Selected: ' + this.state.selected2)
                }
            )
        }
        else {
            this.setState({ loading: false }, () => {
                setTimeout(() => {
                    Alert.alert(
                        'Bağlantı Hatası!',
                        'Veriler Getirilemedi.',
                        [

                            { text: 'Tamam', onPress: () => { this.setState({ loading: false }) } },
                        ],
                        { cancelable: true },
                    );
                }, 510);
            });
        }
    }
    _btnKayit = () => {
        try {
            this.setState({ loading: true });
            if (this.state.Sifre === this.state.Sifre2) {
                musteriGuncelle(this.state.kullanici, this.state.Adi, this.state.Soyadi, this.state.eposta,
                    this.state.tel, this.state.Sifre, this.state.mobilKod, this.state.Adres, this.state.chosenDate,
                    this.state.Sehir, this.state.Ilce, this.state.MedeniDurum, this.state.Cinsiyet)
                    .then((responseData) => {
                        this.setState({ loading: false }, () => {
                            setTimeout(() => {
                                Alert.alert(
                                    'Düzenleme!',
                                    responseData.message,
                                    [
                                        { text: 'Tamam', onPress: () => this.props.navigation.navigate("hesabim") },
                                    ],
                                    { cancelable: false },
                                );
                            }, 510);
                        });

                    })
                    .catch((err) => {
                        this.setState({ loading: false }, () => {
                            setTimeout(() => {
                                Alert.alert(
                                    'Bağlantı Hatası!',
                                    err,
                                    [

                                        { text: 'Tamam', onPress: () => { this.setState({ loading: false }) } },
                                    ],
                                    { cancelable: true },
                                );
                            }, 510);
                        });
                    });
            }
            else {
                this.setState({ loading: false }, () => {
                    setTimeout(() => {
                        Alert.alert(
                            'Bilgilerimi Güncelle',
                            'Şifre Aynı Değil!',
                            [

                                { text: 'Tamam', onPress: () => console.log('') },
                            ],
                            { cancelable: true },
                        )
                    }, 510);
                });
            }
        } catch (error) {
            this.setState({ loading: false }, () => {
                setTimeout(() => {
                    Alert.alert(
                        'Bağlantı Hatası!',
                        error,
                        [

                            { text: 'Tamam', onPress: () => { this.setState({ loading: false }) } },
                        ],
                        { cancelable: true },
                    );
                }, 510);
            });
            console.log('hata oluştu: ' + error);
        }
    }
    SehirView() {
        // if (this.state.Sehir) 
        {
            return (
                <View>
                    <Item picker style={styles.pickerInputs}>
                        <Image style={{ height: 40, width: 40 }} source={sehirIkon}></Image>
                        <Picker borderColor='black'
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Şehir"
                            placeholderTextColor="black"
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.Sehir}
                            onValueChange={this.onSehir.bind(this)}>
                            {
                                this.state.Sehirler.map((item, key) => (

                                    <Picker.Item
                                        label={item.bm_adi}
                                        value={item.bm_sehirid}
                                        key={item.bm_sehirid} />)
                                )
                            }
                        </Picker>
                    </Item>
                </View>
            )
        }

    }
    IlceView() {
        if (this.state.Ilce) {
            return (
                <View>

                    <Item picker style={styles.pickerInputs}>
                        <Image style={{ height: 40, width: 40 }} source={sehirIkon}></Image>
                        <Picker borderColor='black'
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="İlçe"
                            placeholderTextColor="black"
                            placeholderIconColor="#007aff"
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
                </View>
            )
        }
        else {
            return (
                <View>
                    <Item picker style={styles.pickerInputs}>
                        <Image style={{ height: 40, width: 40 }} source={sehirIkon}></Image>
                        <Picker borderColor='black'
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="İlçe"
                            placeholderTextColor="black"
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.Ilce}
                            onValueChange={this.onIlce.bind(this)}>
                            {
                                this.state.IlceList.map((item, key) => (
                                    // console.log("Sehirler: " + item.bm_sehirid),
                                    // console.log("Sehirler: " + item.bm_adi),
                                    <Picker.Item
                                        label={item.bm_adi}
                                        value={item.bm_ilceid}
                                        key={item.bm_ilceid} />))
                            }
                        </Picker>
                    </Item>

                </View>
            )
        }
    }
    pickerAndroid = async () => {
        try {
            if (Platform.OS === 'ios') {
                return( <DatePickerIOS
                    date={this.state.chosenDate}
                    onDateChange={this.setDate}
                  />)
               
            }
            else {
                const { action, year, month, day } = await DatePickerAndroid.open({
                    // Use `new Date()` for current date.
                    // May 25 2020. Month 0 is January.
                    date: new Date(),
                });
                if (action !== DatePickerAndroid.dismissedAction) {
                    // Selected year, month (0-11), day
                    console.log('Action: ' + JSON.stringify(action) + ' Year:' + year + ':' + month + ':' + day);
                    console.log('Tarihim: '+ new Date(year,month,day).toLocaleDateString())
                }
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }

    }
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar style={{ color: '#fff' }} barStyle="dark-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("hesabim")}>
                            <Image style={{ marginLeft: -15, width: 50, height: 50, resizeMode: 'contain', }} source={require('../../assets/GeriDongri.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Bilgilerimi Güncelle</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" style={{ color: '#fff' }} />
                        </Button>
                    </Right>
                </Header>

                <View style={styles.container1}>
                    <View>
                        <Image style={styles.logo} source={require('../../assets/tplogo.png')} />
                        <Image style={{ marginBottom: 1, alignSelf: 'center', marginLeft: 30, marginRight: 30, width: '90%', height: 1, }} source={require('../../assets/cizgi.png')} />
                    </View>
                </View>
                <View style={styles.containerOrta}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner
                            visible={this.state.loading}
                            textContent={'Yükleniyor...'}
                            textStyle={styles.spinnerTextStyle} />
                    </View>
                    <Content style={{ backgroundColor: '#fff' }}>

                        <Item regular style={styles.Inputs}>
                            <Icon active name='person' underlayColor='#2089dc' color='#fff' />
                            <Input placeholder='Ad'
                                onChangeText={(value) => this.setState({ Adi: value })}
                                value={this.state.Adi}
                                placeholderTextColor="black"
                                underlineColorAndroid="transparent" />
                        </Item>
                        <Item regular style={styles.Inputs}>
                            <Icon active name='person' underlayColor='#2089dc' color='#fff' />
                            <Input placeholder='Soyad'
                                onChangeText={(value) => this.setState({ Soyadi: value })}
                                value={this.state.Soyadi}
                                placeholderTextColor="black"
                                underlineColorAndroid="transparent" />
                        </Item>

                        <Item regular style={styles.Inputs}>
                            <Icon active name='md-tablet-portrait' underlayColor='#2089dc' color='#fff' />
                            <TextInputMask style={styles.Inputs1}
                                editable={false}
                                placeholder="Telefonunuzu Girin"
                                placeholderTextColor="black"
                                keyboardType="phone-pad"
                                refInput={ref => { this.input = ref }}
                                value={this.state.tel}
                                onChangeText={(formatted, extracted) => {
                                    this.setState({ tel: formatted })
                                }}
                                mask={"0 [000] [000] [00] [00]"} />

                        </Item>
                        <Item regular style={[styles.Inputs, (this.state.mobilKod2 !== '') ? styles.Inputs : styles.hidden]}>
                            <Text style={[styles.Inputsleft, (this.state.mobilKod2 !== '') ? styles.Inputsleft : styles.hidden]}>
                                {this.state.mobilgrupadi}
                            </Text>
                        </Item>
                        {//console.log('Mobil Kod I = ' + typeof this.state.mobilKod2)
                            // console.log('Medeni Durum: ' + this.state.MedeniDurum)
                        }
                        <Item regular style={[styles.Input2, (this.state.mobilKod2 === '') ? styles.Inputs : styles.hidden]}>
                            <Icon active name='md-alarm' color='#fff' />
                            <Input placeholder='Mobil kod'
                                keyboardType="number-pad"
                                onChangeText={(value) => this.setState({ mobilKod: value })}
                                value={this.state.mobilKod}
                                placeholderTextColor="black"
                                underlineColorAndroid="transparent" />
                        </Item>

                        <Item regular style={styles.Inputst}>
                            <TextInput
                                placeholder='Adresinizi Girin'
                                placeholderTextColor="black"
                                placeHolderTextStyle={{ color: 'black', fontSize: 15 }}
                                style={{ marginLeft: 5, height: 60, flex: 1, fontSize: 15, }}
                                multiline={true}
                                numberOfLines={5}
                                onChangeText={(text) => this.setState({ Adres: text })}
                                value={this.state.Adres}
                            />
                        </Item>
                        {this.SehirView()}
                        {this.IlceView()}
                        <Item picker style={styles.pickerInputs}>
                            <Icon style={{ marginLeft: 5, }} active name='person' color='#fff' />
                            <Picker borderColor='black'
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Medeni Durum"
                                placeholderTextColor="black"
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.MedeniDurum}
                                onValueChange={this.onMedeniDurum.bind(this)}>
                                {
                                    medeniDurum.map((item, key) => (
                                        <Picker.Item
                                            label={item.Adi}
                                            value={item.Id}
                                            key={item.Id} />
                                    ))
                                }
                            </Picker>
                        </Item>
                        <Item picker style={styles.pickerInputs}>
                            <Icon style={{ marginLeft: 5, }} active name='person' color='#fff' />
                            <Picker borderColor='black'
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Cinsiyetiniz"
                                placeholderTextColor="black"
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.Cinsiyet}
                                onValueChange={this.onCinsiyet.bind(this)}>
                                {
                                    cinsiyet.map((item, key) => (
                                        <Picker.Item
                                            label={item.Adi}
                                            value={item.Id}
                                            key={item.Id}
                                        />
                                    ))
                                }
                            </Picker>

                        </Item>
                        <Item picker style={{ flex: 1, alignSelf: 'flex-start', width: '79%', marginLeft: 40, marginBottom: 10, borderLeftWidth: 1, borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderRadius: 5, borderColor: 'black' }}>

                            <Image style={{ marginLeft: 5, width: 20, height: 20, resizeMode: 'contain', }} source={require('../../assets/tarih_1.png')} />
                            <DatePicker style={{ flex: 1, alignSelf: 'flex-start', }}
                                defaultDate={this.state.chosenDate}
                                minimumDate={new Date(1900, 1, 1)}
                                maximumDate={new Date(2050, 12, 31)}
                                format="DD-MM-YYYY"
                                locale={"tr"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"spinner"}
                                placeHolderText="Doğum Tarihiniz"
                                textStyle={{ color: "black" }}
                                placeHolderTextStyle={{ color: "black" }}
                                onDateChange={this.setDate}

                                disabled={false} />
                            <Text style={[styles.dogumTarihi, (this.state.tarihSec == true) ? styles.dogumTarihi : styles.hidden]}>
                                {

                                    this.state.chosenDate ? this.state.chosenDate.toLocaleDateString() : '' //.toString().substr(4, 12)
                                }
                            </Text>

                        </Item>
                      
                        <Item regular style={styles.Inputs}>
                            <Icon active name='key' underlayColor='#2089dc' color='#fff' />
                            <Input placeholder='Şifre '
                                // keyboardType="email-address"
                                placeholderTextColor="black"
                                secureTextEntry={true}
                                textContentType="password"
                                onChangeText={(value) => { this.setState({ Sifre: value }) }}
                                value={this.state.Sifre}
                                underlineColorAndroid="transparent" />
                        </Item>
                        <Item regular style={styles.Inputs}>
                            <Icon active name='key' underlayColor='#2089dc' color='#fff' />
                            <Input placeholder='Şifrenizi Yeniden Girin '
                                // keyboardType="email-address"
                                placeholderTextColor="black"
                                secureTextEntry={true}
                                textContentType="password"
                                onChangeText={(value) => this.setState({ Sifre2: value })}
                                value={this.state.Sifre2}
                                underlineColorAndroid="transparent" />
                        </Item>

                        <Button block danger style={styles.mb15} onPress={() => this._btnKayit()}>
                            <Text style={styles.buttonText}>Güncelle</Text>
                        </Button>
                    </Content>
                </View>
            </Container>
        );
    }
}
// Date: {this.state.chosenDate.toString().substr(4, 12)}

/*
  <Item picker style={{
                            flex: 1, alignSelf: 'flex-start', width: '79%', marginLeft: 40, marginBottom: 10,
                            borderLeftWidth: 1, borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1,
                            borderRadius: 5, borderColor: 'black'
                        }}>
                          <Image style={{ marginLeft: 5, width: 20, height: 20, resizeMode: 'contain', }} source={require('../../assets/tarih_1.png')} />
                            <Button block light style={{ with: '100%' }} onPress={() => this.pickerAndroid()}>
                                <Text>Light</Text>
                            </Button>

                        </Item>
  

*/

const styles = StyleSheet.create({
    hidden: {
        width: 0,
        height: 0,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
    },
    container1: {
        flex: 1,
        backgroundColor: 'transparent',
        marginBottom: 5
    },
    containerOrta: {
        flex: 4,
        // alignItems: 'center',
        backgroundColor: 'transparent',
    },
    containerBottom: {
        flex: 2,
        backgroundColor: 'transparent',
    },
    logo: {
        marginTop: 5,
        width: '100%',
        height: 80,
        resizeMode: 'contain',
        marginBottom: 5,
        alignSelf: 'center'
    },
    /* logo: {
         marginTop: 5,
         //  width: '100%',
         height: '100%',
         resizeMode: 'contain',
         marginBottom: 5,
         alignSelf: 'center',
     },
     */
    banner: {
        // marginTop: 2,
        width: '100%',
        height: 220,
        resizeMode: 'contain',
        marginBottom: 5,
    },
    Inputs: {
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 5,
        marginBottom: 10,
        height: 50,
        borderColor: 'black',
    },
    Input2: {
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 5,
        marginBottom: 10,
        height: 50,
        borderColor: 'transparent',
    },
    Inputsleft: {
        textAlign: 'left',
        alignSelf: 'center',
        marginLeft: 10,
        marginRight: 5,
        fontSize: 14,
        color: 'black',
        // borderRadius: 5,
        // marginBottom: 1,
        marginTop: 25,
        height: 50,
        borderColor: 'black',
    },
    Inputst: {
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 5,
        marginBottom: 10,
        height: 70,
        borderColor: 'black',
    },
    pickerInputs: {
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 5,
        marginBottom: 10,
        height: 50,
        borderColor: 'black',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderWidth: 1,

    },

    Inputs1: {
        alignSelf: 'center',
        //  height: 60,
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
    dogumTarihi: {
        textAlign: 'right',
        fontSize: 15,
        color: 'black',
        marginRight: 5,
    },
    switcText: {
        textAlign: 'right',
        fontSize: 12,
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
    spinnerTextStyle: {
        color: '#FFF'
    },
})