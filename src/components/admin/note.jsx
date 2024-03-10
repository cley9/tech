import React, { useState, useEffect } from 'react';
import axiosInstance from '../../methods/admin/instanAxios.js';

function ListClient() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [listClient, setListClient] = useState([]); // Definir listClient aquí
    useEffect(() => { // iniliaza es como el mount de vue
      const fetchData = async () => {
        try {
        //   const response = await axiosInstance.get('http://localhost:8080/api/v1/admin/home',{
            const response = await axiosInstance.get('/list-client',{
            method:'get'
          });
          console.log("-- user this is ",response.data);
          const listClient=response.data.list_client;
          console.log("-------------------",listClient);
          if (response.data.status == 200) {
            console.log("ok", response.data.list_client);
            setListClient(listClient); // Se establece el listClient
        }else{
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
    console.log("gaaaaaadfada",listClient);
    return(
        <div>
            <h3>list user </h3>
            <table>
                <thead>
                <th>Id</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Edad</th>
                <th>Fecha de nacimiento</th>
                <th>Dni</th>
                </thead>
                <tbody>
            {/* { listClient.map( item =>( */}

<tr>
    <td>{{listClient}}</td>
                {/* // <tr key={item.id}> */}
            {/* // <td>{{ item.name }}</td> */}
            <td>da</td>
            <td>da</td>
        </tr>
            {/* // ))} */}
                </tbody>
            </table>
        </div>
    )
    
}
export default ListClient;