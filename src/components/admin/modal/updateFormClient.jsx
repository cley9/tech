import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

import axiosInstance from '../../../methods/admin/instanAxios';
import { validation } from '../../../methods/admin/methods';
// import
import '../../../style/admin/myStyle.css';
Modal.setAppElement('#root'); // Para evitar errores de accesibilidad, defina el elemento raíz de su aplicación

function UpdateFromClient({ isOpen, onClose, clientData, updateData }) {
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
        console.log("sabe data", formClient.dni);
        const updateObjClient = {
            "name": formClient.name,
            "apellido": formClient.apellido,
            "edad": formClient.edad,
            "fecha_de_nacimiento": formClient.fecha_de_nacimiento
        };
        try {

            const response = await axiosInstance.put(`/update-client/${formClient.dni}`, formClient);
            console.log('Respuesta de la solicitud POST:', response.data);
            console.log(" -- clien", formClient.dni, ' this is data obj ', updateObjClient, 'final ===> ', response);
            if (response.data.status == 200 || response.data.status == 201) {
                //  const mgsIcon =  response.data.status == 200 ? "warning" :"success";
                validation();
                // if (response.data.status == 201) {
                //     // setTimeout(()=>{
                //     setFormClient({
                //         name: '',
                //         apellido: '',
                //         edad: '',
                //         fecha_de_nacimiento: '',
                //         dni: ''
                //     });
                //     onClose();
                //     // },5500);
                // }
                Swal.fire({
                    title: 'El cliente',
                    text: `${response.data.message}`,
                    icon: `success`,
                    showConfirmButton: false,
                    timer: 4000
                });
                updateData();
                onClose();
                
                // response.data.status == 200? onClose(): false;
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
            <h2 className='bg-red-500 cley'>Editar datos de Cliente</h2>
            <h3>Dni: {formClient.dni} </h3>
            <form onSubmit={handleUpdateClient}>
                <div className="rowRegister space">
                    <div className='boxCamp'>
                        <h4 className='subName'>Nombre del cliente</h4>
                        <input type="text" className='inputBody ' name='name' value={formClient.name} onChange={handleChange} placeholder='Nombre del cliente' required />
                    </div>
                    <div className='boxCamp'>
                        <h4 className='subName'>Apellido del cliente</h4>
                        <input type="text" className='inputBody' name="apellido" value={formClient.apellido} onChange={handleChange} placeholder='Apellido del cliente' required />
                    </div>
                    <div className='boxCamp'>
                        <h4 className='subName'>Edad del cliente</h4>
                        <input type="text" className='inputBody' name='edad' value={formClient.edad} onChange={handleChange} placeholder='Edad del cliente' required />
                    </div>
                    <div className='boxCamp'>
                        <h4 className='subName'>Fecha de nacimiento del cliente</h4>
                        <input type="date" className='inputBody inputDate' name='fecha_de_nacimiento' value={formClient.fecha_de_nacimiento} onChange={handleChange} placeholder='Fecha nacimiento del cliente' required />
                    </div>
                    {/* <div className='boxCamp'>
                    <h4 className='subName'>Dni del cliente</h4>
                    <input type="text" className='inputBody' name='dni' value={formClient.dni} onChange={handleChange} placeholder='Dni del cliente' required />
                </div> */}
                </div>
                <div className='btnBody rowRegister'>
                    <button onClick={onClose} className='btnPosition btnBoxSave  btnEfectClick'>Salir</button>
                    <button type='submit' className='btnPosition btnBoxSave  btnEfectClick'>Guardar</button>
                </div>
            </form>

        </Modal>
    );
}

export default UpdateFromClient;
