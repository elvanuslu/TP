
import React, { Component } from 'react';
import { Alert, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem } from 'native-base';

import { getKampanyaListesi } from '../Service/FetchUser';
import Spinner from 'react-native-loading-spinner-overlay';


const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");

export default class kampanya extends Component {
    constructor() {
        super();
        this.state = {
            //datam: datas
            datam: [],
            loading: true
        }
    }

    componentDidMount() {
        this._getKampanyaListesi();
    }
    _getKampanyaListesi() {
        try {
            //  this.isAvailable();
            this.setState({ loading: true })
            getKampanyaListesi()
                .then((res) => {

                    this.setState({ datam: res, loading: false });
                    //   console.log(res);
                });
        } catch (error) {
            this.setState({ loading: false })
            Alert.alert('Hata', error);
        }

    }
    GetItem(item) {
        // Alert.alert(item);
        this.props.navigation.navigate("kampanyadetay", { 'Id': item });
    }
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar backgroundColor="transparent" barStyle="dark-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('AnaSayfa')}>
                        <Image style={{marginLeft:-15, width: 50, height: 50, resizeMode: 'contain', }} source={require('../../assets/GeriDongri.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Kampanyalar</Title>
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
                                    <Text style={styles.txtYazi1}>{item.bm_mobiladi}</Text>
                                </CardItem>
                                <CardItem cardBody style={{ borderRadius: 5 }}>
                                    <Body>
                                        <TouchableOpacity style={styles.logo} onPress={() => this.GetItem(item.bm_kampanyaid)}>
                                            <Image style={styles.logo} source={{ uri: item.bm_pictureurl }} />
                                        </TouchableOpacity>
                                    </Body>
                                </CardItem>
                                <CardItem footer>
                                    <Text style={styles.txtYazi}>{item.bm_aciklama.slice(0, 140)}...</Text>
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
    txtYazi: {
        color: 'gray',
        fontSize: 10,
        textAlign: 'left',
        marginLeft: 15,
        marginRight: 10,
        fontFamily: "Myriadpro-Regular",
    },
    txtYazi1: {
        color: 'red',
        fontSize: 12,
        textAlign: 'left',
        marginLeft: 15,
        marginRight: 10,
        fontFamily: "Myriadpro-Bold",
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
    },
})