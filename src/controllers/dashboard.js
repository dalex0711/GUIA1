import {btnLogout} from '../services/logout'
import{validateInputs} from '../services/validations'
import{apiRequest} from '../api/request'

export async function init(){
 
    btnLogout();
   
    const createCourse = document.querySelector('#create-course-btn');
    const formCourse = document.querySelector('#f-create-course');
    const tbody = document.querySelector('#table-body');
    
    await renderCourses(tbody); //Funcion que renderiza la tbla

    //CUANDO SE QUIERA CREAR UN CURSO, HABILITAMOS EL FORMULARIO
    createCourse.addEventListener('click',()=>{
        alert('hola')
        formCourse.style.display = 'block';
    });

    //SE CREA UN NUEVO CURSO
    formCourse?.addEventListener('submit', async (e)=>{
        formCourse.reset();
        e.preventDefault();

        const name = document.querySelector('#nameCourse').value;
        const capacity = document.querySelector('#capacity').value;
        validateInputs(name,capacity);

        if(isNaN(capacity) || capacity <= 0){
            alert('debes ingresar numeros validos')
             return
        };

        //COMPROBAR EXISTENCIA.
        const coursesFound = await apiRequest('GET',`events?=name${name}`);
        if((coursesFound.length) > 0){
            alert('el curso ya existe')
            return;
        }


        formCourse.style.display = 'none';
        await apiRequest('POST', 'events', {name,capacity,});
        alert('Curso creado con éxito');
        await renderCourses(tbody);
    });

};

//FUNCION AUX PARA MOSTRAR LA TABLA

async function renderCourses(tbody) {
    tbody.innerHTML = '';
    const courses = await apiRequest('GET','events');
    courses.forEach(couerse => {
        const  row = document.createElement('tr');
        row.innerHTML = `
            <td> ${couerse.id}</td>
            <td> ${couerse.name}</td>
            <td> ${couerse.capacity}</td>
        `
        tbody.appendChild(row)       
    });

    
};