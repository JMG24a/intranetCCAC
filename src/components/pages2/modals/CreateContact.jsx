import axios from "axios";
import React, { useEffect, useState } from "react";

const CreateContact = ({ id, getAccounts, setShowModalContact, dealEdit, getDeals, setShowEnlazarContacto, showEnlazarContacto }) => {
  const [form, setForm] = useState({ contactName: "" });
  const [contacts, setContacts] = useState([]);
  //

  const crearNuevoHandler = async () => {
    if (form.contactName === "") {
      alert("revise los datos");
      return;
    }
    // Ingreso a la DB
    await axios
      .post("http://localhost:3001/api/v1/contacts/new", form)
      .then((event) => {
        console.log(event.data);
        axios
          .put(`http://localhost:3001/api/v1/accounts/update?accountID=${id}&contactID=${event.data.contact.id}`)
          .then((res) => {
            getAccounts();
            closeModal();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.error(err));

    // limpio el area de trabajo
    setForm({ contactName: "" });

    document.getElementById("contenedorAddCtc").classList.remove("active");
  };

  const closeModal = () => {
    console.log(showEnlazarContacto);
    // setShowModalContact(false);
    setShowEnlazarContacto(false);
    if (dealEdit) {
      getDeals();
      return;
    }

    getAccounts();
    // document.getElementById("contenedorAddCtc").classList.remove("active");
    // document.getElementById("fondoBlack").classList.remove("fondoBlack");
  };

  const getContacts = () => {
    axios
      .get("http://localhost:3001/api/v1/contacts")
      .then((res) => {
        setContacts(res.data.contacts);
      })
      .catch((err) => console.error("fallo", err));
  };

  const selectContactHandler = async (idAccount, idContact) => {
    if (dealEdit) {
      await axios
        .put(`http://localhost:3001/api/v1/deals`, [{ contact: idContact }, idAccount])
        .then((res) => {
          // getAccounts();

          closeModal();
          console.log(res);
        })
        .catch((err) => console.log(err));
      return;
    }
    await axios
      .put(`http://localhost:3001/api/v1/accounts/update?accountID=${idAccount}&contactID=${idContact}`)
      .then((res) => {
        getAccounts();
      })
      .catch((err) => console.log(err));
    setShowEnlazarContacto(false);
  };

  const searchContactHandler = (e) => {
    const searchValue = e.target.value;

    if (searchValue.split("").length > 3) {
      axios
        .get(`http://localhost:3001/api/v1/contacts/${searchValue}`)
        .then((res) => setContacts(res.data.contact))
        .catch((err) => console.error(err));
      return;
    } else if (searchValue.split("").length === 0) {
      getContacts();
      console.log("get");
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div>
      <div className="contenedorAddCtc" id="contenedorAddCtc">
        <div style={{ color: "white", float: "right", marginTop: "-15px", marginRight: "-15px" }} onClick={() => closeModal()}>
          <i className="fa fa-times fa-2x"></i>
        </div>
        <h2 className="text-white text-center">ENLAZAR CONTACTO</h2>
        <div className="subContenedorAddCtc">
          <div className="left-inner-addon input-container">
            <i className="fa fa-search"></i>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar Cliente"
              name="accountName"
              id="accountName"
              onChange={(e) => searchContactHandler(e)}
            />
          </div>
          <div style={{ backgroundColor: "white", padding: "20px" }}>
            <table className="table table-sm table-hover">
              <tbody>
                {contacts.slice(0, 4).map((item, index) => (
                  <tr key={index}>
                    <td>{item.contactName}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => selectContactHandler(id, item.id)}>
                        <i className="fa fa-hand-pointer"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="crearNuevo my-5">
              <input
                value={form.contactName}
                className="form-control"
                type="text"
                name="crearNuevo"
                id="crearNuevo"
                placeholder="+ Crear Nuevo"
                onClick={() => (document.getElementById("crearNuevoButton").style.display = "block")}
                onChange={(e) => {
                  setForm({ contactName: e.target.value });
                }}
              />
              <button className="crearNuevoButton" id="crearNuevoButton" onClick={() => crearNuevoHandler()}>
                Añadir
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default CreateContact;
