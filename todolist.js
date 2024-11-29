const main = document.getElementsByTagName("main")[0];
let ides=299;
function anadirTarea(){
    let tarea = document.getElementById("tarea").value;
    if (tarea){
        const data = {
            title: tarea,
            completed: false
        };
        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error('Error en el registro');
            };
            return response.json();
        })
        .then(data => {
            console.log('Tarea creada:', data);
            alert('Nueva tarea registrada al final!');
            main.innerHTML += `
                <ul class="contenedor" id="${ides+=1}">
                <li id="tareas" data-id="${ides}">${tarea} </li>
                <input type=checkbox class="completada" id="${ides}"></input>
                <button class="eliminar" id="${ides}"><img id="${ides}" src="images/eliminar.png" alt="eliminar"></button>
                
                </ul>`;
        })
        .catch(error => {
            alert('Hubo un problema con el envío de datos: ' + error.message);
        });
        }else{
            alert("Debe tener contenido la tarea!")
        };
}
function actualizarTarea(id){
    if (!id) {
        alert('ID inválido:', id);
        return
    };
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            completed: true
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .then(data => {
        let contenedor= document.getElementById(`${id}`);
        if (contenedor.getElementsByTagName("input")[0].checked){
            contenedor.style.backgroundColor="#109367";
            
            console.log('Tarea completada!', data);
        }else{
            contenedor.style.backgroundColor="#fff"
        };
    })
    .catch(error => console.error('Error al actualizar la tarea:', error));
    
}
function eliminarTarea(id){
    if (!id) {
        alert('ID inválido:', id);
        return
    };
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
        })
    .then(()=> {
        let contenedor= document.getElementById(`${id}`)
        console.log(contenedor)
        contenedor.remove()
        console.log(`Tarea ${id} eliminada`);
    })
    .catch(error => console.error('Error al eliminar la tarea:', error));
    
}
function mostrarTareas() {
    
    fetch('https://jsonplaceholder.typicode.com/todos')

    .then(response =>{
        if (!response.ok) {
            throw new Error('Error en el registro');
        };
        return response.json();
    })
    .then(data =>{
        
        data.forEach(element => {

            if(element.completed == true){
                main.innerHTML += `
                <ul class="contenedor completada" id="${element.id}" style="background-color: #109367">
                <li id="tareas" data-id="${element.id}">${element.title} </li>
                <input type=checkbox  checked=true id="${element.id} "></input>
                <button class="eliminar" id="${element.id}"><img id="${element.id}" src="images/eliminar.png" alt="eliminar"></button>
                </ul>`;
            }else{
                main.innerHTML +=`
                <ul class="contenedor" id="${element.id}">
                <li id="tareas" id="${element.id}">${element.title} </li>
                <input type=checkbox class="completada" id="${element.id}"></input>
                <button class="eliminar" id="${element.id}"><img id="${element.id}" src="images/eliminar.png" alt="eliminar"></button>
                </ul>`;
            };
        });
    })
    .then( main.addEventListener("click", (event) => { //meti la parte de actualizar/eliminar estado dentro de mostrar tareas porque si lo hago afuera, js no me dejaba
        if (event.target.closest(".eliminar")) {
            const boton2 = event.target.closest(".eliminar");
            const ide = boton2.getAttribute("id");
            eliminarTarea(ide)}
            else{
                if (event.target.closest(".completada")) {
                    const boton = event.target.closest(".completada");
                    const id = boton.getAttribute("id");
                    actualizarTarea(id)};
            };

        }) 
    );
};
setTimeout(mostrarTareas,1000)
const nuevaTarea = document.getElementById("anadir");
nuevaTarea.addEventListener("click",anadirTarea);





