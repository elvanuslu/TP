
import React, { Component } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage'; 

const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");

export default class hesabim extends Component {
    constructor() {
        super();
        this.state = {
            userName: ''
        }
    }
    
    componentDidMount(){
    //  const dts =  AsyncStorage.getItem('userId');
    //  alert("id="+dts);
      this._retrieveData();
    }
    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('userId');
          if (value !== null) {
            // We have data!!
            console.log("we have data"+value);
          }
        } catch (error) {
          // Error retrieving data
        }
      };
    render() {
        const { navigation } = this.props;
        const otherParam = navigation.getParam('Data', '');
        console.log("Datam=>"+otherParam.firstname+" "+otherParam.lastname)
        return (
            <Container style={styles.container}>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                <Header  style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Hesabım</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" />
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
                <View style={styles.containerBottom}>
                    <Content>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("KayitGuncelle")}>
                            <Image style={styles.button}
                                source={require('../../assets/bilgilerimiguncelle.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Plakalarim")}>
                                <Image
                                    style={styles.button}
                                    source={require('../../assets/araclarim.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("SatisVePuanGecmisi")}>
                                <Image
                                    style={styles.button}
                                    source={require('../../assets/satisvepuan.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("kampanya")}>
                            <Image
                                style={styles.button1}
                                source={require('../../assets/t-para.png')}
                            />
                        </TouchableOpacity>
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
        alignItems:'center',
    },
    containerOrta: {
        flex: 4,
        backgroundColor: 'transparent',
    },
    containerBottom: {
        flex: 6,
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
        height: 80,
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
        marginBottom: -60,
      
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
});
