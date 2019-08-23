import React, { Component } from 'react';
import { Alert, ListView, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar, Toast } from 'react-native';
import {
    Footer,
    FooterTab,
    List,
    ListItem, Item, Picker, Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content
} from 'native-base';
import { getCitybyLocation, getCitylocationbyId, getIstasyonWithLatLon, getCitybyId, getCityList, getIstasyonByCityId } from '../Service/FetchUser';
import Spinner from 'react-native-loading-spinner-overlay';
const tmis = require("../../assets/tmis.png");
const yoltarifi = require("../../assets/yoltarifi.png");
const pompa = require("../../assets/pompa.png");
const yagdegisim = require("../../assets/yagdegisim.png");
const bankamatik = require("../../assets/tasittanima.png");
const sehirIkon = require("../../assets/ikonlar-22.png");



export default class Filtre extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            userName: '',
            listViewData: [],
            tab1: false,
            tab2: false,
            error: null,
            latitude: undefined,
            longitude: undefined,
            IlceList: [],
            Sehirler: [],
            datas: [],
            istasyonselectedId: undefined,
            Ilce: undefined,
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

    _getData() {
        try {
            //    this.isAvailable();
            this.setState({ loading: true })
            getIstasyonWithLatLon(this.state.latitude, this.state.longitude, 5).then((res) => {
                this.setState({ listViewData: res, loading: false });
                 console.log('res= ' + JSON.stringify(this.state.listViewData));
            })
        } catch (error) {
            Alert.alert('Hata', error);
        }
        finally {
            this.setState({ loading: false })
        }
    }

    _getCity = async () => {
        try {
            // getCityList()
            getCitybyLocation()
                .then((res) => {
                  //  console.log('Şehirler ' + JSON.stringify(res))
                    if (res instanceof Array) {
                        if (res) {
                            var initialArr = { 'bm_sehirid': '00000000-0000-0000-0000-000000000001', 'bm_adi': 'Şehir' };
                            res.splice(0, 0, initialArr);
                            this.setState({
                                Sehirler: res,
                            })
                        }
                        else {
                            Alert.alert(
                                'Bağlantı Hatası',
                                'Bağlantınızı Kontrol Edin',
                                [
                                    { text: 'Tamam', onPress: () => '' },
                                ],
                                { cancelable: true },
                            );
                        }
                    }
                    else console.log('Res is not Array')
                })
                .catch(e => {
                    Alert.alert(
                        'Bağlantı Hatası',
                        'Bağlantınızı Kontrol Edin',
                        [
                            { text: 'Tamam', onPress: () => '' },
                        ],
                        { cancelable: true },
                    );
                })
        } catch (error) {
            Alert.alert('Hata', error, [
                { text: 'Tamam', onPress: () => '' },
            ],
                { cancelable: true });
        }
    }
    _getCitybyId = () => {

        if (this.state.Sehir !== '00000000-0000-0000-0000-000000000001') {
            try {

                //  getCitybyId(this.state.Sehir)
                getCitylocationbyId(this.state.Sehir)
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
    onSehir(value, label) {

        this.setState(
            {
                Sehir: value,
                labelName: label
            },
            () => {
                this._getCitybyId();
                // console.log('Sehir: ' + this.state.Sehir, ' Selected: ' + this.state.labelName)
            }
        )
    }
    onIlce(value, label) {
       // console.log('İlce Secim: ' + value + ' this.state.Ilce: ' + this.state.Ilce)
        this.setState({ loading: true, })
        this.setState(
            {
                Ilce: value,
                labelName: label,

            },
            () => {
                // console.log('Ilce Sci ' + this.state.Ilce)
                try {
                    this.setState({loading:true})
                    getIstasyonByCityId(this.state.Ilce, 5)
                        .then((res) => {
                            if (res.status != false) {
                                //console.log('Istasyon By CITY ' + JSON.stringify(res));
                                this.setState({
                                    listViewData: res,
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

                                this.setState({ listViewData: null, loading: false })
                                if (value !== '00000000-0000-0000-0000-000000000001') {
                                    this.setState({ loading: false }, () => {
                                        setTimeout(() => {
                                            Alert.alert(
                                                'Durum Bilgi',
                                                'İstasyon Bulunamadı',
                                                [
                                                    { text: 'Tamam', onPress: () => { this.setState({ loading: false }) } },
                                                ],
                                                { cancelable: true },
                                            );
                                        }, 0);
                                    });
                                }
                            }
                        })
                    // console.log('Ilce: ' + this.state.Ilce, ' Selected: ' + this.state.labelName)
                } catch (error) {
                    this.setState({ loading: false, })
                    Alert.alert('Hata', error.message);
                }
                finally {
                    this.setState({ loading: false, })
                }
            }
        )
    }
    componentDidMount() {
        this._getCity();
        // console.log('Property= '+JSON.stringify(this.props)); //(this.props.navigation.state.routeName));
        // this._getCoord();
    }
    componentWillReceiveProps(nextProps) {
        this._getCity();
        //  console.log('Receive Props' + JSON.stringify(nextProps))
    }
    // this.GetItem(item.AccountId,item.name,item.Address1_Latitude,item.Address1_Longitude,item.Adres)}
    GetItem(item, name, lat, lon, adres) {
        console.log('Lat: '+lat,' lon: '+lon)
        //  console.log('item=' + item);
        // console.log('Lisyt Data: '+JSON.stringify(this.state.listViewData) )
        this.setState({ latitude: lat })
        this.props.navigation.navigate("Harita", { 'Id': item, 'name': name, 'lat': lat, 'lon': lon, 'adres': adres, 'Para': 'Filtre', 'Tumu': this.state.listViewData });
    }
    _HaritaFooter() {
        // console.log('Lato: '+this.state.latitude)
        //  if (this.state.latitude!==undefined) {
        return (
            <Button active={this.state.tab1} onPress={() => this.toggleTab1()}>
                <Icon active={this.state.tab1} name="map" />
                <Text style={{ color: 'white' }}>Harita</Text>
            </Button>
        )
        /*      }
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
                        <Title style={{ color: '#fff' }}>Filtre</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" style={{ color: '#fff' }} />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container1} >
                    <Image style={styles.logo} source={require('../../assets/tplogo.png')} />
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
                        <Item picker style={styles.pickerInputs}>
                            <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={sehirIkon}></Image>
                            <Picker borderColor='black'
                                mode="dropdown"
                                headerBackButtonText="Geri"
                                iosHeader="Seçin"
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
                                headerBackButtonText="Geri"
                                iosHeader="Seçin"
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
                        <FlatList
                            data={this.state.listViewData}
                            renderItem={({ item }) =>
                                <Card key={item.AccountId} style={styles.cardmb}>
                                    <TouchableOpacity onPress={() => this.GetItem(item.AccountId, item.name, item.Address1_Latitude, item.Address1_Longitude, item.Adres)}>
                                        <CardItem cardBody>
                                            <Body>
                                                <View style={{ width: '100%', flexDirection: 'row', }}>
                                                    <Image style={{ width: 25, resizeMode: 'contain', marginLeft: 10, marginTop: -20 }} source={pompa} />
                                                    <Text style={styles.txt}>{item.name.trim().toUpperCase()}</Text>

                                                </View>
                                                <View style={{ backgroundColor: 'transparent' }}>
                                                    <Text style={styles.txt2}>{item.Adres.trim()}</Text>
                                                </View>
                                                <View style={{ width: '100%', flexDirection: 'row', marginTop: 10, marginLeft: 30 }}>
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
                            <Button active={this.state.tab1} onPress={() => this.toggleTab1()}>
                                <Icon active={this.state.tab1} name="search" />
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
        marginBottom: 30,
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
});