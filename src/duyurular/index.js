
import React, { Component } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import { Title, Left, Right, Button, Container, Header, Body, Icon, Card, CardItem, Content } from 'native-base';

import { getDuyuruListByUser,getStorage } from '../Service/FetchUser';

const k1 = require("../../assets/resim1.png");
const k2 = require("../../assets/Resim2.png");
const k3 = require("../../assets/image3.png");
const k4 = require("../../assets/Duyuru1.png");

export default class Duyurular extends Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            loading: false,
            data:[],
        }
    }
    componentDidMount() {
       // console.log('mount')
        this._getDuyuruListesi();
    }
    _getDuyuruListesi= async ()=> {
      try {
        this.setState({ loading: true })
        const uId = await getStorage('userId');
        //   console.log('mount'+uId)
           getDuyuruListByUser(uId )
               .then((res) => {
                   this.setState({ data: res, loading: false });
                   //console.log(JSON.stringify(res));
               })
               .catch((error) => alert(error))
      } catch (error) {
        Alert.alert('Hata', error);
      }
      finally{
        this.setState({ loading: false })
      }
    }
    onPressAndGo(Id,url,aciklama,aciklama2) {
        /*console.log('duyuru Id='+Id);
        console.log('duyuru url='+url);
        console.log('duyuru aciklama='+aciklama);
        console.log('duyuru aciklama2='+aciklama2);
        */
         this.props.navigation.navigate("DuyuruDetay",{'Id': Id,
         'url': url,'aciklama':aciklama,'aciklama2':aciklama2});
     }
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                <Header style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("AnaSayfa")}>
                            <Icon name="arrow-back" style={{color:'#fff'}} />
                        </Button>
                    </Left>
                    <Body>
                    <Title style={{color:'#fff'}}>Duyurular</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" style={{color:'#fff'}}/>
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container1}>
                    <View>
                        <Image style={{ resizeMode: 'contain', width: '95%', height: 90, marginTop: 5 }} source={require('../../assets/tplogo.png')}
                        />
                        <Image style={{ alignSelf: 'center', marginTop: 15, marginLeft: 30, marginRight: 30, width: '90%', height: 1, }} source={require('../../assets/cizgi.png')} />
                    </View>
                </View>
                <View style={styles.containerOrta}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) =>
                            <Card key={item.bm_mobilcerikId} style={styles.cardmb}>
                                <CardItem header>
                                <Text style={styles.textBaslik}>{item.bm_kisaaciklama}</Text>
                                </CardItem>
                                <CardItem cardBody style={{ borderRadius: 5 }}>
                                    <Body>
                                        <TouchableOpacity style={{height:133,width:'100%',}} onPress={() => this.onPressAndGo(item.bm_mobilcerikId,item.bm_url,item.bm_kisaaciklama,item.bm_uzunaciklama)}>
                                        
                                        <Image style={styles.logo} source={{ uri: item.bm_url }}  />
                                        </TouchableOpacity>
                                       
                                    </Body>
                                </CardItem>
                                <CardItem footer>
                                     <Text style={styles.textYazi}>{item.bm_uzunaciklama.slice(0,160)+'\n'}</Text>
                                </CardItem>
                            </Card>
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //  flexDirection: 'column',
    },
    container1: {
        flex: 2,
        backgroundColor: '#fff',
        // backgroundColor: '#efefef',
    },
    container2: {
        flex: 7,
    },
    containerOrta: {
        flex: 8,
        backgroundColor: '#efefef',
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode:'cover',
    },
    cardmb: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    textYazi: {
        fontSize: 13,
        color: '#757575',
        textAlign: 'left',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
        fontFamily: 'FontAwesome',
        fontWeight: 'normal',
    },
    textBaslik: {
        color: 'red',
        fontSize: 18,
        //  fontWeight:'bold',
        textAlign: 'left',
        marginLeft: 5,
        marginRight: 5,
        fontFamily: "Myriadpro-Bold",
        marginBottom: 10,
        marginTop: 15,
    },
})