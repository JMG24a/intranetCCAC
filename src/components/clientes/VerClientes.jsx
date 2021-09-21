import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';


const VerClientes = () => {

    const history = useHistory();
    const cookies = new Cookies();
    if(cookies.get('token') !== '3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03'){
    console.log('error de autenticacion')
    history.replace('/login')
    }


    const [clientes, setClientes] = useState([])
    const [page, setPage] = useState(0)
    
    const [estado, setEstado] = useState()
    const [categoria, setCategoria] = useState()
    const [subCategoria, setSubCategoria] = useState()
    const [cotizaciones, setCotizaciones] = useState()
    const [kam, setKam] = useState()
    const [probabilidadCierre, setProbabilidadCierre] = useState()
    const [inputHand, setInputHand] = useState()

    const [estadoCount, setEstadoCount] = useState(0)
    const [cotizacionEnviadaCount, setCotizacionEnviadaCount] = useState(0)
    const [cotizacionDevuelto, setCotizacionDevuelto] = useState(0)
    const [cotizacionPagado, setCotizacionPagado] = useState(0)


    const getClientesFiltro = ()=>{
       
            axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=1000&offset=${page}&estado=Pendiente Enviar Cotizacion`,{
                headers:{
                    token:'JaRvIs92!',
                    correo:'alecapo@gmail.com',
                    password:'123456'
                        }
            })
            .then(e=>setEstadoCount(e.data.length))
            .catch(e=>console.log(e))
           
            axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=1000&offset=${page}&estado=Cotizacion Enviada`,{
                headers:{
                    token:'JaRvIs92!',
                    correo:'alecapo@gmail.com',
                    password:'123456'
                        }
            })
            .then(e=>setCotizacionEnviadaCount(e.data.length))
            .catch(e=>console.log(e))
           
           
            axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=1000&offset=${page}&estado=Pendiente Enviar Informacion`,{
                headers:{
                    token:'JaRvIs92!',
                    correo:'alecapo@gmail.com',
                    password:'123456'
                        }
            })
            .then(e=>setCotizacionDevuelto(e.data.length))
            .catch(e=>console.log(e))


            axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=1000&offset=${page}&estado=Pagado`,{
                headers:{
                    token:'JaRvIs92!',
                    correo:'alecapo@gmail.com',
                    password:'123456'
                        }
            })
            .then(e=>setCotizacionPagado(e.data.length))
            .catch(e=>console.log(e))


            axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=10&offset=${page}`,{
                headers:{
                    token:'JaRvIs92!',
                    correo:'alecapo@gmail.com',
                    password:'123456'
                }
            })
            .then(e=>setClientes(e.data))
            .catch(e=>console.log(e))
        
    }

    const selectHandler = (id, estado) =>{
        console.log(id, estado)
        const data = {id:id, estado:estado}

        axios.put(`${process.env.REACT_APP_SERVIDOR}/api/clientes/${id}`, data, {
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        })
        .then(e=>console.log(e.data))
        .catch(e=>console.log(e))
    }

    const deleteHandler = (id) =>{
        axios.delete(`${process.env.REACT_APP_SERVIDOR}/api/clientes/${id}`,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        }).then((e)=>{
            alert('Eliminado Correctamente')
            console.log(e)
        })
        getClientesFiltro();
    }

    const searchHand = () => {
        if(estado && kam){
            axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=1000&offset=${page}&estado=${estado}&kam=${kam}`,{
                headers:{
                    token:'JaRvIs92!',
                    correo:'alecapo@gmail.com',
                    password:'123456'
                        }
            })
            .then(e=>setClientes(e.data))
            .catch(e=>console.log(e))
            return;
        }
        
        if(estado){
            axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=1000&offset=${page}&estado=${estado}`,{
                headers:{
                    token:'JaRvIs92!',
                    correo:'alecapo@gmail.com',
                    password:'123456'
                        }
            })
            .then(e=>setClientes(e.data))
            .catch(e=>console.log(e))
        }

        if(probabilidadCierre){
            axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=10&offset=${page}&probabilidadCierre=${probabilidadCierre}`,{
                headers:{
                    token:'JaRvIs92!',
                    correo:'alecapo@gmail.com',
                    password:'123456'
                        }
            })
            .then(e=>setClientes(e.data))
            .catch(e=>console.log(e))
        }

        if(kam){
            axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=1000&offset=${page}&kam=${kam}`,{
                headers:{
                    token:'JaRvIs92!',
                    correo:'alecapo@gmail.com',
                    password:'123456'
                        }
            })
            .then(e=>setClientes(e.data))
            .catch(e=>console.log(e))
            
        }

        if(inputHand){
            axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=10&offset=${page}&searchValue=${inputHand}`,{
                headers:{
                    token:'JaRvIs92!',
                    correo:'alecapo@gmail.com',
                    password:'123456'
                        }
            })
            .then(e=>setClientes(e.data))
            .catch(e=>console.log(e))
        }
    }

    useEffect(() => {
        getClientesFiltro();
    }, [page, inputHand, estado, kam, probabilidadCierre])
    
    return (
        <div className='px-4 py-5 verClientes'>
            <h1 className="mb-4">INTRANET CCAC</h1>
            <div className="row my-4">
                <div className="col-md-3">
                    <h1 className="text-white text-center">{estadoCount}</h1>
                    <h3 className="text-white text-center">Cotizaciones Pendientes</h3>
                </div>
                <div className="col-md-3">
                     <h1 className="text-white text-center">{cotizacionEnviadaCount} </h1>
                     <h3 className="text-white text-center">Cotizaciones Enviadas</h3>
                </div>
                <div className="col-md-3">
                     <h1 className="text-white text-center">{cotizacionDevuelto}</h1>
                     <h3 className="text-white text-center">Pendiente Enviar Informacion</h3>
                </div>
                <div className="col-md-3">
                     <h1 className="text-white text-center">{cotizacionPagado} / 1.000</h1>
                     <h3 className="text-white text-center">Pagados</h3>
                </div>
            </div>
            <div className="row">
            <div className="col-lg-7 col-sm-12">
                <div className="row fondo">
                    <div className="form-group mt-2">
                        <label htmlFor="buscar">Buscar Valor</label>
                        <input type="text" name="buscar" id="buscar" className="form-control" onChange={(e)=>setInputHand(e.target.value)} placeholder="Ingrese Empresa, Contacto o Nit para buscar"/>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group mt-3 text-center">
                            <label htmlFor="esadoFiltro">Estado</label>
                            <select name="estadoFiltro" id="estadoFiltro" className="form-control m-0 p-0 text-center" onChange={e=>setEstado(e.target.value)}>
                                <option>- Seleccione Filtro -</option>
                                    <option value="Imposible de Contactar">Imposible de Contactar</option>
                                    <option value="Pendiente Enviar Informacion">Pendiente Enviar Informacion</option>
                                    <option value="Revision Informacion">Revision Informacion</option>
                                    <option value="Pendiente Enviar Cotizacion">Pendiente Enviar Cotizacion</option>
                                    <option value="Cotizacion Enviada">Cotizacion Enviada</option>
                                    <option value="Facturado">Facturado</option>
                                    <option value="Cerrado Perdido">Cerrado Perdido</option>
                                    <option value="Abonado">Abonado</option>
                                    <option value="Pagado">Pagado</option>
                                    <option value="Devuelto">Devuelto</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group mt-3 text-center">
                            <label htmlFor="categoria">Probabilidad De Cierre</label>
                            <select name="categoria" id="categoria" className="form-control m-0 p-0 text-center" onChange={e=>setProbabilidadCierre(e.target.value)}>
                            <option value="">- Seleccione -</option>
                                <option value="Identificado">Identificado (0%)</option>
                                <option value="Bajo">Bajo (40%)</option>
                                <option value="Medio">Medio (40%-80%)</option>
                                <option value="Alto">Alto (80% - 90%)</option>
                                <option value="Cerrado Ganado">Cerrado Ganado</option>
                                <option value="Cerrado Perdido">Cerrado Perdido</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group mt-3 text-center">
                            <label htmlFor="categoria">KAM</label>
                            <select name="categoria" id="categoria" className="form-control m-0 p-0 text-center" onChange={e=>setKam(e.target.value)}>
                                <option>- Seleccione Filtro -</option>
                                <option value="Leidy">Leidy</option>
                                <option value="Alejandra">Alejandra</option>
                                <option value="Alison">Alison</option>
                                <option value="Natalia">Natalia</option>
                                <option value="Jesus">Jesus</option>
                                <option value="Cecilia">Cecilia</option>
                                <option value="Nicolas">Nicolas</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-warning mt-4" onClick={searchHand}>Buscar</button>
                        <button className="btn btn-danger ms-4 mt-4" onClick={()=>{setEstado(); setKam(); setProbabilidadCierre(); setInputHand();}}>Reiniciar Campos</button>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-sm-12 float-end fondo">
                <Link to="/clientes/crear"><button className="btn btn-success my-4">Crear Nuevo Cliente</button></Link>
                <Link to="/participantes"><button className="btn btn-warning my-4 ms-4">Pasajeros con Documentos</button></Link>
            </div>
            </div>
            <div className="table-responsive my-4">
                <table className="table table-light table-striped table-hover ">
                <thead>
                    <tr>
                        <th>Categoria</th>
                        <th>Origen</th>
                        <th>KAM</th>
                        <th>Fecha</th>
                        <th>Fecha Llamada</th>
                        <th>Empresa</th>
                        <th>Contacto</th>
                        <th>Correo</th>
                        <th>Comentarios</th>
                        <th>Estado</th>
                        <th>Probabilidad de Cierre</th>
                        <th colSpan="2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                            clientes.length < 1  ? <tr><td colSpan="10">No hay Registros para mostrar...</td></tr> :
                            clientes.map(i=>
                                <tr key={i.id}>
                                    <td>{i.categoria}</td>
                                    <td>{i.origen}</td>
                                    <td>{i.kam}</td>
                                    <td>{i.createdAt}</td>
                                    <td>{i.fechaLlamada}</td>
                                    <td>{i.empresa}</td>
                                    <td>{i.contacto}</td>
                                    {/* <td>{i.telefono}</td> */}
                                    {/* <td>{i.celular1}</td> */}
                                    <td>{i.correo}</td>
                                    <td>{i.observaciones}</td>
                                    <td>
                                        <select name="estado" id="estado" className="form-control" style={{'minWidth':'150px'}} onChange={e => selectHandler(i.id, e.target.value)}>
                                            <option value={i.estado}>{i.estado}</option>
                                           <option> ------------------------- </option>
                                           <option value="Imposible de Contactar">Imposible de Contactar</option>
                                            <option value="Pendiente Enviar Informacion">Pendiente Enviar Informacion</option>
                                            <option value="Revision Informacion">Revision Informacion</option>
                                            <option value="Pendiente Enviar Cotizacion">Pendiente Enviar Cotizacion</option>
                                            <option value="Cotizacion Enviada">Cotizacion Enviada</option>
                                            <option value="Facturado">Facturado</option>
                                            <option value="Cerrado Perdido">Cerrado Perdido</option>
                                            <option value="Abonado">Abonado</option>
                                            <option value="Pagado">Pagado</option>
                                            <option value="Devuelto">Devuelto</option>
                                        </select>
                                    </td>
                                    <td>{i.probabilidadCierre}</td>
                                    <td><Link to={'/clientes/editar/'+i.id}><button className="btn btn-warning"><i className="fas fa-pen" style={{color: 'white'}}></i></button></Link></td>
                                    <td><button onClick={()=>deleteHandler(i.id)} className="btn btn-danger" style={{background: 'red'}}><i className="fas fa-trash" style={{color: 'white'}}></i></button></td>
                                </tr>    
                            )}
                    </tbody>
                </table>
            </div>
            <div className="row">
                <h4 className="text-white">{clientes.length}</h4>
            </div>
            <div className="row row-cols-lg-auto ms-5 float-end">
                {
                    page>0 ? 
                    <button className="btn btn-primary" onClick={()=>setPage(page-10)}>Anterior</button>
                    : ''
                }

                {
                    page>0 ? <h4 className="text-white">{page} - {page+10}</h4> : <h4 className="text-white">0</h4>
                }
                <button className="btn btn-primary ms-4" onClick={()=>setPage(page+10)}>Siguiente</button>
            </div>
        </div>
    )
}

export default VerClientes
