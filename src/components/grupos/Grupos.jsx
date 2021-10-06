import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Grupos = () => {
    const [grupos, setGrupos] = useState([])

    const getGrupos = ()=>{
        axios.get(`${process.env.REACT_APP_SERVIDOR}/api/grupos`,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
                    }
        })
        .then(e=>console.log(e.data.Grupos))
        .catch(e=>console.log(e))
    }

    const formHandler = (e)=>{
        e.preventDefault()
        const data = {
            id:e.target['id'].value,
            nombre:e.target['nombre'].value,
        }

        axios.post(`${process.env.REACT_APP_SERVIDOR}/api/grupos`,data,{
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
        getGrupos()
    }, [])

    return (
        <div className="bg-white col-4 p-5">

            <section>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="id">Listado</label>
                        <select name="listado" id="listado" className="form-control">
                            <option>- Revise Listado Actual -</option>
                            {
                                grupos.map(i=>
                                    <option value={i.nombre}>{i.nombre}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
            </section>

            <form onSubmit={formHandler}>
                <div className="form-group">
                    <label htmlFor="id">id</label>
                    <input type="text" name="id" id="id" className="form-control"/>
                </div>
               
                <div className="form-group">
                    <label htmlFor="Nombre">Nombre</label>
                    <input type="text" name="nombre" id="nombre" className="form-control"/>
                </div>
               <button type="submit" className="btn btn-primary mt-2">Guardar</button>
            </form>
        </div>
    )
}

export default Grupos
