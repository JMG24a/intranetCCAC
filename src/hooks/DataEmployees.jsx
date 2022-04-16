import axios from "axios";
import React, { useEffect, useState } from "react";

export const DataEmployees = () => {
  const [data, setData] = useState([]);
  const getUsersKam = async () => {
    await axios
      .get(`http://localhost:3001/api/v1/employees`)
      .then((e) => setData(e.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getUsersKam();
  }, []);
  return data;
};

export default DataEmployees;
