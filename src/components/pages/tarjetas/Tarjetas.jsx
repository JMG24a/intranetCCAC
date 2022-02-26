import React from "react";
import { useState } from "react";
import categorias from "../../../hooks/dataCategorias";
import subCategorias from "../../../hooks/dataSubCategorias";
import Swal from "sweetalert2";
import axios from "axios";

const Tarjetas = () => {
  const [form, setForm] = useState(false);

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!form.empresa) {
      Swal.fire("Error!", "Ingrese Nombre de la Empresa!", "error");
      return;
    }
    if (!form.contacto) {
      Swal.fire("Error!", "Ingrese Nombre del contacto!", "error");
      return;
    }
    if (!form.celular1) {
      Swal.fire("Error!", "Ingrese numero de celular!", "error");
      return;
    }
    if (!form.correo) {
      Swal.fire("Error!", "Ingrese correo", "error");
      return;
    }
    if (!form.categoria) {
      Swal.fire("Error!", "Ingrese una Categoria", "error");
      return;
    }
    if (!form.subCategoria) {
      Swal.fire("Error!", "Ingrese una Sub Categoria", "error");
      return;
    }
    if (!form.pais) {
      Swal.fire("Error!", "Seleccione un Pais", "error");
      return;
    }
    if (!form.tipoCliente) {
      Swal.fire("Error!", "Seleccione un Tipo de Cliente", "error");
      return;
    }

    setForm({ ...form, origen: "Manual - Otro" });

    axios
      .post(`${process.env.REACT_APP_SERVIDOR}/api/clientes`, form)
      .then((e) => {
        console.log(e);
        Swal.fire("Hurraaaa!", "Creado Exitosamente", "success");
        document.getElementById("formulario").reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="bg-white p-5">
      <div className="col-md-4 col-sm-12">
        <h1>Ingresa una Tarjeta</h1>
        <form action="" id="formulario" onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="Empresa">Empresa</label>
            <input
              type="text"
              name="empresa"
              id="empresa"
              className="form-control"
              onChange={formHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contacto">Contacto</label>
            <input
              type="text"
              name="contacto"
              id="contacto"
              className="form-control"
              onChange={formHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Telefono</label>
            <input
              type="text"
              name="telefono"
              id="telefono"
              className="form-control"
              onChange={formHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="celular1">Celular</label>
            <input
              type="text"
              name="celular1"
              id="celular1"
              className="form-control"
              onChange={formHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo</label>
            <input
              type="text"
              name="correo"
              id="correo"
              className="form-control"
              onChange={formHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoria">Categoria</label>
            <select
              name="categoria"
              id="categoria"
              className="form-control"
              onChange={formHandler}
            >
              {categorias.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="subCategoria">Sub Categoria</label>
            <select
              name="subCategoria"
              id="subCategoria"
              className="form-control"
              onChange={formHandler}
            >
              {subCategorias.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="pais">Pais</label>
            <select
              name="pais"
              id="pais"
              className="form-control"
              onChange={formHandler}
            >
              <option value="- Seleccione -">- Seleccione -</option>
              <option value="Emiratos Arabes Unidos">
                Emiratos Arabes Unidos
              </option>
              <option value="Colombia">Colombia</option>
              <option value="Egipto">Egipto</option>
              <option value="Arabia Saudita">Arabia Saudita</option>
              <option value="Oman">Oman</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="tipoCliente">Tipo de Cliente</label>
            <select
              name="tipoCliente"
              id="tipoCliente"
              className="form-control"
              onChange={formHandler}
            >
              <option value="- Seleccione -">- Seleccione -</option>
              <option value="Importador">Importador</option>
              <option value="Exportador">Exportador</option>
              <option value="Productor">Productor</option>
              <option value="Cliente Final">Cliente Final</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tarjetas;
