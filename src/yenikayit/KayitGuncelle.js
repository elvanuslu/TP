
import React, { Component } from 'react';
import { Alert, TextInput, Switch, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { DatePicker, Picker, Icon, Form, Content, Input, Item, Title, Left, Right, Button, Container, Header, Body, Card, CardItem } from 'native-base';
import Icon2 from "react-native-vector-icons";

import Spinner from 'react-native-loading-spinner-overlay';
import TextInputMask from 'react-native-text-input-mask';
import AsyncStorage from '@react-native-community/async-storage';
import { getContact, musteriGuncelle, getCityList, getCitybyId } from '../Service/FetchUser';

const pompa = require("../../assets/pompatabancakirmizi.png");
const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");

export default class KayitGuncelle extends Component {
    constructor() {
        super();
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
            Sifre: '',
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
        }
        this.setDate = this.setDate.bind(this);
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
        console.log('Tarih= ' + this.state.chosenDate);
        //  var date = new Date(newDate) //.toDateString("dd-MM-YYY");
        // var formattedDate = new Date(date);
        // var Yeni = formattedDate.getDay() + "." + formattedDate.getMonth() + "." + formattedDate.getYear();
        // console.log('Tarih 2= ' + Yeni);

    }
    componentWillReceiveProps(nextProps) {
        this._retrieveKullanici();
    }
    componentDidMount() {
        this._getCity();
        this._getCitybyId();
        this._retrieveKullanici();
    }
    onSehir(value, label) {

        this.setState(
            {
                Sehir: value,
                labelName: label
            },
            () => {
                this._getCitybyId();
                console.log('Sehir: ' + this.state.Sehir, ' Selected: ' + this.state.labelName)
            }
        )
    }
    onIlce(value, label) {

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
    _getCitybyId = () => {
        try {
            if (this.state.Sehir !== undefined) {
                getCitybyId(this.state.Sehir)
                    .then((res) => {
                           console.log('İlçe= '+ JSON.stringify(res));
                        if (this.state.Sehir !== undefined) {
                            this.setState({
                                IlceList: res,
                            })
                        }
                    })
            }
            else {
                Alert.alert('Hata', 'Şehir Seçim');
            }
        } catch (error) {
            Alert.alert('Hata', error);
        }
    }
    _getUserInfo(userID) {

        // console.log('kull: ' + this.state.kullanici + '  Kull2: ' + userID);
        getContact(this.state.kullanici)
            .then((res) => {
                console.log('Kontakte: ' + JSON.stringify(res));
                if (res.contactid !== undefined) {
                    this.setState({
                        Adi: res.firstname,
                        Soyadi: res.lastname,
                        eposta: res.emailaddress1,
                        tel: res.mobilephone,
                        Sifre: res.bm_sifre,
                        mobilKod: res.bm_mobilkod,
                        mobilKod2:res.bm_mobilkod,
                        mobilgrupadi: res.bm_mobilgrupadi,
                        Cinsiyet: res.gendercode,
                        MedeniDurum: res.familystatuscode,
                        chosenDate: Date(res.birthdate),
                        Adres: res.address1_line1,
                        Sehir: res.bm_sehirid,
                        Ilce: res.bm_ilceid,
                    });
                }
            }).catch(error => console.log(error));
    }
    _getCity = async () => {
        try {
            getCityList()
                .then((res) => {
                    this.setState({
                        Sehirler: res,
                    })
                })
        } catch (error) {
            Alert.alert('Hata', error);
        }
    }
    _retrieveKullanici = async () => {
        try {
            const value = await AsyncStorage.getItem('userId');
            if (value !== null) {
                this.setState({ kullanici: value });
                //  console.log("UserIdmKayıt " + this.state.kullanici);
                this._getUserInfo(this.state.kullanici);
            }
        } catch (error) {
            Alert.alert('Hata', error);
        }
    };

    onValueChange2(value, label) {

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
    _btnKayit() {
        try {
            this.setState({ loading: true });
            //   alert('kayit'+this.state.kullanici)
            musteriGuncelle(this.state.kullanici, this.state.Adi, this.state.Soyadi, this.state.eposta, this.state.tel, this.state.Sifre, this.state.mobilKod, this.state.Adres, this.state.chosenDate, this.state.Sehir, this.state.Ilce, this.state.MedeniDurum, this.state.Cinsiyet)
                .then((responseData) => {
                    Alert.alert(
                        'Düzenleme!',
                        responseData.message,
                        [
                            { text: 'Tamam', onPress: () => this.props.navigation.navigate("hesabim") },
                        ],
                        { cancelable: true },
                    );
                    this.setState({
                        loading: false,
                    });
                    this.setState({ loading: false })
                    //  Alert.alert('Düzenleme Başarılı.', responseData.message)
                    // console.log("response: " + JSON.stringify(responseData))

                })
                .catch((err) => { Alert.alert('Hata.', err) });
        } catch (error) {
            Alert.alert('Hata!', error)
            console.log('hata oluştu: ' + error);
        } finally {
            this.setState({ loading: false })
        }
    }
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar style={{ color: '#fff' }} barStyle="dark-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("hesabim")}>
                            <Icon name="arrow-back" style={{ color: '#fff' }} />
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
                        <Image style={styles.logo} source={require('../../assets/tplogo.png')}/>
                        <Image style={{ marginBottom: 1, alignSelf: 'center', marginLeft: 30, marginRight: 30, width: '90%', height: 1, }} source={require('../../assets/cizgi.png')} />
                    </View>
                </View>
                <View style={styles.containerOrta}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner
                            visible={this.state.loading}
                            textContent={'Yükleniyor...'}
                            textStyle={styles.spinnerTextStyle}
                        />
                    </View>
                    <Content style={{ backgroundColor: '#fff' }}>

                        <Item regular style={styles.Inputs}>
                            <Icon active name='person' underlayColor='#2089dc' color='#fff' />
                            <Input placeholder='Ad'
                                onChangeText={(value) => this.setState({ Adi: value })}
                                value={this.state.Adi}
                                //  placeholderTextColor="#efefef"
                                underlineColorAndroid="transparent" />
                        </Item>
                        <Item regular style={styles.Inputs}>
                            <Icon active name='person' underlayColor='#2089dc' color='#fff' />
                            <Input placeholder='Soyad'
                                onChangeText={(value) => this.setState({ Soyadi: value })}
                                value={this.state.Soyadi}
                                // placeholderTextColor="#efefef"
                                underlineColorAndroid="transparent" />
                        </Item>

                        <Item regular style={styles.Inputs}>
                            <Icon active name='md-tablet-portrait' underlayColor='#2089dc' color='#fff' />
                            <TextInputMask style={styles.Inputs1}
                                editable={false}
                                placeholder="Telefon giriniz"
                                // placeholderTextColor="#efefef"
                                keyboardType="phone-pad"
                                refInput={ref => { this.input = ref }}
                                value={this.state.tel}
                                onChangeText={(formatted, extracted) => {
                                    this.setState({ tel: formatted })
                                }}
                                mask={"0 [000] [000] [00] [00]"} />

                        </Item>
                        <Item regular style={[styles.Inputs, (this.state.mobilKod2 !== '' )? styles.Inputs : styles.hidden]}>
                            <Text style={[styles.Inputsleft, (this.state.mobilKod2 !== '' ) ? styles.Inputsleft : styles.hidden]}>
                                {this.state.mobilgrupadi}
                            </Text>
                        </Item>
                        {console.log('Mobil Kod I = '+typeof this.state.mobilKod2)}
                        <Item regular style={[styles.Input2, (   this.state.mobilKod2 === '' ) ? styles.Inputs : styles.hidden]}>
                            <Icon  active name='md-alarm' color='#fff' />
                            <Input placeholder='Mobil kodunuz'
                                keyboardType="number-pad"
                                onChangeText={(value) => this.setState({ mobilKod: value })}
                                value={this.state.mobilKod}
                                //  placeholderTextColor="#efefef"
                                underlineColorAndroid="transparent" />
                        </Item>

                        <Item regular style={styles.Inputst}>
                            <TextInput
                                placeholder='Adresinizi Giriniz'
                                style={{ height: 60, flex: 1, }}
                                multiline={true}
                                numberOfLines={4}
                                onChangeText={(text) => this.setState({ Adres: text })}
                                value={this.state.Adres}
                            />
                        </Item>

                        <Item picker style={styles.pickerInputs}>
                            <Icon style={{marginLeft:5,}} active name='person' color='#fff' />
                            <Picker borderColor='black'
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Şehir"
                                //  placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
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
                            <Icon style={{marginLeft:5,}} active name='person' color='#fff' />
                            <Picker borderColor='black'
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="İlçe"
                                //   placeholderStyle={{ color: "#bfc6ea" }}
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
                        <Item picker style={styles.pickerInputs}>
                            <Icon style={{marginLeft:5,}} active name='person' color='#fff' />
                            <Picker borderColor='black'
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Medeni Durumunuz"
                                //  placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.MedeniDurum}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ MedeniDurum: itemValue })
                                }>

                                <Picker.Item label="Seçiniz" value="Sec" />
                                <Picker.Item label="Bekar" value="1" />
                                <Picker.Item label="Evli" value="2" />
                            </Picker>
                        </Item>
                        {console.log('this.state.MedeniDurum ' + this.state.MedeniDurum)}
                        <Item picker style={styles.pickerInputs}>
                            <Icon style={{marginLeft:5,}} active name='person' color='#fff' />
                            <Picker borderColor='black'
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Cinsiyetiniz"
                                //   placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.Cinsiyet}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ Cinsiyet: itemValue })
                                }>

                                <Picker.Item label="Seçiniz" value="Sec" />
                                <Picker.Item label="Erkek" value="1" />
                                <Picker.Item label="Kadın" value="2" />
                            </Picker>

                        </Item>

                        <Item picker style={{ flex: 1, alignSelf: 'flex-start', width: '80%', marginLeft: 40, marginBottom: 10, borderLeftWidth: 1, borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderRadius: 5, borderColor: 'black' }}>
                            <Icon style={{marginLeft:5,}} name="md-calendar" style={{ color: '#fff' }} />
                            <DatePicker style={{ flex: 1, alignSelf: 'flex-start', }}
                                defaultDate={new Date(2019, 5, 4)}
                                minimumDate={new Date(1900, 1, 1)}
                                maximumDate={new Date(2050, 12, 31)}
                                format="DD-MM-YYYY"
                                locale={"tr"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"spinner"}
                                placeHolderText="Doğum Tarihinizi Giriniz"
                                textStyle={{ color: "green" }}
                                placeHolderTextStyle={{ color: "gray" }}
                                onDateChange={this.setDate}
                                disabled={false} />
                            <Text>

                            </Text>

                        </Item>
                        <Item regular style={styles.Inputs}>
                            <Icon active name='key' underlayColor='#2089dc' color='#fff' />
                            <Input placeholder='Şifre '
                                // keyboardType="email-address"
                                placeholderTextColor="gray"
                                secureTextEntry={true}
                                textContentType="password"
                                onChangeText={(value) => this.setState({ Sifre: value })}
                                value={this.state.Sifre}
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

const styles = StyleSheet.create({
    hidden: {
        width: 0,
        height: 0,
        backgroundColor:'white'
    },
    container: {
        flex: 1,
    },
    container1: {
        flex: 1,
        backgroundColor: 'transparent',
        marginBottom:5
    },
    containerOrta: {
        flex: 5,
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
        alignSelf:'center'
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
        marginLeft: 5,
        marginRight: 5,
        // color: 'gray',
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