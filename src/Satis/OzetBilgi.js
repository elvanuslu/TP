
import React, { Component } from 'react';
import { Alert, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Switch, CheckBox, Form, Input, Item, Picker, Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content } from 'native-base';

import { getPaymentTypes, getIstasyonWithLatLon, getYakitTipi, getPlakaList, getStorage, campaignDetailList } from '../Service/FetchUser';
import Spinner from 'react-native-loading-spinner-overlay';
import { thisTypeAnnotation } from '@babel/types';

const k1 = require("../../assets/Resim.png");
const logo = require("../../assets/logoKirmiz.png");
const pompa = require("../../assets/pompatabancakirmizi.png");
const plaka = require("../../assets/plakaKirmizi.png");
const pmpa = require("../../assets/pompaKirmizi.png");
const odeme = require("../../assets/odemeTutar.png");
const kampanya = require("../../assets/kapmpanyakirmizi.png");




export default class OzetBilgi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: undefined,
            loading: false,

            oldId: undefined,
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

    componentWillReceiveProps(nextProps) {
        console.log('ÖZetim Data= ' + JSON.stringify(nextProps))
        this.setState({
            Istasyon: nextProps.navigation.state.params.Parametre.IstasyonAdi,
            Plaka: nextProps.navigation.state.params.Parametre.PlakaName,
            Yakit: nextProps.navigation.state.params.Parametre.YakitAdi,
            OdemeTipi: nextProps.navigation.state.params.Parametre.OdemeAdi,
            PompaNo: nextProps.navigation.state.params.Parametre.PompaNo,
            KuponKodu: nextProps.navigation.state.params.Parametre.KuponKodu,
            Tutar: nextProps.navigation.state.params.Parametre.Tutar

        })
        if (this.props.Istasyon !== nextProps.Istasyon) {
            console.log('1.Data= ' + nextProps.state.Istasyon + '  2.Data= ' + JSON.stringify(nextProps))
            // this.setState({ reset : true })
        }
    }
    componentDidUpdate(prevProps) {
       // console.log('OzetBilgi...' + JSON.stringify(prevProps))
       
        if (prevProps.isFocused !== this.props.isFocused) {
            alert('Testing...')
        }
    }
    componentDidMount() {
        console.clear();
        console.log('Paraös = ' + JSON.stringify(this.props));
        this.onGetParams();
    }
    onGetParams = () => {
        var Id = this.props.navigation.getParam('KampanyaId', '');
         console.log('Name ' + this.props.navigation.state.params.Parametre.IstasyonAdi)
      //  if (Id !== this.state.oldId) {
            this.setState({
                oldId: Id,
                Istasyon: this.props.navigation.state.params.Parametre.IstasyonAdi,
                Plaka: this.props.navigation.state.params.Parametre.PlakaName,
                Yakit: this.props.navigation.state.params.Parametre.YakitAdi,
                OdemeTipi: this.props.navigation.state.params.Parametre.OdemeAdi,
                PompaNo: this.props.navigation.state.params.Parametre.PompaNo,
                KuponKodu: this.props.navigation.state.params.Parametre.KuponKodu,
                Tutar: this.props.navigation.state.params.Parametre.Tutar

            })
          //  console.log('Paramsiz= ' + Id + ' -- ' + JSON.stringify(this.props.navigation.state.params));
          //  console.log('Name ' + this.state.Tutar)
     //   }
        /*
        else if(Id===''){
            this.setState({
                Istasyon: this.props.navigation.state.params.Parametre.IstasyonAdi,
                Plaka: this.props.navigation.state.params.Parametre.PlakaName,
                Yakit: this.props.navigation.state.params.Parametre.YakitAdi,
                OdemeTipi: this.props.navigation.state.params.Parametre.OdemeAdi,
                PompaNo: this.props.navigation.state.params.Parametre.PompaNo,
                KuponKodu: this.props.navigation.state.params.Parametre.KuponKodu,
                Tutar: this.props.navigation.state.params.Parametre.Tutar
            })
            console.log('Paramsiz= ' + JSON.stringify(this.props.navigation.state.params));
        }
    */
    }
    render() {
        //this.onGetParams();
        return (
            <Container style={styles.container}>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("KampanyaSec")}>
                            <Icon name="arrow-back" style={{ color: '#fff' }} />
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
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner
                        visible={this.state.loading}
                        textContent={'Yükleniyor...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                </View>
                <View style={styles.containerOrta}>
                    <Content>
                        <Card style={styles.cardmb}>
                            <CardItem header>
                                <Text style={styles.textBaslik}>Satış Özeti</Text>
                            </CardItem>
                            <CardItem >
                                <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={logo}></Image>
                                <Left>
                                    <Text style={styles.txtYazi}>İstasyon </Text>
                                </Left>
                                <Right>
                                    <Text style={styles.txtYazi1}>{this.state.Istasyon}</Text>
                                </Right>


                            </CardItem>
                            <CardItem>
                                <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={plaka}></Image>

                                <Left>
                                    <Text style={styles.txtYazi}>Plaka </Text>
                                </Left>
                                <Right>
                                    <Text style={styles.txtYazi1}>{this.state.Plaka}</Text>
                                </Right>


                            </CardItem>
                            <CardItem>
                                <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={pompa}></Image>
                                <Left>
                                    <Text style={styles.txtYazi}>Yakıt </Text>
                                </Left>
                                <Right>
                                    <Text style={styles.txtYazi1}>{this.state.Yakit}</Text>
                                </Right>


                            </CardItem>
                            <CardItem>
                                <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={pmpa}></Image>
                                <Left>
                                    <Text style={styles.txtYazi}>Pompa No </Text>
                                </Left>
                                <Right>
                                    <Text style={styles.txtYazi1}>{this.state.PompaNo}</Text>
                                </Right>
                            </CardItem>
                            <CardItem>
                                <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={kampanya}></Image>
                                <Left>
                                    <Text style={styles.txtYazi}>Kupon Kodu </Text>
                                </Left>
                                <Right>
                                    <Text style={styles.txtYazi1}>{this.state.KuponKodu}</Text>
                                </Right>


                            </CardItem>
                            <CardItem>
                                <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={pompa}></Image>

                                <Left>
                                    <Text style={styles.txtYazi}>Ödeme Tipi </Text>
                                </Left>
                                <Right>
                                    <Text style={styles.txtYazi1}>{this.state.OdemeTipi}</Text>
                                </Right>


                            </CardItem>
                            <CardItem>
                                <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={pompa}></Image>

                                <Left>
                                    <Text style={styles.txtYazi}>Tutar </Text>
                                </Left>
                                <Right>
                                    <Text style={styles.txtYazi1}>{
                                        this.state.Tutar == undefined ? 0 : this.state.Tutar} TL</Text>
                                </Right>


                            </CardItem>
                            <CardItem footer >
                                <Button block danger style={{ marginTop: 5, marginLeft: 5, marginRight: 5, width: '100%' }} onPress={() => this._btnDevam(item.bm_kampanyaid)}>
                                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>YAKIT AL</Text>
                                </Button>
                            </CardItem>
                        </Card>
                    </Content>
                </View>

            </Container>
        )
    }
}


const styles = StyleSheet.create({
    textBaslik: {
        color: 'red',
        fontSize: 18,
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
        flex: 1,
        backgroundColor: 'transparent',
        marginBottom: 20,
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
