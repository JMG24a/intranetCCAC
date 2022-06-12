import axios from "axios";
import React, { useEffect, useState } from "react";
import GetEmployees from "../../../hooks/GetEmployees";
import { Alert } from "../../response/Alert";
import { ModalCalendar as Modal} from "../Calendar/ModalCalendar";
import { EmployeeModal } from "./Modal";

const Employees = () => {
  const [form, setForm] = useState({});
  //jmg24a
  const { getEmpleados } = GetEmployees();
  const [search, setSearch] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState({
    state: false,
    message: "",
    color: "green"
  });

  useEffect(()=>{
    if(employee.length <= 0){
      getEmployeesInit()
    }
  })

  const getEmployeesInit = async ()  => {
    const response = await getEmpleados();
    setEmployee(response.employees)
    setSearch(response.employees)
  }

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

  const onSearching = (e) => {
    if (e.target.value === "") {
      setSearch(employee);
      return 0;
    }
    const filter = employee.filter((item) => {
      if(!item.nameEmployee){
        return false;
      }
      if (item.nameEmployee.length === 0) {
        return false;
      } else {
        const isTrue = item.nameEmployee.toLowerCase().includes(e.target.value.toLowerCase());
        return isTrue;
      }
    })
    setSearch(filter);
  };

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
    <div className="bg-white py-5 px-4">
      <h1>Listado de Empleados</h1>
      <section className="m-3 my-5">
        <div className="row row-cols-sm-auto">
          <div className="col me-5">
            <button
              type="button"
              className="btn btn-primary"
              onClick={()=>{setModal(!modal)}}
              >
              Crear Nuevo
            </button>
          </div>
          <div className="col-4">
            <input
              className="buscarInput"
              type="text"
              name="buscar"
              id="buscar"
              placeholder="Ingresa el valor a buscar"
              onChange={(e) => {
                onSearching(e)
              }}
            />
          </div>
        </div>
      </section>
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
          {search.map((item, index) => (
            <tr key={index}>
              <td><p className="text-center">{item.nameEmployee}</p></td>
              <td><p className="text-center">{item.email}</p></td>
              <td><p className="text-center">{item.cc}</p></td>
              <td><p className="text-center">{item.role}</p></td>
              <td className="d-flex justify-content-center">
                <button className="btn btn-danger" onClick={()=>handleDelete(item)}>
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal &&
        <Modal setModal={setModal}>
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
