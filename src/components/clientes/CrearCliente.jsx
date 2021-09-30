import axios from 'axios'
import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import Cookies from 'universal-cookie';




const CrearCliente = () => {
        const history = useHistory();
        const cookies = new Cookies();
        if(cookies.get('token') !== '3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03'){
        console.log('error de autenticacion')
        history.replace('/login')
        }


           
        const [form, setForm] = useState([])
        
        const formHandler = (e) => {
            setForm({...form, [e.target.name]:e.target.value})
        }

        const submitHandler = () => {
            console.log(form)
            axios.post(`${process.env.REACT_APP_SERVIDOR}/api/clientes`,form,{
                headers:{
                    token:'JaRvIs92!',
                    correo:'alecapo@gmail.com',
                    password:'123456'
                        }
            })
            .then(e=>{
                console.log(e.data)
                alert('Guardado Correctamente')
                history.replace('/clientes/ver')
            })
            .catch(e=>console.log(e))
        }

    return (
        <div className="crearCliente py-5 px-3">
       
    
            <h1 className="mb-4">Crear Cliente</h1>
        <div className="formu mx-4 py-5">
            <form>
                <input type="hidden" name="id" id="id"  />
                    <div className="row">
                        <h4>Datos del cliente</h4>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="empresa">Nombre de la Empresa</label>
                                <input type="text" name="empresa" id="empresa" className="form-control" onChange={formHandler} />
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="nit">Nit</label>
                                        <input type="text" name="nit" id="nit" className="form-control" onChange={formHandler} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="cc">No de CC</label>
                                        <input type="text" name="cc" id="cc" className="form-control" onChange={formHandler} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="pasaporte">No de Pasaporte</label>
                                        <input type="text" name="pasaporte" id="pasaporte" className="form-control" onChange={formHandler} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">          
                                    <div className="form-group">
                                        <label htmlFor="cargo">Cargo</label>
                                        <input type="text" name="cargo" id="cargo" className="form-control" onChange={formHandler}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="cargo">Origen del Contacto</label>
                                        <select name="origen" id="origen" className="form-control" onChange={formHandler} >
                                            <option>- Seleccione - </option>
                                            <option value="Manual - Otro">Manual - Otro</option>
                                            <option value="Redes Sociales">Redes Sociales</option>
                                            <option value="URL - Participantes">URL - Participantes</option>
                                            <option value="URL - Landing Expo2020">URL - Landing Expo2020</option>
                                            <option value="URL - Contactenos">URL - Contactenos</option>
                                            <option value="URL - Mailing">URL - Mailing</option>
                                            <option value="URL - Inscripciones">URL - Inscripciones</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="correo">Correo</label>
                                    <input type="text" name="correo" id="correo" className="form-control" onChange={formHandler}/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="web">Sitio Web</label>
                                    <input type="text" name="web" id="web" className="form-control" onChange={formHandler}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="contacto">Contacto</label>
                                <input type="text" name="contacto" id="contacto" className="form-control" onChange={formHandler}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="telefono">Teléfono</label>
                                <input type="text" name="telefono" id="telefono" className="form-control" onChange={formHandler}/>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="celular1">Celular 1</label>
                                    <input type="text" name="celular1" id="celular1" className="form-control" onChange={formHandler}/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="celular2">Celular 2</label>
                                    <input type="text" name="celular2" id="celular2" className="form-control" onChange={formHandler}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="categoria">Categoría (Interés)</label>
                                        <select name="categoria" id="categoria" className="form-control" onChange={formHandler}>
                                            <option>- Seleccione - </option>
                                            <option value="Comercio">Comercio</option>
                                            <option value="Cultura y Turismo">Cultura y Turismo</option>
                                            <option value="Academia">Academia</option>
                                            <option value="Gobierno">Gobierno</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="subCategoria">Sub Categoría (Perfil)</label>
                                        <select name="subCategoria" id="subCategoria" className="form-control" onChange={formHandler}>
                                            <option>- Seleccione - </option>
                                            <option value="Comercio - Agricultura">Comercio - Agricultura</option>
                                            <option value="Comercio - Energia y Mineria">Comercio - Energia y Mineria</option>
                                            <option value="Comercio - Textiles">Comercio - Textiles</option>
                                            <option value="Comercio - Ganadería">Comercio - Ganadería</option>
                                            <option value="Comercio - Negocios y Finanzas">Comercio - Negocios y Finanzas</option>
                                            <option value="Comercio - Aeroespacial">Comercio - Aeroespacial</option>
                                            <option value="Comercio - Tecnología">Comercio - Tecnología</option>
                                            <option value="Comercio - Cámara de Comercio">Comercio - Cámara de Comercio</option>
                                            <option value="Academia - Ingenieria">Academia - Ingenieria</option>
                                            <option value="Academia - Publicidad">Academia - Publicidad y Mercadeo</option>
                                            <option value="Academia - Administracion">Academia - administracion y negocios</option>
                                            <option value="Academia - Humanidades">Academia - humanidades</option>
                                            <option value="Academia - Arquitectura">Academia - arquitectura</option>
                                            <option value="Academia - Leyes">Academia - Leyes</option>
                                            <option value="Academia - Medicina">Academia - Medicina</option>
                                            <option value="Academia - General">Academia - General</option>
                                            <option value="Gobierno - Gobernacion">Gobierno - Gobernacion</option>
                                            <option value="Gobierno - Alcaldía">Gobierno - Alcaldía</option>
                                            <option value="Gobierno - Otro">Gobierno - Otro</option>
                                            <option value="Gobierno - Agencia Nacional Mineria">Gobierno - Agencia Nacional Mineria</option>
                                            <option value="Turismo">Turismo</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="direccion">Dirección</label>
                                <input type="text" name="direccion" id="direccion" className="form-control" onChange={formHandler} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="ciudad">Ciudad</label>
                                <input type="text" name="ciudad" id="ciudad" className="form-control" onChange={formHandler}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="departamento">Departamento</label>
                                <input type="text" name="departamento" id="departamento" className="form-control" onChange={formHandler}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="estado">Estado</label>
                            <select name="estado" id="estado" className="form-control">
                                <option value="">- Seleccione -</option>
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
                                <option value="Variaciones">Variaciones</option>
                                <option value="Emitir Tiquetes">Emitir Tiquetes</option>
                                <option value="En Logistica">En Logistica</option>
                            </select>
                        </div>
                        <div className="col-md-4 m-0">
                            <label htmlFor="estado">Probabilidad de Cierre</label>
                            <select name="estado" id="estado" className="form-control">
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
                    
                    <div className="row mt-5">
                                <h4>Valor de la Oportunidad</h4>
                                <div className="row">
                                    {/* <div className="col-md-4">
                                        <label htmlFor="estadoCoti">Generar Cotizacion?</label>
                                        <select name="estadoCoti" id="estadoCoti" className="form-control">
                                            <option value='Si'>{cliente.estadoCoti}</option>
                                            <option value='Si'>Si</option>
                                        </select>
                                    </div> */}
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <label htmlFor="cantidad">No. Pasajeros</label>
                                        <input type="text" name="cantidad" id="cantidad" className="form-control" onChange={formHandler} />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="vUnitario">V. Unitario</label>
                                        <input type="text" name="vUnitario" id="vUnitario" className="form-control" onChange={formHandler} />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="total">Valor Total</label>
                                        <input type="text" name="total" id="total" className="form-control" onChange={formHandler} />
                                    </div>
                                </div>
                            </div>
                    <div className="row">
                        <div className="col-md-3">
                                <label htmlFor="formaPago">Forma de Pago</label>
                                <select name="formaPago" id="formaPago" className="form-control" onChange={formHandler}>
                                    <option value="">- Seleccione -</option>
                                    <option value="Tarjeta de Credito">Tarjeta de Credito - </option>
                                    <option value="Efectivo COP">Efectivo COP</option>
                                    <option value="Efectivo USD">Efectivo USD</option>
                                    <option value="Transferencia Davivienda">Transferencia Davivienda</option>
                                </select>
                        </div>
                        {/* <div className="col-md-3">
                            <label htmlFor="grupo">Grupo</label>
                                <select name="grupo" id="grupo" className="form-control">
                                    <option value={cliente.grupo}>{cliente.grupo}</option>
                                    <option value="Octubre">1</option>
                                    <option value="Noviembre">2</option>
                                    <option value="Diciembre">3</option>
                                    <option value="Enero">4</option>
                                    <option value="Febrero">5</option>
                                    <option value="Marzo">6</option>
                                    
                                </select>
                        </div> */}
                    </div>
                    <div className="row my-4">
                        <div className="col-md-6">
                            <label htmlFor="observCoti">Observaciones de la cotizacion</label>
                            <textarea name="observCoti" id="observCoti" cols="30" rows="10" className="form-control" onChange={formHandler}></textarea>
                        </div>
                    </div>
                    <Link to="/clientes/ver"><button type="button" className="btn btn-warning me-2">Regresar</button></Link>
                    <button type="button" className="btn btn-success ms-2" onClick={submitHandler}>Guardar</button>         
            </form>
        </div>
    </div>
    
    )
}

export default CrearCliente
