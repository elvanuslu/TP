
import React, { Component } from 'react';
import { Alert, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content } from 'native-base';

import { getDuyuruListByUser, getStorage } from '../Service/FetchUser';


import Spinner from 'react-native-loading-spinner-overlay';
const k1 = require("../../assets/resim1.png");
const k2 = require("../../assets/Resim2.png");
const k3 = require("../../assets/image3.png");
const k4 = require("../../assets/Duyuru1.png");

export default class Duyurular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            loading: false,
            data: [],
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log('Update Props' + JSON.stringify(nextProps))
        this._getDuyuruListesi();
    }
    componentDidMount() {
        // console.log('mount')
        this._getDuyuruListesi();
    }
    _getDuyuruListesi = async () => {
        try {
            this.setState({ loading: true })
            const uId = await getStorage('userId');
            getDuyuruListByUser(uId)
                .then((res) => {
                    if (res.status !== false) {
                        this.setState({ data: res, loading: false });
                        console.log(JSON.stringify(res));
                    }
                    else {
                        Alert.alert('Hata', res.message);
                    }
                })
                .catch((error) => alert(error))
        } catch (error) {
            this.setState({ loading: false })
            Alert.alert('Hata', error);
        }

    }
    onPressAndGo(Id, url, aciklama, aciklama2) {
        //  console.log('duyuru url='+url);
        /*console.log('duyuru Id='+Id);
        console.log('duyuru url='+url);
        console.log('duyuru aciklama='+aciklama);
        console.log('duyuru aciklama2='+aciklama2);
        */
        this.props.navigation.navigate("DuyuruDetay", {
            'Id': Id,
            'url': url, 'aciklama': aciklama, 'aciklama2': aciklama2
        });
    }
    render() {
        return (
            <Container style={styles.container}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner
                        visible={this.state.loading}
                        textContent={'Yükleniyor...'}
                        textStyle={styles.spinnerTextStyle} />
                </View>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("AnaSayfa")}>
                            <Image style={{ marginLeft: -15, width: 50, height: 50, resizeMode: 'contain' }} source={require('../../assets/GeriDongri.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Duyurular</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" style={{ color: '#fff' }} />
                        </Button>
                    </Right>
                </Header>
           
                <View style={styles.containerOrta}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) =>
                            <Card key={item.bm_mobilcerikId} style={styles.cardmb}>
                                <CardItem header>
                                    <Text style={styles.textBaslik}>{item.bm_icerikadi}</Text>
                                </CardItem>
                                <CardItem cardBody style={{ borderRadius: 15 }}>
                                    <Body>
                                        <TouchableOpacity style={{ height: 305, width: '100%', }} onPress={() => this.onPressAndGo(item.bm_mobilcerikId, item.bm_url, item.bm_icerikadi, item.bm_uzunaciklama)}>
                                            <Image style={styles.logo} source={{ uri: item.bm_url }} />
                                        </TouchableOpacity>
                                    </Body>
                                </CardItem>
                                <CardItem footer>
                                    <Text style={styles.textYazi}>{item.bm_kisaaciklama + '\n\n'}</Text>
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //  flexDirection: 'column',
    },
    container1: {
        flex: 2,
        backgroundColor: '#fff',
        // backgroundColor: '#efefef',
    },
    container2: {
        flex: 7,
    },
    containerOrta: {
        flex: 8,
        backgroundColor: '#efefef',
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    cardmb: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        borderRadius: 10,
    },
    textYazi: {
        fontSize: 13,
        color: '#757575',
        textAlign: 'left',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
        fontFamily: 'FontAwesome',
        fontWeight: 'normal',
    },
    textBaslik: {
        color: 'red',
        fontSize: 18,
        //  fontWeight:'bold',
        textAlign: 'left',
        marginLeft: 5,
        marginRight: 5,
        fontFamily: "Myriadpro-Bold",
        marginBottom: 10,
        marginTop: 15,
    },
})