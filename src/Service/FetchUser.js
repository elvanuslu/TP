import { Alert, Platform, AsyncStorage, NetInfo, PermissionsAndroid, ToastAndroid } from 'react-native';


import Geolocation from 'react-native-geolocation-service';

//const define_api_url = "http://85.105.103.4:8096/";
//const define_api_url = "http//213.194.120.55:8082/";
//const define_api_url = "http://mobil.tppd.com.tr/";
var define_api_url = "https://mobil.tppd.com.tr/";
Platform.OS === 'ios' ? define_api_url = "https://mobil.tppd.com.tr/" : define_api_url = "http://mobil.tppd.com.tr/";
let isConnect = false;


export const checkConnection = async () => {
  console.log('connection check' + new Date());
  await NetInfo.isConnected.fetch().done((isConnected) => {
    if (isConnected == true) {
      console.log('connection a = True');
      return true;
      //this.setState({ connection_Status: "Online" })
    }
    else {
      this.setState({ loading: false }, () => {
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
      });
      return false;
      //this.setState({ connection_Status: "Offline" })
    }
  });
}
export const getHaritaIstasyonWithLatLon =(lat,lon, sayac)=>{
  try {
    const URL = define_api_url + `TP_HaritaAccountGeographyList?Latitude=${lat}&Longitude=${lon}&StationNumber=${sayac}`;
    return getRequest(URL);
  } catch (error) {
    
  }
}
export const getIstasyonWithLatLon1 = (lat, lon, sayac) => {
  /*
    console.log('lat: '+lat); 
     console.log('lon: '+lon); 
     console.log('Sayaç: '+sayac); 
     */
  try {
    const URL = define_api_url + `TP_AccountGeographyList?Latitude=${lat}&Longitude=${lon}&StationNumber=${sayac}`;
    return getRequest(URL);
    //  return fetch(URL, { method: 'GET' })
    //    .then((res) => res.json())
  } catch (error) {

  }
}
export const getIstasyonWithLatLon = (lat, lon, sayac) => {
  /*
    console.log('lat: '+lat); 
     console.log('lon: '+lon); 
     console.log('Sayaç: '+sayac); 
     */
  try {
    const URL = define_api_url + `TP_HaritaAccountGeographyList?Latitude=${lat}&Longitude=${lon}&StationNumber=${sayac}`;
    return getRequest(URL);
    //  return fetch(URL, { method: 'GET' })
    //    .then((res) => res.json())
  } catch (error) {

  }
}
export const getUserInfo = (name, pass) => {
  let username = name.toLowerCase().trim();
  //   console.log("User="+username+"  Pass ="+pass);

  // isAvailable();
  // console.log("User=" + username + "  Pass =" + pass);
  const URL = define_api_url + `GetContactAccess?EMailAddress1=${username}&bm_sifre=${pass}`;
  return getRequest(URL);
  // return fetch(URL, { method: 'GET' })
  //   .then((res) => res.json())
}

