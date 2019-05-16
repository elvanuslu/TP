
import React, { Component } from 'react';
import { FlatList, ListItem, KeyboardAvoidingView, Platform, StyleSheet, Text, View, Image, Switch, TouchableOpacity } from 'react-native';
import { Title, Thumbnail, Left, Right, Button, Container, Header, Content, Card, CardItem, Body, Item, Icon, Input, List } from 'native-base';

const k1 = require("../../assets/Resim.png");
const k2 = require("../../assets/Kampanya-2.png");
const k3 = require("../../assets/Kampanya-3.png");

export default class kampanyadetay extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <Header  style={{ backgroundColor: 'red' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("kampanya")}>
                            <Icon name="arrow-back" color="blue" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Kampanya Detay</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container}>
                    <View style={styles.container1}>

                            <Image style={styles.logo1} source={require('../../assets/logo.png')}
                            />
                             <Image style={{ marginLeft:30,marginRight:30,width:'80%', height:1, marginTop:-120}} source={require('../../assets/cizgi.png')}/>
                    </View>
                    <View style={styles.containerOrta}>
                        <Image style={styles.logo} source={k1} />
                    </View>
                    <View style={styles.containerBottom}>
                        <Content>
                            <Text style={styles.instructions}>

                                DİĞER BİLGİLER
           Kampanya 1 Nisan – 15 Mayıs 2019 tarihleri arasında Bonus üyesi Türk Petrol istasyonlarında geçerlidir.
           Kampanyada yapılan 4 defa 125 TL ve üzeri işlemler 30 TL bonus / indirim kazanacaktır. Kampanyaya Bonus Flaş uygulaması aracılığı ile katılan kart sahipleri 40 TL bonus kazanacaktır.
           Ayrı günlerde ve tek seferde yapılan 125 TL ve üzeri akaryakıt ya da otogaz alımlarında geçerlidir. Aynı gün içerisinde yapılan birden fazla 125 TL ve üzeri harcamaların ilki kampanya dahilindedir.
           Kampanya müşteri bazındadır SMS ile katılanlar en fazla 30TL bonus/indirim, Bonus Flaş ile katılanlar en fazla 40TL bonus kazanabilir.
           Kazanılan bonus, 22 Mayıs - 29 Mayıs 2019  tarihleri arasında Bonus üyesi Türk Petrol istasyonlarında akaryakıt ve/veya otogaz alımlarında kullanılmalıdır. 29 Mayıs sonrası kullanılmayan bonuslar geri alınacaktır.
           Kampanyaya katılan diğer banka Bonus kartları, 22 Mayıs - 29 Mayıs 2019 tarihleri arasında Bonus üyesi Petrol Ofisi istasyonlarında yaptıkları harcamalarında indirim alacak ve bu indirim harcama yapılan kartlarının ekstresine yansıtılacaktır.
           Garanti Bonus'lar, Flexi, Money ,diğer banka Bonus kartları (TEB Bonus Business, ING Bonus Business hariç), Bonus Business ve Easy kartlar dahildir.
           TEB Bonus Business, ING Bonus Business  dahil değildir.
           Shop&Fly Kredi kartları, Miles&Smiles Kredi kartları ,Paracard, Taksitli işlemler, vadeli taksit, bonus kullanımları, sanal pos, sanal kart ve mail order işlemleri kampanyaya dahil değildir.
           Bonusnet bankalarına ilişkin ticari ve bireysel kart katılım bilgilerine detaylı olarak bonus.com.tr'den ulaşabilirsiniz.
           Birden fazla Bonus Business veya Easy kartı olan ticari tüzel kart müşterilerinin ilgili tüm kartlarıyla kampanyaya dahil olabilmeleri için firma yetkilisinin banka sistemine kayıtlı telefon numarasından başvuru yapması gerekmektedir.
           BonusFlaş ile katılım sadece şahıs şirketi sahibi müşterilerin ticari kartları ile sağlanabilmektedir. Tüzel müşteriler sadece SMS ile katılım sağlayabilir.
           Kampanyaya katılım için; harcamadan önce Garanti Bonus kart sahipleri “POAS" yazıp 3340'a, Deniz Bonus sahipleri 3280'e, TEB Bonus sahipleri 4616'ya, Şeker Bonus sahipleri 7353'e, ING Bonus sahipleri 2205'e, Türkiye Finans Happy Card sahipleri kartlarının son 6 hanesi ile birlikte 2442'ye, AlternatifBank Bonus sahipleri 4055'e, ICBC Turkey Bonus sahipleri 05327524404'e SMS göndermelidir. Fibabanka Bonus sahipleri için SMS ile katılım gerekmemektedir.
           Kampanya kapsamında kazanılan ödül tutarı bilgisine ilgili kartla Türk Petrol istasyonlarındaki Garanti POS cihazları üzerinden ulaşılabilir
           Flexi, Bonus Flexi, Bonus Genç Card'lar kampanyaya katılım için EVET Türk Petrol yazıp, kartın son 6 hanesiyle beraber 3340'a sms göndermelidir ve bu kartlar için katılım ücreti 3,99 TL dir.
           Kampanyaya Garanti Bonus, diğer banka Bonus kartları ve Money  ile katılan müşteriler, Flexi Card ile de ayrıca kampanyaya katılarak,-Bonus Flaş üzerinden kampanyaya katılması durumunda en fazla 40 TL olmak üzere- ikinci defa bonus kazanabilirler.
           Tüm kartlar için kampanya katılım kısa mesajının sistemimize ulaşmasından sonraki işlemler dikkate alınır.
           İşlemler mutlaka Garanti Bankası POS'undan geçmelidir.
           Gönderilen SMS ler, Garanti Bankası sisteminde bulunan ve harcama yapılan kartın bağlı olduğu cep telefonu numarasından gönderilmelidir.
           Bankada kayıtlı numarasıyla gönderilen katılım SMS'inden sonraki işlemler dikkate alınır ve her bir operatör kendi tarifesi üzerinden ücretlendirilir.
           Detaylar için   www.tp.com.tr
           Türk Petrol, kampanyayı durdurma ve değiştirme hakkını saklı tutarlar.

                        </Text>
                        </Content>
                    </View>
                </View>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    container1: {
        flex: 2,
        alignItems:'center',
        backgroundColor: 'transparent',
        marginBottom: 5,
    },
    containerOrta: {
        flex: 4,
        backgroundColor: 'transparent',
        marginBottom:10,
    },
    containerBottom: {
        flex: 4,
        backgroundColor: 'transparent',
        marginBottom:5,
    },
    logo: {
        width: '100%',
        height: 222,
        resizeMode: 'contain',
    },
    logo1: {
        width: 100,
        resizeMode: 'contain',
        marginTop: -120,
    },
    instructions: {
        textAlign: 'left',
        color: 'gray',
        marginBottom: 5,
        fontSize: 14,
        marginRight: 10,
        marginLeft: 10,
    },
})