
import React, { Component } from 'react';
import { Root } from "native-base";


import { createDrawerNavigator, createStackNavigator, createAppContainer } from "react-navigation";

import login from "./src/login/";
import kampanya from "./src/Kampanya/";
import kampanyadetay from "./src/kampanyadetay/";
import yenikayit from "./src/yenikayit/";
import hesabim from "./src/hesabim/";
import SideBar from "./src/sidebar/";
import Duyurular from "./src/duyurular/";
import SifremiUnuttum from "./src/SifremiUnuttum/";
import Satis from "./src/Satis/";
import PlakaEkle from "./src/PlakaEkle/";
import Plakalarim from "./src/Plakalarim/";
import SatisVePuanGecmisi from './src/SatisVePuanGecmisi';
import SatisVePuanDetay from "./src/SatisVePuanDetay/";
import KayitGuncelle from './src/yenikayit/KayitGuncelle';
import DuyuruDetay from './src/duyurular/DuyuruDetay';
import Harita from './src/Harita/Harita';
import EnYakinIstasyon from './src/EnYakinIstasyon';
import Yardim from './src/Yardim';
import KampanyaSec from './src/Satis/Kampanya';
import PlakaDuzenle from './src/PlakaEkle/PlakaDuzenle';
import OzetBilgi from './src/Satis/OzetBilgi';
import Kodec from './src/yenikayit/codec';
import AnaSayfa from './src/AnaSayfa/AnaSayfa';


const Drawer = createDrawerNavigator({
  AnaSayfa:{ screen: AnaSayfa},
  Kodec:{ screen: Kodec},
  login: { screen: login },
  kampanya: { screen: kampanya },
  kampanyadetay: { screen: kampanyadetay },
  yenikayit: { screen: yenikayit },
  hesabim: { screen: hesabim },
  Duyurular: { screen: Duyurular },
  SifremiUnuttum: { screen: SifremiUnuttum },
  PlakaEkle: { screen: PlakaEkle },
  Satis: { screen: Satis },
  Plakalarim: { screen: Plakalarim },
  SatisVePuanGecmisi: { screen: SatisVePuanGecmisi },
  SatisVePuanDetay: { screen: SatisVePuanDetay },
  KayitGuncelle: { screen: KayitGuncelle },
  DuyuruDetay: { screen: DuyuruDetay },
  EnYakinIstasyon: { screen: EnYakinIstasyon },
  Harita: { screen: Harita },
  Yardim:{ screen: Yardim},
  KampanyaSec: { screen: KampanyaSec},
  PlakaDuzenle: { screen: PlakaDuzenle},
  OzetBilgi :{ screen: OzetBilgi},
},
  {
    initialRouteName: "login",
    contentComponent: props => <SideBar {...props} />
  })

const AppNavigator = createStackNavigator({
  Drawer: { screen: Drawer },
  login: { screen: login },
  kampanya: { screen: kampanya },
  kampanyadetay: { screen: kampanyadetay },
  yenikayit: { screen: yenikayit },
  hesabim: { screen: hesabim },
  Duyurular: { screen: Duyurular },
  SifremiUnuttum: { screen: SifremiUnuttum },
  PlakaEkle: { screen: PlakaEkle },
  Satis: { screen: Satis },
  Plakalarim: { screen: Plakalarim },
  SatisVePuanGecmisi: { screen: SatisVePuanGecmisi },
  SatisVePuanDetay: { screen: SatisVePuanDetay },
  KayitGuncelle: { screen: KayitGuncelle },
  DuyuruDetay: { screen: DuyuruDetay },
  Harita: { screen: Harita },
  EnYakinIstasyon: { screen: EnYakinIstasyon },
  Yardim: { screen : Yardim},
  KampanyaSec:{ screen: KampanyaSec},
  PlakaDuzenle: { screen: PlakaDuzenle},
  OzetBilgi: { screen: OzetBilgi},
},
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  });
const AppContainer = createAppContainer(AppNavigator);
console.disableYellowBox = true;
export default () =>
  <Root>
    <AppContainer />
  </Root>;