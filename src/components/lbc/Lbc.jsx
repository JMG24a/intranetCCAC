import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";

const Lbc = () => {
  const { id } = useParams();
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

    {
      field: "correo",
      headerName: "Correo",
      flex: 0.3,
      minWidth: 150,
    },

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
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => {
              axios
                .get(`${process.env.REACT_APP_SERVIDOR}/api/clientes/${params.id}`, {
                  headers: {
                    token: "JaRvIs92!",
                    correo: "alecapo@gmail.com",
                    password: "123456",
                  },
                })
                .then((e) => {
                  console.log(e.data);
                  document.getElementById("modalEmpresa").value = e.data.empresa;
                  document.getElementById("modalContacto").value = e.data.contacto;
                  document.getElementById("modalCelular").value = e.data.celular1;
                  document.getElementById("modalCorreo").value = e.data.correo;
                })
                .catch((e) => console.log(e));
            }}
          >
            Abrir
          </Button>
        </strong>
      ),
    },
  ];

  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);

  const [clientes, setClientes] = useState([]);

  const getClientes = () => {
    axios
      .get(`${process.env.REACT_APP_SERVIDOR}/api/clientes?limit=2000&offset=0`, {
        headers: {
          token: "JaRvIs92!",
          correo: "alecapo@gmail.com",
          password: "123456",
        },
      })
      .then((e) => {
        const filter = e.data.filter((item) => {
          return item.esLBC === "Si";
        });
        setLoading(false);
        setClientes(filter);
        console.log(filter);
      })
      .catch((e) => console.log(e));
  };

  const buscar = () => {
    const valorBuscar = document.getElementById("buscar").value;
    axios
      .get(`${process.env.REACT_APP_SERVIDOR}/api/clientes?esLBC=Si&busquedaLBC=${valorBuscar}`, {
        headers: {
          token: "JaRvIs92!",
          correo: "alecapo@gmail.com",
          password: "123456",
        },
      })
      .then((e) => {
        setClientes(e.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getClientes();
  }, []);
  return (
    <div className="bg-white">
      <div className="p-5">
        <h1 className="mb-5 text-center">Latino CRM</h1>

        <section className="buscar col-4">
          <label htmlFor="buscar">Buscar</label>
          <input type="text" name="buscar" id="buscar" className="form-control" />
          <button
            className="btn btn-primary my-3"
            onClick={() => {
              buscar();
            }}
          >
            Buscar
          </button>
        </section>
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

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  EDITAR CLIENTE
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="empresa">Empresa</label>
                      <input type="text" name="modalEmpresa" id="modalEmpresa" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="modalCelular">Celular</label>
                      <input type="text" name="modalCelular" id="modalCelular" className="form-control" />
                    </div>
                    <div className="form-group">
                      <button className="btn btn-primary mt-4">Editar Mas</button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="empresa">Contacto</label>
                      <input type="text" name="modalContacto" id="modalContacto" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="empresa">Correo</label>
                      <input type="text" name="modalCorreo" id="modalCorreo" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="row my-3">
                  <h4>Informacion de la Oportunidad</h4>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="empresa">Valor de la Oportunidad</label>
                      <input type="text" name="" id="" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="empresa">Estado</label>
                      <select name="" id="" className="form-control">
                        <option value="">Contacto</option>
                        <option value="">Cerrado Ganado</option>
                        <option value="">Cerrado Perdido</option>
                        <option value="">Pendiente por Contactar</option>
                        <option value="">Pendiente enviar Informacion</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="empresa">Fecha de Contacto</label>
                      <input type="date" name="" id="" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancelar
                </button>
                <button type="button" className="btn btn-primary">
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lbc;
