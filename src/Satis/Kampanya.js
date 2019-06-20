
import React, { Component } from 'react';
import { Alert, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Switch, CheckBox, Form, Input, Item, Picker, Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content } from 'native-base';

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
        this.props.navigation.navigate("OzetBilgi",{'Parametre':this.props.navigation.state.params,'KampanyaId':item});
    }
    GetItem(item) {
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
    componentDidMount() {
      console.log('Props= '+JSON.stringify(this.props));
      console.log("Prms= "+( this.props.navigation.state.params.Istasyon))
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
      //  console.log('Station = '+ Istasyon +' => '+ this.state.Istasyonold);
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
             this.setState({ Yakitold: Yakit})
        }
        if (OdemeTipi != this.state.OdemeTipi) {
            degisiklik = true;
            this.setState({ OdemeTipi: PompaNo})
        }
        if (PompaNo != this.state.PompaNoold) {
            degisiklik = true
            this.setState({ PompaNoold: PompaNo })
        }
        if (KuponKodu != this.state.KuponKoduold) {
            degisiklik = true;
        this.setState({ KuponKoduold: KuponKodu })
        }
        if (Tutar != this.state.Tutarold){
            degisiklik = true;
            this.setState({ Tutarold: Tutar })
        }
        console.log('degisiklik: '+degisiklik);
        // this.setState({ Tutarold: Tutar, degisiklik: true })
       /* if (degisiklik==true) {
            this.setState({
                Tutarold: Tutar,
                KuponKoduold: KuponKodu,
                PompaNoold: PompaNo,
                OdemeTipi: PompaNo,
                Yakitold: Yakit,
                Plakaold: Plaka,
                Istasyonold: Istasyon,
            });
            degisiklik=false;
            console.log('Parametreler ' + Istasyon + ' ,' + Plaka + ' ,' + Yakit + ' ,' + OdemeTipi + ' ,' + PompaNo + ' ,' + KuponKodu + ' ,' + Tutar)
        }
        */
    }
    render() {
      //  this.onGetParams();
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
                        data={datas}
                        renderItem={({ item }) =>
                            <Card key={item.bm_kampanyaid} style={styles.cardmb}>
                                <CardItem header>
                                    <Text style={styles.textBaslik}>{item.bm_kisaaciklama}</Text>
                                </CardItem>
                                <CardItem cardBody style={{ borderRadius: 10 }}>
                                    <Body>
                                        <TouchableOpacity style={styles.logo} onPress={() => this.GetItem(item.bm_kampanyaid)}>
                                            <Image style={styles.logo} source={{ uri: item.bm_pictureurl }} />
                                        </TouchableOpacity>
                                    </Body>
                                </CardItem>
                                <CardItem footer >
                                    <Button block danger style={{ marginTop: 5, marginLeft: 5, marginRight: 5, width: '100%' }} onPress={() => this._btnDevam(item.bm_kampanyaid)}>
                                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>SEÇ VE DEVAM ET</Text>
                                    </Button>
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