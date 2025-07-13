import {emailExists, validateInputs,validatePassword, hashPass} from '../services/validations.js';
import {apiRequest} from '../api/request';
import{navegation} from '../router.js'


export  function init(){
    const registerForm = document.querySelector('#register-form');
  
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault()
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        const inputsValidator = validateInputs(name,email,password);
        const passwordValidator = validatePassword(password);


        if(!inputsValidator){
            //eturn  showMessage('You cannot leave fields empty','error');
            console.log('no puedes tenercampos vacios')
        }else if(!passwordValidator){
           // return showMessage('The password must have 1 uppercase, 1 lowercase, 1 character and be greater than 4','error');
           console.log('la pass es demasiado corta')
        };

       if(await emailExists(email)){
        console.log('el email ya existe')
       };

       const hashedPassword = hashPass(password); 
       await apiRequest('POST', 'users',{name,email, password : hashedPassword, rol:'student'});

       navegation('/login')
    })
}
