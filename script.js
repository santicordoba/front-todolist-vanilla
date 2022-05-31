const API_URL = "http://localhost:3001/api"

if(!localStorage.getItem("user")){

    const app = document.querySelector(".app");

    app.innerHTML = `
    <div class="auth">
        <div class="opciones">
            <button class="botonRegistro">REGISTRARSE</button>
            <button class="botonLogin">INICIAR SESION</button>
        </div>
        <div class="registro">
            <h1>Registro</h1>
                <input type="text" name="" id="nickname" placeholder="Nickname">
                <input type="email" name="" id="email" placeholder="Email">
                <input type="password" name="" id="password" placeholder="Password">
                <input type="submit" class="button" value="Registrarse" id="registrarse">
        </div>
        <div class="login">
            <h1>Login</h1>
            <input type="text" name="" id="login_nickname" placeholder="Nickname">
            <input type="password" name="" id="login_password" placeholder="Password">
            <input type="submit" class="button" value="Login" id="logearse">
        </div>
    </div>`;

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
        try{
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
            });
            login.style.display = "block";
            registro.style.display = "none"
        } catch(e){
            console.error(e)
        }
    }
    
    
    const registrarse = document.querySelector("#registrarse");
    registrarse.addEventListener("click", postRegistro)
    
    const postLogearse = async () => {
        try{
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
        
            localStorage.setItem('user', JSON.stringify(data));

            location.reload();
        
        } catch(e){
            console.log(e);
        }
    }
    
    const logearse = document.querySelector("#logearse");
    
    
    logearse.addEventListener("click", postLogearse);
    
} else {
    const div = document.querySelector(".tasks");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user.token)
    const getTasks = async () => {
        const peticion = await fetch(`${API_URL}/tasks/`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': ' Bearer ' + user.token,
            }
        })
        .then((response) => response.json())
        .then((tasks) => {
            tasks.data.forEach((task) => 
            {
                let elem = document.createElement('li');
                elem.appendChild(document.createTextNode(`${task.title}`));
                div.appendChild(elem);
            })
        });
    }
    getTasks()

}



