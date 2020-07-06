//variables

const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
//listeners

cargarEventListeners();

function cargarEventListeners() {
    
    //dispara cuando se presiona agregar curso
    
    cursos.addEventListener('click', comprarCurso);

    // cuando se elimina un curso del carrito

    carrito.addEventListener('click', eliminarCurso );

    // al vaciar el carrito

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // al cargar el documento mostrar LS

    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

//funciones

//funcion que añade el curso al carrito
function comprarCurso(e){
    e.preventDefault();
    //delegation para agregar carrito
    if(e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        // enviamos el curso seleccionado para tomar sus datos 
        leerDatosCurso(curso);
    }
}

// lee los datos del curso 
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    
    insertarCarrito(infoCurso);

}

// Muestra el curso seleccionado en el carrito 

function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src = "${curso.imagen}">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
    `;

    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso)
}
// elimina el curso del carrito en el dom 
function eliminarCurso(e){
    e.preventDefault();
    let curso,
        cursoId; 
    if (e.target.classList.contains("borrar-curso")){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement; 
        cursoId = curso.querySelector('a').getAttribute('data-id');
        
    }
    eliminarCursoLocalStorage(cursoId);
    
}

//elimina los cursos del carrito  en el DOM

function vaciarCarrito(){
    // forma lenta 
    //listaCursos.innerHTML = ""  
    // forma rapida (recomendada)
    while (listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    

    // vaciar local storage 
    vaciarLocalStorage();

    return false; 
}

// almacena cursos en el carrito a local storage 

function guardarCursoLocalStorage(curso){

    let cursos; 

    // toma el valor de un arreglo con LS o vacio 
    cursos = obtenerCursosLocalStorage();

    // el curso seleccionado se agrega al arreglo 
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos))
    
}

function obtenerCursosLocalStorage(curso){
    let cursosLS; 

    //comprobamos cursos en Local Storage 
    if(localStorage.getItem('cursos') === null){
        cursosLS = [];
    } else {
        cursosLS = JSON.parse( localStorage.getItem('cursos'));
    }
    return cursosLS;

}

// imprime los cursos de localstorage en el carrito

function leerLocalStorage(){
    let cursosLS;
    cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach(function(curso){
        //construir el template 
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src = "${curso.imagen}">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
                </td>
        `;
    
        listaCursos.appendChild(row);
    })

}

//eliminar el curso por el ID en LocalStorage 

function eliminarCursoLocalStorage(curso){
    console.log(curso);
    let cursosLS;
    //obtenemos el arreglo de los cursos 
    cursosLS = obtenerCursosLocalStorage();
    // iteramos comparando  el ID del curso con los de LS 
    cursosLS.forEach(function(cursoLS, index){
        if(cursoLS.id === curso){
            cursosLS.splice(index, 1);
        }
    });
    // Añadimos el arreglo virtual a LS 
    localStorage.setItem('cursos',  JSON.stringify(cursosLS));
}

// elimina todos los cursos de Local Storage

function vaciarLocalStorage(){
    localStorage.clear();
}