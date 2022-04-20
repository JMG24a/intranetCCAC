import React, { useEffect, useState } from "react";
import categorias from "../../../hooks/dataCategorias";
import subCategorias from "../../../hooks/dataSubCategorias";
import Swal from "sweetalert2";
import axios from "axios";

const NewAccount = ({ getAccounts, setShowNewAccountModal }) => {
  const [cate, setCate] = useState(categorias);
  const [subCate, setSubCate] = useState(subCategorias);
  const [form, setForm] = useState({
    type: "",
    priority: "",
    accountName: "",
    email: "",
    categoria: "",
    subCategoria: "",
  });

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    // Validaciones
    if (form.type === "" || form.type === "- Seleccione -") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Revisa el campo Tipo!",
      });
      return;
    } else if (form.priority === "" || form.priority === "- Seleccione -") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Revisa el campo Prioridad!",
      });
      return;
    } else if (form.accountName === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Revisa el campo Nombre!",
      });
      return;
    } else if (form.email === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Revisa el campo email!",
      });
      return;
    } else if (form.categoria === "" || form.categoria === "- Seleccione -") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Revisa el campo Categoria!",
      });
      return;
    } else if (
      form.subCategoria === "" ||
      form.subCategoria === "- Seleccione -"
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Revisa el campo Sub Categoria!",
      });
      return;
    }

    // guardo en DB

    await axios
      .post(`${process.env.REACT_APP_SERVIDOR}/api/v1/accounts/new`, form)
      .then((event) => console.log(event.data))
      .catch((err) => console.error(err));
    // Cerrado del modal y vaciado del doc

    setForm({
      type: "",
      priority: "",
      accountName: "",
      email: "",
      categoria: "",
      subCategoria: "",
    });
    setShowNewAccountModal(false);

    getAccounts();
  };

  const closeModal = () => {
    setShowNewAccountModal(false);
  };

  return (
    <div id="fondoBlack">
      <div className="contenedorNewACC" id="newAccountModal">
        <div
          style={{
            color: "white",
            float: "right",
            marginTop: "-15px",
            marginRight: "-15px",
          }}
          onClick={() => closeModal()}
        >
          <i className="fa fa-times fa-2x"></i>
        </div>
        <h2 className="mb-4 mt-3">CREAR NUEVA CUENTA</h2>
        <div className="contenedorSubNewACC">
          <div className="row mb-4 firstSelect">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="type" className="labelNewAccount">
                  TIPO
                </label>
                <select
                  className="form-control"
                  name="type"
                  id="type"
                  onChange={(e) => {
                    formHandler(e);
                  }}
                  value={form.type}
                >
                  <option>- Seleccione -</option>
                  <option value="Client">Client</option>
                  <option value="Partner">Partner</option>
                  <option value="Vendor">Vendor</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="type" className="labelNewAccount">
                  PRIORIDAD
                </label>
                <select
                  className="form-control"
                  name="priority"
                  id="priority"
                  onChange={(e) => {
                    formHandler(e);
                  }}
                  value={form.priority}
                >
                  <option>- Seleccione -</option>
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="left-inner-addon input-container">
                <i className="fa fa-user"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="accountName"
                  onChange={(e) => {
                    formHandler(e);
                  }}
                  name="accountName"
                  id="accountName"
                  value={form.accountName}
                />
              </div>
              <div className="left-inner-addon input-container">
                <i className="fa fa-envelope"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => {
                    formHandler(e);
                  }}
                  name="email"
                  id="email"
                  value={form.email}
                />
              </div>
              <div className="left-inner-addon input-container">
                <i className="fa fa-globe"></i>
                <select
                  name="categoria"
                  value={form.categoria}
                  id="categoria"
                  className="form-control"
                  onChange={(e) => {
                    formHandler(e);
                  }}
                >
                  {cate.map((i, index) => (
                    <option value={i} key={index}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
              <div className="left-inner-addon input-container">
                <i className="fa fa-layer-group"></i>
                <select
                  value={form.subCategoria}
                  name="subCategoria"
                  id="subCategoria"
                  className="form-control"
                  onChange={(e) => {
                    formHandler(e);
                  }}
                >
                  {subCate.map((i, index) => (
                    <option value={i} key={index}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={() => submitForm()}>CREAR NUEVO</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAccount;
