import moment from "moment";
import React, { useEffect } from "react";

const Calendar = () => {
  useEffect(() => {
    console.log();
  }, []);

  return (
    <div className=" bg-white p-4">
      <h1>Calendario</h1>
      <section className="my-4">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Crear Nueva
        </button>
      </section>
      <table className="table">
        <thead>
          <tr>
            <th>Fecha de Reunion</th>
            <th>Nombre de la Tarea</th>
            <th>Descripcion</th>
            <th>Comentarios</th>
            <th>Estado</th>
            <th>Acciones</th>
            <th>Participantes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{moment().format()}</td>
            <td>Reunion con Legicomex</td>
            <td>Reunion con A, B y C</td>
            <td>
              <input type="text" className="form-control" />
            </td>
            <td>
              <select name="" id="" className="form-control">
                <option value="Confirmada">Confirmada</option>
                <option value="Cancelada">Cancelada</option>
                <option value="Pendiente x Confirmar">
                  Pendiente x Confirmar
                </option>
              </select>
            </td>
            <td>
              <button className="btn btn-danger">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Crear Nueva Reunion
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="">Fecha de Reunion</label>
                  <input type="date" name="" id="" className="form-control" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="">Estado</label>
                  <select name="" id="" className="form-control">
                    <option value="Confirmada">Confirmada</option>
                    <option value="Cancelada">Cancelada</option>
                    <option value="Pendiente x Confirmar">
                      Pendiente x Confirmar
                    </option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <label htmlFor="">Nombre de la tarea</label>
                  <input type="text" name="" id="" className="form-control" />
                </div>
                <div className="col-12">
                  <label htmlFor="">Descripcion</label>
                  <input type="text" name="" id="" className="form-control" />
                </div>
                <div className="col-12">
                  <label htmlFor="">Comentarios o Notas</label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    className="form-control"
                    rows="5"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button type="button" className="btn btn-primary">
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
