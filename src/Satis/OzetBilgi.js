
import React, { Component } from 'react';
import { AlertIOS, Alert, TouchableOpacity, Platform, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Switch, CheckBox, Form, Input, Item, Picker, Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content } from 'native-base';

import { SatisBaslat, getStorage, } from '../Service/FetchUser';
import Spinner from 'react-native-loading-spinner-overlay';

const k1 = require("../../assets/Resim.png");
const logo = require("../../assets/logoKirmiz.png");
const pompa = require("../../assets/pompatabancakirmizi.png");
const plaka = require("../../assets/plakaKirmizi.png");
const pmpa = require("../../assets/pompaKirmizi.png");
const odeme = require("../../assets/ikonlar-17.png");
const kampanya = require("../../assets/kapmpanyakirmizi.png");



export default class OzetBilgi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: undefined,
            loading: false,

            oldId: undefined,
            Istasyon: undefined,
            IstasyonId: undefined,
            YakitId: undefined,
            Plaka: undefined,
            PlakaId: undefined,
            Yakit: undefined,
            OdemeTipi: undefined,
            OdemeAdi: undefined,
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

            birimFiyat: undefined,
            indirimliFiyat: undefined,
            indirimOrani: undefined,
            alimmiktariLT: undefined,
            kazanilanPuan: undefined,
            puanTLkarsiligi: undefined,
            harcananPuan: undefined,
            harcananPuanTL: undefined,
            KampanyaId: undefined,

            katkiorani: undefined,
            bayikatkiorani: undefined,
            isortagikatkiorani: undefined,
            isortagiid: undefined,
            istasyonfiyati: undefined,
            birimfiyatgoster: undefined,

        }

    }
    _kampanyaliSatisBaslat() {
        try {

            //    alert('Id =');
            this.setState({ loading: true });

            //     alert('Id =' + contactId);
            if (this.state.userId !== null) {
                SatisBaslat(this.props.navigation.state.params.Istasyon, this.state.userId,
                    this.state.datam.bm_kampanyaId,
                    this.props.navigation.state.params.PompaNo,
                    this.props.navigation.state.params.Plaka,
                    this.props.navigation.state.params.Yakit,
                    this.props.navigation.state.params.Tutar,
                    this.props.navigation.state.params.OdemeTipi,
                    this.props.navigation.state.params.KuponKodu,
                    this.state.birimFiyat,
                    '',
                    this.state.indirimliFiyat,
                    this.props.navigation.state.params.Tutar,
                    this.state.alimmiktariLT,
                    this.state.indirimOrani,
                    this.state.kazanilanPuan,
                    this.state.harcananPuan,
                    this.state.puanTLkarsiligi,
                    this.state.harcananPuanTL)
                    .then((res) => {

                        console.log('Satış Başlat: ' + JSON.stringify(res));
                        if (res.status === false) {
                            Alert.alert('Hata Oluştu!', res.message);

                        }
                        else {
                            Alert.alert('İşlem Başarılı', res.message + ' Yakıt Alabilirsiniz...');
                        }
                    })
                    .catch(error => {
                        Alert.alert('Hata Oluştu!', error);
                    })


            }
        } catch (error) {
            Alert.alert('Hata Oluştu!', error);
        }

    }
    _SatisBaslat = () => {
        console.log('Satış Başlat...')
        this.setState({ loading: true });
        //     alert('Id =' + contactId);
        //  console.log('Tutar: ' + this.state.Tutar)
        if (this.state.userId !== null) {
            SatisBaslat(this.state.IstasyonId, this.state.userId, this.state.KampanyaId, this.state.PompaNo, this.state.PlakaId, this.state.YakitId,
                '', this.state.OdemeTipi, this.state.KuponKodu, this.state.birimFiyat, this.state.istasyonfiyati, this.state.indirimliFiyat, this.state.Tutar,
                this.state.alimmiktariLT, this.state.indirimOrani, this.state.kazanilanPuan, this.state.harcananPuan,
                this.state.puanTLkarsiligi, this.state.harcananPuanTL, this.state.katkiorani, this.state.bayikatkiorani,
                this.state.isortagikatkiorani, this.state.isortagiid)
                .then((res) => {
                    console.log('Satış Başlat: ' + JSON.stringify(res));
                    if (res.status === false) {
                        this.setState({ loading: false }, () => {
                            setTimeout(() => {
                                Alert.alert('Hata Oluştu!', res.message);
                            }, 510);
                        });
                    }
                    else {
                        this.setState({ loading: false }, () => {
                            setTimeout(() => {
                                Alert.alert(
                                    'Yakıt Dolumu',
                                    res.message,
                                    [
        
                                        { text: 'Tamam', onPress: () => this.props.navigation.navigate("AnaSayfa") },
                                    ],
                                    { cancelable: true },
                                )
                            }, 510);
                        });
                       
                    }
                })
                .catch(error => {
                    //this.setState({ loading: false })
                    Alert.alert('Satış Hata !', error);
                })
            // .finally( this.setState({ loading: false }))

        }

    }
    componentWillReceiveProps(nextProps) {
        this.onGetParams();
        //  console.log('ÖZetim Data= ' + JSON.stringify(nextProps))
        /*
        this.setState({
            Istasyon: nextProps.navigation.state.params.Parametre.IstasyonAdi,
            IstasyonId: nextProps.navigation.state.params.Parametre.Istasyon,
            Plaka: nextProps.navigation.state.params.Parametre.PlakaName,
            PlakaId: nextProps.navigation.state.params.Parametre.Plaka,
            Yakit: nextProps.navigation.state.params.Parametre.YakitAdi,
            YakitId: nextProps.navigation.state.params.Parametre.Yakit,
            OdemeTipi: nextProps.navigation.state.params.Parametre.OdemeTipi,
            OdemeAdi: this.props.navigation.state.params.Parametre.OdemeAdi,
            PompaNo: nextProps.navigation.state.params.Parametre.PompaNo,
            KuponKodu: nextProps.navigation.state.params.Parametre.KuponKodu,
            Tutar: nextProps.navigation.state.params.Parametre.Tutar,
 
            birimFiyat: nextProps.navigation.state.params.birimFiyat,
            indirimliFiyat: nextProps.navigation.state.params.indirimliFiyat,
            indirimOrani: nextProps.navigation.state.params.indirimOrani,
            alimmiktariLT: nextProps.navigation.state.params.alimmiktariLT,
            kazanilanPuan: nextProps.navigation.state.params.kazanilanPuan,
            puanTLkarsiligi: nextProps.navigation.state.params.puanTLkarsiligi,
            harcananPuan: nextProps.navigation.state.params.harcananPuan,
            harcananPuanTL: nextProps.navigation.state.params.harcananPuanTL,
            KampanyaId: nextProps.navigation.state.params.KampanyaId,
 
            katkiorani: nextProps.navigation.state.params.katkiorani,
            bayikatkiorani: nextProps.navigation.state.params.bayikatkiorani,
            isortagikatkiorani: nextProps.navigation.state.params.isortagikatkiorani,
            isortagiid: nextProps.navigation.state.params.isortagiid,
 
            istasyonfiyati: nextProps.navigation.state.params.istasyonfiyati,
            //loading:true,
        })
        */
        if (this.props.Istasyon !== nextProps.Istasyon) {
            console.log('1.Data= ' + nextProps.state.Istasyon + '  2.Data= ' + JSON.stringify(nextProps))
            // this.setState({ reset : true })
        }
    }
    /*
    componentDidUpdate(prevProps) {
        // console.log('OzetBilgi...' + JSON.stringify(prevProps))
 
        if (prevProps.isFocused !== this.props.isFocused) {
            alert('Testing...')
        }
    }
    */
    componentDidMount = async () => {
        // AlertIOS.alert('Hata Oluştu!', 'Mesaj');
        //console.log('Componen Did Mount: ' + JSON.stringify(this.props.navigation.state.params))
        try {
            this.onGetParams();
            const contactId = await getStorage('userId');
            this.setState({ userId: contactId });
        } catch (error) {
            console.log('Error Did Mount: ' + error)
        }

        //   console.log('state User' + this.state.userId);
        // console.clear();
        //  console.log('Paraös = ' + JSON.stringify(this.props));

    }
    onGetParams = () => {
        try {
            var Id = this.props.navigation.getParam('KampanyaId', '');
            console.log('Kapmapnya ID=' + Id + ' this.props.navigation.state.params.KampanyaId= ' + this.props.navigation.state.params.KampanyaId);
            // console.log('Name ' + JSON.stringify(this.props.navigation.state.params))
            //  if (Id !== this.state.oldId) {
            if (Id !== '00000000-0000-0000-0000-000000000000') {
                this.setState({
                    oldId: Id,
                    Istasyon: this.props.navigation.state.params.Parametre.IstasyonAdi,
                    IstasyonId: this.props.navigation.state.params.Parametre.Istasyon,
                    Plaka: this.props.navigation.state.params.Parametre.PlakaName,
                    PlakaId: this.props.navigation.state.params.Parametre.Plaka,
                    Yakit: this.props.navigation.state.params.Parametre.YakitAdi,
                    YakitId: this.props.navigation.state.params.Parametre.Yakit,
                    OdemeTipi: this.props.navigation.state.params.Parametre.OdemeTipi,
                    OdemeAdi: this.props.navigation.state.params.Parametre.OdemeAdi,
                    PompaNo: this.props.navigation.state.params.Parametre.PompaNo,
                    KuponKodu: this.props.navigation.state.params.Parametre.KuponKodu,
                    Tutar: this.props.navigation.state.params.Fiyatlar[0].alimtutari,

                    birimFiyat: this.props.navigation.state.params.Fiyatlar[0].TavsiyeEdilenfiyati,
                    istasyonfiyati: this.props.navigation.state.params.Fiyatlar[0].istasyonfiyati,
                    indirimliFiyat: this.props.navigation.state.params.Fiyatlar[0].indirimlifiyati,
                    indirimOrani: this.props.navigation.state.params.Fiyatlar[0].indirimorani,
                    alimmiktariLT: this.props.navigation.state.params.Fiyatlar[0].alinmmiktariLT,
                    kazanilanPuan: this.props.navigation.state.params.Fiyatlar[0].KazanilanPuan,
                    puanTLkarsiligi: this.props.navigation.state.params.puanTLkarsiligi,
                    harcananPuan: this.props.navigation.state.params.Fiyatlar[0].harcananpuan,
                    harcananPuanTL: this.props.navigation.state.params.Fiyatlar[0].harcananpuantl,
                    KampanyaId: this.props.navigation.state.params.Fiyatlar[0].bm_kampanyaId,

                    katkiorani: this.props.navigation.state.params.katkiorani,
                    bayikatkiorani: this.props.navigation.state.params.bayikatkiorani,
                    isortagikatkiorani: this.props.navigation.state.params.isortagikatkiorani,
                    isortagiid: this.props.navigation.state.params.Fiyatlar[0].isortagiid,
                    istasyonfiyati: this.props.navigation.state.params.istasyonfiyati,

                })
            }
            else {
                this.setState({
                    oldId: Id,
                    Istasyon: this.props.navigation.state.params.Parametre.IstasyonAdi,
                    IstasyonId: this.props.navigation.state.params.Parametre.Istasyon,
                    Plaka: this.props.navigation.state.params.Parametre.PlakaName,
                    PlakaId: this.props.navigation.state.params.Parametre.Plaka,
                    Yakit: this.props.navigation.state.params.Parametre.YakitAdi,
                    YakitId: this.props.navigation.state.params.Parametre.Yakit,
                    OdemeTipi: this.props.navigation.state.params.Parametre.OdemeTipi,
                    OdemeAdi: this.props.navigation.state.params.Parametre.OdemeAdi,
                    PompaNo: this.props.navigation.state.params.Parametre.PompaNo,
                    KuponKodu: this.props.navigation.state.params.Parametre.KuponKodu,
                    Tutar: this.props.navigation.state.params.Parametre.Tutar,

                    istasyonfiyati: this.props.navigation.state.params.Parametre.istasyonfiyati,
                    birimfiyatgoster: this.props.navigation.state.params.birimFiyati,
                    birimFiyat: 0,
                    indirimliFiyat: 0,
                    indirimOrani: 0,
                    alimmiktariLT: 0,
                    kazanilanPuan: 0,
                    puanTLkarsiligi: 0,
                    harcananPuan: 0,
                    harcananPuanTL: 0,
                    KampanyaId: this.props.navigation.state.params.KampanyaId,

                })
            }
            this.setState({ birimfiyatgoster: this.props.navigation.state.params.birimFiyati })
            console.log('Paramsiz= ' + (this.state.Tutar));
            console.log('Dene YTest: ' + JSON.stringify(this.props.navigation.state.params.Fiyatlar[0].alimtutari))

        } catch (error) {
            Alert.alert('Hata', error);
        }
    }
    render() {
        //this.onGetParams();
        return (

            <Container style={styles.container}>
                {console.log('Durum Bilgisis: ' + this.state.loading)}
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner style={{ backgroundColor: 'gray' }}
                        visible={this.state.loading}
                        textContent={'Bağlanıyor...'}
                        textStyle={styles.spinnerTextStyle} />
                </View>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("SatisIllce")}>
                            <Image style={{ marginLeft: -15, width: 50, height: 50, resizeMode: 'contain', }} source={require('../../assets/GeriDongri.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Satış Bilgi</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" style={{ color: '#fff' }} />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container1}>
                    <View>
                        <Image style={styles.logo} source={require('../../assets/tplogo.png')}
                        />
                        <Image style={{ alignSelf: 'center', marginLeft: 30, marginRight: 30, width: '90%', height: 1, }} source={require('../../assets/cizgi.png')} />
                    </View>
                </View>

                <View style={styles.containerOrta}>
                    <Content>
                        <Card style={styles.cardmb}>
                            <CardItem header>
                                <Text style={styles.textBaslik}>Satış Özeti</Text>
                            </CardItem>
                            <CardItem item>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                        <Image style={{ marginRight: 5, width: 20, height: 20, resizeMode: 'contain' }} source={logo}></Image>
                                        <Left>
                                            <Text style={styles.txtFiyatlar}>İstasyon </Text>
                                        </Left>
                                        <Right>
                                            <Text style={styles.txtFiyatlar}>{this.state.Istasyon}</Text>
                                        </Right>

                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                        <Image style={{ marginRight: 5, width: 20, height: 20, resizeMode: 'contain' }} source={plaka}></Image>
                                        <Left>
                                            <Text style={styles.txtFiyatlar}>Plaka </Text>
                                        </Left>
                                        <Right>
                                            <Text style={styles.txtFiyatlar}>{this.state.Plaka}</Text>
                                        </Right>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                        <Image style={{ marginRight: 5, width: 20, height: 20, resizeMode: 'contain' }} source={pompa}></Image>
                                        <Left>
                                            <Text style={styles.txtFiyatlar}>Yakıt </Text>
                                        </Left>
                                        <Right>
                                            <Text style={styles.txtFiyatlar}>{this.state.Yakit}</Text>
                                        </Right>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                        <Image style={{ marginRight: 5, width: 20, height: 20, resizeMode: 'contain' }} source={pmpa}></Image>
                                        <Left>
                                            <Text style={styles.txtFiyatlar}>Pompa No </Text>
                                        </Left>
                                        <Right>
                                            <Text style={styles.txtFiyatlar}>{this.state.PompaNo}</Text>
                                        </Right>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                        <Image style={{ marginRight: 5, width: 20, height: 20, resizeMode: 'contain' }} source={kampanya}></Image>
                                        <Left>
                                            <Text style={styles.txtFiyatlar}>Kupon Kodu </Text>
                                        </Left>
                                        <Right>
                                            <Text style={styles.txtFiyatlar}>{this.state.KuponKodu}</Text>
                                        </Right>

                                    </View>

                                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                        <Image style={{ marginRight: 5, width: 20, height: 20, resizeMode: 'contain' }} source={pompa}></Image>

                                        <Left>
                                            <Text style={styles.txtFiyatlar}>Ödeme Tipi </Text>
                                        </Left>
                                        <Right>
                                            <Text style={styles.txtFiyatlar}>{this.state.OdemeAdi}</Text>
                                        </Right>
                                    </View>

                                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                        <Image style={{ marginRight: 5, width: 20, height: 20, resizeMode: 'contain' }} source={odeme}></Image>
                                        <Left>
                                            <Text style={styles.txtFiyatlar}>Tutar </Text>
                                        </Left>
                                        <Right>
                                            <Text style={styles.txtFiyatlar}>{
                                                this.state.Tutar == undefined ? 0 : this.state.Tutar} TL</Text>
                                        </Right>
                                    </View>
                                    <View>

                                        <View style={[styles.containerKampanyasiz, this.props.navigation.state.params.birimFiyat == undefined ? styles.containerKampanyasiz : styles.hidden]}>
                                            <Image style={[styles.Resim, this.props.navigation.state.params.birimFiyat == undefined ? styles.Resim : styles.hidden]} source={odeme}></Image>
                                            <Left>
                                                <Text style={styles.txtFiyatlar}>Birim Fiyat </Text>
                                            </Left>
                                            <Right>
                                                <Text style={styles.txtFiyatlar}>{
                                                    this.state.birimfiyatgoster == undefined ? 0 : this.state.birimfiyatgoster} TL</Text>
                                            </Right>
                                        </View>


                                        {console.log('Birime Fiyate: ' + this.props.navigation.state.params.birimFiyat)}
                                        <View style={[styles.containerKapmayali, this.props.navigation.state.params.birimFiyat ? styles.containerKapmayali : styles.hidden]}>
                                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                                <Image style={[styles.Resim, this.props.navigation.state.params.birimFiyat ? styles.Resim : styles.hidden]} source={pompa}></Image>
                                                <Left>
                                                    <Text style={styles.txtFiyatlar}>Birim Fiyat: {this.state.birimFiyat} TL</Text>

                                                </Left>
                                                <Right>
                                                    <Text style={styles.txtFiyatlar}>İndirimli Fiyat: {this.state.indirimliFiyat} TL</Text>
                                                </Right>

                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                                <Image style={[styles.Resim, this.props.navigation.state.params.birimFiyat ? styles.Resim : styles.hidden]} source={logo}></Image>
                                                <Left>
                                                    <Text style={styles.txtFiyatlar}>İndirim Oranı: %{this.state.indirimOrani}</Text>
                                                </Left>

                                                <Right>
                                                    <Text style={styles.txtFiyatlar}>Alım Miktarı: {this.state.alimmiktariLT} LT</Text>
                                                </Right>

                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                                <Image style={[styles.Resim, this.props.navigation.state.params.birimFiyat ? styles.Resim : styles.hidden]} source={logo}></Image>
                                                <Left>
                                                    <Text style={styles.txtFiyatlar}>Kazanılan Puan: {this.state.kazanilanPuan}</Text>
                                                </Left>

                                                <Right>

                                                    <Text style={styles.txtFiyatlar}>Puan TL Karşılığı: {this.state.kazanilanpuantl ? this.state.kazanilanpuantl : 0} TL</Text>
                                                </Right>

                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                                <Image style={[styles.Resim, this.props.navigation.state.params.birimFiyat ? styles.Resim : styles.hidden]} source={logo}></Image>
                                                <Left>
                                                    <Text style={styles.txtFiyatlar}>Harcanan Puan: {this.state.harcananPuan} </Text>
                                                </Left>
                                                <Right>
                                                    <Text style={styles.txtFiyatlar}>Harcanan Puan TL: {this.state.harcananPuanTL} TL</Text>
                                                </Right>

                                            </View>
                                        </View>
                                    </View>
                                </View>

                            </CardItem>
                            <CardItem footer>
                                <View style={{ flex: 1, }}>
                                    <Button block danger style={{ marginTop: 5, marginRight: 5, width: '100%' }} onPress={() => this._SatisBaslat()}>
                                        <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>YAKIT AL</Text>
                                    </Button>
                                </View>
                            </CardItem>
                        </Card>
                    </Content>
                </View>

            </Container>
        )
    }
}


