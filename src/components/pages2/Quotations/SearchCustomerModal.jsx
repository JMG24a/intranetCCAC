import axios from "axios";
import React, { useEffect, useState } from "react";

const SearchCustomerModal = ({ account, setAccount, setForm }) => {
  const [accounts, setAccounts] = useState([]);

  const getAccounts = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVIDOR}/api/v1/accounts`)
      .then((e) => {
        setAccounts(e.data.accounts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchHandler = (e) => {
    if (e.target.value.split("").length > 3) {
      axios
        .get(`${process.env.REACT_APP_SERVIDOR}/api/v1/accounts/${e.target.value}`)
        .then((res) => setAccounts(res.data.Acc))
        .catch((err) => console.error(err));
      return;
    } else if (e.target.value.split("").length === 0) {
      console.log("buscar esta vacio");
      getAccounts();
    }
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <div>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Buscar Cliente
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div className="mb-4">
                <div className="form-group">
                  <label htmlFor="Buscar">Buscar</label>
                  <input
                    className="form-control"
                    type="text"
                    name="Buscar"
                    id="Buscar"
                    placeholder="Ingrese Nombre"
                    onChange={(e) => searchHandler(e)}
                  />
                </div>
              </div>

              <table className="table">
                <thead className="table-dark">
                  <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts
                    ? accounts.map((item, index) => (
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.accountName}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => setForm({ accountId: item.id, accountName: item.accountName })}
                              data-bs-dismiss="modal"
                            >
                              <i className="fa fa-hand-pointer"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCustomerModal;
