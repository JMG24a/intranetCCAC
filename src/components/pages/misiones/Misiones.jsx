import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import axios from "axios";
import dataEstado from "../../../hooks/dataEstado";
import useDataKam from "../../../hooks/useDataKam";
import dataProbabilidad from "../../../hooks/dataProbabilidad";
import useDataGrupos from "../../../hooks/useDataGrupos";

const columns = [
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
  {
    field: "kam",
    headerName: "KAM",
    flex: 0.3,
    minWidth: 100,
  },
  {
    field: "observaciones",
    headerName: "Observaciones",
    flex: 0.5,
    minWidth: 100,
  },
  {
    field: "probabilidadCierre",
    headerName: "Probabilidad de Cierre",
    flex: 0.5,
    minWidth: 100,
  },
  {
    field: "estado",
    headerName: "Estado",
    flex: 0.5,
    minWidth: 100,
  },
  {
    field: "col1",
    headerName: "Acciones",
    flex: 0.3,
    minWidth: 100,
    renderCell: () => (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
        >
          Abrir
        </Button>
      </strong>
    ),
  },
];
const Misiones = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const dataKam = useDataKam();
  const dataGrupos = useDataGrupos();

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

  useEffect(() => {
    getClientes();
  }, []);

  return (
    <div className=" bg-white p-4 m-4">
      <h1>Control Misiones</h1>

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

export default Misiones;
