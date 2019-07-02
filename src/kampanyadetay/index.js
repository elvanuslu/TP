
import React, { Component } from 'react';
import { ActivityIndicator, ScrollView, Alert, FlatList, ListItem, KeyboardAvoidingView, Platform, StyleSheet, Text, View, Image, Switch, TouchableOpacity } from 'react-native';
import { Title, Thumbnail, Left, Right, Button, Container, Header, Content, Card, CardItem, Body, Item, Icon, Input, List } from 'native-base';
import { getKampanyaDetayList } from '../Service/FetchUser';
import Spinner from 'react-native-loading-spinner-overlay';

const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");

export default class kampanyadetay extends Component {
    constructor() {
        super();
        this.state = {
            baslangictarihi: '',
            bitistarihi: '',
            kampanyaadi: '',
            kampanyaid: '',
            pictureurl: '',
            Aciklama: '',
            loading: true,
            oldId: '',
        }

    }
    closeActivityIndicator = () => setTimeout(() => this.setState({
        loading: false
    }), 4000)

    isAvailable() {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 5000, 'Zaman aşımı');
        });
        const request = fetch('http://85.105.103.4:8096');
        return Promise
            .race([timeout, request])
            .then(response => '')
            .catch(error => {
                Alert.alert('Bağlantı Hatası', 'İnternet bağlantınızı kontrol edin.')
                this.setState({ loading: false })
            });
    }
    componentDidMount() {
   
        const itemId = this.props.navigation.getParam('Id');
        //   Alert.alert('Mount');
        if (itemId !== undefined)
            this._getKampanyaDetay(itemId);
    }
    componentWillReceiveProps() {
        try {
            const itemId = this.props.navigation.getParam('Id');
            //   Alert.alert('props');
            if (itemId !== undefined)
                this._getKampanyaDetay(itemId);
        } catch (error) {
            console.log(error);
        }

    }
    _getKampanyaDetay(ItemId) {
        this.isAvailable();
        this.setState({ loading: true })
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
        const animating = this.state.loading;
        const { navigation } = this.props;
        const itemId = navigation.getParam('Id', '');

        if (itemId !== this.state.oldId) {
            console.log('KampanyaId= ' + itemId + ' Old Id= ' + this.state.oldId);
            this._getKampanyaDetay(itemId);
            this.setState({ oldId: itemId })
        }
        return (
            <Container style={styles.container}>
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("kampanya")}>
                            <Icon name="arrow-back" style={{ color: '#fff' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Kampanya Detay</Title>
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
                            <Image style={{ marginLeft: 30, marginRight: 30, width: '90%', height: 1, marginTop: -120 }} source={require('../../assets/cizgi.png')} />
                        </View>

                        <View style={styles.containerOrta}>
                            <Image style={styles.logo} source={{ uri: this.state.pictureurl }} />
                        </View>
                        <View style={styles.containerBottom}>

                            <Text style={styles.textBaslik}>{this.state.kampanyaadi} </Text>
                            <Text style={styles.instructions}>
                                {this.state.Aciklama}
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