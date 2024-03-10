// import react from "react";
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import axiosInstance from '../../methods/admin/instanAxios.js';
import FormRegister from './modal/formularioRegistro.jsx';
import ListClient from './listClient.jsx';
function Home() {
//   const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoibWFyayIsImVtYWlsIjoibWFya0BnbWFpbC5jb20iLCJyb2wiOjR9.syYLAW31U3CcxCi8Z42_mCnY8oT28d8v7q8i8UoFcBk";
    //  localStorage.setItem('token',token);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => { // iniliaza es como el mount de vue
      const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/home',{
            method:'GET'
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
            <h1>home admin</h1>
            <button className='btnBoxSave' onClick={openModal}>Registrar cliente</button>
            <FormRegister isOpen={modalIsOpen} onClose={closeModal} />
            <ListClient/>
        </div>
    )
}

export default Home;