import React from "react";

const Employees = () => {
  return (
    <div className="bg-white p-4">
      <h1>Empleados</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>CC</th>
            <th>Role</th>
            <th colSpan={2}>Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alejandro Cabrejo</td>
            <td>Alejandro.cabrejo@gmail.com</td>
            <td>1.202.333</td>
            <td>1</td>
            <td>X</td>
            <td>L</td>
          </tr>
        </tbody>
      </table>

      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

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
                Editar Empleado
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="col-md-6">
                <img
                  src="https://via.placeholder.com/400x400.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <input type="file" name="" id="" />

              <div className="col mt-4">
                <label htmlFor="Nombre">Nombre</label>
                <input type="text" name="" id="" className="form-control" />
              </div>
              <div className="col">
                <label htmlFor="CC">CC</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col">
                <label htmlFor="Email">Email</label>
                <input type="text" name="" id="" className="form-control" />
              </div>
              <div className="col">
                <label htmlFor="Contrasena">Contrasena</label>
                <input type="password" name="" id="" className="form-control" />
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
