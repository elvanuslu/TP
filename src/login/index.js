
import React, { Component } from 'react';
import {
  BackHandler, Alert, KeyboardAvoidingView, NetInfo, ToastAndroid,
  Platform, StyleSheet, Text, View, Image, Switch, TouchableOpacity
} from 'react-native';
import { Left, Right, Toast, Button, Container, Header, Content, Card, CardItem, Body, Item, Icon, Input } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

import { getUserInfo, setStorage, getStorage } from '../Service/FetchUser';
export default class login extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      switch1Value: true,
      UserName: '',//'asu@test.com',
      Pass: '',// '123456',
      userId: '',
      error: '',
      isLoading: false,
      loading: false,
      SwitchOnValueHolder: false,
      latlon: undefined,
      connection_Status: undefined,
    }

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
        (error) => console.log('Gps Error' + error.message),
        {

          enableHighAccuracy: true, timeout: 3000, maximumAge: 1000
        }
      );
    } catch (error) {

    }
    finally {

    }
  }
  /*
    componentDidUpdate = async ()=> {
      console.log('this.state.latlon ' + this.state.latlon)
    }
    */
  componentDidMount = async () => {
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    //console.log('Login Did Mount')
    this._getConn();
    // this._getGps();
    const Password = await getStorage('Password');
    //console.log('Password= '+Password);
    const UserID = await getStorage('UserName');
    //console.log('Kullanıcı= '+UserID);
    if (Password !== '') {
      //alert(UserID)
      this.setState({ Pass: Password, UserName: UserID });
    }
  }

  handleBackPress = () => {
    //  BackHandler.disableSelectionMode();// .onBackButtonPressAndroid()// .exitApp(); // works best when the goBack is async
    return true;
  };
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
      // console.log('selection is true');
      return true;
    } else {
      //  console.log('selection is false');
      return false;
    }
  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectivityChange

    );
    //  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    //  this._didFocusSubscription && this._didFocusSubscription.remove();
    //  this._willBlurSubscription && this._willBlurSubscription.remove();    
    //  BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    //console.log('remove component')
  }
  handleBackButton() {
    //  ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  }
  _storeData = async () => {
    try {
      // console.log("usr="+this.state.userId);
      // await AsyncStorage.setItem("UserName", this.state.UserName);
      // await AsyncStorage.setItem('userId', this.state.userId);
      await setStorage('userId', this.state.userId);
      await setStorage('UserName', this.state.UserName);
      await setStorage('Password', this.state.Pass);

    } catch (error) {
      console.log("Err=" + error);
    }
  };

  async handleSubmit() {
    try {
      this.setState({ loading: true })


      if (this.state.UserName !== '') {
        if (this.state.Pass !== '') {

          // console.log('Login: ')
          getUserInfo(this.state.UserName, this.state.Pass)
            .then((res) => {
              console.log('Login: ' + JSON.stringify(res))
              this.setState({ userId: res.contactid, loading: false });
              /*   setInterval(() => {
                   this.setState({
                     loading: false
                   });
                 }, 5000);
                 */
              //      console.log("stateUserId=>" + this.state.userId);
              if (res.contactid === undefined) {
               
                /*    Toast.show({
                      text: "Hata\n" + res,
                      buttonText: "Okay",
                      type: 'danger'
                    })
                  */
                this.setState({ loading: false }, () => {
                  setTimeout(() => {
                    Alert.alert(
                      'Hata!',
                      res.message,
                      [

                        { text: 'Tamam', onPress: () => { this.setState({ loading: false }) } },
                      ],
                      { cancelable: true },
                    );
                  }, 510);
                });


              }
              else {
                // console.log("Kayıt else=>" + res);
                this.setState({ userId: res.contactid, loading: false });
                this._storeData();
                this.props.navigation.navigate('AnaSayfa');


              }
            }).catch(error => this.setState({ error, isLoading: false }));
        }
        else {
          this.setState({ loading: false }, () => {
            setTimeout(() => {
              Alert.alert('Hata', 'Şifre boş bırakılamaz.')
            }, 510);
          });
        }
      }
      else {
        this.setState({ loading: false }, () => {
          setTimeout(() => {
            Alert.alert('Hata', 'Kullanıcı Adı boş bırakılamaz.')
          }, 510);
        });
      }


    } catch (error) {
      this.setState({ loading: false }, () => {
        setTimeout(() => {
          Alert.alert('Genel Hata', error);
        }, 510);
      });

    }
  }
  toggleSwitch1 = async (value) => {
    this.setState({ switch1Value: value })
    //console.log('Switch 1 is: ' + value)
    if (value == true) {
      // console.log('Switch 1 is: ' + this.state.UserName)
      await setStorage('UserName', this.state.UserName);
      await setStorage('Password', this.state.Pass);

    }
    else {
      // await setStorage('userId', '');
      //await setStorage('Password', '');
      this.setState({ UserName: await getStorage('userId') })
      this.setState({ Pass: await getStorage('Password') })
    }
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
          <Header style={{ backgroundColor: '#fff' }}>

          </Header>
          <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Spinner
              visible={this.state.loading}
              textContent={'Giriş Yapılıyor...'}
              textStyle={styles.spinnerTextStyle}
            />
          </View>

          <View style={styles.containerOrta}>
            <Image style={styles.logo} source={require('../../assets/tplogo.png')} />
            <Item regular style={styles.Inputs}>
              <Icon active name='mail' underlayColor='#2089dc' color='#fff' />
              <Input placeholder='E-Posta Adresinizi Girin'
                keyboardType="email-address"
                // placeholderTextColor="#efefef"
                onChangeText={(value) => this.setState({ UserName: value })}
                value={this.state.UserName}
                underlineColorAndroid="transparent" />
            </Item>
            <Item regular style={styles.Inputs}>
              <Icon active name='key' underlayColor='#2089dc' color='#fff' />
              <Input placeholder='Şifrenizi Girin'
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
                onValueChange={(value) => this.toggleSwitch1(value)}
                style={{ marginBottom: 0 }}
                value={this.state.switch1Value} />
            </View>
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
  containerUst: {
    flex: 3,
    backgroundColor: 'transparent',

  },
  containerOrta: {
    flex: 8,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '90%',
    height: 80,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 10,
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
