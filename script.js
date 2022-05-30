const API_URL = "http://localhost:3001/api"

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


const postRegistro = async () => {
    const nickname = document.querySelector("#nickname").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    body = {
        "nickname": nickname,
        "email": email,
        "password": password
    }
    const peticion = await fetch(`${API_URL}/auth/register`,{
        method: "POST",
        body: JSON.stringify(body),
        headers: {"Content-type": "application/json"}
    }).then(res=> res.json())
    .then(res=> console.log(res));
    login.style.display = "block";
    registro.style.display = "none"
}


const registrarse = document.querySelector("#registrarse");

registrarse.addEventListener("click", postRegistro)

const postLogearse = async () => {
    const nickname = document.querySelector("#login_nickname").value;
    const password = document.querySelector("#login_password").value;
    body = {
        "nickname": nickname,
        "password": password
    }
    const peticion = await fetch(`${API_URL}/auth/login`,{
        method: "POST",
        body: JSON.stringify(body),
        headers: {"Content-type": "application/json"}
    }).then(res=> res.json())
    .then(res=> data = res);
    login.style.display = "none";
    registro.style.display = "none"

    if(data.token){
        botonLogin.style.display = "none";
        botonRegistro.style.display = "none"
        const div = document.querySelector(".auth");

        const mensaje= `Hola ${data.user.nickname}`;

        div.innerHTML+= mensaje;
    } 

    return data;
}

const logearse = document.querySelector("#logearse");


logearse.addEventListener("click", postLogearse);


