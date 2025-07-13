import { logoutUser } from "../services/storage";

export function init(){
    const logOutBtn = document.querySelector('#log-out-btn');
    logOutBtn.addEventListener('click', (event) =>{
        logoutUser();
        alert('user elimnado')
    })
}