export const campaignDetailList = (istasyonid, yakittipiid, gecerliodemetipi, tutarTL, contactId, kampanyakuponuId, plaka) => {
  try {

    console.log('istasyonid ' + istasyonid)
    console.log('yakittipiid ' + yakittipiid)
    console.log('gecerliodemetipi ' + gecerliodemetipi)
    console.log('tutarTL ' + tutarTL)
    console.log('contactId ' + contactId)

    console.log('kampanyakuponuId' + kampanyakuponuId)

    console.log('plaka ' + plaka)

    const URL = define_api_url + `TP_CampaignDetailList`;
    return fetch(URL,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bm_istasyonid: istasyonid,
          bm_yakittipiid: yakittipiid,
          bm_gecerliodemetipi: gecerliodemetipi,
          TutarTL: tutarTL,
          ContactId: contactId,
          bm_kampanyakuponuId: kampanyakuponuId,
          Plaka: plaka,
        }),
      })
      .then((res) => res.json())
  } catch (error) {
    console.log(error);
  }
}
export const SatisBaslat = (IstasyonId, ContactId, KampanyaId, PompaNo, Plaka, UrunId, PresetTutari, OdemeSatisTipi, KuponKodu, TavsiyeEdilenfiyati,
  istasyonfiyati, indirimlifiyati, alimtutari, alinmmiktariLT, indirimorani, KazanilanPuan, harcananpuan, kazanilanpuantl, harcananpuantl
  , katkiOrani, bayikatkiorani, isortagikatkiorani, isortagiid) => {
  try {
    console.log('**********************************************')
    console.log('IstasyonId ' + IstasyonId);
    console.log('ContactId ' + ContactId);
    console.log('KampanyaId ' + KampanyaId);
    console.log('PompaNo ' + PompaNo);
    console.log('Plaka ' + Plaka);
    console.log('UrunId ' + UrunId);
    console.log('PresetTutari ' + alimtutari);
    console.log('OdemeSatisTipi ' + OdemeSatisTipi);
    console.log('KuponKodu ' + KuponKodu);
    console.log('TavsiyeEdilenfiyati ' + TavsiyeEdilenfiyati);
    console.log('istasyonfiyati ' + istasyonfiyati);
    console.log('indirimlifiyati ' + indirimlifiyati);
    console.log('alimtutari ' + alimtutari);
    console.log('alinmmiktariLT ' + alinmmiktariLT);
    console.log('indirimorani ' + indirimorani);
    console.log('KazanilanPuan ' + KazanilanPuan);
    console.log('harcananpuan ' + harcananpuan);
    console.log('kazanilanpuantl ' + kazanilanpuantl);
    console.log('harcananpuantl ' + harcananpuantl);
    console.log('katkiOrani ' + katkiOrani);
    console.log('bayikatkiorani ' + bayikatkiorani);
    console.log('isortagikatkiorani ' + isortagikatkiorani);
    console.log('isortagiid ' + isortagiid);
    console.log('**********************************************')
    const URL = define_api_url + `TP_SalesStart`;
    return fetch(URL,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          IstasyonId: IstasyonId,
          ContactId: ContactId,
          KampanyaId: KampanyaId,
          PompaNo: PompaNo,
          Plaka: Plaka,
          UrunId: UrunId,
          PresetTutari: alimtutari,
          OdemeSatisTipi: OdemeSatisTipi,
          KuponKodu: KuponKodu,
          TavsiyeEdilenfiyati: TavsiyeEdilenfiyati,
          istasyonfiyati: istasyonfiyati,
          indirimlifiyati: indirimlifiyati,
          alimtutari: alimtutari,
          alinmmiktariLT: alinmmiktariLT,
          indirimorani: indirimorani,
          KazanilanPuan: KazanilanPuan,
          harcananpuan: harcananpuan,
          kazanilanpuantl: kazanilanpuantl,
          harcananpuantl: harcananpuantl,
          katkiorani: katkiOrani,
          bayikatkiorani: bayikatkiorani,
          isortagikatkiorani: isortagikatkiorani,
          isortagiid: isortagiid,
        })
      })
      .then((res) => res.json())
  } catch (error) {

  }
}

