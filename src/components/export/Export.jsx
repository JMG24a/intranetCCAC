import axios from "axios";
import React,{ useEffect, useState } from "react";
import ReactExport from "react-data-export";
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


const Export = () => {

    const history = useHistory();   
    const cookies = new Cookies();
    if(cookies.get('token') !== '3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03'){
      console.log('error de autenticacion')
      history.replace('/login')
    }

    const [ordenes, setOrdenes] = useState([])

    const getOrdenes = () => {
        axios.get(`${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=1000&offset=0`,{
            headers:{
                token:'JaRvIs92!',
                correo:'alecapo@gmail.com',
                password:'123456'
            }
        })
        .then(e=>{
            setOrdenes(e.data)
            // console.log(e.data.ordenes)
        })
        .catch(e=>console.log(e.data))
    }
    console.log(ordenes)

    useEffect(() => {
        getOrdenes()
    }, [])
    
    return (
        <div className="container2 py-5">
            <h1 className="text-white">Generar XMLS </h1>
            <ExcelFile>
                    <ExcelSheet data={ordenes} name="Employees">
                        <ExcelColumn label="FechaFinV" value="FechaFinV"/>
                        <ExcelColumn label="FechaInicioV" value="FechaInicioV"/>
                        <ExcelColumn label="alergias" value="alergias"/>
                        <ExcelColumn label="cantidad" value="cantidad"/>
                        <ExcelColumn label="cargo" value="cargo"/>
                        <ExcelColumn label="categoria" value="categoria"/>
                        <ExcelColumn label="cc" value="cc"/>
                        <ExcelColumn label="celular1" value="celular1"/>
                        <ExcelColumn label="celular2" value="celular2"/>
                        <ExcelColumn label="ciudad" value="ciudad"/>
                        <ExcelColumn label="contacto" value="contacto"/>
                        <ExcelColumn label="contactoEmergencia" value="contactoEmergencia"/>
                        <ExcelColumn label="correo" value="correo"/>
                        <ExcelColumn label="createdAt" value="createdAt"/>
                        <ExcelColumn label="departamento" value="departamento"/>
                        <ExcelColumn label="direccion" value="direccion"/>
                        <ExcelColumn label="emailMK" value="emailMK"/>
                        <ExcelColumn label="empresa" value="empresa"/>
                        <ExcelColumn label="eps" value="eps"/>
                        <ExcelColumn label="estado" value="estado"/>
                        <ExcelColumn label="estadoCoti" value="estadoCoti"/>
                        <ExcelColumn label="fechaLlamada" value="fechaLlamada"/>
                        <ExcelColumn label="fechaVacuna" value="fechaVacuna"/>
                        <ExcelColumn label="formaPago" value="formaPago"/>
                        <ExcelColumn label="grupo" value="grupo"/>
                        <ExcelColumn label="id" value="id"/>
                        <ExcelColumn label="kam" value="kam"/>
                        <ExcelColumn label="mesViaje" value="mesViaje"/>
                        <ExcelColumn label="nit" value="nit"/>
                        <ExcelColumn label="noCotizacion" value="noCotizacion"/>
                        <ExcelColumn label="noFactura" value="noFactura"/>
                        <ExcelColumn label="observCoti" value="observCoti"/>
                        <ExcelColumn label="observLlamada" value="observLlamada"/>
                        <ExcelColumn label="observaciones" value="observaciones"/>
                        <ExcelColumn label="origen" value="origen"/>
                        <ExcelColumn label="pasaporte" value="pasaporte"/>
                        <ExcelColumn label="pasaporteFile" value="pasaporteFile"/>
                        <ExcelColumn label="prepagada" value="prepagada"/>
                        <ExcelColumn label="probabilidadCierre" value="probabilidadCierre"/>
                        <ExcelColumn label="rh" value="rh"/>
                        <ExcelColumn label="subCategoria" value="subCategoria"/>
                        <ExcelColumn label="telefono" value="telefono"/>
                        <ExcelColumn label="telefonoEmergencia" value="telefonoEmergencia"/>
                        <ExcelColumn label="total" value="total"/>
                        <ExcelColumn label="vUnitario" value="vUnitario"/>
                        <ExcelColumn label="vacunaFile" value="vacunaFile"/>
                        <ExcelColumn label="vencPasaporte" value="vencPasaporte"/>
                        <ExcelColumn label="visaAmericana" value="visaAmericana"/>
                        <ExcelColumn label="web" value="web"/>
                    </ExcelSheet>                 
            </ExcelFile>
        </div>
    )
}

export default Export
