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

    const getClientesFiltro = ()=>{

        if(cotizaciones){
            axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=10&offset=${page}&cotizaciones=${cotizaciones}`,{
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


        if(estado && categoria && subCategoria){
            axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=10&offset=${page}&estado=${estado}&categoria=${categoria}&subcategoria=${subCategoria}`,{
                headers:{
                    token:'JaRvIs92!',
                    correo:'alecapo@gmail.com',
                    password:'123456'
                        }
            })
            .then(e=>setClientes(e.data))
            .catch(e=>console.log(e))
        }
        else if(estado && categoria){
            axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=10&offset=${page}&estado=${estado}&categoria=${categoria}`,{
                headers:{
                    token:'JaRvIs92!',
                    correo:'alecapo@gmail.com',
                    password:'123456'
                        }
            })
            .then(e=>setClientes(e.data))
            .catch(e=>console.log(e))
        }
        else if(subCategoria){
            axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=10&offset=${page}&subcategoria=${estado}`,{
                headers:{
                    token:'JaRvIs92!',
                    correo:'alecapo@gmail.com',
                    password:'123456'
                        }
            })
            .then(e=>setClientes(e.data))
            .catch(e=>console.log(e))
        }else if(estado){
            axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=1000&offset=${page}&estado=${estado}`,{
                headers:{
                    token:'JaRvIs92!',
                    correo:'alecapo@gmail.com',
                    password:'123456'
                        }
            })
            .then(e=>setClientes(e.data))
            .catch(e=>console.log(e))
        }else if(categoria){
            axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=10&offset=${page}&categoria=${categoria}`,{
                headers:{
                    token:'JaRvIs92!',
                    correo:'alecapo@gmail.com',
                    password:'123456'
                        }
            })
            .then(e=>setClientes(e.data))
            .catch(e=>console.log(e))
        }else{
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
    
    const searchHandler = (e) => {
        axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=10&offset=${page}&searchValue=${e.target.value}`,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
                    }
        })
        .then(e=>setClientes(e.data))
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

    useEffect(() => {
        getClientesFiltro();
    }, [page, estado, categoria, subCategoria, kam,probabilidadCierre])
    
    return (
        <div className='px-4 py-5 verClientes'>
            <h1 className="mb-4">INTRANET CCAC</h1>
            <div className="row fondo">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="esadoFiltro">Estado</label>
                        <select name="estadoFiltro" id="estadoFiltro" className="form-control m-0 p-0" onChange={e=>setEstado(e.target.value)}>
                            <option>- Seleccione Filtro -</option>
                                <option value="Imposible de Contactar">Imposible de Contactar</option>
                                <option value="Pendiente Enviar Informacion">Pendiente Enviar Informacion</option>
                                <option value="Revision Informacion">Revision Informacion</option>
                                <option value="Pendiente Enviar Cotizacion">Pendiente Enviar Cotizacion</option>
                                <option value="Cotizacion Enviada">Cotizacion Enviada</option>
                                <option value="Facturado">Facturado</option>
                                <option value="Cerrado Perdido">Cerrado Perdido</option>
                                <option value="Pagado">Pagado</option>
                                <option value="Devuelto">Devuelto</option>
                        </select>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="categoria">Probabilidad De Cierre</label>
                        <select name="categoria" id="categoria" className="form-control m-0 p-0" onChange={e=>setProbabilidadCierre(e.target.value)}>
                        <option value="">- Seleccione -</option>
                            <option value="Identificado">Identificado (0%)</option>
                            <option value="Bajo">Bajo (40%)</option>
                            <option value="Medio">Medio (40%-80%)</option>
                            <option value="Alto">Alto (80% - 90%)</option>
                            <option value="Cerrado Ganado">Cerrado Ganado</option>
                            <option value="Cerrado Perdido">Cerrado Perdido</option>
                        </select>
                    </div>
                    {/* <div className="form-group mt-3">
                        <label htmlFor="subCategoria">Sub Categoria</label>
                        <select name="subCategoria" id="subCategoria" className="form-control"  onChange={e=>setSubCategoria(e.target.value)}>
                                            <option>- Seleccione Filtro -</option>
                                            <option value="Comercio - agricultura">Comercio - agricultura</option>
                                            <option value="Comercio - energia">Comercio - energia y mineria</option>
                                            <option value="Comercio - textiles">Comercio - textiles</option>
                                            <option value="Comercio - ganaderia">Comercio - ganaderia</option>
                                            <option value="Comercio - negocios">Comercio - negocios y finanzas</option>
                                            <option value="Comercio - aeroespacial">Comercio - aeroespacial</option>
                                            <option value="Comercio - tecnologia">Comercio - tecnologia</option>
                                            <option value="Comercio - camara">Comercio - camara de comercio</option>
                                            <option value="Academia - ingenieria">Academia - ingenieria</option>
                                            <option value="Academia - publicidad">Academia - publicidad y mercadeo</option>
                                            <option value="Academia - administracion">Academia - administracion y negocios</option>
                                            <option value="Academia - humanidades">Academia - humanidades</option>
                                            <option value="Academia - arquitectura">Academia - arquitectura</option>
                                            <option value="Academia - leyes">Academia - leyes</option>
                                            <option value="Academia - medicina">Academia - medicina</option>
                                            <option value="Gobierno - gobernacion">Gobierno - gobernacion</option>
                                            <option value="Gobierno - alcaldia">Gobierno - alcaldia</option>
                                            <option value="Gobierno - otro">Gobierno - otro</option>
                                            <option value="Gobierno - Anm">Gobierno - Agencia Nacional Mineria</option>
                                            <option value="Gobierno - Anm">Turismo</option>
                                        </select>
                    </div> */}
                    <div className="form-group mt-3">
                        <label htmlFor="categoria">KAM</label>
                        <select name="categoria" id="categoria" className="form-control m-0 p-0" onChange={e=>setKam(e.target.value)}>
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
                    <div className="form-group mt-2">
                        <label htmlFor="buscar">Buscar Valor</label>
                        <input type="text" name="buscar" id="buscar" className="form-control" onChange={searchHandler} placeholder="Ingrese Empresa, Contacto o Nit para buscar"/>
                    </div>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-2 float-end">
                    <Link to="/clientes/crear"><button className="btn btn-success my-4">Crear Nuevo Cliente</button></Link>
                    <Link to="/participantes"><button className="btn btn-warning my-4">Pasajeros con Documentos</button></Link>
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
                        {/* <th>Telefono</th> */}
                        {/* <th>Celular1</th> */}
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