export const checkActivation = (contactId, activationContent) => {
  // console.log('ContactId= ' + contactId);
  // console.log('ActivationContent= ' + activationContent);

  try {
    const URL = define_api_url + `CheckActivation`;
    console.log('URL= ' + URL);
    return fetch(URL,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ContactId: contactId,
          ActivationContent: activationContent,
        }),
      })
      .then((res) => res.json())
  } catch (error) {
    console.log(error);
  }
}
export const MusteriKayit = (FirstName, LastName, EMailAddress1, MobilePhone, BMsifre, Bmplaka, BMyakitcinsiid, BMyakitcinsiid2, 
  smsizni, donotemail, kullanicisozlesmeizni, mobilkod, mobilisletimsisopt,arac) => {
   console.log('FirstName: ' + FirstName)
   console.log('LastName: ' + LastName)
   console.log('EMailAddress1: ' + EMailAddress1)
   console.log('MobilePhone: ' + MobilePhone)
   console.log('BMsifre: ' + BMsifre)
   console.log('Bmplaka: ' + Bmplaka)
   console.log('BMyakitcinsiid: ' + BMyakitcinsiid)
   console.log('BMyakitcinsiid2: ' + BMyakitcinsiid2)
   console.log('smsizni: ' + smsizni)
   console.log('donotemail: ' + donotemail)
   console.log('kullanicisozlesmeizni: ' + kullanicisozlesmeizni)
   console.log('mobilkod: ' + mobilkod)
   console.log('mobilisletimsisopt: ' + mobilisletimsisopt)
   console.log('Araç Tip: '+arac);
  const URL = define_api_url + `PostContact_And_BmMusteriArac`;
  return fetch(URL,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: FirstName,
        lastName: LastName,
        eMailAddress1: EMailAddress1,
        mobilePhone: MobilePhone,
        bm_sifre: BMsifre,
        bm_plaka: Bmplaka,
        bm_yakitcinsiid_1: BMyakitcinsiid,
        bm_yakitcinsiid_2: BMyakitcinsiid2,
        bm_smsizni: smsizni,
        donotmail: donotemail,
        bm_kullanicisozlesmeizni: kullanicisozlesmeizni,
        bm_mobilkod: mobilkod,
        bm_mobilisletimsisopt: mobilisletimsisopt,
        bm_kullanimsekliopt:arac,
      }),
    })
    .then((res) => res.json())


}
export const getCitybyLocationNew = () => {
  try {

    const URL = define_api_url + `GetCityListFromAccount`;

    return fetch(URL, { method: 'GET' })
      .then((res) => res.json())
      .catch(e => {
        console.log('CitybyLocation: ' + e)
      })

  } catch (error) {
    console.log('Error: ' + error);
  }
}
//Plaka Yakıtı Doldurmuyor....
export const getCitybyLocation = () => {
  try {

    const URL = define_api_url + `GetHaritaCityListFromAccount`;

    return fetch(URL, { method: 'GET' })
      .then((res) => res.json())
      .catch(e => {
        console.log('CitybyLocation: ' + e)
      })

  } catch (error) {
    console.log('Error: ' + error);
  }
}

export const getCitylocationbyIdSatis = (Id) => {
  const URL = define_api_url + `GetCountiesByCityIdFromAccount?cityId=${Id}`;
  return getRequest(URL);
}
export const getCitylocationbyId = (Id) => {
  const URL = define_api_url + `GetHaritaCountiesByCityIdFromAccount?cityId=${Id}`;
  return getRequest(URL);
}
export const getCityList = () => {
  const URL = define_api_url + `GetCityList`;
  return getRequest(URL);
}

export const getCitybyId = (Id) => {
  const URL = define_api_url + `GetCountyByCityId?cityId=${Id}`;
  return fetch(URL, { method: 'GET' })
    .then((res) => res.json())
}
export const musteriGuncelle = (Contact, FirstName, LastName, EMailAddress1, MobilePhone, BMsifre, mobilKod, Adres, Dogum, Sehir, Ilce, MedeniDurum, Cinsiyet) => {
  console.log('Contact: ' + Contact);
  console.log('FirstName: ' + FirstName);
  console.log('LastName: ' + LastName);
  console.log('EMailAddress1: ' + EMailAddress1);
  console.log('MobilePhone: ' + MobilePhone);
  console.log('BMsifre: ' + BMsifre);

  console.log('mobilkod: ' + mobilKod);
  console.log('Adres: ' + Adres);
  console.log('Dogum: ' + Dogum);
  console.log('Sehir: ' + Sehir);
  console.log('Ilce: ' + Ilce);
  console.log('MedeniDurum: ' + MedeniDurum);
  console.log('Cinsiyet: ' + Cinsiyet);

  const URL = define_api_url + `PutContact`;
  return fetch(URL,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contactId: Contact,
        firstName: FirstName,
        lastName: LastName,
        eMailAddress1: EMailAddress1,
        mobilePhone: MobilePhone,
        bm_sifre: BMsifre,
        bm_kvkizni: true,
        bm_mobilkod: mobilKod,
        address1_line1: Adres,
        birthdate: Dogum,
        familystatuscode: MedeniDurum,
        bm_sehirid: Sehir,
        bm_ilceid: Ilce,
        gendercode: Cinsiyet,

      }),
    })
    .then((res) => res.json())
}

