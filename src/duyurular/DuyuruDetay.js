
import React, { Component } from 'react';
import { ActivityIndicator, ScrollView, Alert, FlatList, ListItem, KeyboardAvoidingView, Platform, StyleSheet, Text, View, Image, Switch, TouchableOpacity } from 'react-native';
import { Title, Thumbnail, Left, Right, Button, Container, Header, Content, Card, CardItem, Body, Item, Icon, Input, List } from 'native-base';
import { getKampanyaDetayList } from '../Service/FetchUser';
import Spinner from 'react-native-loading-spinner-overlay';

const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");
const k4 = require("../../assets/Duyuru1.png");

export default class DuyuruDetay extends Component {
    constructor() {
        super();
        this.state = {
            baslangictarihi: '',
            bitistarihi: '',
            kampanyaadi: '',
            kampanyaid: '',
            pictureurl: '',
            Aciklama: '',
            loading: false,
            oldId:'',
        }

    }
    closeActivityIndicator = () => setTimeout(() => this.setState({
        loading: false
    }), 60000)

    componentDidMount() {
        closeActivityIndicator = () => setTimeout(() => this.setState({
            loading: false
        }), 6000)
    
      /*  const itemId = this.props.navigation.getParam('Id');
        //   Alert.alert('Mount');
        if (itemId !== undefined)
            this._getKampanyaDetay(itemId);
            */
    }
   
    _getKampanyaDetay(ItemId) {
        // Alert.alert(ItemId);
        getKampanyaDetayList(ItemId)
            .then((res) => {
                this.setState({
                    kampanyaid: res.bm_kampanyaid,
                    kampanyaadi: res.bm_kampanyaadi,
                    bitistarihi: res.bm_bitistarihi,
                    baslangictarihi: res.bm_baslangictarihi,
                    pictureurl: res.bm_pictureurl,
                    Aciklama: res.bm_aciklama,
                    loading: false,
                });

                console.log(res);
            }).catch(error => console.log('KampanyaDetay Error: ' + error));
    }

    render() {
        const animating = this.state.loading
        const { navigation } = this.props;
        const itemId = navigation.getParam('Id', '');
        
        if (itemId !== this.state.oldId){
            console.log('mId= ' + itemId+' Old Id= '+this.state.oldId);
            this._getKampanyaDetay(itemId);
            this.setState({oldId: itemId})
        }
        return (
            <Container style={styles.container}>
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("Duyurular")}>
                            <Icon name="arrow-back" style={{color:'#fff'}} />
                        </Button>
                    </Left>
                    <Body>
                    <Title style={{color:'#fff'}}>Duyuru Detayı</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" style={{color:'#fff'}}/>
                        </Button>
                    </Right>
                </Header>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Spinner
                                visible={this.state.loading}
                                textContent={'Yükleniyor...'}
                                textStyle={styles.spinnerTextStyle}
                            />
                        </View>
                        <View style={styles.container1}>

                            <Image style={styles.logo1} source={require('../../assets/logo.png')}
                            />
                            <Image style={{ marginLeft: 30, marginRight: 30, width: '80%', height: 1, marginTop: -120 }} source={require('../../assets/cizgi.png')} />
                        </View>

                        <View style={styles.containerOrta}>
                            <Image style={styles.logo} source={k1} />
                        </View>
                        <View style={styles.containerBottom}>

                            <Text style={styles.textBaslik}>Yeni TP Extra Dizel </Text>
                            <Text style={styles.instructions}>
                                Türkiye Petrolleri İnsan Kaynakları Grup Müdürü Çağla Bürümlü almış oldukları ödül hakkında şunları söyledi: “Aldığımız başvurular ile bir kez daha akaryakıt sektöründe tercih edilen markalardan biri olduğumuzu görmek bizi oldukça gururlandırdı. Türkiye Petrolleri, yerli ve köklü olmanın vermiş olduğu güven ile sorumluluklarının farkında olarak, bu ülke insanının ihtiyaçlarını önemseyen doğrudan ve dolaylı yoldan istihdam sağladığı binlerce çalışanı ve ülkemizin her yerinde faaliyet gösteren yaygın istasyon ağı ile akaryakıt sektöründe faaliyet gösteren güçlü oyunculardan biri. “Adımızda Ülkemiz Var” sloganıyla çıktığımız yolda ailemiz olarak gördüğümüz çalışanlarımız ve adaylarımız bizim için çok değerli.
    
    “İnsana Saygı” ilkemizin bir parçası olarak çalışanlarımızın bağlılığını gözlemliyor, ölçüyor, geri bildirim almamızı sağlayan anketler düzenliyor ve tüm bu çalışmaların ışığı altında “Takım” olgusunu geliştirecek ve bunun devamlılığını sağlayacak çalışmalar yapıyoruz. İnsan kaynakları alanında kısa ve orta vadede hedefimiz, önümüzdeki yıllarda da yenilikçi ve çalışana dokunan, onların beklentilerini şirket hedeflerine paralel olarak hayata geçirecek uygulamalarla birlikte akaryakt sektöründe “Tercih Edilen Şirket” olmak ve bu strateji doğrultusunda ilerlemek olacaktır.
                            </Text>

                        </View>

                    </View>
                </ScrollView>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },

    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    container: {
        flex: 1,

    },
    container1: {
        flex: 2,
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginBottom: 5,
    },
    containerOrta: {
        flex: 4,
        backgroundColor: 'transparent',
        marginBottom: 10,
    },
    containerBottom: {
        flex: 4,
        backgroundColor: 'transparent',
        marginBottom: 5,
    },
    logo: {
        width: '100%',
        height: 222,
        resizeMode: 'contain',
    },
    logo1: {
        width: 100,
        resizeMode: 'contain',
        marginTop: -120,
    },
    instructions: {
        textAlign: 'left',
        color: 'gray',
        marginBottom: 5,
        fontSize: 14,
        marginRight: 10,
        marginLeft: 10,
    },
    textBaslik: {
        textAlign: 'left',
        color: 'red',
        marginBottom: 10,
        fontSize: 16,
        marginRight: 20,
        marginLeft: 10,
    },
})