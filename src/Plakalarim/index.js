
import React, { Component } from 'react';
import { Alert, ListView, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import {
    List,
    ListItem, Item, Picker, Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content
} from 'native-base';

import { getPlakaList, getStorage } from '../Service/FetchUser';
import Spinner from 'react-native-loading-spinner-overlay';

const k1 = require("../../assets/resim1.png");
const k2 = require("../../assets/Resim2.png");
const k3 = require("../../assets/image3.png");
const Duzenle = require("../../assets/duzenle.png");
const Sil = require("../../assets/sil.png");
const cizgi = require("../../assets/cizgi.png");

const datas = [
    {
        Id: '34-AP-3434',
        img: k1,
        text: "Benzin",
        note: "Eğitimlerde ve danışmanlık çalışmalarında sıklıkla konuyla ilgili bağlantı soruluyor. Ben de tüm Çevik Süreçler (Agile Frameworks) için faydalı olduğunu düşündüğüm bağlantıları (links) bir araya getirerek sizinle paylaşmaya karar verdim.",
        time: "BMW"
    },
    {
        Id: '34-NH-3435',
        img: k2,
        text: "Dizel",
        note: "This article contains an exclusive series of Rules of Thumb to provide insight of the common Agile issues to the Agile enthusiasts. These rules are grouped in four phases of Agile journey - understand, adopt, transform, and scale. These rules do not give you ready-made answers but allow you to get deeper understanding of the topic with do's and dont's. List of rules will continue to grow, hence, visit these article regularly.  ",
        time: "AUDI"
    },
    {
        Id: '34-ELV-34',
        img: k1,
        text: "Kurşunsuz 95",
        note: "Enjoy these agile pills with no side effects to cure your issues. If you find these healthy then please leave your comments and recommend more rules that you normally apply in your Agile journey. More to come...",
        time: "MERCEDES"
    },
    {
        Id: '35-AH-35',
        img: k1,
        text: "LPG",
        note: "Eğitimlerde ve danışmanlık çalışmalarında sıklıkla konuyla ilgili bağlantı soruluyor. Ben de tüm Çevik Süreçler (Agile Frameworks) için faydalı olduğunu düşündüğüm bağlantıları (links) bir araya getirerek sizinle paylaşmaya karar verdim.",
        time: "FIAT"
    },
    {
        Id: '35-AHM-343',
        img: k2,
        text: "LPG",
        note: "This article contains an exclusive series of Rules of Thumb to provide insight of the common Agile issues to the Agile enthusiasts. These rules are grouped in four phases of Agile journey - understand, adopt, transform, and scale. These rules do not give you ready-made answers but allow you to get deeper understanding of the topic with do's and dont's. List of rules will continue to grow, hence, visit these article regularly.  ",
        time: "PANDA"
    },
    {
        Id: '06-NH-3435',
        img: k1,
        text: "Benzin",
        note: "Enjoy these agile pills with no side effects to cure your issues. If you find these healthy then please leave your comments and recommend more rules that you normally apply in your Agile journey. More to come...",
        time: "KUŞ"
    },
];
export default class Plakalarim extends Component {
    constructor() {
        super();
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            userName: '',
            plaka: undefined,
            yakitTipi: undefined,
            araba: undefined,
            basic: true,
            listViewData: [],
            loading: false,
            kartId:undefined,
        }
    }
    GetItem(item,kart) {
      console.log('Plaka = '+ item+ ' Kart = '+ kart);
        this.props.navigation.navigate("PlakaDuzenle", { 'PlakaId': item,'KartId': kart });
    }
    _getPlakaList = async () => {
        try {
            const uId = await getStorage('userId');
            console.log('plaka User Id = ' + uId)
            getPlakaList(uId)
                .then((res) => {
                    this.setState({ listViewData: res, loading: false })
                     // console.log(JSON.stringify(this.state.listViewData))
                })
                .catch((error) => {
                    Alert.alert(
                        'Servis Hatası!',
                        error,
                        [
                            { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: true },
                    );
                })
        } catch (error) {
            Alert.alert(
                'Hata!',
                error,
                [
                    { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: true },
            );
        }
    }
    componentDidMount() {
        this._getPlakaList();
    }

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({ listViewData: newData });
    }
    render() {
        <StatusBar color='#fff' backgroundColor="blue" barStyle="light-content" />
        return (
            <Container style={styles.container}>

                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('hesabim')}>
                            <Icon name="arrow-back" style={{ color: '#fff' }} />
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
                        <Image style={styles.logo} source={require('../../assets/logo.png')}
                        />
                        <Image style={{ marginBottom: 5, marginLeft: 30, marginRight: 30, width: '90%', height: 1, }} source={require('../../assets/cizgi.png')} />
                    </View>
                </View>
                <View style={styles.containerOrta}>
                    <Image style={styles.banner} source={k1} />
                </View>
                <View style={styles.containerBottom}>

                    <View style={styles.switchcontainer}>
                        <Button success onPress={() => this.props.navigation.navigate("PlakaEkle")}>
                            <Icon active name="add" style={{ color: "#FFF", }} />
                            <Text style={styles.txtYazi}>Ekle  </Text>
                        </Button>
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
                                            <TouchableOpacity style={{width:'100%'}} onPress={() => this.GetItem(data.bm_plaka,data.bm_musterikartiid)}>

                                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                                    <Left>
                                                    <Text style={styles.txtArac}>{data.bm_plaka}</Text>

                                                    </Left>
                                                   
                                                    <Right style={{ marginRight: 10 }}>
                                                        <Text style={styles.txtArac} >{data.bm_yakittipiadi_1}</Text>
                                                    </Right>
                                                </View>

                                            </TouchableOpacity>
                                        </ListItem>}
                                    renderLeftHiddenRow={data =>
                                        <Content style={{ flexDirection: 'row' }}>
                                            <Button
                                                full
                                                onPress={() => this.GetItem(data.bm_plaka,data.bm_musterikartiid)}
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
                                            onPress={_ => this.deleteRow(secId, rowId, rowMap)}
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
        flex: 2,
        backgroundColor: 'transparent',
        // alignItems: 'center',
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
        // width: '100%',
        height: '80%',
        resizeMode: 'contain',
        marginBottom: 5,
    },
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
        marginBottom: 5,

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
        fontSize: 12,
        //  fontWeight: '100',
        //   textAlign: 'left',
        //  alignSelf: 'flex-end'


    }
});
