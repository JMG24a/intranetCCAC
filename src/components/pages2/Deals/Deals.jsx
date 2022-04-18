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

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [won, setWon] = useState([]);
  const [createNewDealM, setCreateNewDealM] = useState(false);
  const [fondoNegro, setFondoNegro] = useState(false);
  const [idDeal, setIdDeal] = useState();
  const [showEditDeal, setShowEditDeal] = useState(false);
  const [showOwner, setShowOwner] = useState(false);
  const { employees } = DataEmployees();
  const [showModalContact, setShowModalContact] = useState(false);
  const [dealEdit, setDealEdit] = useState(true);
  const [showModalAccount, setShowModalAccount] = useState(false);

  const getDeals = async () => {
    await axios
      .get("http://localhost:3001/api/v1/deals")
      .then((res) => {
        const sinWon = res.data.deals.filter((item) => item.stage != "Won");
        setDeals(sinWon);
        setFilteredDeals(sinWon);

        const won = res.data.deals.filter((item) => item.stage === "Won");
        setWon(won);
      })
      .catch((err) => console.log(err));
  };

  const searchHandler = (e) => {
    if (e.target.value.split("").length > 3) {
      axios
        .get(`http://localhost:3001/api/v1/deals/${e.target.value}`)
        .then((res) => {
          console.log(res.data.deals);
          setDeals(res.data.deals);
        })
        .catch((err) => console.error(err));
      return;
    } else if (e.target.value.split("").length === 0) {
      console.log("buscar esta vacio");
      getDeals();
    }
  };

  const formHandler = (tipo, e, idDeal) => {
    const form = [{ [e.target.name]: e.target.value }, idDeal];

    axios
      .put("http://localhost:3001/api/v1/deals", form)
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
    console.log(form);
    axios
      .put("http://localhost:3001/api/v1/deals", form)
      .then((res) => {
        // console.log(res.data.newDeal);
        console.log(res.data);
        getDeals();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const stageFilter = (e) => {
    if (deals !== filteredDeals) {
      const filtrado = filteredDeals.filter((item) => item[`${e.target.name}`] === e.target.value);

      setDeals(filtrado);
      return;
    }

    const filtrado = deals.filter((item) => item[`${e.target.name}`] === e.target.value);

    setDeals(filtrado);
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
                  searchHandler(e);
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
                  <th>Owner</th>
                  <th>Contacto</th>
                  <th>Cuenta</th>
                  <th>
                    <select name="stage" id="stage" onChange={(e) => stageFilter(e)} className="form-control">
                      <option value="Stage">Stage</option>
                      {stage.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th>
                    <select name="priority" id="priority" onChange={(e) => stageFilter(e)} className="form-control">
                      <option>Priority</option>
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
              <tbody>
                {deals.map((item, index) => (
                  <tr key={index}>
                    <td id="dealName">
                      <input
                        type="text"
                        name="dealName"
                        id="dealName"
                        className="form-control"
                        defaultValue={item.dealName}
                        onChange={(e) => formHandler("dealName", e, item.id)}
                        style={{ minWidth: "200px" }}
                      />
                    </td>
                    <td id="owner">
                      <select name="owner" id="owner" className="form-control" onChange={(e) => formHandler("owner", e, item.id)}>
                        {item.owner.length > 0 ? (
                          item.owner.map((item, index) => <option value={item.nameEmployee}>{item.nameEmployee}</option>)
                        ) : (
                          <option>- Seleccione -</option>
                        )}

                        {employees.map((item, index) => (
                          <option value={item.id}>{item.nameEmployee}</option>
                        ))}
                      </select>
                    </td>
                    <td id="contact">
                      {item.contact.length > 0 ? (
                        item.contact.map((i, index) => (
                          <input
                            type="text"
                            name=""
                            id=""
                            key={index}
                            defaultValue={i.contactName}
                            className="form-control"
                            style={{ minWidth: "150px" }}
                            onClick={() => setShowModalContact(true)}
                            readOnly
                          />
                        ))
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setShowModalContact(true);
                            setIdDeal(item.id);
                          }}
                        >
                          Enlazar Contacto
                        </button>
                      )}
                    </td>
                    <td id="account">
                      {item.account.length > 0 ? (
                        item.account.map((i, index) => (
                          // console.log(i)
                          <input type="text" name="" id="" key={index} defaultValue={i.accountName} className="form-control" readOnly />
                        ))
                      ) : (
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            setShowModalAccount(true);
                            setFondoNegro(true);
                            setIdDeal(item.id);
                          }}
                        >
                          Añadir Cuenta
                        </button>
                      )}
                    </td>
                    <td id="stage" className="text-center">
                      {
                        <select
                          name="stage"
                          id="stage"
                          className={
                            item.stage === "Lead"
                              ? "stageLead"
                              : item.stage === "Proposal"
                              ? "stageProposal"
                              : item.stage === "Negotiation"
                              ? "stageNegotiation"
                              : item.stage === "Contract Sent"
                              ? "stageContract"
                              : item.stage === "Won"
                              ? "stageWon"
                              : item.stage === "Sent"
                              ? "stageSent"
                              : item.stage === "Lost"
                              ? "stageLost"
                              : ""
                          }
                          onChange={(e) => formHandler("stage", e, item.id)}
                        >
                          <option value={item.stage}>{item.stage}</option>
                          {stage.map((i, index) => (
                            <option value={i} key={index}>
                              {i}
                            </option>
                          ))}
                        </select>
                      }
                    </td>
                    <td id="priority">
                      <select
                        name="priority"
                        id="priority"
                        onChange={(e) => formHandler("priority", e, item.id)}
                        className={
                          item.priority === "Alto" ? "inputPriorityAlta" : item.priority === "Medio" ? "inputPriorityMedia" : "inputPriorityBaja"
                        }
                      >
                        <option value={item.priority}>{item.priority}</option>
                        {priority.map((i, index) => (
                          <option value={i} key={index}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td id="dealLength">
                      <p className="text-center">{moment().diff(item.dealCreationDate, "days") + " days"}</p>
                    </td>
                    <td id="dealValue">
                      <input
                        type="text"
                        name="dealValue"
                        id="dealValue"
                        defaultValue={item.dealValue}
                        onBlur={(e) => {
                          formHandler("dealValue", e, item.id);
                        }}
                      />
                    </td>
                    <td id="closeProbability">
                      <input
                        type="text"
                        name="closeProbability"
                        id="closeProbability"
                        defaultValue={item.closeProbability}
                        onBlur={(e) => formHandler("closeProbability", e, item.id)}
                      />
                    </td>
                    <td id="forecastValue">
                      <input
                        type="text"
                        name="forecastValue"
                        id="forecastValue"
                        defaultValue={parseInt((item.closeProbability / 100) * item.dealValue).toLocaleString()}
                        onBlur={(e) => formHandler("forecastValue", e, item.id)}
                        readOnly
                      />
                    </td>
                    <td id="expectedCloseDate">
                      <input
                        type="date"
                        className="form-control"
                        name="expectedCloseDate"
                        id="expectedCloseDate"
                        defaultValue={moment(item.expectedCloseDate).format("YYYY-MM-DD")}
                        onChange={(e) => dateHandler(moment(e.target.value).format("YYYY-MM-DD"), "expectedCloseDate", item.id)}
                      />
                    </td>
                    <td id="actualDealValue">
                      <input
                        type="text"
                        name="actualDealValue"
                        id="actualDealValue"
                        defaultValue={item.actualDealValue}
                        onBlur={(e) => {
                          formHandler("actualDealValue", e, item.id);
                        }}
                      />
                    </td>
                    <td id="dealCreationDate">
                      <input
                        type="date"
                        name="dealCreationDate"
                        id="dealCreationDate"
                        defaultValue={moment(item.dealCreationDate).format("YYYY-MM-DD")}
                        onChange={(e) => dateHandler(moment(e.target.value).format("YYYY-MM-DD"), "dealCreationDate", item.id)}
                      />
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          setShowEditDeal(true);
                          setFondoNegro(true);
                          setIdDeal(item.id);
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
        <EditDeal fondoNegro={fondoNegro} setFondoNegro={setFondoNegro} setShowEditDeal={setShowEditDeal} getDeals={getDeals} idDeal={idDeal} />
      ) : null}
      {showModalContact ? (
        <CreateContact setShowModalContact={setShowModalContact} id={idDeal} setDealEdit={setDealEdit} dealEdit={dealEdit} getDeals={getDeals} />
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
