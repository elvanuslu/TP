import React, { Component } from 'react';
import {
    ImageBackground, Dimensions,
    Platform, Alert, KeyboardAvoidingView, NetInfo, ToastAndroid,
    StyleSheet, Text, View, Image, Switch, TouchableOpacity
} from 'react-native';
import { Button, Container, } from 'native-base';

import Sound from 'react-native-sound'
import firebase from 'react-native-firebase'

var whoosh = undefined;
export default class SplasScreen extends Component {
    constructor(props) {
        super(props);

    }
    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log("before fcmToken: ", fcmToken);
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                console.log("after fcmToken: ", fcmToken);
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }
    async requestPermission() {
        firebase.messaging().requestPermission()
            .then(() => {
                this.getToken();
            })
            .catch(error => {
                console.log('permission rejected');
            });
    }
    async checkPermission() {
        firebase.messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    console.log("Permission granted");
                    this.getToken();
                } else {
                    console.log("Request Permission");
                    this.requestPermission();
                }
            });
    }
    sesCal = () => {

        Sound.setCategory('Playback');
        if (Platform.OS == 'android') {
            whoosh = new Sound("http://213.194.120.55/tp.crm.ui/tp.wav", Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }
                console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
                whoosh.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            })
            return whoosh;
        }
        else {
            console.log('sound else...')
            whoosh = new Sound("tp.wav", Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }
                whoosh.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            })
            return whoosh;
        }
    }
    componentDidMount() {
        this.sesCal();
        this.checkPermission();
    }
    componentWillReceiveProps(nextProps) {
        console.log('Splash will Receive ');
        this.sesCal();
    }


    _handleGo = () => {
        setTimeout(() => {
            return (
                this.props.navigation.navigate("login", { 'ses': whoosh })
            )
        }, 5000)

    }
    _stopMusic = () => {
        whoosh.stop();
        whoosh.release();
        this.props.navigation.navigate("login")
    }
    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => this._stopMusic()}>
                        <ImageBackground source={require('../assets/TPSplash.jpg')}
                            style={{
                                width: "100%",
                                height: "100%",
                            }} />
                    </TouchableOpacity>
                    {
                        this._handleGo()

                    }

                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})