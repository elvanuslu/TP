import React, { Component } from 'react';
import {
    ImageBackground, Dimensions,
    Platform, Alert, KeyboardAvoidingView, NetInfo, ToastAndroid,
     StyleSheet, Text, View, Image, Switch, TouchableOpacity
} from 'react-native';
import { Button, Container, } from 'native-base';

import Sound from 'react-native-sound'

export default class SplasScreen extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        var whoosh = undefined;
        Sound.setCategory('Playback');
        if (Platform.OS == 'android' ) {
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
        }
        else {
            console.log('sound else...')
            whoosh = new Sound("tp.wav", Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }
                // loaded successfully
                console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

                // Play the sound with an onEnd callback
                whoosh.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            })
        }
    }
    _handleGo = () => {
        setTimeout(() => {
            return (
                this.props.navigation.navigate("login")
            )
        }, 5000)
    }
    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <ImageBackground source={require('../assets/TPSplash.jpg')}
                        style={{
                            width: "100%",
                            height: "100%",
                        }} />
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