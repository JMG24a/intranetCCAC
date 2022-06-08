import axios from "axios";
import React, { useEffect, useState } from "react";

const useDataKam = () => {
  const [data, setData] = useState([]);
  const getUsersKam = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVIDOR}/api/usuarios/`, {
        headers: {
          token: "JaRvIs92!",
          correo: "alecapo@gmail.com",
          password: "123456",
        },
      })
      .then((e) => setData(e.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getUsersKam();
  }, []);
  return data;
};

export default useDataKam;
