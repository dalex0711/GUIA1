import{getUserLogged} from './services/storage'

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
const guards = {
    '/login' : (user) => !user,
    '/dashboard' : (user) => user?.rol === 'admi',
    '/courses' : (user) => user?.rol === 'student'
}

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

function checkAcces(path, user){
  const guard = guards[path];

  if (guard && !guard(user)) {
    // Si el usuario está logueado pero no debe entrar ahí
    if (path === '/login' && user) {
      // redirige según el rol
      return user.rol === 'admi' ? '/dashboard' : '/courses';
    }

    // Si no está logueado y no tiene acceso
    return user ? '/404' : '/login';
  }

  return path;
}

export function navegation(path){
    const user = getUserLogged();
    console.log(user)
    const accessRoute = checkAcces(path, user);

    if(!accessRoute) return;
    history.pushState(null,null,accessRoute);
    loadView(accessRoute)

};

window.addEventListener('popstate',() => {
    navegation(location.pathname)
});

export function navegationTag(){
    document.addEventListener('click',(event) => {
        const elemento = event.target.closest('[data-link]');
        if(!elemento) return;

        event.preventDefault();

        const path = elemento.getAttribute('href') || elemento.getAttribute('data-link');
        if(path){
            navegation(path)
        }
    });

};

