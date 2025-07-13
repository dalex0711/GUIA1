import { validateInputs, validateUser,hashPass } from "../services/validations";
import {dataEncoding} from "../services/storage"
import{getUser} from "../services/storage"
import{navegation} from '../router.js'
 
export function init(){
    const loginForm = document.querySelector('#login-form');

    loginForm.addEventListener('submit',async (event) =>{
        event.preventDefault();
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const validatedInputs = validateInputs(email,password);
        console.log(validatedInputs)
        if(!validatedInputs){
            console.log('no puedes tener campos vacios')
            return
        }

        const hashedPassword = hashPass(password); 

        const user = await validateUser(email, hashedPassword)
        if(!user){
            console.log('no existe el user'); 
            return
        }else if(user){
            const user = await getUser(email)
            dataEncoding(user)
            alert('todo bien')
            navegation('/welcome')
        }
        
    })
}
