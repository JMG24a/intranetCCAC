import axios from "axios";
import React, { useState } from "react";
import GetEmployees from "../../../hooks/GetEmployees";

const Employees = () => {
  const employees = GetEmployees();
  // const employees = [];

  const [form, setForm] = useState({});
  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    axios
      .post(`${process.env.REACT_APP_SERVIDOR}/api/v1/employees/new`, form)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-white p-4">
      <h1>Listado de Empleados</h1>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Crear Nuevo
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>CC</th>
            <th>Role</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((item, index) => (
            <tr>
              <td>{item.nameEmployee}</td>
              <td>{item.email}</td>
              <td>{item.cc}</td>
              <td>{item.role}</td>
              <td>
                <button className="btn btn-danger">
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Editar Empleado
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="col-md-6">
                <img src="https://via.placeholder.com/400x400.png" className="img-fluid" alt="" />
              </div>
              <input type="file" name="" id="" />

              <div className="col mt-4">
                <label htmlFor="Nombre">Nombre</label>
                <input type="text" name="nameEmployee" id="nameEmployee" className="form-control" onChange={(e) => formHandler(e)} />
              </div>
              <div className="col mt-4">
                <label htmlFor="Nombre">Cargo</label>
                <input type="text" name="title" id="title" className="form-control" onChange={(e) => formHandler(e)} />
              </div>
              <div className="col">
                <label htmlFor="CC">CC</label>
                <input name="cc" id="cc" type="text" className="form-control" onChange={(e) => formHandler(e)} />
              </div>
              <div className="col">
                <label htmlFor="Email">Email</label>
                <input type="text" name="email" id="email" className="form-control" onChange={(e) => formHandler(e)} />
              </div>
              <div className="col">
                <label htmlFor="Contrasena">Contrasena</label>
                <input type="password" name="password" id="password" className="form-control" onChange={(e) => formHandler(e)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
              <button type="button" className="btn btn-primary" onClick={() => submitHandler()}>
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
