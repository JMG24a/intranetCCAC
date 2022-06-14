import React from 'react';

function EmployeeModal({submitHandler, formHandler, form, setModal}) {
    return (
      <div className="modal-dialog" style={{marginTop: "170px"}}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Editar Empleado
            </h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>setModal(false)}></button>
          </div>
          <div className="modal-body">
            <div className="col-md-6">
              <img src="https://via.placeholder.com/400x400.png" className="img-fluid" alt="" />
            </div>
            <input type="file" name="" id="" />

            <div className="col mt-4">
              <label htmlFor="Nombre">Nombre</label>
              <input
                type="text"
                name="nameEmployee"
                id="nameEmployee"
                placeholder={`${form.nameEmployee ? form.nameEmployee : "nombre"}`}
                className="form-control"
                onChange={(e) => formHandler(e)}
              />
            </div>
            <div className="col mt-4">
              <label htmlFor="Nombre">Cargo</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder={`${form.title ? form.title : "Cargo"}`}
                className="form-control"
                onChange={(e) => formHandler(e)}
              />
            </div>
            <div className="col">
              <label htmlFor="CC">CC</label>
              <input
                name="cc"
                id="cc"
                type="text"
                placeholder={`${form.cc ? form.cc : "cc"}`}
                className="form-control"
                onChange={(e) => formHandler(e)}
              />
            </div>
            <div className="col">
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder={`${form.email ? form.email : "email"}`}
                className="form-control"
                onChange={(e) => formHandler(e)}
              />
            </div>
            <div className="col">
              <label htmlFor="Contrasena">Contrasena</label>
              <input type="password" name="password" id="password" className="form-control" onChange={(e) => formHandler(e)} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={()=>setModal(false)}>
              Cerrar
            </button>
            <button type="button" className="btn btn-primary" onClick={() => submitHandler()}>
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    )
}

export { EmployeeModal }
