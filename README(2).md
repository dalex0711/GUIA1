# 📚 Plataforma Educativa SPA

Este proyecto es una aplicación educativa tipo SPA (Single Page Application), desarrollada con:

- **Vite** como herramienta de desarrollo moderno
- **JavaScript** puro (sin frameworks)
- **TailwindCSS** para estilos
- **JSON Server** como API simulada para manejar datos

---

## 🛠 Requisitos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (v14 o superior)
- npm (v6 o superior)

Además, debes instalar las dependencias del proyecto:

```bash
npm install
```

---

## 🧪 Estructura del proyecto

```
src/
│
├── views/              # Archivos HTML de cada vista (home, login, register, dashboard, etc.)
├── styles/             # CSS global y personalizado
├── services/           # Funciones auxiliares como validaciones, mensajes, autenticación
├── api/                # Funciones para hacer peticiones a JSON Server
├── database/db.json    # Base de datos simulada
├── router.js           # Sistema de rutas SPA
└── main.js             # Entrada principal del frontend
```

---

## ▶️ Cómo ejecutar el proyecto

1. **Instalar dependencias:**

```bash
npm install
```

2. **Iniciar el servidor de desarrollo:**

```bash
npm run dev
```

Abre tu navegador en: [http://localhost:5173](http://localhost:5173)

3. **Iniciar la API (JSON Server):**

```bash
npm run start:api
```

Esto levantará un servidor local en: [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Comando de Build

Para generar una versión optimizada del proyecto:

```bash
npm run build
```

Para visualizarla localmente:

```bash
npm run preview
```

---

## 📌 Notas

- Puedes modificar los datos de ejemplo desde `src/database/db.json`.
- Si no ves los estilos de Tailwind, asegúrate de tenerlo correctamente configurado en `tailwind.config.js` y `index.css`.