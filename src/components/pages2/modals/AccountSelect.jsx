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
  const [search, setSearch] = useState([]);
  console.log(acc)

  const onSearching = (e) => {
    if (e.target.value === "") {
      setSearch(accounts);
      return 0;
    }
    const filter = accounts.filter((item) => {
      if (item.accountName.length === 0) {
        return false;
      } else {
        const isTrue = item.accountName.toLowerCase().includes(e.target.value.toLowerCase());
        return isTrue;
      }
    })
    setSearch(filter);
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
    setSearch(accounts)
    setFondoNegro(true);
  }, [accounts]);

  return (
    <div>
      {fondoNegro ? (
        <div
          className="fondoNegro"
          style={{marginLeft: "2px" }}
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
          maxWidth: "100%",
          overflowY: "hidden"
        }}
      >
        <h1 className="text-white my-3 text-center">Seleccione Cuenta</h1>
        <div
          className="bg-white p-4 rounded"
          style={{
            maxHeight: "500px",
            maxWidth: "100%",
            overflowY: "scroll"
          }}
        >
          <div
            className="form-group mb-4"
            style={{maxHeight: "300px", maxWidth: "100%", overflow: "hidden"}}
          >
            <input
              className="form-control"
              type="text"
              name="search"
              id="search"
              placeholder="Ingrese Busqueda"
              onChange={(e) => onSearching(e)}
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
                : search.map((item, index) => (
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
