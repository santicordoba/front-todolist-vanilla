const API_URL = "http://localhost:3001/api"

const user = JSON.parse(localStorage.getItem("user")) || null;

const cerrarSession = () => {
    localStorage.removeItem("user")
    window.location.href = "/";
}

const postTask = async () => {
    try{
        const title = document.querySelector("#title").value;
        const description = document.querySelector("#description").value;
        const date = document.querySelector("#date").value;
        const categoryId = document.querySelector('#categoryList option:checked').value
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

const postCategory = async () => {
    try{
        const name = document.querySelector("#categoryname").value;
        const importance = document.querySelector("#importance").value;
        body = {
            "name": name,
            "importance": importance,
            "userId": user.user._id
        }
        const peticion = await fetch(`${API_URL}/categorys/`,{
            method: "POST",
            body: JSON.stringify(body),
            headers: {"Content-type": "application/json", "Authorization": "Bearer " + user.token}
        });
        location.reload();
    } catch(e){
        console.error(e)
    }
};







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

    const app = document.querySelector(".app");
    const logged = `        <div class="user-logged">
    <div class="opciones">
        <button class="addTask">➕ NUEVA TAREA</button>
        <button class="addCategory">➕ NUEVA CATEGORIA</button>
    </div>
    <div class="addTaskForm">
        <h1> Nueva Tarea</h1>
            <input type="text" name="" id="title" placeholder="Titulo">
            <input type="text" name="" id="description" placeholder="Descripción">
            <input type="date" name="" id="date">
            <select name="" id="categoryList">
                <option value="">Selecciona una categoria</option>
            </select>
            <input type="submit" class="button" value="Agregar Nueva Tarea" id="addTask">
    </div>
    <div class="addCategoryForm">
        <h1> Nueva Categoria</h1>
            <input type="text" name="" id="categoryname" placeholder="Nombre de Categoria">
            <input type="number" name="" id="importance" placeholder="Importancia del 1-10">
            <input type="submit" class="button" value="Agregar Nueva Categoria" id="addCategory">
    </div>
    <h1>TareasPendientes</h1>
    <div class="tasks">  
    </div>
</div>`;



    app.innerHTML = logged;

    const optionList = document.querySelector("#categoryList");

    const getCategorys = async () => {
        try{
            const peticion = await fetch(`${API_URL}/categorys/`,{
                method: "GET",
                headers: {"Content-type": "application/json", "Authorization": "Bearer " + user.token}
            }).then(response => response.json()).then((categorys) => {
                categorys.data.forEach((category) => 
                {
                    let elem = document.createElement("option");
                    elem.value = category._id;
                    elem.innerHTML = category.name;
                    optionList.appendChild(elem);
                })
            });
        } catch(e){
            console.error(e)
        }
    }

    getCategorys();


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

    const divTasks = document.querySelector(".tasks");

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
                let elem = document.createElement('div');
                contentDiv = `<h2 class="title">${task.title}</h2>
                            <p class="description"><b>Descripción</b> ${task.description}</p>
                            <p class="date"><b>Fecha</b> ${task.fecha}</p>
                            <p class="category"><b>Categoria</b> ${task.category.name}</p>
                            <div class="contentButtonTasks">
                            <input type="submit" class="buttonTask updateTask" value="Editar" id="${task._id}">
                            <input type="submit" class="buttonTask deleteTask" value="Eliminar" id="${task._id}">
                            </div>`;
                elem.innerHTML = contentDiv;
                elem.classList.add("taskItem")
                divTasks.appendChild(elem);
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

    const addCategory = document.querySelector(".addCategory");
    const addCategoryForm = document.querySelector(".addCategoryForm");

    addCategoryForm.style.display = "none";

    addCategory.addEventListener("click", () => {
        if(addCategoryForm.style.display == "none"){
            addCategoryForm.style.display = "block";
        } else if (addCategoryForm.style.display == "block"){
            addCategoryForm.style.display = "none";
        }  
    })

    const botonAddTask = document.querySelector("#addTask");

    botonAddTask.addEventListener("click", postTask);

    const botonAddCategory = document.querySelector("#addCategory");

    botonAddCategory.addEventListener("click", postCategory);


}