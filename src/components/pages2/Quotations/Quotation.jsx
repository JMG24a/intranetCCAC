import axios from "axios";
import React, { useEffect, useState } from "react";
import paymentOpt from "../../../hooks/dataPaymentOptions";
import servicesLBC from "../../../hooks/dataServicesLBC";
import GetEmployees from "../../../hooks/GetEmployees";
import SearchCustomerModal from "./SearchCustomerModal";

const Quotation = () => {
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [listadoProductosAgregados, setListadoProductosAgregados] = useState([]);
  const [account, setAccount] = useState([]);
  const cartHandler = (e) => {};
  const [form, setForm] = useState([]);

  const addProductHandler = () => {
    let service = document.getElementById("service").value;
    let serviceParsed = service.split("//");
    const unitPrice = document.getElementById("unitPrice").value;
    const discount = document.getElementById("discount").value;
    const discountValue = unitPrice * (discount / 100);
    const linetotal = unitPrice - discountValue;

    setListadoProductosAgregados([
      ...listadoProductosAgregados,
      { id: serviceParsed[1], service: serviceParsed[0], unitPrice: unitPrice, discount: discount, lineTotal: linetotal },
    ]);

    document.getElementById("subTotal").value = linetotal;
  };

  const deleteHandler = (i) => {
    let filtered = listadoProductosAgregados.filter(function (value, index) {
      return index !== i;
    });
    setListadoProductosAgregados(filtered);
    calcularTotales();
  };

  const calcularTotales = () => {
    let suma = 0;

    for (let i = 0; i < listadoProductosAgregados.length; i++) {
      suma += listadoProductosAgregados[i].lineTotal;
    }

    let result = suma;
    console.log(result);
    document.getElementById("subTotal").value = result;
    document.getElementById("tax").value = result * 0.19;
    document.getElementById("total").value = result + result * 0.19;
  };

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    const tax = document.getElementById("tax").value;
    const subTotal = document.getElementById("subTotal").value;
    const total = document.getElementById("total").value;

    const formF = { ...form, productos: listadoProductosAgregados, subTotal: subTotal, tax: tax, total, total };

    axios
      .post(`${process.env.REACT_APP_SERVIDOR}/api/v1/quotations/new`, formF)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const employees = GetEmployees();

  useEffect(() => {
    calcularTotales();
  }, [listadoProductosAgregados]);

  return (
    <div>
      <div className="bg-white p-5">
        <h1 className="d-flex justify-content-end">Service Quotation LBC</h1>

        <section className="my-2 rounded border p-4 rounded">
          <div className="row mb-4">
            <div className="col-auto">
              <h4>Seleccionar Cliente</h4>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Buscar Contacto
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <div class="row mb-3">
              <label for="inputEmail3" class="col-sm-2 col-form-label">
                Cliente
              </label>
              <div class="col-sm-10">
                <input className="form-control" type="text" name="search" id="search" defaultValue={form.accountName} readOnly />
              </div>
            </div>

            <div class="row mb-3">
              <label for="inputEmail3" class="col-sm-2 col-form-label">
                Owner
              </label>
              <div class="col-sm-10">
                <select name="owner" id="owner" className="form-control" onChange={(e) => formHandler(e)}>
                  <option value="">- Seleccione -</option>
                  {employees.map((item, index) => (
                    <option value={item.nameEmployee} key={index}>
                      {item.nameEmployee}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        <section id="fechas" className="my-2 rounded border p-4 rounded">
          <div className="row">
            <h4>Seleccionar Fechas</h4>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input className="form-control" type="date" name="date" id="date" onChange={(e) => formHandler(e)} />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="date">Expiration Date</label>
                <input className="form-control" type="date" name="expirationDate" id="expirationDate" onChange={(e) => formHandler(e)} />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="requestDate">Request Date</label>
                <input className="form-control" type="date" name="requestDate" id="requestDate" onChange={(e) => formHandler(e)} />
              </div>
            </div>
          </div>
        </section>

        <section id="agregarProductos" className="mt-3 mb-5 rounded border p-4 rounded">
          <h4>Agregar Productos</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Service">Service</label>
                <select name="service" id="service" className="form-control" onChange={(e) => cartHandler(e)}>
                  <option>- Seleccione -</option>
                  {servicesLBC.map((item, index) => (
                    <option value={item.nombre + "//" + item.id}>{item.nombre}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group">
                <label htmlFor="unitPrice">Unit Price</label>
                <input className="form-control" type="text" name="unitPrice" id="unitPrice" onChange={(e) => cartHandler(e)} />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="discount">discount</label>
                <input className="form-control" type="text" name="discount" id="discount" onChange={(e) => cartHandler(e)} />
              </div>
            </div>
            <div className="col-md-1">
              <button className="btn btn-success mt-4" onClick={() => addProductHandler()}>
                Agregar
              </button>
            </div>
          </div>
        </section>

        <section id="listadoProductos">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Service</th>
                <th>Unit Price USD</th>
                <th>Discount</th>
                <th>Line Total USD</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listadoProductosAgregados
                ? listadoProductosAgregados.map((item, index) => (
                    <tr key={index}>
                      <td>{item.service}</td>
                      <td>{item.unitPrice}</td>
                      <td>{item.discount}</td>
                      <td>{item.lineTotal}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => deleteHandler(index)}>
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </section>

        <section id="totales">
          <table className="totalsTable">
            <tbody>
              <tr>
                <th>Total Discount</th>
                <th>
                  <input type="text" name="totalDiscount" id="totalDiscount" className="form-control" readOnly defaultValue={0} />
                </th>
              </tr>
              <tr>
                <th>SubTotal</th>
                <th>
                  <input className="form-control" type="text" name="subTotal" id="subTotal" defaultValue={subtotal} readOnly />
                </th>
              </tr>
              <tr>
                <th>Sales Tax</th>
                <th>
                  <input className="form-control" type="text" name="tax" id="tax" defaultValue={subtotal * 0.19} readOnly />
                </th>
              </tr>
              <tr>
                <th>Total</th>
                <th>
                  <input className="form-control" type="text" name="total" id="total" defaultValue={total} readOnly />
                </th>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="my-4">
          <div className="row">
            <div className="col-md-6">
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label">
                  Service Plan
                </label>
                <div class="col-sm-10">
                  <input type="email" class="form-control" id="inputEmail3" />
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label">
                  Payment Terms
                </label>
                <div class="col-sm-10">
                  <select name="paymentTerms" id="paymentTerms" className="form-control" onChange={(e) => formHandler(e)}>
                    <option value="">- Seleccione -</option>
                    {paymentOpt.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label">
                  Service Terms
                </label>
                <div class="col-sm-10">
                  <input type="email" class="form-control" id="inputEmail3" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <button className="btn btn-primary" onClick={() => submitHandler()}>
            Guardar
          </button>
        </section>
      </div>

      <SearchCustomerModal account={account} setAccount={setAccount} setForm={setForm} />
    </div>
  );
};

export default Quotation;
