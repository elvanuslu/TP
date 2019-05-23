
import React, { Component } from 'react';
import { ListView, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import {
    List,
    ListItem, Item, Picker, Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content
} from 'native-base';


const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");

const datas = [
    {
        Id: '34-AP-3434',
        img: k1,
        Istasyon: "4.Levent",
        zaman: "12.10.2019",
        Tutar: "1925TL",
        Puan: "45TP",
    },
    {
        Id: '34-NH-3435',
        img: k2,
        Istasyon: "4.Levent",
        zaman: "24.09.2019",
        Tutar: "625TL",
        Puan: "4TP",
    },
    {
        Id: '34-ELV-34',
        img: k1,
        Istasyon: "4.Levent",
        zaman: "14.06.2019",
        Tutar: "1025TL",
        Puan: "41TP",
    },
    {
        Id: '35-AH-35',
        img: k1,
        Istasyon: "4.Levent",
        zaman: "04.05.2019",
        Tutar: "425TL",
        Puan: "4TP",
    },
    {
        Id: '35-AHM-343',
        img: k2,
        Istasyon: "4.Levent",
        zaman: "02.07.2019",
        Tutar: "375TL",
        Puan: "6TP",
    },
    {
        Id: '06-NH-3435',
        img: k1,
        Istasyon: "4.Levent",
        zaman: "06.06.2019",
        Tutar: "225TL",
        Puan: "14TP",
    },
];
export default class SatisVePuanGecmisi extends Component {
    constructor() {
        super();
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            userName: '',
            plaka: undefined,
            yakitTipi: undefined,
            araba: undefined,
            basic: true,
            listViewData: datas
        }
    }
    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({ listViewData: newData });
    }
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar style={{ color: '#fff' }} backgroundColor="transparent" barStyle="light-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("hesabim")}>
                            <Icon name="arrow-back" style={{ color: '#fff' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Satış Ve Puan Geçmişi</Title>
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
                        <Image style={{ alignSelf: 'center', marginLeft: 30, marginRight: 30, width: '90%', height: 1, }} source={require('../../assets/cizgi.png')} />
                    </View>
                </View>
                <View style={styles.containerOrta}>
                    <Image style={styles.banner} source={k1} />
                </View>
                <View style={{ backgroundColor: 'transparent', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={styles.button1}
                        source={require('../../assets/satisvepuanbtn.png')}
                    />
                </View>
                <View style={styles.containerBottom}>
                    <Content style={{ backgroundColor: '#fff' }}>
                        <View >

                            <List
                                dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                                renderRow={data =>
                                    <ListItem  >
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("SatisVePuanDetay")}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: '27%' }}>
                                                    <Text style={styles.txt} > {data.zaman}</Text>
                                                </View>
                                                <View style={{ width: '30%' }}>
                                                    <Text style={styles.txt}> {data.Istasyon}</Text>
                                                </View>
                                                <View style={{ width: '20%' }}>
                                                    <Text style={styles.txt}> {data.Tutar}</Text>
                                                </View>
                                                <View style={{ width: '23%', flexDirection: 'row' }}>
                                                    <Text style={styles.txt}> {data.Puan}</Text>

                                                    <Image
                                                        style={styles.button}
                                                        source={require('../../assets/detay.png')}
                                                    />

                                                </View>

                                            </View>
                                        </TouchableOpacity>
                                    </ListItem>}
                                renderLeftHiddenRow={data =>
                                    <Content style={{ flexDirection: 'row' }}>
                                        <Button
                                            full
                                            onPress={() => alert(data.Id)}
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

                        </View>
                    </Content>
                </View>
            </Container>
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
        alignItems: 'center',
        marginBottom: 5,
    },
    containerOrta: {
        flex: 5,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerBottom: {
        flex: 4,
        backgroundColor: 'transparent',
        // alignItems: 'center',
        //    flexDirection: 'column',
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
        //  width: 150,
        height: '90%',
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
        width: 20,
        height: 20,
        marginRight: 1,
        marginLeft: 5,
        marginBottom: 0,

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
    txt: {
        marginLeft: 15,
        fontSize: 14,

    }
});
