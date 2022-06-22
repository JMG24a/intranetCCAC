import axios from "axios";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import GetEmployees from "../../../hooks/GetEmployees";
import { ModalCalendar as Modal} from "../Calendar/ModalCalendar";
import { EmployeeModal } from "./Modal";

const Employees = () => {
  const [form, setForm] = useState({});
  //jmg24a
  const { getEmpleados } = GetEmployees();
  const [search, setSearch] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [modal, setModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  console.log(employee)
  useEffect(()=>{
    if(employee.length <= 0){
      getEmployeesInit()
    }
  })

  const getEmployeesInit = async ()  => {
    const response = await getEmpleados();

    const data = response?.employees.map(item => {
      console.log(item)
    })

    setEmployee(data)
    setSearch(data)
  }

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onUpdate = (employ) => {
    setForm(employ)
    setIsUpdate(true)
  }

  const onCreate = () => {
    setForm({})
    setModal(true)
  }

  const handlePhoto = (item) => {
    console.log(item)
  }

  const handleUpdate = () => {
    console.log('update: ',form)
    axios
    .put(`${process.env.REACT_APP_SERVIDOR}/api/v1/employees/edit`,[form,form.id])
    .then((res) => {
      if(!!res.data.ok){
        Swal.fire({
          icon: "success",
          title: "Editado con exito",
          text: "",
        });
      }else{
        Swal.fire({
          icon: "error",
          title: "No se pudo editar este perfil",
          text: "",
        });
      }
      setIsUpdate(false)
      getEmployeesInit()
    })
    .catch((err) => {
      console.log(err)
      Swal.fire({
        icon: "error",
        title: "La peticion no pudo ser concretada",
        text: "revisa tu conexion",
      });
    });
  }

  const handleDelete = (employ) => {
    axios
    .delete(`${process.env.REACT_APP_SERVIDOR}/api/v1/employees/${employ.id}`)
    .then((res) => {
      if(!!res.data.ok){
        Swal.fire({
          icon: "success",
          title: "Eliminado con exito",
          text: "",
        });
      }else{
        Swal.fire({
          icon: "error",
          title: "El perfil no pudo ser eliminado",
          text: "",
        });
      }
      getEmployeesInit()
    })
    .catch((err) => {
      console.log(err)
      Swal.fire({
        icon: "error",
        title: "La peticion no pudo ser concretada",
        text: "revisa tu conexion",
      });
    });
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
          Swal.fire({
            icon: "success",
            title: "Empleado creado con exito",
            text: "",
          });
          getEmployeesInit()
        }else{
          Swal.fire({
            icon: "Error",
            title: "El empleado no pudo ser creado",
            text: "",
          });
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
              onClick={onCreate}
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
            <th>Foto</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>CC</th>
            <th>Role</th>
            <th>Editar</th>
            <th></th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {search.map((item, index) => (
            <tr key={index} className="border-bottom">
              <td className="border-bottom-0 d-flex justify-content-center">
                <img
                  src = {""}
                  alt="foto del empleado"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                />
              </td>
              <td><p className="text-center">{item.nameEmployee}</p></td>
              <td><p className="text-center">{item.email}</p></td>
              <td><p className="text-center">{item.cc}</p></td>
              <td><p className="text-center">{item.role}</p></td>
              <td className="d-flex justify-content-center border-bottom-0">
                <button className="btn btn-primary" onClick={()=>onUpdate(item)}>
                  <i className="fa fa-trash"></i>
                </button>
              </td>
              <td></td>
              <td className="d-flex justify-content-center border-bottom-0">
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
            form={form}
            formHandler={formHandler}
            submitHandler={submitHandler}
            setModal={setModal}
          />
        </Modal>
      }
      {isUpdate &&
        <Modal>
          <EmployeeModal
            form={form}
            formHandler={formHandler}
            submitHandler={handleUpdate}
            setModal={setIsUpdate}
          />
      </Modal>
      }
    </div>
  );
};

export default Employees;
