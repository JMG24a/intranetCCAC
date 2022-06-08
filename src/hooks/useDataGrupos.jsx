import axios from "axios";
import React, { useEffect, useState } from "react";

const useDataGrupos = () => {
  const [grupos, setGrupos] = useState([]);

  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVIDOR}/api/grupos`, {
        headers: {
          token: "JaRvIs92!",
          correo: "alecapo@gmail.com",
          password: "123456",
        },
      })
      .then((e) => setGrupos(e.data.Grupos))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getData();
  }, []);
  return grupos;
};

export default useDataGrupos;
