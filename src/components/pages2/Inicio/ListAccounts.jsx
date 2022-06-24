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
  console.log(accounts)
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
                    item.type === "Vendedor"
                      ? "stageLead"
                      : item.type === "Vendor"
                      ? "stageProposal"
                      : item.type === "Academia"
                      ? "stageNegotiation"
                      : item.type === "Partner"
                      ? "stageContract"
                      : item.type === "Client"
                      ? "stageWon"
                      : item.type === "Comprador"
                      ? "inputPriorityAlta"
                      : ""
                  }
                  style={{borderRadius: "10px", border: "none"}}
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
                  value={item.accountValue ? parseInt(item.accountValue).toLocaleString() : 0}
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
                    style={{minWidth: "200px"}}
                    type="text"
                    name=""
                    id=""
                    value={i.contactName}
                    onClick={() => {
                      setId(i._id);
                      axios
                        .get(`${process.env.REACT_APP_SERVIDOR}/api/v1/contacts/id/${i._id}`)
                        .then((res) => setClient(res.data.contact))
                        .catch((err) => console.error(err));

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
                style={{minWidth: "100px"}}
                type="text"
                name="website"
                id="website"
                value={item.website}
              />
              </td>
            <td>
              <input
                key={index}
                className="inputContact"
                style={{minWidth: "100px"}}
                type="text"
                name="origen"
                id="origen"
                value={item?.origen}
              />
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
              <input
                type="text"
                name="email"
                id="products"
                className="border emailInput"
                value={item.products}
                readOnly={true}
              />
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
                    .catch((err) => console.error(err));

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
