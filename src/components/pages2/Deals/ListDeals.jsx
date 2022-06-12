function ListDeals({
  search,
  employees,
  setShowModalContact,
  setIdDeal,
  setShowModalAccount,
  setFondoNegro,
  formHandler,
  stage,
  priority,
  moment,
  dateHandler,
  setShowEditDeal
}) {
  return (
    <tbody>
      {search.map((item, index) => (
        <tr key={index}>
          <td id="dealName">
            <input className="buscarInput" style={{height: "40px"}} value={item.dealName} />
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
                  value={i.contactName}
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
                <input type="text" name="" id="" key={index} value={i.accountName} className="form-control" readOnly />
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
          <input
            className="mx-3"
            type="text"
            name="dealLength"
            id="dealLength"
            value={moment().diff(item.dealCreationDate, "days") + " days"}
            />
          </td>
          <td id="dealValue">
            <input
              className="mx-3"
              type="text"
              name="dealValue"
              id="dealValue"
              value={item.dealValue}
            />
          </td>
          <td id="closeProbability">
            <input
              type="text"
              name="closeProbability"
              id="closeProbability"
              value={`${item.closeProbability}%`}
            />
          </td>
          <td id="forecastValue">
            <input
              type="text"
              name="forecastValue"
              id="forecastValue"
              value={parseInt((item.closeProbability / 100) * item.dealValue).toLocaleString()}
              readOnly
            />
          </td>
          <td id="expectedCloseDate">
            <input
              type="date"
              name="expectedCloseDate"
              id="expectedCloseDate"
              value={moment(item.expectedCloseDate).format("YYYY-MM-DD")}
              onChange={(e) => dateHandler(moment(e.target.value).format("YYYY-MM-DD"), "expectedCloseDate", item.id)}
            />
          </td>
          <td id="actualDealValue">
            <input
              type="text"
              name="actualDealValue"
              id="actualDealValue"
              value={item.actualDealValue}
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
              value={moment(item.dealCreationDate).format("YYYY-MM-DD")}
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
  )
}

export { ListDeals }
