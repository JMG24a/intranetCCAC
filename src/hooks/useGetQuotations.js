import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetQuotations() {
  const [empleado, setEmpleado] = useState([]);

  const getEmpleados = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVIDOR}/api/v1/quotations`)
      .then((res) => setEmpleado(res.data.quotations))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  return empleado;
}
