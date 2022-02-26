import axios from "axios";
import React, { useEffect, useState } from "react";

const Solicitudes = () => {
  const [estado, setEstado] = useState(0);
  const [mailing, setMailing] = useState(0);
  const [clientes, setClientes] = useState(0);
  const getData = async () => {
    await axios
      .get(
        `${
          process.env.REACT_APP_SERVIDOR
        }/api/clientes?limit=2000&offset=${0}&estado=Pendiente Enviar Informacion`,
        {
          headers: {
            token: "JaRvIs92!",
            correo: "alecapo@gmail.com",
            password: "123456",
          },
        }
      )
      .then((e) => setEstado(e.data.length))
      .catch((e) => console.log(e));

    await axios
      .get(
        `${
          process.env.REACT_APP_SERVIDOR
        }/api/clientes?limit=2000&offset=${0}&origen=URL - Mailing`,
        {
          headers: {
            token: "JaRvIs92!",
            correo: "alecapo@gmail.com",
            password: "123456",
          },
        }
      )
      .then((e) => setMailing(e.data.length))
      .catch((e) => console.log(e));

    await axios
      .get(
        `${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=2000&offset=${0}`,
        {
          headers: {
            token: "JaRvIs92!",
            correo: "alecapo@gmail.com",
            password: "123456",
          },
        }
      )
      .then((e) => setClientes(e.data.length))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="bg-white p-4 rounded">
      <div className="row">
        <div className="col-md-3 text-center">
          <h1>{estado}</h1>
          <h4>Pendiente Enviar Información</h4>
        </div>
        <div className="col-md-3 text-center">
          <h1>{mailing}</h1>
          <h4>Lista de Mailing</h4>
        </div>
        <div className="col-md-3 text-center">
          <h1>{clientes}</h1>
          <h4>Cantidad de Clientes</h4>
        </div>
      </div>
    </div>
  );
};

export default Solicitudes;
