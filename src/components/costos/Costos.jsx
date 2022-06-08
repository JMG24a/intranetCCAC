import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'
import Cookies from 'universal-cookie';


const Costos = () => {
    const history = useHistory();
    const cookies = new Cookies();
    if(cookies.get('token') !== '3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03'){
    console.log('error de autenticacion')
    history.replace('/login')
    }

    const [arrayProductos, setArrayProductos] = useState([])
    const [total, setTotal] = useState(0)
    const [costo, setCosto] = useState([])


    const agregarProducto = () => {
        const producto = document.getElementById('producto').value
        const cantidad = document.getElementById('cantidad').value
        const precio =  document.getElementById('precio').value
        const tot = parseFloat(cantidad) * parseFloat(precio)
        setArrayProductos([...arrayProductos, {cantidad: cantidad, total: tot, productos: producto}])
        setTotal(total + tot)
        console.log(total)
    }

    const getCostos = ()=>{
        axios.get(`${process.env.REACT_APP_SERVIDOR}/api/costos`,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
                    }
        })
        .then(e=>setCosto(e.data.Costos))
        .catch(e=>console.log(e))
    }

    useEffect(() => {
        getCostos();
    }, [])

    return (
        <div className="mt-5 p-5 bg-white">
            <h1 className="my-5">CALCULADORA DE COSTOS</h1>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Cantidad durante Mision </th>
                            <th>Servicio Solicitado</th>
                            <th>Seleccion Actividad para el precio</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" name="cantidad" id="cantidad" className="form-control" /></td>
                            <td>
                                <select name="producto" id="producto" className="form-control">
                                    {
                                        costo.map(i=>
                                            <>
                                                <option value={i.lugar}>{i.lugar}</option>
                                            </>
                                        )
                                    }
                                </select>
                            </td>
                            <td>
                                <select name="precio" id="precio" className="form-control">
                                    {
                                        costo.map(i=>
                                        <option value={i.precio}>{i.lugar}</option>
                                        )
                                    }
                                </select>
                            </td>
                            <td><button className="btn btn-primary" onClick={agregarProducto}>Agregar</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="table-responsive">
                <table className="table table-light table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Cantidad</th>
                            <th>Producto</th>
                            <th>Precio USD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            arrayProductos.map((i,index)=>
                                <tr key={index}>
                                    <td>{i.cantidad}</td>
                                    <td>{i.productos}</td>
                                    <td>{i.total}</td>
                                </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
            <div className="form-group my-5 col-md-4">
                <label htmlFor="total">Total Costo x Pasajero USD</label>
                <input type="text" name="total" id="total" className="form-control" value={total}/>
            </div>
        </div>
    )
}

export default Costos
