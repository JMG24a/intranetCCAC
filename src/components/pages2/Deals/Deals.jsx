import axios from "axios";
import React, { useEffect, useState } from "react";
import priority from "../../../hooks/dataPriority";
import stage from "../../../hooks/dataStage";
import NewDeal from "../modals/NewDeal";
import moment from "moment";
import OwnerModal from "../modals/OwnerModal";
import EditDeal from "../modals/EditDeal";
import { DataEmployees } from "../../../hooks/DataEmployees";
import CreateContact from "../modals/CreateContact";
import AccountModal from "../modals/AccountModal";
import AccountSelect from "../modals/AccountSelect";
import { ListDeals } from "./ListDeals";

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [won, setWon] = useState([]);
  const [createNewDealM, setCreateNewDealM] = useState(false);
  const [fondoNegro, setFondoNegro] = useState(false);
  const [idDeal, setIdDeal] = useState(false);
  const [showEditDeal, setShowEditDeal] = useState(false);
  const [showOwner, setShowOwner] = useState(false);
  const { employees } = DataEmployees();
  const [showModalContact, setShowModalContact] = useState(false);
  const [dealEdit, setDealEdit] = useState(true);
  const [showModalAccount, setShowModalAccount] = useState(false);
  //jmg24a repairing filters --
  const [search, setSearch] = useState([]);

  const getDeals = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVIDOR}/api/v1/deals`)
      .then((res) => {
        const sinWon = res.data.deals.filter((item) => item.stage != "Won");
        setDeals(sinWon);
        setFilteredDeals(sinWon);
        setSearch(sinWon);
        const won = res.data.deals.filter((item) => item.stage === "Won");
        setWon(won);
      })
      .catch((err) => console.log(err));
  };
  console.log(deals)
  const onSearching = (e) => {
    if (e.target.value === "") {
      setSearch(deals);
      return 0;
    }
    const filter = deals.filter((item) => {
      if (item.dealName.length === 0) {
        return false;
      } else {
        const isTrue = item.dealName.toLowerCase().includes(e.target.value.toLowerCase());
        return isTrue;
      }
    })
    setSearch(filter);
  };

  const stageFilter = (e) => {
    if (e.target.name === "owner") {
      if (e.target.value === "KAM") {
        console.log("first", filteredDeals);
        setSearch(filteredDeals);
        return;
      }
      const filtrado = filteredDeals.filter((item) => item.owner[0].nameEmployee === e.target.value);
      setSearch(filtrado);
      console.log(filtrado);
      return;
    }

    if (e.target.value === "priority" || e.target.value === "stage") {
      setSearch(deals);
      return 0;
    }

    if (deals !== filteredDeals) {
      const filtrado = filteredDeals.filter((item) => item[`${e.target.name}`] === e.target.value);
      setSearch(filtrado);
      return;
    }

    const filtrado = deals.filter((item) => item[`${e.target.name}`] === e.target.value);

    setSearch(filtrado);
  };

  // const searchHandler = (e) => {
  //   if (e.target.value.split("").length > 3) {
  //     axios
  //       .get(`${process.env.REACT_APP_SERVIDOR}/api/v1/deals/${e.target.value}`)
  //       .then((res) => {
  //         console.log('??: ', res.data.deals);
  //         setDeals(res.data.deals);
  //         setSearch(res.data.deals);
  //       })
  //       .catch((err) => console.error(err));
  //     return;
  //   } else if (e.target.value.split("").length === 0) {
  //     console.log("buscar esta vacio");
  //     getDeals();
  //   }
  // };

  const formHandler = (tipo, e, idDeal) => {
    const form = [{ [e.target.name]: e.target.value }, idDeal];
    axios
      .put(`${process.env.REACT_APP_SERVIDOR}/api/v1/deals`, form)
      .then((res) => {
        // console.log(res.data.newDeal);
        getDeals();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dateHandler = (date, test, idDeal) => {
    const form = [{ [test]: date }, idDeal];
    axios
      .put(`${process.env.REACT_APP_SERVIDOR}/api/v1/deals`, form)
      .then((res) => {
        // console.log(res.data.newDeal);
        console.log(res.data);
        getDeals();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDeals();
  }, []);

  return (
    <div>
      <div className="bg-white py-5 px-4 ">
        <h1>Deals</h1>
        <section className="m-3 my-5">
          <div className="row row-cols-sm-auto">
            <div className="col me-5">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setCreateNewDealM(true);
                  setFondoNegro(true);
                }}
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
                  onSearching(e)
                }}
              />
            </div>
          </div>
        </section>
        <section>
          <div className="tablaDeal">
            <table className="">
              <thead>
                <tr>
                  <th>Nombre del Negocio</th>
                  <th>
                    <select name="owner" id="owner" onChange={(e) => stageFilter(e)} className="form-control">
                      <option value="KAM">KAM</option>
                      {employees
                        ? employees.map((item, index) => (
                            <option value={item.nameEmployee} key={index}>
                              {item.nameEmployee}
                            </option>
                          ))
                        : null}
                    </select>
                    {/* <input
                      type="text"
                      name="owner"
                      id=""
                      placeholder="owner"
                      onChange={(e)=>onSearching(e)}
                    /> */}
                  </th>
                  <th>Contacto</th>
                  <th>Cuenta</th>
                  <th>
                    <select name="stage" id="stage" onChange={(e) => stageFilter(e)} className="form-control">
                      <option value="stage">Stage</option>
                      {stage.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th>
                    <select name="priority" id="priority" onChange={(e) => stageFilter(e)} className="form-control">
                      <option value="priority">Prioridad</option>
                      {priority.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th>Deal Length</th>
                  <th>Deal Value</th>
                  <th>% Prob.</th>
                  <th>Forecast Value</th>
                  <th>Expected Close Date</th>
                  <th>Actual Deal Value</th>
                  <th>Deal Creation Date</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <ListDeals
                search={search}
                employees={employees}
                setShowModalContact={setShowModalContact}
                setIdDeal={setIdDeal}
                setShowModalAccount={setShowModalAccount}
                setFondoNegro={setFondoNegro}
                formHandler={formHandler}
                stage={stage}
                priority={priority}
                moment={moment}
                dateHandler={dateHandler}
                setShowEditDeal={setShowEditDeal}
              />
            </table>
          </div>
        </section>

        {/* <section className="my-4">
          <h3>Closed Won</h3>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Deal</th>
                  <th>Owner</th>
                  <th>Contacts</th>
                  <th>Accounts</th>
                  <th>Stage</th>
                  <th>Priority</th>
                  <th>Deal Length</th>
                  <th>Deal Value</th>
                  <th>Probability</th>
                  <th>Forecast Value</th>
                  <th>Expected Close Date</th>
                  <th>Actual Deal Value</th>
                  <th>Deal Creation Date</th>
                  <th>Close Date</th>
                </tr>
              </thead>
              <tbody>
                {won.map((item, index) => (
                  <tr key={index}>
                    <td>{item.dealName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section> */}
      </div>

      {createNewDealM === true ? (
        <NewDeal fondoNegro={fondoNegro} setFondoNegro={setFondoNegro} setCreateNewDealM={setCreateNewDealM} getDeals={getDeals} />
      ) : null}

      {showOwner ? <OwnerModal idDeal={idDeal} deals={deals} /> : null}
      {showEditDeal ? (
        <EditDeal
          fondoNegro={fondoNegro}
          setFondoNegro={setFondoNegro}
          setShowEditDeal={setShowEditDeal}
          getDeals={getDeals}
          idDeal={idDeal}
        />
      ) : null}
      {showModalContact ? (
        <CreateContact
          setShowEnlazarContacto={setShowModalContact}
          id={idDeal}
          setDealEdit={setDealEdit}
          dealEdit={dealEdit}
          getDeals={getDeals}
        />
      ) : null}
      {showModalAccount ? (
        <AccountSelect
          fondoNegro={fondoNegro}
          setFondoNegro={setFondoNegro}
          setShowModalAccount={setShowModalAccount}
          idDeal={idDeal}
          getDeals={getDeals}
        />
      ) : null}
    </div>
  );
};

export default Deals;
