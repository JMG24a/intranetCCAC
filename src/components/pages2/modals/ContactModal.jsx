import axios from "axios";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import categorias from "../../../hooks/dataCategorias";
import ciudades from "../../../hooks/dataCiudades";
import paises from "../../../hooks/dataPaises";
import priority from "../../../hooks/dataPriority";
import subCategorias from "../../../hooks/dataSubCategorias";
import typeF from "../../../hooks/dataTipo";

const ContactsModal = ({
  id,
  client,
  setAccount,
  fondoNegro,
  setFondoNegro,
  setShowContactModal,
  getAccounts,
}) => {
  const [form, setForm] = useState([]);

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (id) => {
    console.log("ENVIADO", form)
    console.log(id);
    axios
      .put(`${process.env.REACT_APP_SERVIDOR}/api/v1/contacts/`, [form, id])
      .then((res) => {
        getAccounts();
        setShowContactModal(false);
        setFondoNegro(false);
        Swal.fire({
          icon: "success",
          title: "Editado con exito",
          text: "",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {fondoNegro ? (
        <div
          className="fondoNegro"
          onClick={() => {
            setFondoNegro(false);
            setShowContactModal(false);
            setAccount([]);
          }}
        ></div>
      ) : null}
      <div className="fondoContacts py-5" id="contactModal">
        <h1 className="text-white my-3">Informacion de la Persona </h1>
        <div className="bg-white my-3 p-4">
          <div className="row">
            <div className="col-md-6">
              <div className="fila">
                <label htmlFor="contactName">Nombre</label>
                <input
                  type="text"
                  name="contactName"
                  id="contactName"
                  className="form-control"
                  defaultValue={client.contactName}
                  onChange={(e) => formHandler(e)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="fila">
                <label htmlFor="mobile1">Mobile 1</label>
                <input
                  type="text"
                  name="mobile1"
                  id="mobile1"
                  className="form-control"
                  defaultValue={client.mobile1}
                  onChange={(e) => formHandler(e)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="fila">
                <label htmlFor="nit">CC</label>
                <input
                  type="text"
                  name="cc"
                  id="cc"
                  className="form-control"
                  defaultValue={client.cc}
                  onChange={(e) => formHandler(e)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="fila">
                <label htmlFor="mobile2">Mobile 2</label>
                <input
                  type="text"
                  name="mobile2"
                  id="mobile2"
                  className="form-control"
                  defaultValue={client.mobile2}
                  onChange={(e) => formHandler(e)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="fila">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-control"
                  defaultValue={client.email}
                  onChange={(e) => formHandler(e)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="fila">
                <label htmlFor="telephone">Telephone</label>
                <input
                  type="text"
                  name="telephone"
                  id="telephone"
                  className="form-control"
                  defaultValue={client.telephone}
                  onChange={(e) => formHandler(e)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="fila">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                  defaultValue={client.title}
                  onChange={(e) => formHandler(e)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Direccion
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="fila">
                      <label htmlFor="country">Pais</label>
                      <select
                        name="country"
                        id="country"
                        className="form-control"
                        onChange={(e) => formHandler(e)}
                      >
                        <option value={client.country}>{client.country}</option>

                        {paises.map((item, index) => (
                          <option value={item.name} key={index}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="fila">
                      <label htmlFor="city">Ciudad</label>
                      <input type="text" name="city" id="city" className="form-control"/>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="fila">
                      <label htmlFor="address">Direccion</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className="form-control"
                        defaultValue={client.address}
                        onChange={(e) => formHandler(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Deals
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>En Construccion.</strong>
              </div>
            </div>
          </div>
        </div>
        <button
          className="btn btn-primary float-end my-4"
          onClick={() => submitHandler(id)}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default ContactsModal;
