import React, { useEffect, useState } from "react";
import axios from "axios";
import NewAccount from "../modals/NewAccount";
import CreateContact from "../modals/CreateContact";
import subCategorias from "../../../hooks/dataSubCategorias";
import AccountModal from "../modals/AccountModal";
import ContactsModal from "../modals/ContactModal";

//jmg24a dependencies
import { ListAccounts } from './ListAccounts'
import { ModalCalendar } from "../Calendar/ModalCalendar";

const Inicio2 = () => {
  const [id, setId] = useState();
  const [account, setAccount] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [showAccountModal, setshowAccountModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [fondoNegro, setFondoNegro] = useState(true);
  const [client, setClient] = useState([]);
  const [showEnlazarContacto, setShowEnlazarContacto] = useState(false);
  const [showNewAccountModal, setShowNewAccountModal] = useState(false);
  //jmg24a
  const [searchPriory, setSearchPriory] = useState([])

  const getAccounts = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVIDOR}/api/v1/accounts`)
      .then((e) => {
        setAccounts(e.data.accounts);
        setSearchPriory(e.data.accounts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchPriorities = (e) => {
    switch(e.target.name){
      case 'categories': {
        if(e.target.value === 'Todo'){
          setSearchPriory(accounts)
          break;
        }
        setSearchPriory(accounts.filter(item => item.subCategoria === e.target.value))
        break;
      }
      case 'priority':{
        if(e.target.value === 'Todo'){
          setSearchPriory(accounts)
          break;
        }
        setSearchPriory(accounts.filter(item => item.priority === e.target.value));
        break;
      }
      default:{
        setSearchPriory(accounts)
      }
    }
  }

  const showNewAccount = () => {
    setShowEnlazarContacto(true);
    // document.getElementById("newAccountModal").classList.add("active");
    // document.getElementById("fondoBlack").classList.add("fondoBlack");
  };

  const onSearching = (e) => {
    if (e.target.value === "") {
      setSearchPriory(accounts);
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
    setSearchPriory(filter);
  };

  const selectHandler = (tipo, e, idAcc) => {
    const form = [{ [e.target.name]: e.target.value }, idAcc];

    axios
      .put(`${process.env.REACT_APP_SERVIDOR}/api/v1/accounts`, form)
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
              onClick={() => setShowNewAccountModal(true)}
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
                onSearching(e);
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
                <th>ORIGEN</th>
                <th>NEGOCIOS ACTIVOS</th>
                <th>
                  <select name="categories" id="" onChange={(e)=>searchPriorities(e)}>
                    <option value='Todo'>Categorias</option>
                    {subCategorias.map((i, index) => (
                      <option value={`${i}`} key={index}>
                        {i}
                      </option>
                    ))}
                  </select>
                </th>
                <th>EMAIL</th>
                <th>PRODUCTOS</th>
                <th>COMENTARIOS</th>
                <th>Acciones</th>
              </tr>
            </thead>
              <ListAccounts
                accounts={searchPriory}
                selectHandler={selectHandler}
                setId={setId}
                setClient={setClient}
                setFondoNegro={setFondoNegro}
                setShowContactModal={setShowContactModal}
                setShowEnlazarContacto={setShowEnlazarContacto}
                subCategorias={subCategorias}
                setAccount={setAccount}
                setshowAccountModal={setshowAccountModal}
              />
          </table>
        </div>
        {/* <DataGrid rows={accounts} columns={columns} pageSize={15} rowsPerPageOptions={[10]} disableSelectionOnClick /> */}
      </div>

      {showNewAccountModal ? (
        <ModalCalendar>
          <NewAccount
            getAccounts={getAccounts}
            setShowNewAccountModal={setShowNewAccountModal}
          />
        </ModalCalendar>
      ) : null}

      {showEnlazarContacto ? (
        <CreateContact
          id={id}
          getAccounts={getAccounts}
          setShowEnlazarContacto={setShowEnlazarContacto}
          showEnlazarContacto={showEnlazarContacto}
        />
      ) : null}
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
