# Deploy  of React 17 in local
# Requisitos 
- Tener instalado Nodejs
- Tener instalado npm de manera global

# Para ejecutar el Frond-end 
- Descarga el repositorio tech [ https://github.com/cley9/React-17.git ]
- Instala los paquetes ejecutando npm install
- Inicia el entorno del react 17  [ npm start]

# Pasos para el uso del micro sistema
- Registrate como administrador 
>  http://localhost:3000/
- Ya puedes registra, editar eliminar y listar todo los clientes de tech




# Omitir lo de a bajo, es para crear proyecto

# This is for Creation in new proyect in react 17  
# instalación de npx gestor de paquete 
```npm
npm install --global npx
```
## Tipos de gestores de paquetes
- npm
- npx
- pnpm
- yarn

# Para crear un proyecto en React 17
- Instala el gestor de paquete npx => npm install --global npx
- Crear el proyecto react => npx create-react-app taxtech_front-end
- Cambiar la version de react manual en el package.json a 17 
#### cambios nota
- https://es.stackoverflow.com/questions/527024/c%C3%B3mo-creo-un-proyecto-con-create-react-app-con-la-versi%C3%B3n-17-de-react-y-no-la-1
- https://dev.to/lowla/create-react-app-with-a-previous-version-of-react-4g03
#### react 17 
- Crea la app de manera usual con npx create-react-app my_app.
- Abre el package.json y cambia la versión de react, react-dom, and react-scripts a la versión anterior, o bien a la versión que deseas instalar:
```
"react": "17.0.2",
"react-dom": "17.0.2",
"react-scripts": "4.0.3"
```
- Borra el package-lock.json y los node_modules
- Ejecuta en npm install en la carpeta del proyecto.

quitar en el index.js el metodo crate 
#### React 17 index.js para ver el proyecto
- el createRoot  es >=react 18
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HolaMundo from './Data';
ReactDOM.render(
  <React.StrictMode>
    <App />
    <HolaMundo />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
```
- Inicie react => npm start
- #### ahora puedes crear un archivo jsx para mejorar el workflow
```javascript
// nota : al crear un proyecto tiene que ser todo en minuscula.
// Para cambiar a la version de react 17 [ no recomendable]
npm install react@17.0.2 react-dom@17.0.2 react-scripts@4.0.3
// o manual en la ruta package.json
    // before por default
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    //after, cambia las versiones a 17.0.2:
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
 - Para crear un proyecto en un version especifica de react => npx create-react-app@17.0.2 taxtech_frond-end

```

# Instalación de libreria de axios para el consumo de apiRest

```js
npm install axios
```
- modal librery [ npm install react-modal ]