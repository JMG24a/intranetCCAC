import axios from "axios";
import Swal from "sweetalert2";
import React, { useState } from "react";
import categorias from "../../../hooks/dataCategorias";
import ciudades from "../../../hooks/dataCiudades";
import paises from "../../../hooks/dataPaises";
import priority from "../../../hooks/dataPriority";
import subCategorias from "../../../hooks/dataSubCategorias";
import typeF from "../../../hooks/dataTipo";

const AccountModal = ({
  id,
  account,
  setAccount,
  fondoNegro,
  setFondoNegro,
  setshowAccountModal,
  getAccounts,
}) => {
  const [form, setForm] = useState([]);

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (id) => {
    console.log(form)
    axios
      .put(`${process.env.REACT_APP_SERVIDOR}/api/v1/accounts/`, [form, id])
      .then((res) => {
        getAccounts();
        setshowAccountModal(false);
        setFondoNegro(false);
        Swal.fire({
          icon: "success",
          title: "Editado con exito",
          text: "",
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {fondoNegro ? (
        <div
          className="fondoNegro"
          onClick={() => {
            setFondoNegro(false);
            setshowAccountModal(false);
            setAccount([]);
          }}
        ></div>
      ) : null}
      <div className="fondoContacts py-5" id="contactModal">
        <h1 className="text-white my-3">Informacion de la Cuenta</h1>
        <div className="bg-white p-4 rounded d-flex justify-content-around">
          <div className="row">
            <div className="col-md-6">
              <div className="fila" style={{minWidth: "150px", marginRight: "50px", marginLeft: "50px"}}>
                <label htmlFor="type">Tipo</label>
                <select
                  name="type"
                  id="type"
                  className="form-control"
                  onChange={(e) => formHandler(e)}
                >
                  <option value={account.type}>{account.type}</option>
                  {typeF.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="fila" style={{minWidth: "150px", marginLeft: "170px"}}>
                <label htmlFor="accountValue">Account Value</label>
                <input
                  type="text"
                  name="accountValue"
                  id="accountValue"
                  className="form-control"
                  defaultValue={account.accountValue}
                  onChange={(e) => formHandler(e)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white my-3 p-4">
          <div className="row">
            <div className="col-md-6">
              <div className="fila">
                <label htmlFor="accountName">Nombre</label>
                <input
                  type="text"
                  name="accountName"
                  id="accountName"
                  className="form-control"
                  defaultValue={account.accountName}
                  onChange={(e) => formHandler(e)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="fila">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-control"
                  defaultValue={account.email}
                  onChange={(e) => formHandler(e)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="fila">
                <label htmlFor="nit">Nit</label>
                <input
                  type="text"
                  name="nit"
                  id="nit"
                  className="form-control"
                  defaultValue={account.nit}
                  onChange={(e) => formHandler(e)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="fila">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  name="website"
                  id="website"
                  className="form-control"
                  defaultValue={account.website}
                  onChange={(e) => formHandler(e)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="fila">
                <label htmlFor="categoria">Categoria</label>
                <select
                  name="categoria"
                  id="categoria"
                  className="form-control"
                  onChange={(e) => formHandler(e)}
                >
                  <option value={account.categoria}>
                    {account.categoria}{" "}
                  </option>
                  {categorias.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="fila">
                <label htmlFor="subCategoria">SubCategoria</label>
                <select
                  name="subCategoria"
                  id="subCategoria"
                  className="form-control"
                  onChange={(e) => formHandler(e)}
                >
                  <option value={account.categoria}>
                    {account.subCategoria}
                  </option>
                  {subCategorias.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="fila">
                <label htmlFor="origen">Origen</label>
                <input
                  type="text"
                  name="origen"
                  id="origen"
                  className="form-control"
                  defaultValue={account.origen}
                  onChange={(e) => formHandler(e)}
                />
              </div>
            </div>
          </div>
          <div className="row my-4">
            <label htmlFor="comments">Comentarios</label>
            <textarea
              name="comments"
              id="comments"
              cols="30"
              rows="5"
              className="form-control"
              onChange={(e) => formHandler(e)}
              defaultValue={JSON.stringify(account.comments)}
            ></textarea>
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
                Ubicacion
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
                        <option value={account.country}>
                          {account.country}
                        </option>

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
                      <input
                        name="city"
                        id="city"
                        className="form-control"
                        onChange={(e) => formHandler(e)}
                        defaultValue={account.city}
                      />
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
                        defaultValue={account.address}
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
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Contacts
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
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

export default AccountModal;
