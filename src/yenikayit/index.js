
import React, { Component } from 'react';
import { Alert, Switch, TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar, Platform } from 'react-native';
import { Picker, Form, Icon, Content, Input, Item, Title, Left, Right, Button, Container, Header, Body, Card, CardItem } from 'native-base';
import Icon1 from "react-native-vector-icons/FontAwesome";
import Spinner from 'react-native-loading-spinner-overlay';

import TextInputMask from 'react-native-text-input-mask';
import AsyncStorage from '@react-native-community/async-storage';
import { getYakitTipi, MusteriKayit, setStorage, getSSS, getAracTipleri } from '../Service/FetchUser';

const pompa = require("../../assets/pompaGri.png");
const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");
const sehirIkon = require("../../assets/ikonlar-22.png");


export default class yenikayit extends Component {
    constructor() {
        super();
        this.state = {
            kullanici: '',
            formatted: '',
            extracted: '',
            Adi: '',
            Soyadi: '',
            eposta: '',
            tel: '',
            plaka: '',
            yakitTipi: undefined,
            yakitTipiDeger: undefined,
            Sifre: '',
            Sifre2: '',
            error: '',
            isLoading: false,
            yakitTipleri: [],
            selected2: undefined,
            labelName: '',
            loading: false,
            SwitchOnValueHolder: false,
            SozlesmeOkudum: false,
            KampanyaDuyurular: false,
            smsIzni: true,
            mobilKod: '',
            mobilKodFormatted: '',
            mobilextracted: '',
            aracTiplerim: [],
            aracTipi: '',
        }
    }
    KapmanyaDuyuru = (value) => {
        this.setState({
            KampanyaDuyurular: value,
            smsIzni: true,
        })
        if (value == true) {
            // Alert.alert("Switch is On.");
        }
        else {
            //   Alert.alert("Switch is Off.");
        }

    }
    OkudumOnayladim = (value) => {
        this.setState({
            SozlesmeOkudum: value
        })
        if (value == true) {
            //  Alert.alert("Switch is On.");
        }
        else {
            //Alert.alert("Switch is Off.");
        }

    }
    ShowAlert = (value) => {
        this.setState({
            SwitchOnValueHolder: value
        })
        if (value == true) {
            //  Alert.alert("Switch is On.");
        }
        else {
            // Alert.alert("Switch is Off.");
        }

    }
    componentDidMount() {
        this._retrieveKullanici();
        this._getYakitTipleri();
        this.getAracTipleri();
    }
    _retrieveKullanici = async () => {
        try {
            const value = await AsyncStorage.getItem('userId');
            if (value !== null) {
                this.setState({ kullanici: value });
                console.log("UserId " + this.state.kullanici);

            }
        } catch (error) {
            // Error retrieving data
        }
    };

