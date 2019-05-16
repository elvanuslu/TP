
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

const Drawer = createDrawerNavigator({
   login: {screen: login},
   kampanya: {screen: kampanya},
   kampanyadetay:{ screen : kampanyadetay},
   yenikayit:{screen : yenikayit},
   hesabim : { screen:hesabim},
   Duyurular: {screen: Duyurular},
   SifremiUnuttum: { screen: SifremiUnuttum},
   PlakaEkle: { screen: PlakaEkle},
   Satis :{ screen: Satis},
   Plakalarim :{ screen: Plakalarim},
   SatisVePuanGecmisi: { screen: SatisVePuanGecmisi},
   SatisVePuanDetay:{screen: SatisVePuanDetay},
},
{
  initialRouteName: "login",
  contentComponent: props => <SideBar {...props} />
})

const AppNavigator = createStackNavigator({
  Drawer :{ screen:Drawer},
  login : { screen:login},
  kampanya: {screen: kampanya},
  kampanyadetay: {screen: kampanyadetay},
  yenikayit:{ screen: yenikayit},
  hesabim :{ screen: hesabim},
  Duyurular: {screen: Duyurular},
  SifremiUnuttum: { screen: SifremiUnuttum},
  PlakaEkle: { screen: PlakaEkle},
  Satis :{ screen: Satis},
  Plakalarim: { screen: Plakalarim},
  SatisVePuanGecmisi: { screen: SatisVePuanGecmisi},
  SatisVePuanDetay:{ screen: SatisVePuanDetay},
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