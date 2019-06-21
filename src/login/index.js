
import React, { Component } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View, Image, Switch, TouchableOpacity } from 'react-native';
import { Toast, Button, Container, Header, Content, Card, CardItem, Body, Item, Icon, Input } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

import { getUserInfo } from '../Service/FetchUser';
export default class login extends Component {
  constructor() {
    super();
    this.state = {
      switch1Value: true,
      UserName: 'asu@test.com',
      Pass: '123456',
      userId: '',
      error: '',
      isLoading: false,
      loading: false,
      SwitchOnValueHolder: false,
    }
  }
  /*
  componentDidMount = () => {
    fetch('http://10.200.202.174:81/GetContactAccess?EMailAddress1=asu@test.com&bm_sifre=123456', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          data: responseJson
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }
  */
  _storeData = async () => {
    try {
      // console.log("usr="+this.state.userId);
      await AsyncStorage.setItem("UserName", this.state.UserName);
      await AsyncStorage.setItem('userId', this.state.userId);

    } catch (error) {
      console.log("Err=" + error);
    }
  };
 isAvailable () {
    const timeout = new Promise((resolve, reject) => {
      setTimeout(reject, 3000, 'Request timed out');
    });
    const request = fetch('http://85.105.103.4');
    return Promise
      .race([timeout, request])
      .then(response => '')
      .catch(error => {
        alert('Bağlantı Hatası...')
        this.setState({ loading: false })
      });
  }
  handleSubmit() {
    this.setState({ loading: true })
    this.isAvailable();
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
          Toast.show({
            text: "Giriş Başarılı!\n",
            buttonText: "Okay",
            type: 'success',
          })
          this.props.navigation.navigate("hesabim", { Data: res });
          this.setState({
            error: false,
            username: ''
          })
        }
      }).catch(error => this.setState({ error, isLoading: false }));

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
              <Image style={{ alignSelf: 'center', marginLeft: 30, marginRight: 30, width: '80%', height: 1, marginTop: -50 }} source={require('../../assets/cizgi.png')} />
            </View>
          </View>

          <View style={styles.containerOrta}>
            <Content style={{ backgroundColor: '#fff' }}>

              <Item regular style={styles.Inputs}>
                <Icon active name='mail' underlayColor='#2089dc' color='#fff' />
                <Input placeholder='E-Posta adresinizi Giriniz...'
                  keyboardType="email-address"
                  placeholderTextColor="#efefef"
                  onChangeText={(value) => this.setState({ UserName: value })}
                  value={this.state.UserName}
                  underlineColorAndroid="transparent" />
              </Item>
              <Item regular style={styles.Inputs}>
                <Icon active name='key' underlayColor='#2089dc' color='#fff' />
                <Input placeholder='Şifrenizi Giriniz...'
                  secureTextEntry={true}
                  textContentType="password"
                  placeholderTextColor="#efefef"
                  onChangeText={(value) => this.setState({ Pass: value })}
                  value={this.state.Pass}
                  underlineColorAndroid="transparent" />
              </Item>
              <View style={styles.switchcontainer}>
                <View style={{ alignContent: 'center' }}>
                  <Text style={styles.switcText}>Beni Hatırla</Text>
                </View>

                <Switch
                  onValueChange={(value) => this.ShowAlert(value)}
                  style={{ marginBottom: 0 }}
                  value={this.state.SwitchOnValueHolder} />
              </View>


            </Content>
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
    flex: 5,
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  containerOrta: {
    flex: 4,
    backgroundColor: 'transparent',
  },
  containerBottom: {
    flex: 6,
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
    flexDirection: 'row',
    alignSelf: 'center',
    width: 190,
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