    onBeniHatirla() {

    }
    onValueChange2(value, label) {

        this.setState(
            {
                selected2: value,
                labelName: label
            },
            () => {
                console.log('selectedValue: ' + this.state.labelName, ' Selected: ' + this.state.selected2)
            }
        )
    }
    onYakitTipiValueChange(value: string) {
        this.setState({
            yakitTipi: value
        });
        //   console.log("Yakıt Tipi: " + this.state.yakitTipi);
        //   console.log("Yakit Val: " + this.state.yakitTipiDeger);
    }
    onArabaValueChange(value: string) {
        this.setState({
            araba: value,

        },
            () => { console.log('Araba: ' + this.state.araba) }
        );
    }
    _getYakitTipleri() {
        this.setState({ loading: true })
        getYakitTipi()
            .then((res) => {
                this.setState({
                    yakitTipleri: res,
                    loading: false,
                });
                //        console.log("Yakit" + ("log Yakit" + JSON.stringify(this.state.yakitTipleri)));
                //        console.log("Yakit Tipi: " + this.state.yakitTipleri[0].bm_yakittipiadi);
            })
            .catch(e => {
                console.log("hata: " + e);
                this.setState({ loading: false })
            }).finally(
                this.setState({ loading: false }))
    }
    _btnKayit() {
        try {
            this.setState({ loading: true })
            if (this.state.SozlesmeOkudum === true && this.state.KampanyaDuyurular === true) {

                // console.log('Adı: ' + this.state.Adi.length);
                if (this.state.Adi.length >= 3) {
                    if (this.state.Soyadi.length >= 3) {
                        if (this.state.eposta !== '') {
                            if (this.state.tel.length >= 11) {
                                if (this.state.plaka.length >= 7) {
                                    if (this.state.Sifre.length > 5) {
                                        if (this.state.Sifre === this.state.Sifre2) {
                                            this.setState({ loading: true })
                                            MusteriKayit(this.state.Adi, this.state.Soyadi, this.state.eposta, this.state.tel,
                                                this.state.Sifre, this.state.plaka, this.state.selected2, '',
                                                this.state.smsIzni, this.state.KampanyaDuyurular, this.state.SozlesmeOkudum, this.state.mobilKod,
                                                Platform.OS === 'ios' ? '100000000' : '100000001', this.state.aracTipi)
                                                .then((responseData) => {
                                                    let response = JSON.stringify(responseData);
                                                    console.log('responseData=' + response)
                                                    this.setState({ loading: false })
                                                    if (responseData.status == true) {
                                                        setStorage('kullaniciId', responseData.message);
                                                        this.props.navigation.navigate("Kodec", { 'Id': responseData.message });

                                                        /*
                                                        Alert.alert(
                                                            'Kayıt İşlemi!',
                                                            responseData.message,
                                                            [

                                                                { text: 'Tamam', onPress: () => { 

                                                                    this.props.navigation.navigate("Kodec");
                                                                } },
                                                            ],
                                                            { cancelable: true },
                                                        );
                                                        */
                                                        // console.log("response: " + JSON.stringify(responseData)) 
                                                    }
                                                    else {
                                                        this.setState({ loading: false })
                                                        Alert.alert(
                                                            'Kayıt İşlemi',
                                                            responseData.message,
                                                            [

                                                                { text: 'Tamam', onPress: () => console.log('False') },
                                                            ],
                                                            { cancelable: true },
                                                        );
                                                    }
                                                })
                                                .catch((err) => {
                                                    this.setState({ loading: false })
                                                    console.log(err);
                                                });
                                        }
                                        else {
                                            this.setState({ loading: false }, () => {
                                                setTimeout(() => {
                                                    Alert.alert(
                                                        'Kayıt İşlemi',
                                                        'Girilen Şifre birbirinden farklı.',
                                                        [

                                                            { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                                                        ],
                                                        { cancelable: true },
                                                    );
                                                }, 0);
                                            });

                                        }
                                    }
                                    else {
                                        this.setState({ loading: false }, () => {
                                            setTimeout(() => {
                                                Alert.alert(
                                                    'Kayıt İşlemi',
                                                    'Şifre boş bırakılamaz, en az 6 karakter olmalı',
                                                    [

                                                        { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                                                    ],
                                                    { cancelable: true },
                                                );
                                            }, 0);
                                        });


                                    }
                                }//Plaka...
                                else {
                                    this.setState({ loading: false }, () => {
                                        setTimeout(() => {
                                            Alert.alert(
                                                'Kayıt İşlemi',
                                                'Plaka alanı boş bırakılamaz',
                                                [

                                                    { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                                                ],
                                                { cancelable: true },
                                            );
                                        }, 0);
                                    });


                                }
                            } // Tel...
                            else {
                                this.setState({ loading: false }, () => {
                                    setTimeout(() => {
                                        Alert.alert(
                                            'Kayıt İşlemi',
                                            'Telefon alanı boş bırakılamaz',
                                            [

                                                { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                                            ],
                                            { cancelable: true },
                                        );
                                    }, 0);
                                });

                            }
                        } //E-Posta...
                        else {
                            this.setState({ loading: false }, () => {
                                setTimeout(() => {
                                    Alert.alert(
                                        'Kayıt İşlemi',
                                        'E-Posta alanı boş bırakılamaz',
                                        [

                                            { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                                        ],
                                        { cancelable: true },
                                    );
                                }, 0);
                            });

                        }
                    }// Soyadı...
                    else {
                        this.setState({ loading: false }, () => {
                            setTimeout(() => {
                                Alert.alert(
                                    'Kayıt İşlemi',
                                    'Soyadı alanı boş bırakılamaz',
                                    [

                                        { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                                    ],
                                    { cancelable: true },
                                );
                            }, 0);
                        });

                    }
                }//Adı...
                else {
                    this.setState({ loading: false }, () => {
                        setTimeout(() => {
                            Alert.alert(
                                'Kayıt İşlemi',
                                'Adınızı girmelisiniz',
                                [

                                    { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                                ],
                                { cancelable: true },
                            );
                        }, 0);
                    });

                }
            }
            else {
                Alert.alert(
                    'Onay İşlemi',
                    '* Sözleşmeyi Okudum onayladım \n* Kampanya ve Duyurular için benimle iletişime geçilmesine izin veriyorum.'
                    + '\n Onaylamalısınız.',
                    [

                        { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: true },
                );
            }
        } catch (error) {
            this.setState({ loading: false })
            console.log('hata oluştu: ' + error);
        }
    }
    _getSozlesme = () => {
        try {
            this.setState({ loading: true })
            getSSS(3)
                .then((response) => {
                    // console.log('Response0 ' + response[0].bm_uzunaciklama + '   Ret= ' + JSON.stringify(response));
                    this.setState({ loading: false })
                    Alert.alert(
                        'Sözleşme',
                        response[0].bm_uzunaciklama,
                        [

                            { text: 'Tamam', onPress: () => { this.setState({ loading: false }) } },
                        ],
                        { cancelable: true },
                    );
                    //   Alert.alert('Sözleşme', response[0].bm_uzunaciklama);
                })
                .catch((error) => {
                    this.setState({ loading: false })
                    Alert.alert('Servis Hatası', error)

                })
        } catch (error) {
            Alert.alert('Hata Oluştu', error)
            this.setState({ loading: false })
        }
        finally {
            this.setState({ loading: false })
        }
    }
    onAracTipi(value, label) {
        //  console.log('Araç: ' + value + ' Label: ' + label)
        this.setState({
            aracTipi: value,
        })
    }
    getAracTipleri = () => {
        try {
            var aracTiplerim = [];
            this.setState({ loading: true });
            getAracTipleri()
                .then((res) => {
                    if (res) {
                        if (Array.isArray(res)) {
                            aracTiplerim = res;
                            var initialArr = { 'AttributeValue': '-1', 'Value': 'Araç Tipi Seçin' };
                            aracTiplerim.splice(0, 0, initialArr);
                            this.setState({ aracTiplerim: res })
                            // console.log('Araç Tiplerim: ' + JSON.stringify(res));
                        }

                    }
                    this.setState({ loading: false });
                })
        } catch (error) {
            this.setState({ loading: false }, () => {
                setTimeout(() => {
                    Alert.alert(
                        'Araç Tipleri Hatası',
                        error,
                        [
                            { text: 'Tamam', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: true },
                    );
                }, 0);
            });
        }
    }
    _getkvkIzni=()=>{
        Alert.alert(
            'Kvk İzni',
            'TP PETROL DAĞITIM A.Ş. KİŞİSEL VERİLERİN İŞLENMESİ AYDINLATMA METNİ \n'+

            '\n•	Veri Sorumlusu ve Temsilcisi\n'+
        ' 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVK Kanunu) uyarınca, kişisel verileriniz; veri sorumlusu olarak Bulgurlu Mah. Gürpınar Cad. No:15 adresinde mukim Şirketimiz TP Petrol Dağıtım A.Ş. tarafından aşağıda açıklanan kapsamda işlenebilecektir.\n'
        
            +'\n•	Kişisel Verilerin Hangi Amaçla İşlenebileceği\n'+ 
        'Şirketimiz kişisel verilerinizin KVK Kanunu’nun 5. ve 6. maddelerine uygun bir şekilde işleneceğini, işlenen verilerinizin yine KVK Kanunu’na uygun bir şekilde muhafaza edileceğini garanti ve taahhüt eder. Bu kapsamda kişisel verileriniz Şirketimiz veri işleme politikasında belirlendiği haliyle tahdidi olmayan bir şekilde; Şirketimiz tarafından sunulan ürün ve hizmetlerin iyileştirilmesi, bu kapsamda iş birimlerimiz tarafından gerekli çalışmaların yürütülmesi; Şirketimizin ve Şirketimiz ile iş ilişkisi içerisinde olan kişilerin hukuki ve ticari güvenliğinin temini; Şirketimiz insan kaynakları ve istihdam politikalarının yönetilmesi; Şirketimiz tarafından sizlere sunulan ürün ve hizmetlerin kişisel beğenileri ve kullanım alışkanlıklarına uygun hale getirilmesi amaçları dahilinde işlenecektir. Kişisel verilerinizin KVK Kanunu’na uygun şekilde işlenmesine dair tüm yasal sorumluluk veri sorumlusu sıfatıyla TP Petrol Dağıtım A.Ş.’ye aittir.\n'+
        '\n•	Kişisel Verilerinizin Paylaşılması'+
        'Toplanan kişisel verileriniz; Şirketimiz tarafından sunulan ürün ve hizmetlerin iyileştirilmesi, bu kapsamda iş birimlerimiz tarafından gerekli çalışmaların yürütülmesi; Şirketimizin ve Şirketimiz ile iş ilişkisi içerisinde olan kişilerin hukuki ve ticari güvenliğinin temini; Şirketimiz insan kaynakları ve istihdam politikalarının yönetilmesi; Şirketimiz tarafından sizlere sunulan ürün ve hizmetlerin kişisel beğenileri ve kullanım alışkanlıklarına uygun hale getirilmesi amaçları dahilinde; TP Petrol Dağıtım A.Ş.’nin bağlı olduğu holdinge bağlı şirketler ile ve TP Petrol Dağıtım A.Ş. hissedarlarıyla, iş ortaklarıyla, tedarikçileriyle, iştirakleriyle, dış hizmet sağlayıcılarıyla ve kanunen yetkili kamu kurumları ve özel kişilerle, KVK Kanunu’nun 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçlarına uygun şekilde paylaşılabilecektir.\n'+
        
        'Kişisel verilerinizin yukarıda yazılı amaçlarla ve KVK Kanunu’na uygun şekilde yine yukarıda yazılı taraflarla paylaşılması halinde gerekli güvenlik önlemlerinin alınması veri sorumlusu sıfatıyla TP Petrol Dağıtım A.Ş.’ye aittir.\n'+
        
           '\n •	Kişisel Verilerinize İlişkin KVK Kanunu’ndan Doğan Haklarınız\n'+
        
       'Kişisel veri sahipleri Şirketimizden\n'+
        
          '\n •	Kişisel verilerinin işlenip işlenmediğini öğrenme,\n'+
            '\n•	Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,\b'+
            '\n•	Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,\n'+
            '\n•	Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri öğrenme,\n'+
            '\n•	Kişisel verilerin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini veya tamamlanmasını isteme ve bu kapsamda yapılan işlemin kişisel verilerin aktarıldığı taraflara bildirilmesini isteme,\n'+
            '\n•	KVK Kanunu’nun 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini ve bu kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,\n'+
            '\n•	İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etmesi,\n'+
            '\n•	Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması halinde zararın giderilmesini talep etme haklarına sahiptir.\n'+
        
        '\nKVK Kanunu’nun 13.maddesinde belirtilen yukarıda yazılı haklarınızı kullanmakla ilgili “yazılı” talebiniz üzerine başvurunuz Kişisel Verileri Koruma Kurulu tarafından en kısa sürede ve en geç 30 gün içerisinde sonuçlandırılacaktır. Kişisel Verilerin Korunması Kurulu şu aşamada herhangi bir başvuru yöntemi belirlemediği için başvurunuzu KVK Kanunu’nun amir hükmü gereği yazılı olarak Şirketimize iletmeniz gereklidir. Kişisel Verileri Koruma Kurulu tarafından başvuru yöntemine ilişkin bir belirleme yapıldığı takdirde bu yöntemler TP Petrol Dağıtım A.Ş. tarafından internet adresimizden kamuoyu ile paylaşılacaktır. Yukarıda yazılı olan haklarını kullanmak üzere veri sahibi tarafından yapılacak olan başvurular şimdilik ücretsiz olup, Kişisel Verileri Koruma Kurulu tarafından ayrıca bir tarife belirlenmesi durumunda. Bu tarifeye uygun bir şekilde ücretlendirme yapılabilecektir.\n',
            [

                { text: 'Tamam', onPress: () => '' },
            ],
            { cancelable: true },
        );
    }
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar style={{ color: '#fff' }} barStyle="light-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("login")}>
                            <Image style={{ marginLeft: -15, width: 50, height: 50, resizeMode: 'contain', }} source={require('../../assets/GeriDongri.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff' }}>Yeni Kayıt</Title>
                    </Body>
                    <Right></Right>
                </Header>
                <View style={styles.container1}>
                    <View>
                        <Image style={styles.logo} source={require('../../assets/tplogo.png')}
                        />
                        <Image style={{ marginBottom: 5, alignSelf: 'center', marginLeft: 30, marginRight: 30, width: '90%', height: 1, }} source={require('../../assets/cizgi.png')} />
                    </View>
                </View>
                <View style={styles.containerOrta}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner
                            visible={this.state.loading}
                            textContent={'Lütfen Bekleyiniz...'}
                            textStyle={styles.spinnerTextStyle} />
                    </View>
                    <Content style={{ backgroundColor: '#fff', }}>
                        <Body>
                            <Form>
                                <Item regular style={styles.Inputs}>
                                    <Icon active name='person' underlayColor='#2089dc' />
                                    <Input placeholder='Ad'
                                        onChangeText={(value) => this.setState({ Adi: value })}
                                        value={this.state.Adi}
                                        placeholderTextColor="black"
                                        underlineColorAndroid="transparent" />
                                </Item>
                                <Item regular style={styles.Inputs}>
                                    <Icon active name='person' underlayColor='#2089dc' />
                                    <Input placeholder='Soyad'
                                        onChangeText={(value) => this.setState({ Soyadi: value })}
                                        value={this.state.Soyadi}
                                        placeholderTextColor="black"
                                        underlineColorAndroid="transparent" />
                                </Item>
                                <Item regular style={styles.Inputs}>
                                    <Icon active name='mail' underlayColor='#2089dc' />
                                    <Input placeholder='E-posta Adresi'
                                        keyboardType="email-address"
                                        placeholderTextColor="black"
                                        onChangeText={(value) => this.setState({ eposta: value })}
                                        value={this.state.eposta}
                                        underlineColorAndroid="transparent" />
                                </Item>
                                <Item regular style={styles.Inputs}>
                                    <Icon active name='person' />
                                    <TextInputMask style={styles.Inputs1}
                                        placeholder="Telefon"
                                        placeholderTextColor="black"
                                        keyboardType="phone-pad"
                                        refInput={ref => { this.input = ref }}
                                        onChangeText={(formatted, extracted) => {
                                            this.setState({ tel: formatted })
                                            //  console.log(formatted)
                                            //  console.log(extracted)
                                        }}
                                        mask={"0 [000] [000] [00] [00]"}
                                    />

                                </Item>


                                <Item picker style={styles.Inputs}>
                                    <Icon style={{ marginLeft: 10 }} active name='person' underlayColor='#2089dc' />
                                    <Picker borderColor='black'
                                        mode="dropdown"
                                        headerBackButtonText="Geri"
                                        iosHeader="Seçin"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Araç Tipi"
                                        placeholderIconColor="black"
                                        selectedValue={this.state.aracTipi}
                                        onValueChange={this.onAracTipi.bind(this)}>
                                        {
                                            this.state.aracTiplerim.map((item, key) => (
                                                <Picker.Item
                                                    label={item.Value}
                                                    value={item.AttributeValue}
                                                    key={item.AttributeValue}
                                                />
                                            ))
                                        }
                                    </Picker>
                                </Item>
                                <Item regular style={styles.Inputs}>
                                    <Icon active name='person' underlayColor='#2089dc' />

                                    <Input autoCapitalize="characters"
                                        onChangeText={(value) => this.setState({ plaka: value.toUpperCase() })}
                                        value={this.state.plaka.toUpperCase()}
                                        placeholder="Plaka"
                                        autoCompleteType="off"
                                        placeholderTextColor="black"
                                        underlineColorAndroid="transparent" />


                                </Item>
                                <Item picker style={styles.Inputs}>
                                    <Image style={{ marginLeft: 5, width: 30, height: 30, resizeMode: 'contain', }} source={pompa}></Image>
                                    <Picker borderColor='black'
                                        mode="dropdown"
                                        headerBackButtonText="Geri"
                                        iosHeader="Seçin"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Yakıt Tipi"
                                        //    placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="black"
                                        //   selectedValue={this.state.yakitTipi}
                                        //    onValueChange={this.onYakitTipiValueChange.bind(this)}
                                        // onValueChange={(itemValue, itemIndex) => this.setState({ yakitTipi: itemValue, yakitTipiDeger:itemIndex },this.onYakitTipiValueChange.bind(this))}
                                        selectedValue={this.state.selected2}
                                        onValueChange={this.onValueChange2.bind(this)}>
                                        {
                                            this.state.yakitTipleri.map((item, key) => (
                                                //  console.log("ttip: " + item.bm_yakittipiadi),
                                                //  console.log("ttip: " + item.bm_yakittipiid),
                                                <Picker.Item
                                                    label={item.bm_yakittipiadi}
                                                    value={item.bm_yakittipiid}
                                                    key={item.bm_yakittipiid} />)
                                            )
                                        }
                                    </Picker>
                                </Item>
                                <Item regular style={styles.Inputs}>
                                    <Icon active name='md-alarm' />
                                    <TextInputMask style={styles.Inputs1}
                                        autoCapitalize="characters"
                                        placeholder="Mobil Kod"
                                        placeholderTextColor="black"
                                        //keyboardType="number-pad"
                                        //   onChangeText={(value) => this.setState({ plaka: value })}
                                        value={this.state.plaka}
                                        underlineColorAndroid="transparent"

                                        refInput={ref => { this.input = ref }}
                                        onChangeText={(mobilKodFormatted, mobilextracted) => {
                                            this.setState({ mobilKod: mobilKodFormatted })
                                            //  console.log(mobilKodFormatted)
                                            //  console.log(mobilextracted)
                                        }}
                                    //  mask={"[00000000]-[0000]-[0000]-[0000]-[000000000000]"}
                                    />
                                </Item>
                                <Item regular style={styles.Inputs}>
                                    <Icon active name='key' underlayColor='#2089dc' />
                                    <Input placeholder='Şifre '
                                        // keyboardType="email-address"
                                        placeholderTextColor="black"
                                        secureTextEntry={true}
                                        onChangeText={(value) => this.setState({ Sifre: value })}
                                        value={this.state.Sifre}
                                        underlineColorAndroid="transparent" />
                                </Item>
                                <Item regular style={styles.Inputs}>
                                    <Icon active name='key' underlayColor='#2089dc' />
                                    <Input placeholder='Şifre (Tekrar) '
                                        // keyboardType="email-address"
                                        placeholderTextColor="black"
                                        secureTextEntry={true}
                                        onChangeText={(value) => this.setState({ Sifre2: value })}
                                        value={this.state.Sifre2}
                                        underlineColorAndroid="transparent" />
                                </Item>
                            </Form>
                        </Body>

                        <View style={styles.switchcontainer}>
                            <View style={{ alignContent: 'center' }}>
                                <TouchableOpacity onPress={() => this._getSozlesme()}>
                                    <Text style={styles.switcText}>Sözleşmeyi Okudum Onaylıyorum</Text>
                                </TouchableOpacity>
                            </View>

                            <Switch
                                onValueChange={(value) => this.OkudumOnayladim(value)}
                                style={{ marginBottom: 0 }}
                                value={this.state.SozlesmeOkudum} />
                        </View>
                        <View style={styles.switchcontainer}>
                            <View style={{ alignContent: 'center', marginBottom: 5 }}>
                                <TouchableOpacity onPress={() => this._getkvkIzni()}>
                                    <Text style={styles.switcText}>Kampanya ve duyurular için benimle{"\n"}iletişime geçilmesine izin veriyorum</Text>
                                </TouchableOpacity>
                            </View>

                            <Switch
                                onValueChange={(value) => this.KapmanyaDuyuru(value)}
                                style={{ marginBottom: 0 }}
                                value={this.state.KampanyaDuyurular} />
                        </View>
                        <Button block danger style={styles.mb15} onPress={() => this._btnKayit()}>
                            <Text style={styles.buttonText}>KAYIT OL</Text>
                        </Button>
                    </Content>
                </View>

            </Container>
        );
    }
}


const styles = StyleSheet.create({
    textYazi: {
        color: 'gray',
        fontSize: 12,
        textAlign: 'left',
        marginLeft: 30,
        marginTop: 10,
        marginBottom: 10,
        fontFamily: "Myriadpro-Regular",
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    container: {
        flex: 1,
    },
    container1: {
        flex: 2,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    containerOrta: {
        flex: 10,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    containerBottom: {
        flex: 2,
        backgroundColor: 'transparent',
    },
    logo: {
        marginTop: 5,
        //  width: '100%',
        height: '80%',
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
    Inputs: {
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 5,
        marginBottom: 10,
        height: 40,
        width: 300,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderWidth: 1,
        //color:'black',
        borderColor: 'black',
    },
    Inputs1: {
        alignSelf: 'center',
        width: '90%',
        fontSize: 16,
        borderColor: 'black',
    },
    switchcontainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginRight: 31,
        alignItems: 'center',

    },
    switcText: {
        textAlign: 'right',
        fontSize: 12,
        fontWeight: '300',
        color: 'gray',
        marginRight: 5,
        textDecorationLine: 'underline',
    },
    switcText1: {
        textAlign: 'right',
        fontSize: 12,
        fontWeight: '300',
        color: 'gray',
        marginRight: 5,

    },
    mb15: {
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '800',
    },
    comboItem: {
        marginRight: 40,
        marginLeft: 40,
        borderColor: 'black',
        //   marginBottom: 15,
        borderWidth: 1,
        marginTop: 5,

    },
})