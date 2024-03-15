import './../style/main.css';
import Swal from 'sweetalert2';
import React,{useState, useEffect} from 'react';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../methods/admin/instanAxios';
function Main() {
    const navigate = useNavigate();
    const [formClient, setFormClient] = useState({
        name: '',
        email: '',
        password: '',
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormClient({
            ...formClient,
            [name]: value
        });
    };
    const handleRegistration =async (event) => {
        event.preventDefault();
        try {
            // const response = await axiosInstance.post('http://localhost:8080/registro-admin', formClient);
            const response = await axiosInstance.post('https://agrupec.com/Tech/index.php/registro-admin', formClient);
            if(response.data.status==200 || response.data.status== 201){
                 localStorage.setItem('token',response.data.token);
                 localStorage.setItem ('user',response.data.user.name)
                 const msg=await  Swal.fire({
                    title: 'El cliente',
                    text: `${response.data.message}`,
                    icon: `success`,
                    showConfirmButton: false,
                    timer:2000
                });
                navigate('/admin');
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
    }
    return (
        <div>
            <div className='containerRegistration'>
                <div className='rowRegisterUser'>
                    <form className='formCreateAdmin' onSubmit={handleRegistration}>
                        <h2 className=''>Crear una cuenta como administrador</h2>
                        <div className="rowRegister space">
                            <div className='boxCamp'>
                                <h4 className='subName'>Nombre</h4>
                                <input type="text" className='inputBody ' name='name' value={formClient.name} onChange={handleChange} placeholder='Ingrese su nombre' required />
                            </div>
                            <div className='boxCamp'>
                                <h4 className='subName'>Correo</h4>
                                <input type="email" className='inputBody' name="email" value={formClient.email} onChange={handleChange} placeholder='Ingrese su correo' required />
                            </div>
                            <div className='boxCamp'>
                                <h4 className='subName'>Contraseña</h4>
                                <input type="password" className='inputBody'name='password' value={formClient.password} onChange={handleChange} placeholder='Ingrese su contraseña' required />
                            </div>
                        </div>
                        <div className='btnBody rowRegister'>
                            <button type='submit' className='btnPosition btnBoxSave  btnEfectClick'>Registrarse</button>
                        </div>
                    </form>
                </div>
            </div>

        </div >
    )
}
export default Main;