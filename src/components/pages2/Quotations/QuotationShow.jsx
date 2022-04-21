import React from "react";
import useGetQuotations from "../../../hooks/useGetQuotations";
import { useHistory, useParams } from "react-router-dom";

const QuotationShow = () => {
  const quotations = useGetQuotations();
  const history = useHistory();
  return (
    <div>
      <div className="bg-white p-4">
        <h1>Listado de Cotizaciones</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Fecha</th>
              <th>Owner</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {quotations
              ? quotations.map((item, index) => (
                  <tr>
                    <td>{item.accountId[0].accountName}</td>
                    <td>{item.date}</td>
                    <td>{item.owner}</td>
                    <td>{item.total}</td>
                    <td className="text-center">
                      <button className="btn btn-primary" onClick={() => history.replace(`/cotizaciones/imprimir/${item.id}`)}>
                        <i className="fa fa-print"></i>
                      </button>
                      <button className="btn btn-danger ms-3">
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuotationShow;
