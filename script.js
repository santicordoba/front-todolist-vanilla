const API_URL = "http://localhost:3001/api"

const cerrarSession = () => {
    localStorage.removeItem("user")
    window.location.href = "/";
}

if(!localStorage.getItem("user")){

    const app = document.querySelector(".app");

    const nav = document.querySelector(".nav");

    nav.innerHTML += `<div class="align"><input type="submit" class="botonRegistro button" value="REGISTRARSE">
    <input type="submit" class="botonLogin button" value="INICIAR SESION"></div>` 

    app.innerHTML = `
    <div class="auth">
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

    const nav = document.querySelector(".nav");
    const close = document.createElement("input");
    const align = document.createElement("div");
    const nickname = document.createElement("p");
    nickname.innerHTML = `Hola, ${JSON.parse(localStorage.getItem("user")).user.nickname}`;
    align.appendChild(nickname);
    close.setAttribute("type", "submit");
    close.setAttribute("value", "Cerrar Sesion");
    close.classList.add("button");
    align.classList.add("align");
    align.appendChild(close);
    nav.appendChild(align);

    close.addEventListener("click", cerrarSession);

    const div = document.querySelector(".tasks");
    const user = JSON.parse(localStorage.getItem("user"));

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

    const addTask = document.querySelector(".addTask");
    const addTaskForm = document.querySelector(".addTaskForm");

    addTaskForm.style.display = "none";

    addTask.addEventListener("click", () => {
        if(addTaskForm.style.display == "none"){
            addTaskForm.style.display = "block";
        } else if (addTaskForm.style.display == "block"){
            addTaskForm.style.display = "none";
        }
    });


    const postTask = async () => {
        try{
            const title = document.querySelector("#title").value;
            const description = document.querySelector("#description").value;
            const date = document.querySelector("#date").value;
            const categoryId = document.querySelector("#categoryId").value;
            body = {
                "title": title,
                "description": description,
                "fecha": date,
                "categoryId": categoryId,
                "userId": user.user._id
            }
            const peticion = await fetch(`${API_URL}/tasks/`,{
                method: "POST",
                body: JSON.stringify(body),
                headers: {"Content-type": "application/json", "Authorization": "Bearer " + user.token}
            });
            location.reload();
        } catch(e){
            console.error(e)
        }
    }

    const botonAddTask = document.querySelector("#addTask");

    botonAddTask.addEventListener("click", postTask);

}



