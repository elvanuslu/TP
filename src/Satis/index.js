
import React, { Component } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Form, Input, Item, Picker, Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content } from 'native-base';

import { getIstasyonWithLatLon, getYakitTipi, getPlakaList, getStorage } from '../Service/FetchUser';


const k1 = require("../../assets/Resim.png");
const logo = require("../../assets/logoKirmiz.png");
const pompa = require("../../assets/pompatabancakirmizi.png");
const plaka = require("../../assets/plakaKirmizi.png");
const pmpa = require("../../assets/pompaKirmizi.png");
const odeme = require("../../assets/odemeTutar.png");
const kampanya = require("../../assets/kapmpanyakirmizi.png");


export default class Satis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kullanici: '',
            selected2: undefined,
            yakitTipi: undefined,
            yakitTipiDeger: undefined,
            yakitTipleri: [],
            Istasyon: [],
            Plaka: [],
            labelName: '',
            latitude: 40.802095,//41.001895,
            longitude: 29.526954,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            istasyonselectedId: undefined,
            istasyonName: '',
            datas: [],
            PlakaSelectId:undefined,
            PlakaName: '',

        }
    }
    onPlaka(value,label){
        this.setState({
            PlakaSelectId:value,
            PlakaName: label
        },
        () => {
             console.log('selectedValue: ' + this.state.PlakaSelectId, ' Selected: ' + this.state.PlakaName)
         })
    }
    onIstasyonId(val: string) {
        this.setState({ istasyonselectedId: val });
        console.log('Id= ' + val);
    }
    onIstasyonName(value, label) {
        this.setState(
            {
                istasyonselectedId: value,
                istasyonName: label
            },
            () => {
               // console.log('selectedValue: ' + this.state.istasyonName, ' Selected: ' + this.state.istasyonselectedId)
            }
        )
    }
    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }
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
    onYakitTipiValueChange(value: string) {
        this.setState({
            yakitTipi: value
        });
        //  console.log("Yakıt Tipi: " + this.state.yakitTipi);
        // console.log("Yakit Val: " + this.state.yakitTipiDeger);
    }
    _getPlakaListesi = async () => {
        try {
            const uId =  await getStorage('userId');
          //  alert('Uid= ' + uId);
            getPlakaList(uId)
                .then((res) => {
                 //   console.log('Res= ' + JSON.stringify(res))
                    this.setState({ Plaka: res });
                  //  alert('Plaka= '+this.state.Plaka[0].bm_musteriaraciid+' - '+this.state.Plaka[0].bm_plaka);
                })
                .catch(e => {
                    alert(e);
                })
        } catch (error) {
            alert('Genel Hata' + error);
        }
    }
    _getYakitTipleri() {
        getYakitTipi()
            .then((res) => {
                this.setState({
                    yakitTipleri: res,
                });
                // console.log("Yakit" + ("log Yakit" + JSON.stringify(this.state.yakitTipleri)));
                // console.log("Yakit Tipi: " + this.state.yakitTipleri[0].bm_yakittipiadi);
            })
            .catch(e => {
                console.log("hata: " + e);
            });
    }
    _retrieveKullanici = async () => {
        try {
            const value = await AsyncStorage.getItem('userId');
            if (value !== null) {
                this.setState({ kullanici: value });
                console.log("UserId " + this.state.kullanici);

            }
        } catch (error) {
            // Error retrieving data
        }
    };
    _getLocation = async () => {
        try {
            await navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        error: null,
                    });
                    this._getLatLon();
                    console.log('LAT: ' + this.state.latitude + ' Lon: ' + this.state.longitude);
                },
                (error) => this.setState({ error: error.message }),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
            );
        } catch (error) {

        }
    }
    _getLatLon = async () => {
        await getIstasyonWithLatLon(this.state.latitude, this.state.longitude, 5).then((res) => {
            this.setState({ datas: res });
            //   console.log('res= ' + JSON.stringify(this.state.datas));
        })
    }
    

    componentDidMount() {
        console.log('Did Mount');
        this._getLocation();
        this._retrieveKullanici();
        this._getYakitTipleri();
        this._getPlakaListesi();
    }
   
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("hesabim")}>
                            <Icon name="arrow-back" style={{ color: '#fff' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Satış</Title>
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
                        <Form>
                            <Item picker style={styles.comboItem}>
                                <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={logo}></Image>
                                <Picker borderColor='black'
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="İstasyon"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.istasyonselectedId}
                                    onValueChange={this.onIstasyonName.bind(this)}>
                                    {
                                        this.state.datas.map((item, key) => (
                                            // console.log("ttip: " + item.name),
                                            // console.log("ttip: " + item.AccountId),
                                            <Picker.Item
                                                label={item.name}
                                                value={item.AccountId}
                                                key={item.AccountId} />)
                                        )
                                    }
                                </Picker>
                            </Item>

                            <Item picker style={styles.comboItem}>
                                <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={plaka}></Image>

                                <Picker borderColor='black'
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="Plaka..."
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
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
                            <Item picker style={styles.Inputs}>
                                <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={pompa}></Image>
                                <Picker borderColor='black'
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="Yakıt Tipi"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.selected2}
                                    onValueChange={this.onValueChange2.bind(this)}>
                                    {
                                        this.state.yakitTipleri.map((item, key) => (
                                            //  console.log("ttip: " + item.bm_yakittipiadi),
                                            //  console.log("ttip: " + item.bm_yakittipiid),
                                            <Picker.Item
                                                label={item.bm_yakittipiadi}
                                                value={item.bm_yakittipiid}
                                                key={item.bm_yakittipiid} />)
                                        )
                                    }
                                </Picker>
                            </Item>
                            <Item regular style={styles.Inputs}>
                                <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={pmpa}></Image>

                                <Input placeholder='Pompa No...'
                                    keyboardType="number-pad"
                                    placeholderTextColor="#efefef"
                                    underlineColorAndroid="transparent" />
                            </Item>
                            <Item regular style={styles.Inputs}>
                                <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={kampanya}></Image>

                                <Input placeholder='Kupon Kodu...'
                                    //keyboardType="phone-pad"
                                    placeholderTextColor="#efefef"
                                    underlineColorAndroid="transparent" />
                            </Item>
                            <View style={{ marginTop: -20, flexDirection: 'row', alignItems: 'center', alignContent: 'flex-start' }}>
                                <Item regular style={styles.Inputs1}>
                                    <Image style={{ width: 30, height: 25, resizeMode: 'contain' }} source={odeme}></Image>

                                    <Input placeholder='Ödeme tutarı...'
                                        keyboardType="decimal-pad"
                                        placeholderTextColor="#efefef"
                                        underlineColorAndroid="transparent" />
                                </Item>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("hesabim")}>
                                    <Image
                                        style={{ width: 100, height: 100, resizeMode: 'contain', marginLeft: 5 }}
                                        source={require('../../assets/doldursecili.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={styles.txtYazi}>Doğru istasyonu ve doğru pompa numarasını işaretlediğinizden emin olun.{'\n\n'}Kredi kartınızda çekilen ön provizyon yakıt alımından sonra kartınıza iade edilecektir.  </Text>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate("hesabim")}>
                                    <Image
                                        style={styles.button}
                                        source={require('../../assets/odemeyap.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </Form>
                    </Content>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
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
        flex: 2,
        backgroundColor: 'transparent',
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
        height: 90,
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
    switchcontainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginRight: 31,
        alignItems: 'center',

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
    },
});
