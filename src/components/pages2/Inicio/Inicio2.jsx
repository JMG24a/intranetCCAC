import React, { useEffect, useState } from "react";
import axios from "axios";
import NewAccount from "../modals/NewAccount";
import CreateContact from "../modals/CreateContact";
import subCategorias from "../../../hooks/dataSubCategorias";
import AccountModal from "../modals/AccountModal";
import ContactsModal from "../modals/ContactModal";

const Inicio2 = () => {
  const [id, setId] = useState();
  const [account, setAccount] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [showAccountModal, setshowAccountModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [fondoNegro, setFondoNegro] = useState(true);
  const [client, setClient] = useState([]);

  const getAccounts = async () => {
    await axios
      .get(`http://localhost:3001/api/v1/accounts`)
      .then((e) => {
        setAccounts(e.data.accounts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showNewAccount = () => {
    document.getElementById("newAccountModal").classList.add("active");
    document.getElementById("fondoBlack").classList.add("fondoBlack");
  };

  const searchHandler = (e) => {
    if (e.target.value.split("").length > 3) {
      axios
        .get(`http://localhost:3001/api/v1/accounts/${e.target.value}`)
        .then((res) => setAccounts(res.data.Acc))
        .catch((err) => console.error(err));
      return;
    } else if (e.target.value.split("").length === 0) {
      console.log("buscar esta vacio");
      getAccounts();
    }
  };

  const selectHandler = (tipo, e, idAcc) => {
    const form = [{ [e.target.name]: e.target.value }, idAcc];

    axios
      .put("http://localhost:3001/api/v1/accounts", form)
      .then((res) => {
        alert("actualizado correctamente");
        console.log(res.data);
        getAccounts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <div className="bg-white py-5 px-4 ">
      <h1>Cuentas de Clientes</h1>
      <hr />
      <section className="m-3 my-5">
        <div className="row row-cols-sm-auto">
          <div className="col me-5">
            <button
              className="btn btn-primary"
              onClick={() => showNewAccount()}
            >
              Crear Nuevo
            </button>
          </div>
          <div className="col-4">
            <input
              className="buscarInput"
              type="text"
              name="buscar"
              id="buscar"
              placeholder="Ingresa el valor a buscar"
              onChange={(e) => {
                searchHandler(e);
              }}
            />
          </div>
        </div>
      </section>
      <div style={{ height: "100%", width: "100%" }}>
        <div className="table-responsive">
          <table className="tabla">
            <thead className="table-light text-center">
              <tr>
                <th>CUENTA</th>
                <th>TIPO</th>
                <th>VALOR DE LA CUENTA</th>
                <th>CONTACTOS</th>
                <th>NEGOCIOS ACTIVOS</th>
                <th>
                  <select name="" id="">
                    <option value="PRIORIDAD">PRIORIDAD</option>
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </select>
                </th>
                <th>SUBCATEGORIA</th>
                <th>EMAIL</th>
                <th>COMENTARIOS</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((item, index) => (
                <tr key={index}>
                  <td
                    id="accountName"
                    style={{ minWidth: "250px", textAlign: "left" }}
                  >
                    {item.accountName}
                  </td>
                  <td id="tipo">
                    {
                      <select
                        className={
                          item.type === "Client"
                            ? "typeCustomer"
                            : item.type === "Partner"
                            ? "typePartner"
                            : item.type === "Vendor"
                            ? "typeVendor"
                            : ""
                        }
                        name="type"
                        id="type"
                        value={item.type}
                        onChange={(e) => selectHandler("type", e, item.id)}
                      >
                        <option value={item.type}>{item.type}</option>
                        <option value="Client">Client</option>
                        <option value="Partner">Partner</option>
                        <option value="Vendor">Vendor</option>
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
                        defaultValue={
                          item.accountValue
                            ? parseInt(item.accountValue).toLocaleString()
                            : 0
                        }
                        onBlur={(e) =>
                          selectHandler("accountValue", e, item.id)
                        }
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
                          value={i.contactName}
                          onClick={() => {
                            setId(i._id);
                            // console.log(i._id);
                            axios
                              .get(
                                `http://localhost:3001/api/v1/contacts/id/${i._id}`
                              )
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
                          document
                            .getElementById("contenedorAddCtc")
                            .classList.add("active");
                        }}
                      >
                        Agregar Contacto
                      </button>
                    )}
                  </td>
                  <td id="inputDeals">
                    {item.deals
                      ? JSON.parse(item.deals).map((i, index) => (
                          <input
                            key={index}
                            className="inputDeals"
                            type="text"
                            name=""
                            id=""
                            value={i}
                            readOnly
                          />
                        ))
                      : ""}
                  </td>
                  <td id="priority">
                    {
                      <select
                        className={
                          item.priority === "Alta"
                            ? "inputPriorityAlta"
                            : item.priority === "Media"
                            ? "inputPriorityMedia"
                            : "inputPriorityBaja"
                        }
                        name="priority"
                        id="priority"
                        value={item.priority}
                        onChange={(e) => selectHandler("priority", e, item.id)}
                      >
                        <option value={item.priority}>{item.priority}</option>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                      </select>
                    }
                  </td>
                  <td
                    id="subCategoria"
                    style={{ minWidth: "200px", textAlign: "left" }}
                  >
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
                        <option value={item.subCategoria}>
                          {item.subCategoria}
                        </option>
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
                        defaultValue={item.email}
                        className="emailInput"
                        onBlur={(e) => {
                          selectHandler("email", e, item.id);
                        }}
                      />
                    }
                  </td>
                  <td>{item.comments}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        setId(item.id);
                        axios
                          .get(
                            `http://localhost:3001/api/v1/accounts/id/${item.id}`
                          )
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
          </table>
        </div>
        {/* <DataGrid rows={accounts} columns={columns} pageSize={15} rowsPerPageOptions={[10]} disableSelectionOnClick /> */}
      </div>
      <NewAccount getAccounts={getAccounts} />
      <CreateContact id={id} getAccounts={getAccounts} />
      {showAccountModal === true ? (
        <AccountModal
          id={id}
          account={account}
          setAccount={setAccount}
          fondoNegro={fondoNegro}
          setFondoNegro={setFondoNegro}
          setshowAccountModal={setshowAccountModal}
          getAccounts={getAccounts}
        />
      ) : null}
      {showContactModal === true ? (
        <ContactsModal
          id={id}
          client={client}
          setAccount={setAccount}
          fondoNegro={fondoNegro}
          setFondoNegro={setFondoNegro}
          setShowContactModal={setShowContactModal}
          getAccounts={getAccounts}
        />
      ) : null}
    </div>
  );
};

export default Inicio2;
