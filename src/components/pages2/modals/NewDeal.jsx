import axios from "axios";
import React, { useState } from "react";

const NewDeal = ({
  fondoNegro,
  setFondoNegro,
  setCreateNewDealM,
  getDeals,
}) => {
  const [form, setForm] = useState({});

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    axios
      .post(`${process.env.REACT_APP_SERVIDOR}/api/v1/deals/new`, form)
      .then((res) => getDeals())
      .catch((err) => console.log(err));

    setCreateNewDealM(false);
    setFondoNegro(false);
  };

  return (
    <div>
      {fondoNegro ? (
        <div
          className="fondoNegro"
          onClick={() => {
            // setFondoNegro(false);
            // setCreateNewDealM(false);
            // setAccount([]);
          }}
        ></div>
      ) : null}
      <h1>New Deal</h1>
      <div className="fondoNewDeal p-4" id="contactModal">
        <div
          style={{
            color: "white",
            float: "right",
            marginTop: "-15px",
            marginRight: "-15px",
          }}
          onClick={() => {
            setCreateNewDealM(false);
          }}
        >
          <i className="fa fa-times fa-2x"></i>
        </div>
        <h2 className="text-white mt-3 mb-4 text-center">
          Crear un nuevo negocio
        </h2>

        <div className="bg-white p-3 rounded">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="dealName">Nombre de la Oportunidad</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => {
                    formHandler(e);
                  }}
                  name="dealName"
                  id="dealName"
                />
              </div>
            </div>
          </div>

          <div className="row my-3">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="dealValue">Valor del Negocio</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => {
                    formHandler(e);
                  }}
                  name="dealValue"
                  id="dealValue"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="closeProbability">Probabilidad de Cierre</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => {
                    formHandler(e);
                  }}
                  name="closeProbability"
                  id="closeProbability"
                  placeholder=" (1 - 100)"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-3">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="text-white" htmlFor="dealCreationDate">
                  Fecha de Creacion
                </label>
              </div>
              <input
                type="date"
                onChange={(e) => {
                  formHandler(e);
                }}
                name="dealCreationDate"
                id="dealCreationDate"
              />
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="text-white" htmlFor="expectedCloseDate">
                  Fecha Probable de Cierre
                </label>
                <input
                  className="form-control"
                  type="date"
                  onChange={(e) => {
                    formHandler(e);
                  }}
                  name="expectedCloseDate"
                  id="expectedCloseDate"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 mb-3">
          <div className="row">
            <h4 className="text-white">Tareas o Comentarios</h4>
            <textarea
              onChange={(e) => {
                formHandler(e);
              }}
              name="tasks"
              className="form-conturol rounded"
              id=""
              cols="10"
              rows="5"
            ></textarea>
          </div>
        </div>
        <button
          className="btn btn-primary float-end my-4"
          onClick={() => submitHandler()}
        >
          Crear Nuevo
        </button>
      </div>
    </div>
  );
};

export default NewDeal;
