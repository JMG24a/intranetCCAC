import React from "react";
import axios from "axios";
import typeF from "../../../hooks/dataTipo";

function ListAccounts(props) {
  const {
    accounts,
    selectHandler,
    setId,
    setClient,
    setFondoNegro,
    setShowContactModal,
    setShowEnlazarContacto,
    subCategorias,
    setAccount,
    setshowAccountModal,
  } = props;

  return (
    <>
      <tbody>
        {accounts.map((item, index) => (
          <tr key={index}>
            <td id="accountName" style={{ minWidth: "250px", textAlign: "left" }}>
              {item.accountName}
            </td>
            <td id="tipo">
              {
                <select
                  className={
                    item.type === "Client" ? "typeCustomer" : item.type === "Partner" ? "typePartner" : item.type === "Vendor" ? "typeVendor" : ""
                  }
                  name="type"
                  id="type"
                  value={item.type}
                  onChange={(e) => selectHandler("type", e, item.id)}
                >
                  <option value={item.type}>{item.type}</option>
                  {typeF.map((i) => (
                    <option value={i}>{i}</option>
                  ))}
                </select>
              }
            </td>
            <td id="AccountValue">
              {
                <input
                  className="accountValueInput"
                  type="text"
                  name="accountValue"
                  id="accountValue"
                  defaultValue={item.accountValue ? parseInt(item.accountValue).toLocaleString() : 0}
                  onBlur={(e) => selectHandler("accountValue", e, item.id)}
                />
              }
            </td>
            <td id="Contact">
              {item.contact.length > 0 ? (
                item.contact.map((i, index) => (
                  <input
                    key={index}
                    className="inputContact"
                    type="text"
                    name=""
                    id=""
                    defaultValue={i.contactName}
                    onClick={() => {
                      setId(i._id);
                      // console.log(i._id);
                      axios
                        .get(`${process.env.REACT_APP_SERVIDOR}/api/v1/contacts/id/${i._id}`)
                        .then((res) => setClient(res.data.contact))
                        .catch((err) => console.log(err));

                      setFondoNegro(true);
                      setShowContactModal(true);
                    }}
                    readOnly
                  />
                ))
              ) : (
                <button
                  key={index}
                  className="btn btn-primary"
                  onClick={() => {
                    setId(item.id);
                    setShowEnlazarContacto(true);
                  }}
                >
                  Agregar Contacto
                </button>
              )}
            </td>
            <td>
              <input
                key={index}
                className="inputContact"
                type="text"
                name=""
                id=""
                defaultValue={"Web"}
              />
            </td>
            <td id="inputDeals">
              {item.deals // jmg24a deals array does not exist
                ? JSON.parse(item.deals)
                  .map((i, index) => <input key={index} className="inputDeals" type="text" name="" id="" value={i} readOnly />)
                : "inactivo"}
            </td>
            <td id="subCategoria" style={{ minWidth: "200px", textAlign: "left" }}>
              {
                <select
                  name="subCategoria"
                  id="subCategoria"
                  value={item.subCategoria}
                  className="form-control"
                  onChange={(e) => {
                    selectHandler("subCategoria", e, item.id);
                  }}
                >
                  <option value={item.subCategoria}>{item.subCategoria}</option>
                  {subCategorias.map((i, index) => (
                    <option value={i} key={index}>
                      {i}
                    </option>
                  ))}
                </select>
              }
            </td>
            <td id="email" style={{ textAlign: "left" }}>
              {
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={item.email}
                  className="emailInput"
                  onBlur={(e) => {
                    selectHandler("email", e, item.id);
                  }}
                />
              }
            </td>
            <td>
              <input type="text" name="email" id="products" className="border emailInput"/>
            </td>
            <td>{item.comments}</td>
            <td>
              <button
                className="btn btn-warning"
                onClick={() => {
                  setId(item.id);
                  axios
                    .get(`${process.env.REACT_APP_SERVIDOR}/api/v1/accounts/id/${item.id}`)
                    .then((res) => setAccount(res.data.Acc))
                    .catch((err) => console.log(err));

                  setFondoNegro(true);
                  setshowAccountModal(true);
                }}
              >
                <i className="fa fa-search"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
}

export { ListAccounts };