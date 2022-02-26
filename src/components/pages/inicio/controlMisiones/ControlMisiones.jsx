import axios from "axios";
import React, { useEffect, useState } from "react";

const ControlMisiones = () => {
  const [grupos, setGrupos] = useState(0);
  const [cotizacionesPendientes, setCotizacionesPendientes] = useState(0);
  const [cotizacionEnviada, setCotizacionEnviada] = useState(0);
  const [variaciones, setVariaciones] = useState(0);
  const [emitirTiquete, setEmitirTiquete] = useState(0);
  const [devuelto, setDevuelto] = useState(0);
  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVIDOR}/api/grupos`, {
        headers: {
          token: "JaRvIs92!",
          correo: "alecapo@gmail.com",
          password: "123456",
        },
      })
      .then((e) => setGrupos(e.data.Grupos.length))
      .catch((e) => console.log(e));

    await axios
      .get(
        `${
          process.env.REACT_APP_SERVIDOR
        }/api/clientes?limit=2000&offset=${0}&estado=Pendiente Enviar Cotizacion`,
        {
          headers: {
            token: "JaRvIs92!",
            correo: "alecapo@gmail.com",
            password: "123456",
          },
        }
      )
      .then((e) => setCotizacionesPendientes(e.data.length))
      .catch((e) => console.log(e));

    await axios
      .get(
        `${
          process.env.REACT_APP_SERVIDOR
        }/api/clientes?limit=2000&offset=${0}&estado=Cotizacion Enviada`,
        {
          headers: {
            token: "JaRvIs92!",
            correo: "alecapo@gmail.com",
            password: "123456",
          },
        }
      )
      .then((e) => setCotizacionEnviada(e.data.length))
      .catch((e) => console.log(e));

    await axios
      .get(
        `${
          process.env.REACT_APP_SERVIDOR
        }/api/clientes?limit=2000&offset=${0}&estado=Variaciones`,
        {
          headers: {
            token: "JaRvIs92!",
            correo: "alecapo@gmail.com",
            password: "123456",
          },
        }
      )
      .then((e) => setVariaciones(e.data.length))
      .catch((e) => console.log(e));

    await axios
      .get(
        `${
          process.env.REACT_APP_SERVIDOR
        }/api/clientes?limit=2000&offset=${0}&estado=Emitir Tiquete`,
        {
          headers: {
            token: "JaRvIs92!",
            correo: "alecapo@gmail.com",
            password: "123456",
          },
        }
      )
      .then((e) => setEmitirTiquete(e.data.length))
      .catch((e) => console.log(e));

    await axios
      .get(
        `${
          process.env.REACT_APP_SERVIDOR
        }/api/clientes?limit=2000&offset=${0}&estado=Devuelto`,
        {
          headers: {
            token: "JaRvIs92!",
            correo: "alecapo@gmail.com",
            password: "123456",
          },
        }
      )
      .then((e) => setDevuelto(e.data.length))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="bg-white p-4 rounded">
        <div className="row">
          <div className="col-md-2 text-center">
            <h1>{grupos}</h1>
            <h4> Cantidad de Grupos</h4>
          </div>
          <div className="col-md-2 text-center">
            <h1>{cotizacionesPendientes}</h1>
            <h4>Cotizaciones Pendientes</h4>
          </div>
          <div className="col-md-2 text-center">
            <h1>{cotizacionEnviada}</h1>
            <h4>Cotizaciones Enviadas</h4>
          </div>
          <div className="col-md-2 text-center">
            <h1>{variaciones}</h1>
            <h4>Variaciones</h4>
          </div>
          <div className="col-md-2 text-center">
            <h1>{emitirTiquete}</h1>
            <h4>Emitir Tiquetes</h4>
          </div>
          <div className="col-md-2 text-center">
            <h1>{devuelto}</h1>
            <h4>Devueltos</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlMisiones;
