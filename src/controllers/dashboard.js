import {btnLogout} from '../services/logout'
import{validateInputs} from '../services/validations'
import{apiRequest} from '../api/request'
import { showMessage } from '../services/messages';

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
            showMessage('The course already exists','error')
            return;
        }


        formCourse.style.display = 'none';
        await apiRequest('POST', 'events', {name,capacity,});
        alert('Curso creado con éxito');
        formCourse.reset();
        await renderCourses(tbody);
    });

};

//FUNCION AUX PARA MOSTRAR LA TABLA

async function renderCourses(tbody) {
  tbody.innerHTML = '';

  const courses = await apiRequest('GET', 'events');

  courses.forEach(course => {
    const row = document.createElement('tr');

    // Rellenar la fila
    row.innerHTML = `
      <td>${course.id}</td>
      <td>${course.name}</td>
      <td>${course.capacity}</td>
      <td>
        <button class="edit-btn" data-id="${course.id}">Editar</button>
        <button class="delete-btn" data-id="${course.id}">Eliminar</button>
      </td>
    `;

    tbody.appendChild(row);

    // Evento para eliminar el curso
    const deleteBtn = row.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', async () => {
      const confirmDelete = confirm('¿Deseas eliminar este curso?');
      if (!confirmDelete) return;

      try {
        await apiRequest('DELETE', `events/${course.id}`);
        alert('Curso eliminado con éxito');
        await renderCourses(tbody); // Recargar tabla
      } catch (error) {
        alert('Error al eliminar el curso.');
        console.error(error);
      }
    });

    
  });
}
