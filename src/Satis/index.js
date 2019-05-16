
import React, { Component } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Input, Item, Picker, Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content } from 'native-base';


const k1 = require("../../assets/Resim.png");
const logo = require("../../assets/logoKirmiz.png");
const pompa = require("../../assets/pompatabancakirmizi.png");
const plaka = require("../../assets/plakaKirmizi.png");
const pmpa = require("../../assets/pompaKirmizi.png");
const odeme = require("../../assets/odemeTutar.png");
const kampanya = require("../../assets/kapmpanyakirmizi.png");


export default class Satis extends Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            selected2: undefined,
            selected2: undefined,

        }
    }
    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }
    onValueChange2(value: string) {
        this.setState({
            selected2: value
        });
    }
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("hesabim")}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Satış</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container1}>
                    <View>
                        <Image style={styles.logo} source={require('../../assets/tplogo.png')}
                        />
                        <Image style={{ alignSelf: 'center', marginLeft: 30, marginRight: 30, width: '90%', height: 1, }} source={require('../../assets/cizgi.png')} />
                    </View>
                </View>
                <View style={styles.containerOrta}>
                    <Content>
                        <Item picker style={styles.comboItem}>
                            <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={logo}></Image>
                            <Picker borderColor='black'
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="İstasyon"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected2}
                                onValueChange={this.onValueChange2.bind(this)}
                            >
                                <Picker.Item label="İstasyon" value="key0" />
                                <Picker.Item label="Istasyon 1" value="key1" />
                                <Picker.Item label="Özgür Benzin" value="key2" />
                                <Picker.Item label="Debit Benzi" value="key3" />
                                <Picker.Item label="Sevinç Benzin" value="key4" />
                                <Picker.Item label="Sarayaltı Petrol" value="key5" />
                            </Picker>
                        </Item>

                        <Item picker style={styles.comboItem}>
                            <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={plaka}></Image>

                            <Picker borderColor='black'
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Plaka..."
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected2}
                                onValueChange={this.onValueChange2.bind(this)}
                            >
                                <Picker.Item label="34-AL-3434" value="key0" />
                                <Picker.Item label="35-EU-3535" value="key1" />

                            </Picker>
                        </Item>
                        <Item picker style={styles.comboItem}>
                            <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={pompa}></Image>

                            <Picker borderColor='black'
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Yakıt Tipi"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected2}
                                onValueChange={this.onValueChange2.bind(this)}
                            >
                                <Picker.Item label="Benzin" value="key0" />
                                <Picker.Item label="Dizel" value="key1" />
                                <Picker.Item label="Motorin" value="key2" />
                            </Picker>
                        </Item>
                        <Item regular style={styles.Inputs}>
                            <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={pmpa}></Image>

                            <Input placeholder='Pompa No...'
                                keyboardType="phone-pad"
                                placeholderTextColor="#efefef"
                                underlineColorAndroid="transparent" />
                        </Item>
                        <Item regular style={styles.Inputs}>
                            <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={kampanya}></Image>

                            <Input placeholder='Kupon Kodu...'
                                //keyboardType="phone-pad"
                                placeholderTextColor="#efefef"
                                underlineColorAndroid="transparent" />
                        </Item>
                        <View style={{ marginTop: -10, flexDirection: 'row', alignItems: 'center', alignContent: 'flex-start' }}>
                            <Item regular style={styles.Inputs1}>
                                <Image style={{ width: 30, height: 25, resizeMode: 'contain' }} source={odeme}></Image>

                                <Input placeholder='Ödeme tutarı...'
                                    // keyboardType="phone-pad"
                                    placeholderTextColor="#efefef"
                                    underlineColorAndroid="transparent" />
                            </Item>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("hesabim")}>
                                <Image
                                    style={{ width: 100, height: 100, resizeMode: 'contain', marginLeft: 5 }}
                                    source={require('../../assets/doldursecili.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.txtYazi}>Doğru istasyonu ve doğru pompa numarasını işaretlediğinizden emin olun.{'\n\n'}Kredi kartınızda çekilen ön provizyon yakıt alımından sonra kartınıza iade edilecektir.  </Text>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate("hesabim")}>
                                <Image
                                    style={styles.button}
                                    source={require('../../assets/odemeyap.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </Content>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    txtYazi: {
        marginTop: -10,
        marginLeft: 35,
        marginRight: 30,
        textAlign: 'left',
        color: 'red',
        fontSize: 14,
        marginBottom: -25,
    },
    container: {
        flex: 1,

    },
    container1: {
        flex: 2,
        backgroundColor: 'transparent',
    },
    containerOrta: {
        flex: 8,
        backgroundColor: '#fff',
    },
    containerBottom: {
        flex: 1,
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
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 5,
        marginBottom: 15,
        borderColor: 'black',
    },
    Inputs1: {
        marginLeft: 30,
        width: '57%',
        height: 45,
        borderRadius: 5,
        borderColor: 'black',
    },
    logo: {
        marginTop: 5,
        width: '100%',
        height: 90,
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
        marginBottom: 10,

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
        marginRight: 30,
        marginLeft: 30,
        borderColor: 'black',
        marginBottom: 15,
    },
});