export const getKampanyaListesi = () => {
  //  const URL = `http://85.105.103.4:8096/TP_CampaignList`;
  const URL = define_api_url + `TP_CampaignList`;
  return getRequest(URL);
  //  return fetch(URL, { method: 'GET' })
  //    .then((res) => res.json())

}
export const getKampanyaDetayList = (Id) => {
  const URL = define_api_url + `GetBm_KampanyaByID?bm_kampanyaId=${Id}`;
  return getRequest(URL);
  // return fetch(URL, { method: 'GET' })
  //   .then((res) => res.json())
}



export const getPaymentTypes = () => {
  try {
    console.log('GetPaymentTypes 1 ');

    const URL = define_api_url + `GetPaymentTypes`;
    return getRequest(URL);
    //   return fetch(URL, { method: 'GET' })
    //     .then((res) => res.json())
    //     .catch(e => {
    //       console.log('getPaymentTypes Hata: ' + e)
    //     })

  } catch (error) {
    console.log('GetPaymentTypes Hata: ' + error);
  }

  console.log('GetPaymentTypes End ');
}
export const getSatisPuanGecmisi = async (userId) => {
  try {
    let userID = userId.trim();
    const URL = define_api_url + `TP_MusterininPompaislemleri?contactID=${userId}`;
    return getRequest(URL);
    // return fetch(URL, { method: 'GET' })
    //   .then((res) => res.json())
  } catch (error) {
    console.log('getSatışPuanGecmisi Hata: ' + error);
  }
}
export const getSatisPuanDetay = async (PompaId) => {
  try {
    const URL = define_api_url + `TP_PompaislemiDetayı?PompaislemiId=${PompaId}`;
    return getRequest(URL);
    //return fetch(URL, { method: 'GET' })
    //  .then((res) => res.json())
  } catch (error) {
    console.log('getSatışPuanDetay: ' + error);
  }
}
export const postSatisPuanGecmisi = async (userId) => {
  try {
    let userID = userId.trim();
    const URL = define_api_url + `TP_MusterininPompaislemleri`;
    return fetch(URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ContactId: userID,
      }),
    })
  } catch (error) {
    console.log('postSatışPuanGeçmişi: ' + error);
  }
}
export const getCardById = (Id) => {
  try {
    const URL = define_api_url + `GetBm_Kart_ByContactId?ContactId=${Id}`;
    return getRequest(URL);
    //  return fetch(URL, { method: 'GET' })
    //    .then((res) => res.json())
  } catch (error) {
    console.log('getCardById= ' + error);
  }
}
export const putMusteriAraci = async (contactId, plaka, yakit1, yakit2, marka, kartId,kullanimSekli) => {
  try {
    console.log('contactId' + contactId)
    console.log('plaka' + plaka)
    console.log('yakit1' + yakit1)
    console.log('yakit2' + yakit2)
    console.log('marka' + marka)
    console.log('Kullanım Şekli' + kullanimSekli)

    const URL = define_api_url + `PutBm_MusteriAraci`;
    return fetch(URL,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bm_aracmarkaid: marka,
          bm_yakitcinsiid_1: yakit1,
          bm_yakitcinsiid_2: yakit2,
          bm_plaka: plaka,
          bm_aracmodel: '',
          bm_musterikartiid: kartId,
          contactId: contactId,
          bm_kullanimsekliopt: kullanimSekli,
        }),
      })
      .then((res) => res.json())
      .catch((error) => console.log('putMusteriArac: ' + error))

  } catch (error) {
    console.log('putMusteriArac: ' + error);
  }
}
export const postMusteriArac = async (contactId, plaka, yakit1, yakit2, marka,aracTip) => {
  console.log('contactId' + contactId)
  console.log('plaka ' + plaka)
  console.log('yakit1 ' + yakit1)
  console.log('yakit2 ' + yakit2)
  console.log('marka ' + marka)
  console.log('Araç Tipi: '+ aracTip);

  try {
    const URL = define_api_url + `PostBm_MusteriArac`;
    return fetch(URL,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bm_aracmarkaid: marka,
          bm_yakitcinsiid_1: yakit1,
          bm_yakitcinsiid_2: yakit2,
          bm_plaka: plaka,
          bm_aracmodel: '',
          bm_kullanimsekliopt:aracTip,
          contactId: contactId,
        }),
      })
      .then((res) => res.json())
      .catch((error) => console.log('postMusteriArac: ' + error))

  } catch (error) {
    console.log('postMusteriArac: ' + error);
  }
}
export const deleteMusteriArac = async (Id) => {
  console.log('Delete d: ' + Id)
  try {
    const URL = define_api_url + `DeleteBm_MusteriAraci`;
    return fetch(URL,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bm_musteriaraciId: Id,
        }),
      })
      .then((res) => res.json())
      .catch((error) => console.log('deleteMusteriArac: ' + error))

  } catch (error) {
    console.log('postMusteriArac: ' + error);
  }
}
export const SendPasswordByEmailAfterChangedPsw = async (eposta) => {
  try {
    const URL = define_api_url + `SendPasswordByEmailAfterChangedPsw`;
    return fetch(URL,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eMailAddress1: eposta,
        }),
      })
      .then((res) => res.json())
      .catch((error) => console.log('Fetch SendPasswordByEmailAfterChangedPsw: ' + error))

  } catch (error) {
    console.log('SendPasswordByEmailAfterChangedPsw: ' + error);
  }
}

