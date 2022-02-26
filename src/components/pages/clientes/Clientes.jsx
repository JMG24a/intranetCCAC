import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Clientes = () => {
  const columns = [
    {
      field: "createdAt",
      headerName: "Fecha",
      flex: 0.2,
      minWidth: 100,
    },
    {
      field: "empresa",
      headerName: "Empresa",
      flex: 0.5,
      minWidth: 100,
    },
    {
      field: "contacto",
      headerName: "Contacto",
      flex: 0.5,
      minWidth: 100,
    },
    { field: "telefono", headerName: "telefono", width: 150 },
    { field: "celular1", headerName: "Celular1", width: 150 },
    { field: "celular2", headerName: "Celular2", width: 150 },
    {
      field: "correo",
      headerName: "Correo",
      flex: 0.3,
      minWidth: 150,
    },
    { field: "origen", headerName: "Origen", width: 150 },
    { field: "categoria", headerName: "categoria", width: 150, hide: true },
    {
      field: "col1",
      headerName: "Acciones",
      flex: 0.3,
      minWidth: 150,
      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => redirectHandler(params)}
          >
            Abrir
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => deleteHandler(params)}
          >
            Eliminar
          </Button>
        </strong>
      ),
    },
  ];
  const history = useHistory();
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const redirectHandler = ({ id }) => {
    history.replace(`/clientes/editar/${id}`);
  };

  const deleteHandler = ({ id }) => {
    axios
      .delete(`${process.env.REACT_APP_SERVIDOR}/api/clientes/${id}`, {
        headers: {
          token: "JaRvIs92!",
          correo: "alecapo@gmail.com",
          password: "123456",
        },
      })
      .then((e) => {
        alert("Eliminado Correctamente");
        console.log(e);
      });
    getClientes();
  };

  const getClientes = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=5000&offset=0`,
        {
          headers: {
            token: "JaRvIs92!",
            correo: "alecapo@gmail.com",
            password: "123456",
          },
        }
      )
      .then((e) => {
        setClientes(e.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };

  const searchHandler = async (inputHand) => {
    await axios
      .get(
        `${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=1000&offset=0&searchValue=${searchValue}`,
        {
          headers: {
            token: "JaRvIs92!",
            correo: "alecapo@gmail.com",
            password: "123456",
          },
        }
      )
      .then((e) => setClientes(e.data))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getClientes();
  }, []);

  return (
    <div className=" bg-white p-4 m-4">
      <h1>Lista de Clientes</h1>
      <div className="form-group col-4 my-4">
        <label htmlFor="searchValue">Ingrese valor a buscar</label>
        <input
          type="text"
          name="searchValue"
          id="searchValue"
          className="form-control"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="my-3">
          <button className="btn btn-primary me-3" onClick={searchHandler}>
            Buscar
          </button>
          <button className="btn btn-warning" onClick={getClientes}>
            Borrar Filtro
          </button>
        </div>
      </div>
      <div style={{ height: 550, width: "100%" }}>
        <DataGrid
          rows={clientes}
          columns={columns}
          loading={loading}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 100]}
          pagination
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    </div>
  );
};

export default Clientes;
