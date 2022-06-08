import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'


const Anm = () => {

    const [page, setPage] = useState()
    const [clientes, setClientes] = useState([])

    const getClientes = ()=>{
        axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes/anm`,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
                    }
        })
        .then(e=>setClientes(e.data))
        .catch(e=>console.log(e.data))
    }

    const selectHandler = (id, estado) =>{
        console.log(id, estado)
        const data = {id:id, estado:estado}

        axios.put(`${process.env.REACT_APP_SERVIDOR}/api/clientes/anm/${id}`, data, {
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        })
        .then(e=>console.log(e.data))
        .catch(e=>console.log(e))
    }

    useEffect(() => {
        getClientes();
    }, [])
    return (
        <div>
            <div className="table-responsive my-5">
                <table className="table table-light table-striped table-hover ">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Fecha Llamada</th>
                        <th>Empresa</th>
                        <th>Contacto</th>
                        <th>Telefono</th>
                        <th>Celular1</th>
                        <th>Correo</th>
                        <th>Comentarios</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clientes.map(i=>
                                <tr key={i.id}>
                                    <td>{i.createdAt}</td>
                                    <td>{i.fechaLlamada}</td>
                                    <td>{i.empresa}</td>
                                    <td>{i.contacto}</td>
                                    <td>{i.telefono}</td>
                                    <td>{i.celular1}</td>
                                    <td>{i.correo}</td>
                                    <td>{i.observaciones}</td>
                                    <td>
                                        <select name="estado" id="estado" className="form-control" style={{'minWidth':'150px'}} onChange={e => selectHandler(i.id, e.target.value)}>
                                            <option value={i.estado}>{i.estado}</option>
                                           <option> ------------------------- </option>
                                            <option value="Sin Estado">Sin Estado</option>
                                            <option value="Contacto en Frio">Contacto en Frio</option>
                                            <option value="Pendiente enviar Informacion">Pendiente enviar Informacion</option>
                                            <option value="Pendiente enviar Propuesta">Pendiente enviar Propuesta</option>
                                            <option value="Propuesta Enviada">Propuesta Enviada</option>
                                            <option value="Cerrado Ganado">Cerrado Ganado</option>
                                            <option value="Cerrado Perdido">Cerrado Perdido</option>
                                            <option value="No Contesto">No Contesto - Numero Malo</option>
                                            <option value="No Interesado">No Interesado</option>
                                            <option value="Volver a Llamar">Volver a Llamar</option>
                                        </select>
                                    </td>
                                    <td><Link to={'/clientes/editar/'+i.id}><button className="btn btn-warning"><i className="fas fa-pen"></i></button></Link></td>
                                </tr>    
                            )}
                    </tbody>
                </table>
            </div>
                <div className="row row-cols-lg-auto ms-5">
                    {
                        page>0 ? 
                        <button className="btn btn-primary" onClick={()=>setPage(page-10)}>Anterior</button>
                        : ''
                    }

                    {
                        page>0 ? <h4 className="">{page} - {page+10}</h4> : <h4 className="">0</h4>
                    }
                    <button className="btn btn-primary ms-4" onClick={()=>setPage(page+10)}>Siguiente</button>
                </div>
        </div>
    )
}

export default Anm
