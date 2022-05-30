const registro = document.querySelector(".registro");
const login = document.querySelector(".login");

registro.style.display = "none";
login.style.display = "none";

const botonRegistro = document.querySelector(".botonRegistro");
const botonLogin = document.querySelector(".botonLogin");

botonLogin.addEventListener("click", ()=>{
    if(login.style.display == "none"){
        login.style.display = "block";
        registro.style.display = "none"
    } else if (login.style.display == "block"){
        login.style.display = "none";
    }
})

botonRegistro.addEventListener("click", ()=>{
    if(registro.style.display == "none"){
        registro.style.display = "block";
        login.style.display = "none";
    } else if (registro.style.display == "block"){
        registro.style.display = "none";
    }
})



const registrarse = document.querySelector("#registrarse");

registrarse.addEventListener("click", (e)=> {
    const nickname = document.querySelector("#nickname").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;


    // const xhr = new XMLHttpRequest();
    // function onRequestHandler(){
    //     if(this.readyState == 4 && this.status == 200){
    //         const respuesta = this.response;
    //         console.log(respuesta);
    //     }
    // }
    
    // xhr.addEventListener("load", onRequestHandler);
    // xhr.open("POST", `${API_URL}/auth/register`);
    // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // xhr.send(JSON.stringify(register_json));
    // console.log(xhr.response);

    body = {
        "nickname": nickname,
        "email": email,
        "password": password
    }

    const API_URL = "http://localhost:3001/api"

    const peticion = fetch(`${API_URL}/auth/register`,{
        method: "POST",
        body: JSON.stringify(body),
        headers: {"Content-type": "application/json"}
    }).then(res=> res.json())
    .then(res=> console.log(res));

    login.style.display = "block";
    registro.style.display = "none"
    

})

const logearse = document.querySelector("#logearse");

logearse.addEventListener("click", async (e) => {
    e.preventDefault;
    const nickname = document.querySelector("#login_nickname").value;
    const password = document.querySelector("#login_password").value;
    body = {
        "nickname": nickname,
        "password": password
    }


    const API_URL = "http://localhost:3001/api"


    const delay = ms => new Promise(res => setTimeout(res, ms));
    let data;
    const peticion = fetch(`${API_URL}/auth/login`,{
        method: "POST",
        body: JSON.stringify(body),
        headers: {"Content-type": "application/json"}
    }).then(res=> res.json())
    .then(res=> data = res);
    await delay(300)
    console.log(data);

    login.style.display = "none";
    registro.style.display = "none"
})