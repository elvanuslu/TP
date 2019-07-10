
import React, { Component } from 'react';
import {
  BackHandler, Alert, KeyboardAvoidingView, NetInfo,
  Platform, StyleSheet, Text, View, Image, Switch, TouchableOpacity
} from 'react-native';
import { Toast, Button, Container, Header, Content, Card, CardItem, Body, Item, Icon, Input } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

import { getUserInfo } from '../Service/FetchUser';
export default class login extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      switch1Value: true,
      UserName: 'asu@test.com',
      Pass: '123456',
      userId: '',
      error: '',
      isLoading: false,
      loading: false,
      SwitchOnValueHolder: false,
      latlon: undefined,
      connection_Status: undefined,
    }
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }
  _getGps() {
    try {
      navigator.geolocation.getCurrentPosition(
        //Will give you the current location
        (position) => {
          const currentLongitude = (position.coords.longitude);
          const currentLatitude = JSON.stringify(position.coords.latitude);
          this.setState({ latlon: position.coords.longitude });
        },
        (error) => console.log(error.message),
        {
          enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
        }
      );
    } catch (error) {

    }
    finally {

    }
  }
  componentDidUpdate() {
    console.log('this.state.latlon ' + this.state.latlon)
    if (this.state.latlon === undefined)
      this._getGps();
  }
  componentDidMount() {
    this._getConn();
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
    this._getGps();

  }
  _getConn = () => {
    try {
      NetInfo.isConnected.addEventListener(
        'connectionChange',
        this._handleConnectivityChange
      );
      NetInfo.isConnected.fetch().done((isConnected) => {

        if (isConnected == true) {
          this.setState({ connection_Status: "Online" })
        }
        else {
          this.setState({ connection_Status: "Offline" })
        }

      });
    } catch (error) {

    }
  }
  _handleConnectivityChange = (isConnected) => {

    if (isConnected == true) {
      this.setState({ connection_Status: "Online" })
    }
    else {
      this.setState({ connection_Status: "Offline" })
    }
  };
  onBackButtonPressAndroid = () => {
    if (this.isSelectionModeEnabled()) {
      this.disableSelectionMode();
      console.log('selection is true');
      return true;
    } else {
      console.log('selection is false');
      return false;
    }
  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectivityChange

    );
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
    console.log('remove component')
  }
  _storeData = async () => {
    try {
      // console.log("usr="+this.state.userId);
      await AsyncStorage.setItem("UserName", this.state.UserName);
      await AsyncStorage.setItem('userId', this.state.userId);

    } catch (error) {
      console.log("Err=" + error);
    }
  };
  isAvailable() {
    const timeout = new Promise((resolve, reject) => {
      setTimeout(reject, 10000, 'Request timed out');
    });
    const request = fetch('http://85.105.103.4:8096');
    return Promise
      .race([timeout, request])
      .then(response => '')
      .catch(error => {
        this.setState({ loading: false })
        Alert.alert('Bağlantı Hatası', 'İnternet bağlantınızı kontrol edin.')

      });
  }
  handleSubmit() {
    try {
      this.setState({ loading: true })
    //  this.isAvailable();
      if (this.state.UserName !== undefined) {
        if (this.state.Pass !== undefined) {
          getUserInfo(this.state.UserName, this.state.Pass)
            .then((res) => {
              this.setState({ userId: res.contactid, loading: false });
              //      console.log("stateUserId=>" + this.state.userId);
              if (res.contactid === undefined) {

                /*    Toast.show({
                      text: "Hata\n" + res,
                      buttonText: "Okay",
                      type: 'danger'
                    })
                  */
                Alert.alert(
                  'Hata!',
                  res,
                  [

                    { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                  ],
                  { cancelable: true },
                );
                this.setState({
                  error: 'User not found',
                });
              }
              else {
                // console.log("Kayıt else=>" + res);
                this.setState({ userId: res.contactid });
                this._storeData();
                /*   Toast.show({
                     text: "Giriş Başarılı!\n",
                     buttonText: "Okay",
                     type: 'success',
                   })
                   */
                this.props.navigation.navigate('AnaSayfa'); //navigate("hesabim", { Data: res });
                //  console.log('Push');
                this.setState({
                  error: false,
                  username: ''
                })
              }
            }).catch(error => this.setState({ error, isLoading: false }));
        }
        else {
          this.setState({ loading: false })
          Alert.alert('Hata', 'Şifre boş bırakılamaz.')
        }
      }
      else {
        this.setState({ loading: false })
        Alert.alert('Hata', 'Kullanıcı Adı boş bırakılamaz.')
      }


    } catch (error) {
      Alert.alert('Hata', error);
    }
  }
  toggleSwitch1 = (value) => {
    this.setState({ switch1Value: value })
    console.log('Switch 1 is: ' + value)
  }

  ShowAlert = (value) => {
    this.setState({
      SwitchOnValueHolder: value
    })
    if (value == true) {
      //Alert.alert("Switch is On.");
    }
    else {
      //Alert.alert("Switch is Off.");
    }

  }
  render() {
    return (
      <Container>
        <View style={styles.container}>
          <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Spinner
              visible={this.state.loading}
              textContent={'Giriş Yapılıyor...'}
              textStyle={styles.spinnerTextStyle}
            />
          </View>
          <View style={styles.container1}>
            <View>
              <Image style={styles.logo} source={require('../../assets/tplogo.png')}
              />
            </View>
          </View>

          <View style={styles.containerOrta}>


            <Item regular style={styles.Inputs}>
              <Icon active name='mail' underlayColor='#2089dc' color='#fff' />
              <Input placeholder='E-Posta adresinizi giriniz'
                keyboardType="email-address"
                // placeholderTextColor="#efefef"
                onChangeText={(value) => this.setState({ UserName: value })}
                value={this.state.UserName}
                underlineColorAndroid="transparent" />
            </Item>
            <Item regular style={styles.Inputs}>
              <Icon active name='key' underlayColor='#2089dc' color='#fff' />
              <Input placeholder='Şifrenizi giriniz'
                secureTextEntry={true}
                textContentType="password"
                //  placeholderTextColor="#efefef"
                onChangeText={(value) => this.setState({ Pass: value })}
                value={this.state.Pass}
                underlineColorAndroid="transparent" />
            </Item>
            <View style={styles.switchcontainer}>
              <View style={{ alignContent: 'center' }}>
                <Text style={styles.switcText}>Beni Hatırla</Text>
              </View>

              <Switch
                onValueChange={(value) => ''}
                style={{ marginBottom: 0 }}
                value={this.state.SwitchOnValueHolder} />
            </View>
          </View>
          <View style={styles.containerBottom}>

            <View style={{ alignItems: 'center', flexDirection: 'column', }}>
              <TouchableOpacity onPress={() => this.handleSubmit()}>
                <Image
                  style={styles.button1}
                  source={require('../../assets/giris.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("yenikayit")}>
                <Image
                  style={styles.button}
                  source={require('../../assets/kayitOl.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate("SifremiUnuttum")}>
                <Image
                  style={styles.button}
                  source={require('../../assets/sifremiUnuttum.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Container >
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  container: {
    flex: 1,

  },
  container1: {
    flex: 2,
    backgroundColor: 'transparent',
    marginBottom: 50,
  },
  containerOrta: {
    flex: 3,
    backgroundColor: '#fff',
    justifyContent: 'center',
    //alignItems: 'center',
  },
  containerBottom: {
    flex: 4,
    backgroundColor: 'transparent',
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
    // flexDirection: 'row',
    alignSelf: 'center',
    width: '50%',
    resizeMode: 'contain',
  },
  switchcontainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: 31,
    alignItems: 'center',

  },
  switcText: {
    alignSelf: 'flex-end',
    fontSize: 12,
    fontWeight: '300',
    color: 'gray',
    marginRight: 5,
  },
  button: {
    resizeMode: 'contain',
    width: 320,
    marginRight: 30,
    marginLeft: 30,
    marginTop: -30,
  },
  button1: {
    resizeMode: 'contain',
    width: 320,
    marginRight: 30,
    marginLeft: 30,

  },
});
