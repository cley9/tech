// import react from "react";
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import axiosInstance from '../../methods/admin/instanAxios.js';
import FormRegister from './modal/formularioRegistro.jsx';
function Home() {
//   const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoibWFyayIsImVtYWlsIjoibWFya0BnbWFpbC5jb20iLCJyb2wiOjR9.syYLAW31U3CcxCi8Z42_mCnY8oT28d8v7q8i8UoFcBk";
    //  localStorage.setItem('token',token);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => { // iniliaza es como el mount de vue
      const fetchData = async () => {
        try {
        //   const response = await axiosInstance.get('http://localhost:8080/api/v1/admin/home',{
            const response = await axiosInstance.get('/home',{
            method:'get'
          });
          console.log("-- user ",response.data);

          if (response.data.status == 200) {
            console.log("ok");}else{
                    throw new Error('Error al cargar los datosdfaf');
                  }
          setData(response.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
      setModalIsOpen(true);
    };
    const closeModal = () => {
      setModalIsOpen(false);
    };

  
    
        
    
    if (loading) {
        return <div>Cargando...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    



    return(
        <div>
            <h2>home admin</h2>
      <h2 className='bg-red-500'>¡Mi Modal!</h2>
      <div className="bg-blue-500 text-white p-4">
      <h1>Hola, mundo!</h1>
    </div>
            <button>Registrar </button>
            <button onClick={openModal}>gaa !</button>
            <FormRegister isOpen={modalIsOpen} onClose={closeModal} />
            
        </div>
    )
}

export default Home;