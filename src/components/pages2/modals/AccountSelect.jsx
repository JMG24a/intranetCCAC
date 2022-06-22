import axios from "axios";
import React, { useEffect, useState } from "react";
import GetAccounts from "../../../hooks/GetAccounts";

const AccountSelect = ({
  fondoNegro,
  setFondoNegro,
  setShowModalAccount,
  idDeal,
  getDeals,
}) => {
  const accounts = GetAccounts();
  const [acc, setAcc] = useState([]);

  const searchHandler = (e) => {
    if (e.target.value.split("").length > 2) {
      axios
        .get(
          `${process.env.REACT_APP_SERVIDOR}/api/v1/accounts/${e.target.value}`
        )
        .then((res) => setAcc(res.data.Acc))
        .catch((err) => console.error(err));
      return;
    } else if (e.target.value.split("").length === 0) {
      console.log("buscar esta vacio");
      setAcc(accounts);
    }
  };

  const selectHandler = (idAccount, idDeal) => {
    console.log(idAccount, idDeal);
    const form = [{ account: [idAccount] }, idDeal];

    axios
      .put(`${process.env.REACT_APP_SERVIDOR}/api/v1/deals`, form)
      .then((res) => {
        setShowModalAccount(false);
        setFondoNegro(false);
        getDeals();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // getAccounts();
    setFondoNegro(true);
  }, []);

  return (
    <div>
      {fondoNegro ? (
        <div
          className="fondoNegro"
          onClick={() => {
            setFondoNegro(false);
            setShowModalAccount(false);
            // setAccount([]);
          }}
        ></div>
      ) : null}
      <section
        className="accountSelect"
        style={{
          maxHeight: "700px",
          overflowY: "hidden"
        }}
      >
        <h1 className="text-white my-3 text-center">Seleccione Cuenta</h1>
        <div
          className="bg-white p-4 rounded"
          style={{
            maxHeight: "500px",
            overflowY: "scroll"
          }}
        >
          <div
            className="form-group mb-4"
            style={{maxHeight: "300px", overflow: "hidden"}}
          >
            <input
              className="form-control"
              type="text"
              name="search"
              id="search"
              placeholder="Ingrese Busqueda"
              onChange={(e) => searchHandler(e)}
            />
          </div>
          <table className="table">
            <tbody>
              {acc.length > 0
                ? acc.map((item, index) => (
                    <tr key={index}>
                      <td>{item.accountName}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={(e) => selectHandler(item.id, idDeal)}
                        >
                          <i className="fa fa-hand-pointer"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                : accounts.map((item, index) => (
                    <tr key={index}>
                      <td>{item.accountName}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={(e) => selectHandler(item.id, idDeal)}
                        >
                          <i className="fa fa-hand-pointer"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AccountSelect;
