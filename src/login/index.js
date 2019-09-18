
import React, { Component } from 'react';
import {
  BackHandler, Alert, NetInfo, ToastAndroid,
  Platform, StyleSheet, Text, View, Image, Switch, TouchableOpacity
} from 'react-native';
import { Left, Right, Toast, Button, Container, Header, Content, Card, CardItem, Body, Item, Icon, Input } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

import { getUserInfo, setStorage, getStorage, fetchgetLocation, checkConnection, internetConnection } from '../Service/FetchUser';
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
      connection_Status: false,
    }

  }

  getInfo = () => {
    try {
      NetInfo.isConnected.fetch().then(isConnected => {
        this.setState({ connection_Status: true })
        console.log('First, is ' + (isConnected ? 'online' : this.setState({ loading: false }, () => {
          setTimeout(() => {
            Alert.alert(
              'Bağlantı Hatası!',
              'İnternet Bağlantınızı Kontrol Edin',
              [

                { text: 'Tamam', onPress: () => { this.setState({ loading: false }) } },
              ],
              { cancelable: true },
            );
          }, 510);
        })));
      });
      function handleFirstConnectivityChange(isConnected) {
        this.setState({ connection_Status: true })
        console.log('Then, is ' + (isConnected ? 'online' : this.setState({ loading: false }, () => {
          setTimeout(() => {
            Alert.alert(
              'Bağlantı Hatası!',
              'İnternet Bağlantınızı Kontrol Edin',
              [

                { text: 'Tamam', onPress: () => { this.setState({ loading: false }) } },
              ],
              { cancelable: true },
            );
          }, 510);
        })));
        NetInfo.isConnected.removeEventListener(
          'connectionChange',
          handleFirstConnectivityChange
        );
      }
      NetInfo.isConnected.addEventListener(
        'connectionChange',
        handleFirstConnectivityChange
      );

    } catch (error) {

    }
  }
  baglantiDurumu = () => {
    return NetInfo.isConnected.fetch().then(async (isConnected) => {
      if (!isConnected) {
        Alert.alert(
          'Bağlantı Hatası',
          'Internet Bağlantınızı Kontrol Edin.',
          [

            {
              text: 'Tamam', onPress: () => {
                this.setState({
                  loading: false
                })
                //this.props.navigation.navigate("hesabim")
              }
            },
          ],
          { cancelable: true },
        )
        return false;
      }
      else {
        return true;
      }
    });
  }
  getParametrem=()=>{
    const sound = this.props.navigation.getParam('ses', '');
    sound.stop();
    //console.log('Ses: '+JSON.stringify(sound));
  }
  componentDidMount = async () => {
    fetchgetLocation();
    let durum = this.baglantiDurumu();
    if (durum === false)
      return;

    // let dat = await checkConnection();
    const Password = await getStorage('Password');
    const UserID = await getStorage('UserName');
    if (Password !== '') {
      this.setState({ Pass: Password, UserName: UserID });
    }
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

  }
  handleBackPress = () => {
    console.log('BackHandler: '+JSON.stringify(BackHandler));
    this.props.navigation.navigate("login")
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
          this.setState({ connection_Status: true })
        }
        else {
          this.setState({ connection_Status: false })
        }

      });
      NetInfo.isConnected.fetch().done((isConnected) => {

        if (isConnected == true) {
          this.setState({ connection_Status: true })
        }
        else {
          this.setState({ connection_Status: false })
        }

      });
    } catch (error) {
    }
  }
  _handleConnectivityChange = (isConnected) => {
    if (isConnected == true) {
      this.setState({ connection_Status: true })
    }
    else {
      this.setState({ connection_Status: false })
    }
  };
  onBackButtonPressAndroid = () => {
      console.log('selection is true');
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
    this.backHandler.remove();
    //  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    //  this._didFocusSubscription && this._didFocusSubscription.remove();
    //  this._willBlurSubscription && this._willBlurSubscription.remove();    
    //  BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    //console.log('remove component')
  }
  handleBackButton() {
      ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
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
              console.log('Login1: ' + JSON.stringify(res) + ' Cid:' + res.contactid)
              if (res.status !== false) {
                this.setState({ userId: res.contactid, loading: false });
              }
console.log('res.contactid: '+res.contactid)
              if ((res.checkActivation == false)&&(res.status==false)&&(res.contactid!==null)) {
                this.setState({ loading: false }, () => {
                  setTimeout(() => {
                    Alert.alert(
                      'Hata',
                      res.message,
                      [

                        { text: 'Tamam', onPress: () => this.props.navigation.navigate("Kodec", { 'Id': res.contactid }) },
                      ],
                      { cancelable: true },
                    );
                  }, 0);
                })
              }
              if ((res.checkActivation == true)&&(res.status==false)&&(res.contactid!==null)) {
                this.setState({ loading: false }, () => {
                  setTimeout(() => {
                    Alert.alert(
                      'Hata',
                      res.message,
                      [

                        { text: 'Tamam', onPress: () => { this.setState({ loading: false }) } },
                      ],
                      { cancelable: true },
                    );
                  }, 0);
                });


              }

              if (res.contactid === null) {
                this.setState({ loading: false }, () => {
                  setTimeout(() => {
                    Alert.alert(
                      'Hata',
                      res.message,
                      [

                        { text: 'Tamam', onPress: () => { this.setState({ loading: false }) } },
                      ],
                      { cancelable: true },
                    );
                  }, 0);
                });


              }
              else if(res.status==undefined)
              {
                console.log("Kayıt else=>" + JSON.stringify(res));
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
            }, 0);
          });
        }
      }
      else {
        this.setState({ loading: false }, () => {
          setTimeout(() => {
            Alert.alert('Hata', 'Kullanıcı Adı boş bırakılamaz.')
          }, 0);
        });
      }


    } catch (error) {
      this.setState({ loading: false }, () => {
        setTimeout(() => {
          Alert.alert('Genel Hata', error);
        }, 0);
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
      await setStorage('userId', '');
      await setStorage('Password', '');
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
            <TouchableOpacity onPress={() => this.props.navigation.navigate("EnYakinIstasyon", { 'Yer': 'login' })}>
              <Image
                style={styles.button2}
                source={require('../../assets/istasyonara.png')}
              />
            </TouchableOpacity>
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
    marginTop: 5,
    width: '100%',
    height: 80,
    resizeMode: 'contain',
    marginBottom: 15,
    alignSelf: 'center'
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
  button2: {
    resizeMode: 'contain',
    //width: 320,
    height: 85,
    marginRight: 30,
    marginLeft: 30,
    marginTop: -30,
  },
});
