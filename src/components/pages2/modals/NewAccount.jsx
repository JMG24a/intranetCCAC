import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import categorias from "../../../hooks/dataCategorias";
import subCategorias from "../../../hooks/dataSubCategorias";
import axios from "axios";
import typeF from "../../../hooks/dataTipo";
import { useGetPartida } from "../../../hooks/useGetPartida";

const NewAccount = ({ getAccounts, setShowNewAccountModal }) => {
  const [cate, setCate] = useState(categorias);
  const [subCate, setSubCate] = useState(subCategorias);
  const [getPartida, setPartida] = useGetPartida();
  const [isPartida, setIsPartida] = useState(false);
  const [form, setForm] = useState({
    type: "",
    priority: "",
    accountName: "",
    email: "",
    categoria: "",
    subCategoria: "",
    partida: "- Partida -",
    products: "",
  });

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePartida = (partida) => {
    setForm({
      ...form,
      partida: partida
    })
    setIsPartida(false)
  }

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
    } else if (form.subCategoria === "" || form.subCategoria === "- Seleccione -") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Revisa el campo Sub Categoria!",
      });
      return;
    }else if (form.partida === "" || form.partida === "- Partida -"){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Revisa el campo Partida!",
      });
    }
    else if (form.products === "" ){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Revisa el campo Productos!",
      });
    }

    //guardo en DB
    console.log(form)

    await axios
      .post(`${process.env.REACT_APP_SERVIDOR}/api/v1/accounts/new`, form)
      .then((event) => {
        console.log(event.data)
        Swal.fire({
          icon: "success",
          title: "Creado con exito",
          text: "",
        });
      })
      .catch((err) => {
        console.error(err)
        Swal.fire({
          icon: "Error",
          title: "Error de conexión",
          text: "",
        });
      });
    // Cerrado del modal y vaciado del doc

    setForm({
      type: "",
      priority: "",
      accountName: "",
      email: "",
      categoria: "",
      subCategoria: "",
      partida: "",
      products: "",
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
        <div className="contenedorSubNewACC position-relative">
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

                  {typeF.map((i, index) => (
                    <option key={index} value={i}>
                      {i}
                    </option>
                  ))}
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
          <div className="row  position-relative">
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
              <div className="left-inner-addon input-container">
                <i className=""></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="products"
                  onChange={(e) => {
                    formHandler(e);
                  }}
                  name="products"
                  id="products"
                  value={form.products}
                />
              </div>
              <div className="left-inner-addon input-container">
                <i className=""></i>
                <input
                  value={form.partida}
                  className="form-control"
                  onClick={()=>setIsPartida(!isPartida)}
                />
              </div>
              <button onClick={() => submitForm()}>CREAR NUEVO</button>
            </div>
          </div>
          {!!isPartida &&
            <div style={{
              position: "absolute",
              width: "100%",
              height: "-webkit-fill-available",
              padding: "20px",
              overflowY: "scroll",
              top: "0px",
              left: "0px",
              borderRadius: "30px",
              background: "#600e26"
            }}>
              {getPartida.map((i, index) => (
                <p
                  key={index}
                  className="bg-light p-2 rounded"
                  style={{cursor: "pointer"}}
                  onClick={()=>handlePartida(i)}
                >
                  {i}
                </p>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default NewAccount;