const styles = StyleSheet.create({
    Resim: {
        marginRight: 5,
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    containerKapmayali: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 10,
    },
    containerKampanyasiz: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
    },
    txtFiyatlar: {
        color: 'gray',
        fontSize: 11,
        textAlign: 'right',
        fontFamily: "FontAwesome",

    },
    textBaslik: {
        color: 'red',
        fontSize: 16,
        //  fontWeight:'bold',
        textAlign: 'center',
        marginLeft: 5,
        marginRight: 5,
        fontFamily: "Myriadpro-Bold",
        marginBottom: 10,
        marginTop: 15,
    },
    txtYazi: {
        color: 'black',
        fontSize: 14,
        //  fontWeight:'bold',
        textAlign: 'left',
        marginLeft: 15,
        marginRight: 40,
        fontFamily: "Myriadpro-Bold",
    },
    txtYazi1: {
        color: 'gray',
        fontSize: 12,
        textAlign: 'left',
        fontFamily: "Myriadpro-Bold",
    },
    cardmb: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 10,
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
        fontWeight: '300',
        color: 'gray',
        marginRight: 5,
    },

    container: {
        flex: 1,

    },
    container1: {
        flex: 2,
        backgroundColor: 'transparent',
        // marginBottom: 20,
    },
    containerOrta: {
        flex: 8,
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
        width: '57%',
        height: 40,
        borderRadius: 5,
        borderColor: 'black',
    },
    logo: {
        marginTop: 5,
        width: '100%',
        height: 80,
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
        borderColor: 'black',
        borderRadius: 5,
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});
