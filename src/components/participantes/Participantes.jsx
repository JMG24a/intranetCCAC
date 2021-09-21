import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';


const Participantes = () => {

    const history = useHistory();
    const cookies = new Cookies();
    if(cookies.get('token') !== '3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03'){
    console.log('error de autenticacion')
    history.replace('/login')
    }


    
    const [participantes, setParticipantes] = useState([])
    
    const getParticipantes = ()=>{
        axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes?origen=si`,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
                    }
        })
        .then(e=>setParticipantes(e.data))
        .catch(e=>console.log(e))
    }

    const updateParticipantes = (id) => {
        const data = {origen: 'Inscripciones'}

        axios.put(`${process.env.REACT_APP_SERVIDOR}/api/clientes/${id}`,data,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
                }
        })
        .then(e=>{
            alert('Eliminado Correctamente')
            history.replace('/')
        })
        .catch(e=>console.log(e))
    }
    
    useEffect(() => {
        getParticipantes();
    }, [])
    return (
        <div className="bg-white my-5 p-2">
            <div>
                <Link to="/"><button className="btn btn-warning">Regresar</button></Link>
            </div>
            <div className="my-5 text-center">
                <h2>Cantidad de Participantes: {participantes.length}</h2>
                <h1>Listado de Participantes Expo2020</h1>
                <p>Los siguientes participantes son personas que ingresaron al formulario www.ccac.com.co/participantes y nos enviaron ya sus documentos</p>
            </div>
            <div className="table-responsive">
                <table className="table table-light table-striped table-hover">
                    <thead>
                        <tr>
                            <th>KAM</th>
                            <th>Empresa</th>
                            <th>Contacto</th>
                            <th>Celular</th>
                            <th>Correo</th>
                            <th>Ciudad</th>
                            <th>Visa Americana</th>
                            <th>Estado</th>
                            <th>F. Vacuna</th>
                            <th>Pasaporte</th>
                            <th>C. Vacuna</th>
                            <th colSpan="2">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            participantes.map(i=>
                                <tr key={i.id}>
                                    <td>{i.kam}</td>
                                    <td>{i.empresa}</td>
                                    <td>{i.contacto}</td>
                                    <td>{i.celular1}</td>
                                    <td>{i.correo}</td>
                                    <td>{i.ciudad}</td>
                                    <td>{i.visaAmericana}</td>
                                    <td>{i.estado}</td>
                                    <td>{i.fechaVacuna}</td>
                                    <td><a href={"https://www.ccac.com.co/storage/"+i.pasaporteFile} target="_blank" rel="noreferrer">Ver Pasaporte</a></td>
                                    <td><a href={"https://www.ccac.com.co/storage/"+i.vacunaFile} target="_blank" rel="noreferrer">Ver Vacuna</a></td>
                                    <td><Link to={'/clientes/editar/'+i.id}><button className="btn btn-warning"><i className="fas fa-pen" style={{color: 'white'}}></i></button></Link></td>
                                    <td><button className="btn btn-danger" onClick={()=>updateParticipantes(i.id)}><i className="fas fa-trash" style={{color: 'white'}}></i></button></td>
                                </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Participantes
