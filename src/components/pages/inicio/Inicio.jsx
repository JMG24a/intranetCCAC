import React from "react";
import useLogin from "../../../hooks/useLogin";
import ControlMisiones from "./controlMisiones/ControlMisiones";
import Solicitudes from "./solicitudes/Solicitudes";

const Inicio = () => {
  useLogin();

  return (
    <div>
      <div id="Solicitudes">
        <div className="container">
          <h1 className="text-white ms-4 mb-4">Informacion General</h1>
          <Solicitudes />
        </div>
      </div>
      <div id="control Misiones" className="my-5">
        <div className="container">
          <h1 className="text-white ms-4 mb-4">Control Misiones</h1>
          <ControlMisiones />
        </div>
      </div>
    </div>
  );
};

export default Inicio;
