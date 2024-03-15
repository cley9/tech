import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import HomeAdmin from './components/admin/home';
import AdminComponent from './components/admin/perfil'; 
import Main from './components/main';
// const router=createBrowserRouter([
//   {
//     path:'/',
//     element: <h1>home</h1>
//   },
//   {
//     path:'/tres',
//     element: <h1>tres</h1>
//   }
// ]);
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
ReactDOM.render(
<BrowserRouter>
<React.StrictMode>
  <Routes>
    <Route path="/" element={<Main aria />} />
    <Route path="/admin" element={<HomeAdmin aria />} />
    <Route path="/user" element={<AdminComponent aria />} /> {/* // Asigna la ruta '/' a AdminComponent con aria */}
    {/* <Route path="*" element={<NotFoundComponent />} /> */}
  </Routes>
</React.StrictMode>
</BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
