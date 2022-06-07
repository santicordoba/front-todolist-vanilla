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

const getCategorys = async (optionList) => {
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

const deleteTask = async (id) => {
    try{
        const peticion = await fetch(`${API_URL}/tasks/${id}`,{
            method: "DELETE",
            headers: {"Content-type": "application/json", "Authorization": "Bearer " + user.token}
        });
        location.reload();
    }catch(e){
        console.error(e)
    }
};

const getCategorysList = async (listaCategorias) => {
    try{
        const peticion = await fetch(`${API_URL}/categorys/`,{
            method: "GET",
            headers: {"Content-type": "application/json", "Authorization": "Bearer " + user.token}
        })
        const categorys = await peticion.json();
        categorys.data.forEach(category => {
            listaCategorias.innerHTML += `<input type="text" value="${category.name}" id="nameEdit"> 
            <input type="text" value="${category.importance}" id="importanceEdit"> 
            <button type="submit" onclick="deleteCategory('${category._id}')">Delete</button> 
            <button type="submit" onclick="editCategory('${category._id}')">Edit</button>`;
        });
    }
    catch(e){
        console.error(e)
    }
 }

 const deleteCategory = async (id) => {
     try{
         const peticion = await fetch(`${API_URL}/categorys/${id}`,{
             method: "DELETE",
             headers: {"Content-type": "application/json", "Authorization": "Bearer " + user.token}
         });
            location.reload();
     }catch(e){
         console.log(e);
     }
 }

 const editCategory = async (id) => {
        try{
            const name = document.querySelector("#nameEdit").value;
            const importance = document.querySelector("#importanceEdit").value;
            body = {
                "name": name,
                "importance": importance,
            }
            const peticion = await fetch(`${API_URL}/categorys/${id}`,{
                method: "PUT",
                body: JSON.stringify(body),
                headers: {"Content-type": "application/json", "Authorization": "Bearer " + user.token}
            });
            location.reload();
        }catch(e){
            console.log(e);
        }
 }


 const mostrarForm = (id) => {
    const updateTaskForm = document.querySelector(".id_"+id);

    if(updateTaskForm.style.display == "none"){
        updateTaskForm.style.display = "block";
    } else {
        updateTaskForm.style.display = "none";
    }
}

const getCategorysAndCheck = async (optionList, categorySelect) => {
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
                if(category.name == categorySelect){
                    elem.setAttribute("selected", "selected");
                }
                optionList.appendChild(elem);
            })
        });
    } catch(e){
        console.error(e)
    }
}

const getCategorysEdit = async (id, category) => {
    console.log(category);
    optionList = document.querySelector("#id_"+id);
    getCategorysAndCheck(optionList,category);
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

    const app = document.querySelector(".app");
    const logged = `        <div class="user-logged">
    <div class="opciones">
        <button class="addTask">➕ NUEVA TAREA</button>
        <button class="menuCategoria">VER CATEGORIAS</button>
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
        <div class="listaCategorias"></div>
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


    getCategorys(optionList);

    const listaCategorias = document.querySelector(".listaCategorias");

    getCategorysList(listaCategorias);


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
                            <button type="submit" class="deleteTask buttonTask" onclick='mostrarForm("${task._id}")'>Editar</button>
                            <button type="submit" class="deleteTask buttonTask" onclick='deleteTask("${task._id}")'>Eliminar</button>
                            </div>
                            <div class="updateTaskForm id_${task._id}" style="display:none;">
                            <h1> Editar Tarea</h1>
                            <p>Titulo</p>
                            <input type="text" name="" id="title" value='${task.title}'>
                            <p>Descripción</p>
                            <input type="text" name="" id="description" value='${task.description}'>
                            <p>Categoria</p>
                            <select name="" id="id_${task._id}">
                            <option value="">Presiona el boton para cargar las categorias</option>
                            </select><br><br>
                            <button class="buttonTask" onclick='getCategorysEdit("${task._id}","${task.category.name}")'>Cargar Categorias</button>
                            <br>
                            <input type="date" name="" id="date" value='${task.fecha}'>
                            <button type="submit" class="deleteTask buttonTask" onclick='updateTask("${task._id}")'>Guardar Cambios</button>
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

    const menuCategoria = document.querySelector(".menuCategoria");
    const addCategoryForm = document.querySelector(".addCategoryForm");

    addCategoryForm.style.display = "none";

    menuCategoria.addEventListener("click", () => {
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