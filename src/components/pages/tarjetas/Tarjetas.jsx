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

    // if (!form.empresa) {
    //   Swal.fire("Error!", "Ingrese Nombre de la Empresa!", "error");
    //   return;
    // }
    // if (!form.contacto) {
    //   Swal.fire("Error!", "Ingrese Nombre del contacto!", "error");
    //   return;
    // }
    // if (!form.celular1) {
    //   Swal.fire("Error!", "Ingrese numero de celular!", "error");
    //   return;
    // }
    // if (!form.correo) {
    //   Swal.fire("Error!", "Ingrese correo", "error");
    //   return;
    // }
    // if (!form.categoria) {
    //   Swal.fire("Error!", "Ingrese una Categoria", "error");
    //   return;
    // }
    // if (!form.subCategoria) {
    //   Swal.fire("Error!", "Ingrese una Sub Categoria", "error");
    //   return;
    // }
    // if (!form.pais) {
    //   Swal.fire("Error!", "Seleccione un Pais", "error");
    //   return;
    // }
    // if (!form.tipoCliente) {
    //   Swal.fire("Error!", "Seleccione un Tipo de Cliente", "error");
    //   return;
    // }

    axios
      .post(`${process.env.REACT_APP_SERVIDOR}/api/clientes`, { ...form, origen: "Manual - Tarjetas" })
      .then((e) => {
        console.log(e);
        Swal.fire("Hurraaaa!", "Creado Exitosamente", "success");
        document.getElementById("formulario").reset();
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(form);
  };
  return (
    <div className="bg-white p-5">
      <form action="" id="formulario" onSubmit={submitHandler}>
        <h1>Ingresa una Tarjeta</h1>
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <label htmlFor="Empresa">Empresa</label>
              <input type="text" name="empresa" id="empresa" className="form-control" onChange={formHandler} />
            </div>
            <div className="form-group">
              <label htmlFor="celular1">WhatsApp</label>
              <input type="text" name="celular1" id="celular1" className="form-control" onChange={formHandler} />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">Telefono Fijo</label>
              <input type="text" name="telefono" id="telefono" className="form-control" onChange={formHandler} />
            </div>
            <div className="form-group">
              <label htmlFor="celular2">Movil</label>
              <input type="text" name="celular2" id="celular2" className="form-control" onChange={formHandler} />
            </div>

            <div className="form-group">
              <label htmlFor="categoria">Categoria</label>
              <select name="categoria" id="categoria" className="form-control" onChange={formHandler}>
                {categorias.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripcion de la empresa</label>
              <textarea className="form-control" name="descripcion" id="descripcion" cols="30" rows="5" onChange={formHandler}></textarea>
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Guardar
            </button>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="contacto">Nombre del Contacto</label>
                  <input type="text" name="contacto" id="contacto" className="form-control" onChange={formHandler} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="cargo">Cargo</label>
                  <input type="text" name="cargo" id="cargo" className="form-control" onChange={formHandler} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="pais">Pais</label>
              <select name="pais" id="pais" className="form-control" onChange={formHandler}>
                <option value="- Seleccione -">- Seleccione -</option>
                <option value="Emiratos Arabes Unidos">Emiratos Arabes Unidos</option>
                <option value="Egipto">Egipto</option>
                <option value="Arabia Saudita">Arabia Saudita</option>
                <option value="Colombia">Colombia</option>
                <option value="Oman">Oman</option>
                <option value="Peru">Peru</option>
                <option value="Chile">Chile</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Argentina">Argentina</option>
                <option value="Brasil">Brasil</option>
                <option value="Mexico">Mexico</option>
                <option value="Panama">Panama</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Haiti">Haiti</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="tipoCliente">Tipo de Cliente</label>
              <select name="tipoCliente" id="tipoCliente" className="form-control" onChange={formHandler}>
                <option value="- Seleccione -">- Seleccione -</option>
                <option value="Importador">Importador</option>
                <option value="Exportador">Exportador</option>
                <option value="Productor">Productor</option>
                <option value="Cliente Final">Cliente Final</option>
              </select>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="correo">Correo</label>
                  <input type="text" name="correo" id="correo" className="form-control" onChange={formHandler} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="web">Web</label>
                  <input type="text" name="web" id="web" className="form-control" onChange={formHandler} />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subCategoria">Sub Categoria</label>
              <select name="subCategoria" id="subCategoria" className="form-control" onChange={formHandler}>
                {subCategorias.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Tarjetas;
