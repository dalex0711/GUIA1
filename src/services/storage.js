import {apiRequest} from '../api/request';

export function dataEncoding(user) {
    const payload = {
        id : user.id,
        email: user.email,
        exp: Date.now() + 60 * 60 * 1000
    };

    const token = btoa(JSON.stringify(payload))
    localStorage.setItem('token',token)
};

export async function getUser(email) {
    const users = await apiRequest('GET', `users?email=${email}`);
    return  users[0]
};


export function getLoggerdUser(){
    return localStorage.getItem('token')
};

export function logoutUser(){
    localStorage.removeItem('token')
    return
}
