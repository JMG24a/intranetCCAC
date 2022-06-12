import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { DataEmployees } from "../../../hooks/DataEmployees.jsx";
import stage from "../../../hooks/dataStage";
import priority from "../../../hooks/dataPriority";
import moment from "moment";

const EditDeal = ({ fondoNegro, setFondoNegro, setShowEditDeal, getDeals, idDeal }) => {
  const [deal, setDeal] = useState([]);
  const { employees } = DataEmployees();
  const formRef = useRef();

  const getDeal = () => {
    axios
      .get(`${process.env.REACT_APP_SERVIDOR}/api/v1/deals/get/${idDeal}`)

      .then((res) => {
        setDeal(res.data.deal);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(deal);

  //jmg24a
  const formHandler = (e) => {
    e.preventDefault();
    const form = new FormData(formRef.current)

    const changeDealObject = {
      owner: form.get('owner'),
      stage: form.get('stage'),
      priority: form.get('priority'),
      closeProbability: form.get('closeProbability'),
      dealValue: form.get('dealValue'),
      dealLength: form.get('dealLength'),
      expectedCloseDate: form.get('expectedCloseDate'),
      dealCreationDate: form.get('dealCreationDate'),
      tasks: form.get('tasks'),
    }

    axios
      .put(`${process.env.REACT_APP_SERVIDOR}/api/v1/deals`, [changeDealObject,idDeal])
      .then((res) => {
        // console.log(res.data.newDeal);
        setFondoNegro(false)
        setShowEditDeal(false)
        getDeals();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getDeal();
  }, []);

  return (
    <div>
      {fondoNegro ? (
        <div
          className="fondoNegro"
          onClick={() => {
            setFondoNegro(false);
            setShowEditDeal(false);
            // setAccount([]);
          }}
        ></div>
      ) : null}

      <form onSubmit={formHandler} ref={formRef}>
        <div className="fondoDeal" style={{background: "#600e26"}}>
          <div className="bg-white p-5">
            <h1>Deals</h1>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="Owner">Owner</label>
                <select name="owner" id="" className="form-control">
                  {deal.owner ? <option value={deal.owner[0].nameEmployee}>{deal.owner[0].nameEmployee}</option> : null}
                  {employees
                    ? employees.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.nameEmployee}
                      </option>
                      ))
                    : null}
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="Deals">Stage</label>
                <select name="stage" id="" className="form-control">
                  <option value={deal.stage}>{deal.stage}</option>
                  <option value="Lead">Lead</option>
                  {stage.map((item, index) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="priority">Priority</label>
                <select name="priority" id="" className="form-control">
                  <option value={deal.priority}>{deal.priority}</option>
                  {priority.map((item, index) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>


          <div className="bg-white p-5 my-4">
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="closeProbability">Close Probability</label>
                <input type="text" name="closeProbability" id="closeProbability" className="form-control"  defaultValue={deal.closeProbability} />
              </div>
              <div className="col-md-4">
                <label htmlFor="">Deal Value</label>
                <input type="text" name="dealValue" id="" className="form-control" defaultValue={deal.dealValue} />
              </div>
              <div className="col-md-4">
                <label htmlFor="Deal Length">Deal Length</label>
                <input type="text" name="dealLength" id="" className="form-control" defaultValue={deal.dealLength} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="Expected Close Date">Expected Close Date</label>
                <input type="date" name="expectedCloseDate" id="" className="form-control" defaultValue={moment(deal.expectedCloseDate).format("YYYY-MM-DD")} />
              </div>
              <div className="col-md-6">
                <label htmlFor="Deal Creation Date">Deal Creation Date</label>
                <input type="date" name="dealCreationDate" id="" className="form-control" defaultValue={moment(deal.dealCreationDate).format("YYYY-MM-DD")} />
              </div>
            </div>
          </div>
          <div className="bg-white p-5 my-4">
            <label htmlFor="Tareas">Tareas</label>
            <textarea name="tasks" id="" cols="30" className="form-control" rows="5" defaultValue={deal.tasks}></textarea>
            <button type="submit" className="btn btn-primary float-end">Guardar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditDeal;
