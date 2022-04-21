import axios from "axios";
import { useEffect, useState } from "react";

export default function GetEmployees() {
  const [empleado, setEmpleado] = useState([]);

  const getEmpleados = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVIDOR}/api/v1/employees`)
      .then((res) => setEmpleado(res.data.employees))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  return empleado;
}
