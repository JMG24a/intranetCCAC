import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const Logistica = () => {

    const [cliente, setCliente] = useState([])
   
    const {id} = useParams();
    
    const getCliente = ()=>{
        axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes/${id}`,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
                    }
        })
        .then(e=>setCliente(e.data))
        .catch(e=>console.log(e))
    }

    const submitHandler = (e)=>{
        e.preventDefault()

        const data = {
            idCliente:cliente.id,
            tiquetesAereos:e.target['tiquetesAereos'].value,
            noVuelo:e.target['noVuelo'].value,
            fechaVueloIda:e.target['fechaVueloIda'].value,
            fechaVueloVuelta:e.target['fechaVueloVuelta'].value,
            otrosVuelos:e.target['otrosVuelos'].value,
            hotel:e.target['hotel'].value,
            nombreHotel:e.target['nombreHotel'].value,
            acomodacion:e.target['acomodacion'].value,
            noHabitacion:e.target['noHabitacion'].value,
            otrosHoteles:e.target['otrosHoteles'].value,
            entradasExpo:e.target['entradasExpo'].value,
            restaurantes:e.target['restaurantes'].value,
        }

        axios.post(`${process.env.REACT_APP_SERVIDOR}/api/logistica`,data,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
                    }
        })
        .then(e=>{
            console.log(e.data)
            alert('Actualizado')
        })
        .catch(e=>console.log(e))


        console.log(data)
    }    
    
    useEffect(() => {
        getCliente()
    }, [])

    return (
        <div className="container m-5 text-white">
            <h3> Cliente id: 802</h3>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="Empresa">Empresa</label>
                        <input type="text" className="form-control" name="Empresa" id="Empresa" defaultValue={cliente.empresa} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="Contacto">Contacto</label>
                        <input type="text" className="form-control" name="Contacto" id="Contacto" defaultValue={cliente.contacto} />
                    </div>
                </div>
            </div>
    <form onSubmit={submitHandler}> 
        <section className="my-5">
            <h4>Tiquetes de Avion</h4> 
           <div className="col-md-2">
                <select name="tiquetesAereos" id="tiquetesAereos" className="form-control" required>
                    <option>-- Seleccione --</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                </select>
           </div>
           <div className="row">
               <div className="col-md-4">
                   <div className="form-group">
                       <label htmlFor="noVuelo">no Vuelo</label>
                       <input type="text" className="form-control" name="noVuelo" id="noVuelo" />
                   </div>
                    <label htmlFor="otrosVuelos">Vuelos Adicionales</label>
                   <textarea className="form-control" name="otrosVuelos" id="otrosVuelos" cols="30" rows="3"></textarea>
               </div>
               <div className="col-md-4">
                   <div className="form-group">
                       <label htmlFor="fechaVueloIda">fecha Vuelo Ida</label>
                       <input type="date" className="form-control" name="fechaVueloIda" id="fechaVueloIda" />
                   </div>
               </div>
               <div className="col-md-4">
                   <div className="form-group">
                       <label htmlFor="fechaVueloVuelta">fecha Vuelo Vuelta</label>
                       <input type="date" className="form-control" name="fechaVueloVuelta" id="fechaVueloVuelta" />
                   </div>
               </div>
           </div>
        </section>
        <section className="my-5">
            <h4>Hoteles</h4> 
           <div className="col-md-2">
                <select name="hotel" id="hotel" className="form-control">
                    <option>-- Seleccione --</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                </select>
           </div>
           <div className="row">
               <div className="col-md-4">
                   <div className="form-group">
                       <label htmlFor="nombreHotel">Nombre Hotel</label>
                       <input type="text" className="form-control" name="nombreHotel" id="nombreHotel" />
                   </div>
                    <label htmlFor="otrosHoteles">Otros Hoteles</label>
                   <textarea className="form-control" name="otrosHoteles" id="otrosHoteles" cols="30" rows="3"></textarea>
               </div>
               <div className="col-md-4">
                   <div className="form-group">
                       <label htmlFor="acomodacion">Acomodacion</label>
                       <input type="text" className="form-control" name="acomodacion" id="acomodacion" />
                   </div>
               </div>
               <div className="col-md-4">
                   <div className="form-group">
                       <label htmlFor="noHabitacion">No Habitacion</label>
                       <input type="text" className="form-control" name="noHabitacion" id="noHabitacion" />
                   </div>
               </div>
           </div>
            

        </section>
        <section className="my-5">
            <h4>Restaurantes</h4>
            <textarea name="restaurantes" id="restaurantes" cols="30" rows="10"></textarea>

        </section>
        <section className="my-5">
            <h4>Entradas y Otros</h4>
                 <div className="form-group">
                       <label htmlFor="entradasExpo">Entradas Expo</label>
                       <select name="entradasExpo" id="entradasExpo" className="form-control">
                            <option>-- Seleccione --</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                   </div>


        </section>
        <button className="btn btn-warning">Guardar</button>
    </form>
        </div>
    )
}

export default Logistica