export const getIstasyonByCityId = (city, num) => {
  const URL = define_api_url + `TP_HaritaAccountGeographyList2?bm_ilceId=${city}&StationNumber=${num}`;
  return getRequest(URL);
}
export const getDuyuruListByUser = (userId) => {
  const URL = define_api_url + `TP_MobileNotificationList?mobilIcerikStatus=1&contactid=${userId}`;
  return getRequest(URL);
}
export const getSSS = (durum) => {
  const URL = define_api_url + `TP_MobileNotificationList?mobilIcerikStatus=${durum}`;
  return getRequest(URL);
}
export const getAracYakitTipi = (plaka) => {
  //console.log("getYakitTipi");
  const URL = define_api_url + `GetBm_MusteriArac?bm_musteriaraciId=${plaka}`;
  return getRequest(URL);
}
export const getAracTipleri =() =>{
  const URL = define_api_url + `GetAracTipi`;
  return getRequest(URL);
}
export const getYakitTipi = () => {
  //console.log("getYakitTipi");
  const URL = define_api_url + `GetBm_YakittipiList`;
  return getRequest(URL);
  /*return fetch(URL)
    .then((ret) => ret.json())
  //    .then((data) => { console.log("Data=>" + JSON.stringify(data).bm_yakittipiadi) });
  */
}
export const getAracMarkaList = () => {
  const URL = define_api_url + `GetBm_AracmarkasiList`;
  return getRequest(URL);
  /*return fetch(URL, { method: 'GET' })
    .then((res) => res.json())
    */
}
export const getStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value; // JSON.parse(value);
    } else {
      return '';
    }
  } catch (error) {
    console.log('Hata oluştu', error);
  }
};

