const routes = {
    '/' : '/src/views/home.html',
    '/login' : '/src/views/login.html',
    '/register' :  '/src/views/register.html',
    '/courses' :  '/src/views/courses.html',
    '/dashboard' :  '/src/views/dashboard.html',
    '/404' : '/src/views/404.html',
};
const controllers = {
     '/' : './controllers/home.js',
    '/login' : './controllers/login.js',
    '/register' :  './controllers/register.js',
    '/courses' :  './controllers/courses.js',
    '/dashboard' :  './controllers/dashboard.js'
};
const app = document.getElementById('app');

export async function loadView(path) {
    const view = routes[path] || routes['/404'];
    try {
        const response = await fetch(view);
        const viewContent = await response.text();
        app.innerHTML = viewContent;

       if(controllers[path]){
            const module = await import(controllers[path]);
            if(module.init){
                module.init();
            }
            
        }
    } catch (error) {
        console.log(error)
        app.innerHTML = `<h1> ERROR INESPERADO! <h1>`       
    }
};

export function navegation(path){
    history.pushState(null,null,path);
    loadView(path)

};

window.addEventListener('popstate',() => {
    loadView(location.pathname)
});

export function navigationTag(){
    document.addEventListener('click',(event) => {
        const elemento = event.target.closest('[data-link]');
        if(!elemento) return;

        event.preventDefault();

        const path = elemento.getAttribute('href') || elemento.getAttribute('data-link');
        if(path){
            navegation(path)
        }
    })
};
