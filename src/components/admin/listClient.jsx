import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axiosInstance from '../../methods/admin/instanAxios.js';
import UpdateFromClient from './modal/updateFormClient.jsx';
import SaveFromClient from './modal/formularioRegistro.jsx';
import '../../style/admin/myStyle.css';

function ListClient() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [listClient, setListClient] = useState([]);
    const [clientData, setClientData] = useState(null);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/list-client', {
                method: 'get'
            });
            // console.log("-- user this is ", response.data);
            const listClient = response.data.list_client;
            if (response.data.status == 200) {
                // console.log("ok", response.data.list_client);
                setListClient(listClient); // Se establece el listClient
            } else {
                throw new Error('Error al cargar los datosdfaf');
            }
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const clientDelete = async (dniClient) => {
        try {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
            });
            async function mostrarModal() {
                const msgModal = await swalWithBootstrapButtons.fire({
                    title: "Información",
                    text: "¿Estás seguro de que quieres eliminar el cliente?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Sí, eliminar",
                    cancelButtonText: "No, cancelar",
                    reverseButtons: true
                });
                if (msgModal.isConfirmed) {
                    const response = await axiosInstance.delete(`/delete-client/${dniClient}`);
                    // console.log("-- user this is ", response.data);
                    if (response.data.status == 200) {
                        Swal.fire({
                            title: 'Eliminado',
                            text: `${response.data.message}`,
                            icon: `success`,
                            showConfirmButton: false,
                            timer: 4000
                        });
                        fetchData();
                    } else {
                        throw new Error('Error al cargar');
                    }
                }
            }
            mostrarModal();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                Swal.fire({
                    title: 'Advertencia',
                    text: error.response.data.message,
                    icon: 'info',
                    showConfirmButton: false,
                    timer: 4000

                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Ha ocurrido un error al procesar la solicitud',
                    icon: 'error',
                    showConfirmButton: true
                });
            }
        }
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = (clientData) => {
        // console.log("--------s",clientData);
        setModalIsOpen(true);
        setClientData(clientData);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    const updateData = () => {
        fetchData();
    };
    
    const saveDataA = () => {
        fetchData(); // Vuelve a buscar la lista actualizada
    };
    // const saveDataA = async () => {
    //     try {
    //         await fetchData();
    //     } catch (error) {
    //         console.error('Error al actualizar los datos:', error);
    //     }
    // };

    return (
        <div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></script>
            <div className="container BodyMain">
                <h3 className='titleClient text-center pt-3'>Lista de todo los clientes </h3>
                <table className='table table-bordered text-center table-hover'>
                    <thead className='tableHead table-dark '>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Edad</th>
                            <th>Fecha de nacimiento</th>
                            <th>Dni</th>
                            <th>Editar Cliente</th>
                            <th>eliminar Cliente</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(listClient) && listClient.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.apellido}</td>
                                <td>{item.edad}</td>
                                <td>{item.fecha_de_nacimiento}</td>
                                <td>{item.dni}</td>
                                <td>
                                    <a onClick={() => openModal(item)} className="mb-md-0 mb-2 btn btn-warning me-md-3 me-lg-3"> <i
                                        className="bi bi-pencil"></i></a>
                                </td>
                                <td>
                                    <a onClick={() => clientDelete(item.dni)}
                                        className="btn btn-danger " id="delete-frm"> <i className="bi bi-trash"></i></a>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <UpdateFromClient isOpen={modalIsOpen} onClose={closeModal} clientData={clientData} updateData={updateData}/>
        </div>
    )
}
export default ListClient;