
import React, { Component } from 'react';
import { ActivityIndicator, ScrollView, Alert, FlatList, ListItem, KeyboardAvoidingView, Platform, StyleSheet, Text, View, Image, Switch, TouchableOpacity } from 'react-native';
import { Title, Thumbnail, Left, Right, Button, Container, Header, Content, Card, CardItem, Body, Item, Icon, Input, List } from 'native-base';
import { getDuyuruListByUser, getStorage } from '../Service/FetchUser';
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
            oldId: '',
            url: '',
            Aciklama: '',
            Aciklama2: '',
        }

    }
    closeActivityIndicator = () => setTimeout(() => this.setState({
        loading: false
    }), 4000)

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

    _getDuyuruListesi = async () => {
      try {
        const uId = await getStorage('userId'); 
        //   console.log('mount'+uId)
        getDuyuruListByUser(uId)
            .then((res) => {
                this.setState({ data: res, loading: false });
                // console.log(JSON.stringify(res));
            })
            .catch((error) => alert(error))
      } catch (error) {
        Alert.alert('Hata Oluştu',error);  
      } 
    }
    render() {
        const animating = this.state.loading
        const { navigation } = this.props;
        const itemId = navigation.getParam('Id', '');
        const url = navigation.getParam('url', '');
        const aciklama = navigation.getParam('aciklama', '');
        const aciklama2 = navigation.getParam('aciklama2', '');

        if (itemId !== this.state.oldId) {
            console.log('mId= ' + itemId + ' Old Id= ' + this.state.oldId);
            // this._getDuyuruListesi(itemId);
            this.setState({
                loading:true,
                oldId: itemId,
                url: 'http://85.105.103.4:8096' + url, Aciklama: aciklama, Aciklama2: aciklama2
            })
            this.closeActivityIndicator();
        }
        console.log('url=' + this.state.url)
        return (
            <Container style={styles.container}>
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("Duyurular")}>
                            <Icon name="arrow-back" style={{ color: '#fff' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Duyuru Detayı</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" style={{ color: '#fff' }} />
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
                            <Image style={{ marginLeft: 30, marginRight: 30, width: '90%', height: 1, marginTop: -130, marginBottom: 5 }} source={require('../../assets/cizgi.png')} />
                        </View>

                        <View style={styles.containerOrta}>
                            <Image style={styles.logo} source={{ uri: this.state.url }} />
                        </View>
                        <View style={styles.containerBottom}>
                            <Text style={styles.textBaslik}>{this.state.Aciklama} </Text>
                            <Text style={styles.instructions}>{this.state.Aciklama2}</Text>
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
        height: 320,
        resizeMode: 'contain',
    },
    logo1: {
        width: '20%',
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