export const setStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value + '');
  } catch (error) {
    console.log('Hata oluştu', error);
  }
};
export const getPlakaList = (userId) => {
  try {

    const URL = define_api_url + `GetBm_MusteriAracList_ByContactId?contactID=${userId}&isActive=Active`;
    return getRequest(URL);
    /* return fetch(URL, { method: 'GET' })
       .then((res) => res.json())
       */
  } catch (error) {
    console.log('getPlaka Hata oluştu', error);
  }
}
export const getContact = (userId) => {
  const URL = define_api_url + `GetContactByContactId?ContactId=${userId}`;
  return getRequest(URL);
  /* return fetch(URL, { method: 'GET' })
     .then((res) => res.json())
     */
}

export const internetConnection = async () => {
  NetInfo.isConnected.fetch().then(() => {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected == true) {
        isConnect = true;
        console.log('connection i = True' + new Date());
        return true;
        //this.setState({ connection_Status: "Online" })
      }
      else {
        console.log('Connection = False');
        return false;
        //this.setState({ connection_Status: "Offline" })
      }
    });
  });
}

//getRequest get Method
export const getRequest = async (url) => {

  let api_url = url;
  console.log('APi URL:' + api_url);
  //---------------------------------------
  let data = await fetch(api_url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 5000
  })
    .then(resp => resp.json())
    .catch(e => {
      this.setState({ loading: false }, () => {
        setTimeout(() => {
          Alert.alert(
            'Bağlantı Hatası!',
            'İnternet Bağlantınızı Kontrol Edin' + e,
            [

              { text: 'Tamam', onPress: () => { this.setState({ loading: false }) } },
            ],
            { cancelable: true },
          );
        }, 510);
      });
    })
  return data;

  //---------------------------------------
}
export const dataGet = async () => {
  let data = await fetch(api_url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(resp => resp.json());
  return data;
}
export const postRequest = async (body, url) => {

  let api_url = await getStorage("api_url");
  if (api_url == undefined || api_url == "") {
    api_url = define_api_url;
  }
  const ApiUrl = api_url + url;

  //console.log(body,ApiUrl);
  let data = await fetch(ApiUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(resp => resp.json());

  if (data.success === undefined) {
    data.success = false;
    data.errors = "Hatalı api url";
    data.data = [];
  }
  return data;

}

export const _handleConnectivityChange = (isConnected) => {

  if (isConnected == true) {
    return true;
  }
  else {
    return false
  }
};



hasLocationPermission = async () => {
  if (Platform.OS === 'ios' ||
    (Platform.OS === 'android' && Platform.Version < 23)) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  if (hasPermission) return true;

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    Toast.show('Location permission denied by user.', ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    Toast.show('Location permission revoked by user.', ToastAndroid.LONG);
  }

  return false;
}
/*
   Gps Lokasyon Bilgilerini Alıyoruz...
*/
export const fetchgetLocation = async () => {
  try {
    const hasLocationPermission = await this.hasLocationPermission();
    //  if (!hasLocationPermission) return;
    if (!hasLocationPermission) {
      Alert.alert(
        'Konum İzni Gerekiyor',
        'Cihazınızdan Türkiye Petrolleri uygulaması için konum izni vermelisiniz.',
        [

          {
            text: 'Tamam', onPress: () => {
              this.setState({
                loading: false,
                baglanti: false,
              })
              this.props.navigation.navigate("hesabim")
            }
          },
        ],
        { cancelable: true },
      )
      return
    }
    Geolocation.getCurrentPosition(
      (position) => {
        return position;
        console.log('Fetch Konum: ' + JSON.stringify(position));
      },
      (error) => {
        return null;
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 50000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true }
    );
  } catch (error) {

  }
}