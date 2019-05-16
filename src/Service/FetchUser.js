export const getUserInfo = (name,pass) => {
    let username = name.toLowerCase().trim();
    console.log("User="+username+"  Pass ="+pass);
    const URL = `http://10.200.202.174:81/GetContactAccess?EMailAddress1=${username}&bm_sifre=${pass}`;
    return  fetch(URL,{method: 'GET'})
            .then((res) => res.json())
           // .then((data) => {console.log("Data=>"+ data)});


              



}