
import React, { Component } from 'react';
import { Alert, ListView, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { List, Switch, CheckBox, Form, Input, Item, Picker, Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content } from 'native-base';

import { getYakitTipi, getPlakaList, getStorage, campaignDetailList } from '../Service/FetchUser';

import Spinner from 'react-native-loading-spinner-overlay';

const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");

const logo = require("../../assets/logoKirmiz.png");
const pompa = require("../../assets/pompatabancakirmizi.png");
const plaka = require("../../assets/plakaKirmizi.png");
const pmpa = require("../../assets/pompaKirmizi.png");
const odeme = require("../../assets/odemeTutar.png");
const kampanya = require("../../assets/kapmpanyakirmizi.png");
const datas = [
    {
        bm_kampanyaid: 1,
        bm_pictureurl: k2,
        bm_kisaaciklama1: "Kumar Pratik",
        bm_kisaaciklama: "Its time to build a difference . .",
        time: "3:43 pm"
    },
    {
        bm_kampanyaid: 2,
        bm_pictureurl: k1,
        bm_kisaaciklama1: "Kumar Sanket",
        bm_kisaaciklama: "One needs courage to be happy and smiling all time . . ",
        time: "1:12 pm"
    },
    {
        bm_kampanyaid: 3,
        bm_pictureurl: k3,
        bm_kisaaciklama1: "Kumar Sanket",
        bm_kisaaciklama: "One needs courage to be happy and smiling all time . . ",
        time: "1:12 pm"
    },
];

export default class KampanyaSec extends Component {
    constructor(props) {
        super(props);

        this.state = {
            kullaniciId: undefined,
            datam: [],
            loading: false,


            Istasyon: undefined,
            Plaka: undefined,
            Yakit: undefined,
            OdemeTipi: undefined,
            PompaNo: undefined,
            KuponKodu: undefined,
            Tutar: undefined,

            Istasyonold: undefined,
            Plakaold: undefined,
            Yakitold: undefined,
            Odemeold: undefined,
            PompaNoold: undefined,
            KuponKoduold: undefined,
            Tutarold: undefined,
        }
    }
    _btnDevam = (item) => {
        this.props.navigation.navigate("OzetBilgi", { 'Parametre': this.props.navigation.state.params, 'KampanyaId': item });
    }
    /*
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
    */
    componentWillUnmount() {
        this.setState({ loading: false });
    }
    _git(){
        const Istasyon = this.props.navigation.getParam('Istasyon', '');
        const Plaka = this.props.navigation.getParam('Plaka', '');
        const Yakit = this.props.navigation.getParam('Yakit', '');
        const OdemeTipi = this.props.navigation.getParam('OdemeTipi', '');
        const PompaNo = this.props.navigation.getParam('PompaNo', '');
        const KuponKodu = this.props.navigation.getParam('KuponKodu', '');
        const Tutar = this.props.navigation.getParam('Tutar', '');
        console.log('Istasyonum = '+ JSON.stringify(this.props));
        this.props.navigation.navigate("OzetBilgi", { 'Parametre': this.props.navigation.state.params});
/*
        this.props.navigation.navigate("OzetBilgi", {
            'Istasyon': this.state.istasyonselectedId,
            'Plaka': this.state.PlakaSelectId,
            'Yakit': this.state.selected2,
            'OdemeTipi': this.state.OdemeTipi,
            'PompaNo': this.state.PompaNo,
            'KuponKodu': this.state.KuponKodu,
            'Tutar': this.state.Tutar,
        });
        */
      
    }
    _campaignDetails = (myProp) => {
        try {
            console.log('Propsss= '+ JSON.stringify(myProp));
            campaignDetailList(myProp.navigation.state.params.Istasyon,
                myProp.navigation.state.params.Yakit,
                myProp.navigation.state.params.OdemeTipi,
                myProp.navigation.state.params.Tutar,
                this.state.kullaniciId,
                myProp.navigation.state.params.KuponKodu,
                myProp.navigation.state.params.Plaka)
                .then((res) => {
                    console.log('Gelen Kampanya = ' + JSON.stringify(res));
                    //  console.log('Durumu= ' + this.state.loading);
                    if (res.status == false) {
                        this.setState({datam:null, loading: false });
                        Alert.alert(
                            'Durum Bilgi!',
                            res.message,
                            [
                                { text: 'Tamam', onPress: () => this._git() },
                            ],
                            { cancelable: true },
                        );
                       
                    }
                  else{
                    this.setState({ datam: res, loading: false });
                  }
                })
                .catch((error) => Alert.alert('Hata!', error))
                .finally(
                    this.setState({ loading: false })
                )
        } catch (error) {
            Alert.alert('Genel Hata!', error)
        }
    }
    GetItem = async (item) => {
        const Istasyon = this.props.navigation.getParam('Istasyon', '');
        const Plaka = this.props.navigation.getParam('Plaka', '');
        const Yakit = this.props.navigation.getParam('Yakit', '');
        const OdemeTipi = this.props.navigation.getParam('OdemeTipi', '');
        const PompaNo = this.props.navigation.getParam('PompaNo', '');
        const KuponKodu = this.props.navigation.getParam('KuponKodu', '');
        const Tutar = this.props.navigation.getParam('Tutar', '');
        this.props.navigation.navigate("OzetBilgi", {
            'Id': item,
            'Istasyon': this.state.istasyonselectedId,
            'Plaka': this.state.PlakaSelectId,
            'Yakit': this.state.selected2,
            'OdemeTipi': this.state.OdemeTipi,
            'PompaNo': this.state.PompaNo,
            'KuponKodu': this.state.KuponKodu,
            'Tutar': this.state.Tutar,
        });

    }
    /*
    shouldComponentUpdate( nextProps, nextState ){
        if(nextState.open === this.state.open){   
               return false    //"open" state i değişmediyse componenti tekrar render etme
        }
    }
    */
    componentWillReceiveProps(nextProps) {
        console.log('Kapmanya  2.Data= ' + JSON.stringify(nextProps))
        this._campaignDetails(nextProps);
        if (this.props.Istasyon !== nextProps.Istasyon) {
            console.log('1.Data= ' + nextProps.state.Istasyon + '  2.Data= ' + JSON.stringify(nextProps))
            // this.setState({ reset : true })
        }
    }
    componentDidUpdate(prevProps) {
        console.log('Testing...' + JSON.stringify(prevProps))
        if (prevProps.isFocused !== this.props.isFocused) {
            alert('Testing...')
        }
    }
    componentDidMount = async () => {
          console.log('Props= ' + JSON.stringify(this.props));
        //   console.log("Prms= " + (this.props.navigation.state.params.Istasyon))
        const Id = await getStorage('userId');
        this.setState({ kullaniciId: Id });
        this._campaignDetails(this.props);
    }
    onGetParams = () => {
        const Istasyon = this.props.navigation.getParam('Istasyon', '');
        const Plaka = this.props.navigation.getParam('Plaka', '');
        const Yakit = this.props.navigation.getParam('Yakit', '');
        const OdemeTipi = this.props.navigation.getParam('OdemeTipi', '');
        const PompaNo = this.props.navigation.getParam('PompaNo', '');
        const KuponKodu = this.props.navigation.getParam('KuponKodu', '');
        const Tutar = this.props.navigation.getParam('Tutar', '');
        var degisiklik = false;
        console.log('Station = ' + Istasyon + ' => ' + this.state.Istasyonold);
        if (Istasyon != this.state.Istasyonold) {
            degisiklik = true;
            this.setState({ Istasyonold: Istasyon })
        }

        if (Plaka != this.state.Plaka) {
            degisiklik = true;
            this.setState({ Plakaold: Plaka })
        }

        if (Yakit != this.state.Yakitold) {
            degisiklik = true;
            this.setState({ Yakitold: Yakit })
        }

        if (OdemeTipi != this.state.Odemeold) {
            degisiklik = true;
            this.setState({ Odemeold: PompaNo })
        }

        if (PompaNo != this.state.PompaNoold) {
            degisiklik = true
            this.setState({ PompaNoold: PompaNo })
        }

        if (KuponKodu != this.state.KuponKoduold) {
            degisiklik = true;
            this.setState({ KuponKoduold: KuponKodu })
        }

        if (Tutar != this.state.Tutarold) {
            degisiklik = true;
            this.setState({ Tutarold: Tutar })
        }

        console.log('degisiklik: ' + degisiklik);
        if (degisiklik === true) {
            this._campaignDetails();
            degisiklik = false;
        }
        else alert('değiklikdurum ' + degisiklik);


    }

    render() {
        //   this.onGetParams();
        return (
            <Container style={styles.container}>
                <StatusBar backgroundColor="transparent" barStyle="dark-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('Satis')}>
                            <Icon name="arrow-back" style={{ color: '#fff' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Kampanya Seç</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" style={{ color: '#fff' }} />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container1}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner
                            visible={this.state.loading}
                            textContent={'Yükleniyor...'}
                            textStyle={styles.spinnerTextStyle}
                        />
                    </View>
                    <FlatList
                        data={this.state.datam}
                        renderItem={({ item }) =>
                            <Card key={item.bm_kampanyaid} style={styles.cardmb}>
                                <CardItem header>
                                    <Text style={styles.textBaslik}>{item.bm_mobiladi}</Text>
                                </CardItem>
                                <CardItem cardBody style={{ borderRadius: 10 }}>
                                    <Body>
                                        <TouchableOpacity style={styles.logo} onPress={() => this.GetItem(item.bm_kampanyaid)}>
                                            <Image style={styles.logo} source={{ uri: item.bm_pictureurl }} />
                                        </TouchableOpacity>
                                    </Body>
                                </CardItem>
                                <CardItem footer >
                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                        <Text style={styles.textBaslik}>{item.bm_kampanyaadi.slice(0, 150)}...</Text>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <Button block danger style={{ marginTop: 5, marginRight: 5, width: '50%' }} onPress={() => this._btnDevam(item.bm_kampanyaid)}>
                                                <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>KAMPANYA SEÇ</Text>
                                            </Button>
                                            <Button block danger style={{ marginTop: 5,  marginRight: 5, width: '50%' }} onPress={() => this._btnDevam(item.bm_kampanyaid)}>
                                                <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>KAMPANYASIZ DEVAM ET</Text>
                                            </Button>
                                        </View>
                                    </View>
                                </CardItem>
                            </Card>

                        }
                        keyExtractor={(item, index) => index.toString()}
                    />


                </View>

            </Container>
        );
    }

}
/*
{

  "bm_istasyonid": "DF827EAA-214B-E911-836A-000C29289D89",

  "bm_yakittipiid": "0361929D-0F4A-E911-836A-000C29289D89",

  "bm_gecerliodemetipi": "1",

  "TutarTL": 500,

  "ContactId": "45319CA5-248C-E911-838D-000C29289D89",

  "Plaka": "93FDDDE4-DB90-E911-838F-000C29289D89"

}
*/
const styles = StyleSheet.create({
    textBaslik:{
        color: 'gray',
        fontSize: 12,
        //  fontWeight:'bold',
        textAlign: 'left',
        fontFamily: "FontAwesome",
        
    },
    mb15: {
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    spinnerTextStyle: {
        color: '#FFF'
    },


    container: {
        flex: 1,
        //  flexDirection: 'column',
    },
    container1: {
        flex: 6,
        backgroundColor: '#efefef',
    },
    container2: {
        flex: 8,
    },
    logo: {
        width: '100%',
        height: 220,
        resizeMode: 'contain',
    },
    cardmb: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
})