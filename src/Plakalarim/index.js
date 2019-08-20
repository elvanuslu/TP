
import React, { Component } from 'react';
import { Alert, ListView, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import {
    List,
    ListItem, Item, Picker, Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content
} from 'native-base';

import { getPlakaList, getStorage, deleteMusteriArac } from '../Service/FetchUser';
import Spinner from 'react-native-loading-spinner-overlay';

const k1 = require("../../assets/resim1.png");
const k2 = require("../../assets/Resim2.png");
const k3 = require("../../assets/image3.png");
const Duzenle = require("../../assets/duzenle.png");
const Sil = require("../../assets/sil.png");
const cizgi = require("../../assets/cizgi.png");

export default class Plakalarim extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            userName: '',
            plaka: undefined,
            yakitTipi: undefined,
            araba: undefined,
            basic: true,
            listViewData: [],
            loading: false,
            kartId: undefined,
        }
    }
    componentWillReceiveProps = async (nextProps) => {
        // console.log('WillProps: ' + JSON.stringify(nextProps));
        await this._getPlakaList();
    }
    GetItem(item, markaId, aracId, yakit1, yakit2,kullanimSekli) {
       // console.log('Plaka = ' + item + ' MarkaId = ' + markaId, 'Araç Id=' + aracId+' bm_kullanımsekliadi: '+kullanimSekli);
        this.props.navigation.navigate("PlakaDuzenle", { 'PlakaId': item, 'Marka': markaId, 'AracId': aracId, 'Yakit1': yakit1, 'Yakit2': yakit2,'KullanimSekli':kullanimSekli });
    }
    _getPlakaList = async () => {
        try {
            // this.isAvailable();
            this.setState({ loading: true })
            const uId = await getStorage('userId');
            // console.log('plaka User Id = ' + uId)
            getPlakaList(uId)
                .then((res) => {
                    this.setState({ listViewData: res, loading: false })
                    //  console.log(JSON.stringify(this.state.listViewData))
                })
                .catch((error) => {
                    this.setState({ loading: false }, () => {
                        setTimeout(() => {
                            Alert.alert(
                                'Servis Hatası',
                                error,
                                [
                                    { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                                ],
                                { cancelable: true },
                            );
                        }, 0);
                    });
                 
                })
        } catch (error) {
            this.setState({ loading: false }, () => {
                setTimeout(() => {
                    Alert.alert(
                        'Hata',
                        error,
                        [
                            { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: true },
                    );
                }, 0);
            });
           
        }

    }
    componentDidMount() {
        this._getPlakaList();
    }

    deleteRow(secId, rowId, rowMap, aracId) {
        console.log('secId:' + secId + ' rowId: ' + rowId + ' aracId: ' + aracId)
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({ listViewData: newData });
        this._deleteMusteriAtac(aracId);
    }
    _deleteMusteriAtac = (Id) => {
        try {
           
            Alert.alert(
                'Silme Onayı ',
                'Silmek istediğinize Eminmisiniz?',
                [

                    { text: 'Tamam', onPress: () => { 
                        this.setState({ loading: true });
                        this._delete(Id) } },
                ],
                { cancelable: true },
            );

        } catch (error) {
            this.setState({ loading: true });
            alert('Hata', error);
        }
    }
    _delete = (Id) => {
        deleteMusteriArac(Id)
            .then((response) => {
                console.log('response: ' + JSON.stringify(response));
                this.setState({ loading: false }, () => {
                    setTimeout(() => {
                        Alert.alert(
                            'Silme İşlemi ',
                            response.message,
                            [

                                { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                            ],
                            { cancelable: true },
                        );
                    }, 510);
                });

            }).catch((err) => {
                this.setState({ loading: false }, () => {
                    Alert.alert(
                        'Silme İşlemi ',
                        err,
                        [

                            { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: true },
                    );
                }, 510);
            })
    }
    render() {
        <StatusBar color='#fff' barStyle="light-content" />
        return (
            <Container style={styles.container}>

                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('hesabim')}>
                            <Image style={{ marginLeft: -15, width: 50, height: 50, resizeMode: 'contain', }} source={require('../../assets/GeriDongri.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Plakalarım</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" style={{ color: '#fff' }} />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container1}>
                    <View>
                        <Image style={styles.logo} source={require('../../assets/logo.png')} />
                        <Image style={{ marginBottom: 3, marginLeft: 30, marginRight: 30, width: '90%', height: 1, }} source={require('../../assets/cizgi.png')} />
                    </View>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner
                        visible={this.state.loading}
                        textContent={'Yükleniyor...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                </View>
                <View style={styles.containerBottom}>

                    <View style={styles.switchcontainer}>
                        <TouchableOpacity style={{ height: 40, marginTop: 1, }} onPress={() => this.props.navigation.navigate("PlakaEkle")}>
                            <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={require('../../assets/ArtiKirmizi.png')} />

                        </TouchableOpacity>
                    </View>
                    <Content style={{ backgroundColor: '#fff' }}>
                        <View >
                            <Content style={{ marginLeft: 15, marginTop: 15, marginRight: 15, width: '100%', }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                    <View >
                                        <Text style={styles.txtHeader}>Plakalar</Text>
                                    </View>
                                    <View style={{ marginRight: 20 }}>
                                        <Text style={styles.txtHeader} >Yakıt Tipi</Text>
                                    </View>

                                </View>
                                <Image style={{ width: '95%', height: 1 }} source={cizgi}></Image>

                                <List
                                    dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                                    renderRow={data =>
                                        <ListItem   >
                                            <TouchableOpacity style={{ width: '100%' }} onPress={() => this.GetItem(data.bm_plaka, data.bm_aracmarkaid, data.bm_musteriaraciid, data.bm_yakitcinsiid_1, data.bm_yakitcinsiid_2,data.bm_kullanımsekliadi)}>

                                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                                    <Left>
                                                        <Text style={styles.txtArac}>{data.bm_plaka}</Text>

                                                    </Left>
                                                    <Body>
                                                        <Text style={styles.txtArac} >{data.bm_yakittipiadi_1}</Text>
                                                    </Body>

                                                </View>

                                            </TouchableOpacity>
                                        </ListItem>}
                                    renderLeftHiddenRow={data =>
                                        <Content style={{ flexDirection: 'row' }}>
                                            <Button
                                                full
                                                onPress={() => this.GetItem(data.bm_plaka, data.bm_aracmarkaid, data.bm_musteriaraciid, data.bm_yakitcinsiid_1, data.bm_yakitcinsiid_2,data.bm_kullanımsekliadi)}
                                                style={{
                                                    backgroundColor: "#ec971f",
                                                    flex: 1,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    color: '#fff',
                                                }}
                                            >
                                                <Icon active name="md-create" />
                                            </Button>

                                        </Content>

                                    }

                                    renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                        <Button
                                            full
                                            danger
                                            onPress={_ => this.deleteRow(secId, rowId, rowMap, data.bm_musteriaraciid)}
                                            style={{
                                                flex: 1,
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <Icon active name="trash" />
                                        </Button>}
                                    leftOpenValue={75}
                                    rightOpenValue={-75}
                                />
                            </Content>
                        </View>
                    </Content>
                </View >

            </Container >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container1: {
        flex: 1,
        backgroundColor: 'transparent',

    },
    container2: {
        flex: 2,
        backgroundColor: 'gray',
        //  alignItems: 'center',
    },
    containerOrta: {
        flex: 3,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    containerBottom: {
        flex: 7,
        backgroundColor: 'transparent',
        marginBottom: 10,
        //     alignItems: 'center',
        //  flexDirection: 'column',
    },
    cardmb: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 5,
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
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 5,
        marginBottom: 15,
        //color:'black',
        borderColor: 'black',
    },
    logo: {
        marginTop: 5,
        width: '100%',
        height: 80,
        resizeMode: 'contain',
        marginBottom: 6,
        alignSelf: 'center'
    },
    /*
    logo: {
        marginTop: 5,
        // width: '100%',
        height: '80%',
        resizeMode: 'contain',
        marginBottom: 5,
    },
    */
    banner: {
        // marginTop: 2,
        width: '100%',
        // height: 220,
        resizeMode: 'contain',
        marginBottom: 5,
    },
    switchcontainer: {

        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginRight: 10,
        alignItems: 'center',
        marginBottom: 0,
        marginTop: 20,

    },

    button: {
        resizeMode: 'contain',
        width: 50,
        marginRight: 30,
        // marginLeft: 30,
        marginBottom: -50,
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
        marginRight: 40,
        marginLeft: 40,
        borderColor: 'black',
        //   marginBottom: 15,
        borderWidth: 1,
        marginTop: 5,

    },
    txtYazi: {
        color: '#fff',
    },
    txtGrd: {
        fontSize: 8,
    },
    txtHeader: {
        fontSize: 14,
        fontWeight: '500',
    },
    txtArac: {
        fontSize: 11,
        //  fontWeight: '100',
        textAlign: 'right',
        marginRight: 5,
        //  alignSelf: 'flex-end'


    }
});
