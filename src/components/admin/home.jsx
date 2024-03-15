import React, { useState, useEffect } from 'react';
import axiosInstance from '../../methods/admin/instanAxios.js';
import SaveClientForm from './modal/formularioRegistro.jsx';
import ListClient from './listClient.jsx';
import '../../style/admin/myStyle.css';
function Home() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nameAdmin, setNameAdmin] = useState([]);
    const [listClient, setListClient] = useState([]);
    const updateListClient = async () => {
        console.log("se actualizo ");
        const nameUser = localStorage.getItem("user");
        setNameAdmin(nameUser);
        try {
            const response = await axiosInstance.get('/list-client', {
                method: 'get'
            });
            const clientDatas = response.data.list_client;
            if (response.data.status == 200) {
                setListClient(clientDatas); // Se establece el listClient
            } else {
                throw new Error('Error al cargar los datosdfaf');
            }
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    useEffect(() => {
        updateListClient();
        // console.log("---");
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
    return (
        <div>
            <div className='containerHome'>
                <h1>Bienvenido Administrador {nameAdmin}</h1>
            </div>
            <button className='btnRegis' onClick={openModal}>Registrar cliente</button>
            <ListClient listClient={listClient} updateListClient={updateListClient} />
            <SaveClientForm isOpen={modalIsOpen} onClose={closeModal} updateListClient={updateListClient} />
        </div>
    )
}

export default Home;