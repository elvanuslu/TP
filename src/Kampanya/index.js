
import React, { Component } from 'react';
import {Alert, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem } from 'native-base';

import { getKampanyaListesi } from '../Service/FetchUser';
import Spinner from 'react-native-loading-spinner-overlay';

const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");
const datas = [
    {
        Id: 1,
        img: k2,
        text: "Kumar Pratik",
        note: "Its time to build a difference . .",
        time: "3:43 pm"
    },
    {
        Id: 2,
        img: k1,
        text: "Kumar Sanket",
        note: "One needs courage to be happy and smiling all time . . ",
        time: "1:12 pm"
    },
    {
        Id: 3,
        img: k3,
        text: "Kumar Sanket",
        note: "One needs courage to be happy and smiling all time . . ",
        time: "1:12 pm"
    },
];
export default class kampanya extends Component {
    constructor() {
        super();
        this.state = {
            //datam: datas
            datam:[],
            loading: true
        }
    }
componentDidMount(){
   this._getKampanyaListesi();
}
_getKampanyaListesi(){
    getKampanyaListesi()
    .then((res) =>{
        this.setState({datam :res,loading:false});
      console.log(res);
    });
}
GetItem(item) {
    //Function for click on an item
   // Alert.alert(item);
    this.props.navigation.navigate("kampanyadetay",{Id:item});
  }
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar backgroundColor="transparent" barStyle="dark-content" />
                <Header  style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('hesabim')}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Kampanyalar</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container1}>
                <View style={{ flexDirection: 'column', justifyContent: 'center',alignItems:'center' }}>
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
                                <CardItem cardBody>
                                    <Body>
                                        <TouchableOpacity style={styles.logo} onPress={() =>this.GetItem(item.bm_kampanyaid)}>
                                            <Image style={styles.logo} source={{uri: item.bm_pictureurl}} />
                                        </TouchableOpacity>
                                    </Body>
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