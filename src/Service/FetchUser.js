
export const getUserInfo = (name, pass) => {
  let username = name.toLowerCase().trim();
  //   console.log("User="+username+"  Pass ="+pass);
  const URL = `http://85.105.103.4:8096/GetContactAccess?EMailAddress1=${username}&bm_sifre=${pass}`;
  return fetch(URL, { method: 'GET' })
    .then((res) => res.json())
  // .then((data) => {console.log("Data=>"+ data)});
}

export const getYakitTipi = () => {
  //console.log("getYakitTipi");
  const URL = `http://85.105.103.4:8096/GetBm_YakittipiList`;
  return fetch(URL)
    .then((ret) => ret.json())
  //    .then((data) => { console.log("Data=>" + JSON.stringify(data).bm_yakittipiadi) });
}
export const MusteriKayit = (FirstName, LastName, EMailAddress1, MobilePhone, BMsifre, Bmplaka, BMyakitcinsiid,BMyakitcinsiid2,smsizni,donotemail,kullanicisozlesmeizni) => {
  console.log('plaka: '+Bmplaka)
  const URL = `http://85.105.103.4:8096/PostContact_And_BmMusteriArac`;
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
        donotmail:donotemail,
        bm_kullanicisozlesmeizni: kullanicisozlesmeizni
      }),
    })
    .then((res) => res.json())


}
export const getContact = (userId) => {
  const URL = `http://85.105.103.4:8096/GetContactByContactId?ContactId=${userId}`;
  return fetch(URL, { method: 'GET' })
    .then((res) => res.json())
}
export const musteriGuncelle = (Contact, FirstName, LastName, EMailAddress1, MobilePhone, BMsifre) => {

  //  const URL = `http://85.105.103.4:8096/PutContact`;
  const URL = `http://85.105.103.4:8096/PutContact`;
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
  const URL = `http://85.105.103.4:8096/TP_CampaignList`;
  return fetch(URL, { method: 'GET' })
    .then((res) => res.json())

}
export const getKampanyaDetayList = (Id) => {
  console.log(Id);
  // const URL = `http://85.105.103.4:8096/GetBm_KampanyaByID`;
  const URL = `http://85.105.103.4:8096/GetBm_KampanyaByID?bm_kampanyaId=${Id}`;
  return fetch(URL,{method: 'GET'})
    .then((res) => res.json())
}
