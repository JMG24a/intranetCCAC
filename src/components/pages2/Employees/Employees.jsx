import axios from "axios";
import React, { useState } from "react";
import GetEmployees from "../../../hooks/GetEmployees";
import { Alert } from "../../response/Alert";
import { ModalCalendar as Modal} from "../Calendar/ModalCalendar";
import { EmployeeModal } from "./Modal";

const Employees = () => {
  const employees = GetEmployees();
  // const employees = [];

  const [form, setForm] = useState({});
  //jmg24a
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState({
    state: false,
    message: "",
    color: "green"
  });

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDelete = (employ) => {
    console.log(employ)
    //esperando endpoint
    // axios
    // .post(`${process.env.REACT_APP_SERVIDOR}/api/v1/employees/delete`, employ.id)
    // .then((res) => {
    //   if(!!res.data.ok){
    //     setAlert({
    //       ...alert,
    //       state: true,
    //       message: "Empleado eliminado con exito"
    //     })
    //   }else{
    //     setAlert({
    //       state: false,
    //       message: "El empleado no pudo ser eliminado",
    //       color: "red",
    //     })
    //   }
    // })
    // .catch((err) => console.log(err));
  }

  const submitHandler = () => {
    if(!form.nameEmployee) {
      return 0;
    }

    axios
      .post(`${process.env.REACT_APP_SERVIDOR}/api/v1/employees/new`, form)
      .then((res) => {
        setModal(false);
        if(!!res.data.ok){
          setAlert({
            ...alert,
            state: true,
            message: "Empleado creado con exito"
          })
        }else{
          setAlert({
            state: false,
            message: "El empleado no pudo ser creado",
            color: "red",
          })
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-white p-4">
      <h1>Listado de Empleados</h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={()=>{setModal(!modal)}}
        >
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
            <tr key={index}>
              <td>{item.nameEmployee}</td>
              <td>{item.email}</td>
              <td>{item.cc}</td>
              <td>{item.role}</td>
              <td>
                <button className="btn btn-danger" onClick={()=>handleDelete(item)}>
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal &&
        <Modal>
          <EmployeeModal
            formHandler={formHandler}
            submitHandler={submitHandler}
            setModal={setModal}
          />
        </Modal>
      }

      {alert && <Alert setAlert={setAlert} alert={alert}/>}
    </div>
  );
};

export default Employees;
