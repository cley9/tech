import React, { useState, useEffect } from 'react';
import axiosInstance from '../../methods/admin/instanAxios.js';
import SaveFromClient from './modal/formularioRegistro.jsx';
import ListClient from './listClient.jsx';

// import { fetchData } from './listClient.jsx';
import fetchData from './listClient.jsx';

import '../../style/admin/myStyle.css';
function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nameAdmin, setNameAdmin] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const nameAdmin = localStorage.getItem('user');
                setNameAdmin(nameAdmin);
                const response = await axiosInstance.get('/home',);
                //   console.log("-- user ",response.data);
                if (response.data.status == 200) {
                    // console.log("ok");
                } else {
                    throw new Error('Error al cargar');
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
    const saveDataA = () => {
        fetchData();
    };


    if (loading) {
        return <div>Cargando...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div>
            <div className='containerHome'>
                <h1>Bienvenido Administrador {nameAdmin}</h1>
            </div>
            <button className='btnRegis' onClick={openModal}>Registrar cliente</button>
            <SaveFromClient isOpen={modalIsOpen} onClose={closeModal} saveDataA={saveDataA} />
            <ListClient />
        </div>
    )
}

export default Home;