import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import axiosInstance from '../../../methods/admin/instanAxios';
import '../../../style/admin/myStyle.css';
Modal.setAppElement('#root'); // Para evitar errores de accesibilidad, defina el elemento raíz de su aplicación

function UpdateFromClient({ isOpen, onClose, clientData, updateListClient }) {
    const [formClient, setFormClient] = useState({
        name: '',
        apellido: '',
        edad: '',
        fecha_de_nacimiento: '',
        dni: ''
    });
    useEffect(() => {
        if (clientData) {
            setFormClient({
                name: clientData.name || '',
                apellido: clientData.apellido || '',
                edad: clientData.edad || '',
                fecha_de_nacimiento: clientData.fecha_de_nacimiento || '',
                dni: clientData.dni || ''
            });
        }
    }, [clientData]);
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)' // Fondo oscurecido del modal
        },
        content: {
            width: '50%', // Ancho personalizado del modal
            height: '62%', // Altura automática, puedes ajustarlo según tus necesidades
            margin: 'auto', // Centra el modal horizontalmente
            borderRadius: '8px', // Bordes redondeados
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            //   boxShadow: '0 2px 4px #BDBDC5 ', // Sombra ligera
            border: 'none' // Sin borde
        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormClient({
            ...formClient,
            [name]: value
        });
    };
    const handleUpdateClient = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosInstance.put(`/update-client/${formClient.dni}`, formClient);
            if (response.data.status == 200 || response.data.status == 201) {
                updateListClient();
                Swal.fire({
                    title: 'El cliente',
                    text: `${response.data.message}`,
                    icon: `success`,
                    showConfirmButton: false,
                    timer: 4000
                });
                onClose();
            }
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
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Ejemplo de Modal"
            style={customStyles}
        >
            <h2 className='bg-red-500 titleEdit'>Editar datos de Cliente</h2>
            <h3 className='subTitleEdit'>Dni: {formClient.dni} </h3>
            <form onSubmit={handleUpdateClient}>
                <div className="rowRegister space">
                    <div className='boxCamp'>
                        <h5 className='subName'>Nombre del cliente</h5>
                        <input type="text" className='inputBody ' name='name' value={formClient.name} onChange={handleChange} placeholder='Nombre del cliente' required />
                    </div>
                    <div className='boxCamp'>
                        <h5 className='subName'>Apellido del cliente</h5>
                        <input type="text" className='inputBody' name="apellido" value={formClient.apellido} onChange={handleChange} placeholder='Apellido del cliente' required />
                    </div>
                    <div className='boxCamp'>
                        <h5 className='subName'>Edad del cliente</h5>
                        <input type="number" className='inputBody' name='edad' value={formClient.edad} onChange={handleChange} min="0"
                            onInput={(e) => { e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2) }} placeholder='Edad del cliente' required />
                    </div>
                    <div className='boxCamp'>
                        <h5 className='subName'>Fecha de nacimiento del cliente</h5>
                        <input type="date" className='inputBody inputDate' name='fecha_de_nacimiento' value={formClient.fecha_de_nacimiento} onChange={handleChange} placeholder='Fecha nacimiento del cliente' required />
                    </div>
                </div>
                <div className='btnBody'>
                    <button onClick={onClose} className=' btnBoxSave  btnEfectClick'>Salir</button>
                    <button type='submit' className=' btnBoxSave  btnEfectClick'>Guardar</button>
                </div>
            </form>
        </Modal>
    );
}

export default UpdateFromClient;
