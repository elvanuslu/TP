import { AsyncStorage, NetInfo } from 'react-native';
const define_api_url = "http://85.105.103.4:8096/";
//const define_api_url = "http://213.194.120.55:8082/";
//const define_api_url = "http://10.200.202.174:81/";

export const isAvailable = () => {
  const timeout = new Promise((resolve, reject) => {
    setTimeout(reject, 3000, 'Request timed out');
  });
  const request = fetch('http://85.105.103.4');
  return Promise
    .race([timeout, request])
    .then(response => '')
    .catch(error => {
      alert('Bağlantı Hatası...')
      return false;
    });
}

export const checkConnection = () => {
  NetInfo.isConnected.fetch().done((isConnected) => {
    if (isConnected == true) {
      console.log('connection = True');
      return true;
      //this.setState({ connection_Status: "Online" })
    }
    else {
      console.log('Connection = False');
      return false;
      //this.setState({ connection_Status: "Offline" })
    }
  });
}

export const getIstasyonWithLatLon = (lat, lon, sayac) => {
  /* console.log('lat: '+lat); 
   console.log('lon: '+lon); 
   console.log('Sayaç: '+sayac); 
   */
  try {
    const URL = define_api_url + `TP_AccountGeographyList?Latitude=${lat}&Longitude=${lon}&StationNumber=${sayac}`;
    return fetch(URL, { method: 'GET' })
      .then((res) => res.json())
  } catch (error) {

  }
}
export const getUserInfo = (name, pass) => {
  let username = name.toLowerCase().trim();
  //   console.log("User="+username+"  Pass ="+pass);

  // isAvailable();
  console.log("User=" + username + "  Pass =" + pass);
  const URL = define_api_url + `GetContactAccess?EMailAddress1=${username}&bm_sifre=${pass}`;//`http://85.105.103.4:8096/GetContactAccess?EMailAddress1=${username}&bm_sifre=${pass}`;
  return fetch(URL, { method: 'GET' })
    .then((res) => res.json())
}


export const MusteriKayit = (FirstName, LastName, EMailAddress1, MobilePhone, BMsifre, Bmplaka, BMyakitcinsiid, BMyakitcinsiid2, smsizni, donotemail, kullanicisozlesmeizni) => {
  //console.log('plaka: ' + Bmplaka)
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
        bm_kullanicisozlesmeizni: kullanicisozlesmeizni
      }),
    })
    .then((res) => res.json())


}
export const getContact = (userId) => {
  const URL = define_api_url + `GetContactByContactId?ContactId=${userId}`;
  return fetch(URL, { method: 'GET' })
    .then((res) => res.json())
}
export const musteriGuncelle = (Contact, FirstName, LastName, EMailAddress1, MobilePhone, BMsifre) => {

  //  const URL = `http://85.105.103.4:8096/PutContact`;
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
        bm_kvkizni: true

      }),
    })
    .then((res) => res.json())
}

export const getKampanyaListesi = () => {
  //  const URL = `http://85.105.103.4:8096/TP_CampaignList`;
  const URL = define_api_url + `TP_CampaignList`;
  return fetch(URL, { method: 'GET' })
    .then((res) => res.json())

}
export const getKampanyaDetayList = (Id) => {
  const URL = define_api_url + `GetBm_KampanyaByID?bm_kampanyaId=${Id}`;
  return fetch(URL, { method: 'GET' })
    .then((res) => res.json())
}

export const getPlakaList = (userId) => {
  try {

    const URL = define_api_url + `GetBm_MusteriAracList_ByContactId?contactID=${userId}&isActive=Active`;
    console.log('Url= ' + URL);
    return fetch(URL, { method: 'GET' })
      .then((res) => res.json())
    // .then((ret)=>console.log(ret.son));
    // http://85.105.103.4:8096/GetBm_MusteriAracList_ByContactId?contactID=f9abd025-258c-e911-838d-000c29289d89&isActive=Active
  } catch (error) {
    console.log('getPlaka Hata oluştu', error);
  }
}
export const getSatisPuanGecmisi = async (userId) => {
  try {
    let userID = userId.trim();
    const URL = define_api_url + `TP_MusterininPompaislemleri?contactID=${userId}`;
    return fetch(URL, { method: 'GET' })
      .then((res) => res.json())
  } catch (error) {
    console.log('getSatışPuanGecmisi Hata: ' + error);
  }
}
export const getSatisPuanDetay = async (PompaId) => {
  try {
    const URL = define_api_url + `TP_PompaislemiDetayı?PompaislemiId=${PompaId}`;
    return fetch(URL, { method: 'GET' })
      .then((res) => res.json())
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
export const getDuyuruListByUser = (userId)=>{
   const URL = define_api_url + `TP_MobileNotificationList?mobilIcerikStatus=Duyuru&contactid=${userId}`;
   return fetch(URL, {method:'GET'})
   .then((res)=>res.json())
}
export const getYakitTipi = () => {
  //console.log("getYakitTipi");
  const URL = define_api_url + `GetBm_YakittipiList`;
  return fetch(URL)
    .then((ret) => ret.json())
  //    .then((data) => { console.log("Data=>" + JSON.stringify(data).bm_yakittipiadi) });
}
export const getAracMarkaList =()=>{
  const URL = define_api_url + `GetBm_AracmarkasiList`;
  return fetch(URL,{method: 'GET'})
  .then((res)=>res.json())
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

export const getRequest = async (url) => {

  let api_url = await getStorage("api_url");
  if (api_url == undefined || api_url == "") {
    api_url = define_api_url;
  }
  const ApiUrl = api_url + url;


  let data = await fetch(ApiUrl, {
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