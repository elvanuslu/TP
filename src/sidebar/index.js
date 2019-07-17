import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Switch, TouchableOpacity } from 'react-native';
import { Button, Container, Header, Content, Card, CardItem, Body, Item, Icon, Input } from 'native-base';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


export default class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4
        };
    }
    render() {
        return (
            <Container style={styles.container}>
               
                    <View style={styles.container1}>
                        <View >
                            <Image style={styles.logo} source={require('../../assets/logo.png')} />

                        </View>
                    </View>
                    <View style={styles.containerOrta}>
                        <Button block transparent style={styles.mb15} onPress={() => this.props.navigation.navigate("AnaSayfa")}>
                            <Image
                                style={styles.button}
                                source={require('../../assets/anasayfa.png')}
                            />
                        </Button>
                        <Button block transparent style={styles.mb15} onPress={() => this.props.navigation.navigate("hesabim")}>
                            <Image
                                style={styles.button}
                                source={require('../../assets/hesabim.png')}
                            />
                        </Button>
                        <Button block transparent style={styles.mb15} onPress={() => this.props.navigation.navigate("kampanya")}>
                            <Image
                                style={styles.button}
                                source={require('../../assets/kampanylar.png')}
                            />
                        </Button>
                        <Button block transparent style={styles.mb15} onPress={() => this.props.navigation.navigate("Duyurular")}>
                            <Image
                                style={styles.button}
                                source={require('../../assets/duyurular.png')}
                            />
                        </Button>
                        <Button block transparent style={styles.mb15} onPress={() => this.props.navigation.navigate("SatisIllce")}>
                            <Image
                                style={styles.button}
                                source={require('../../assets/akaryakital.png')}
                            />
                        </Button>
                        <Button block transparent style={styles.mb15} onPress={() => this.props.navigation.navigate("Yardim")}>
                            <Image
                                style={styles.button}
                                source={require('../../assets/yardim.png')}
                            />
                        </Button>
                    </View>
                    <View style={styles.containerBottom}>
                    </View>
                 
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    container1: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        //  alignSelf: 'center',
    },
    containerOrta: {
        flex: 6,
        backgroundColor: 'transparent',

    },
    containerBottom: {
        flex: 1,
        backgroundColor: 'transparent',

        //  marginBottom:10,
    },
    logo: {
        width: 120,
        resizeMode: 'contain',
        marginTop: -80,
    },
    button: {
        resizeMode: 'contain',
        width: '100%',
        marginTop: 0,
    },
    mb15: {
        marginBottom: 20
    },
    textYazi: {
        color: '#fff',
        fontSize: 16,

    },
});