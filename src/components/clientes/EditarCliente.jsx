import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

const EditarCliente = () => {
  const history = useHistory();
  const cookies = new Cookies();
  if (cookies.get("token") !== "3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03") {
    console.log("error de autenticacion");
    history.replace("/login");
  }

  const { id } = useParams();
  const [cliente, setCliente] = useState([]);
  const [grupos, setGrupos] = useState([]);

  const getGrupos = () => {
    axios
      .get(`${process.env.REACT_APP_SERVIDOR}/api/grupos`, {
        headers: {
          token: "JaRvIs92!",
          correo: "alecapo@gmail.com",
          password: "123456",
        },
      })
      .then((e) => setGrupos(e.data.Grupos))
      .catch((e) => console.log(e));
  };

  const getCliente = () => {
    axios
      .get(`${process.env.REACT_APP_SERVIDOR}/api/clientes/${id}`, {
        headers: {
          token: "JaRvIs92!",
          correo: "alecapo@gmail.com",
          password: "123456",
        },
      })
      .then((e) => {
        console.log(e.data);
        setCliente(e.data);
      })
      .catch((e) => console.log(e));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      empresa: e.target["empresa"].value,
      tipoPersona: e.target["tipoPersona"].value,
      contacto: e.target["contacto"].value,
      cargo: e.target["cargo"].value,
      origen: e.target["origen"].value,
      nit: e.target["nit"].value,
      cc: e.target["cc"].value,
      celular1: e.target["celular1"].value,
      celular2: e.target["celular2"].value,
      telefono: e.target["telefono"].value,
      direccion: e.target["direccion"].value,
      ciudad: e.target["ciudad"].value,
      departamento: e.target["departamento"].value,
      correo: e.target["correo"].value,
      web: e.target["web"].value,
      categoria: e.target["categoria"].value,
      subCategoria: e.target["subCategoria"].value,
      mesViaje: e.target["mesViaje"].value,
      fechaLlamada: e.target["fechaLlamada"].value,
      observLlamada: e.target["observLlamada"].value,
      kam: e.target["kam"].value,
      probabilidadCierre: e.target["probabilidadCierre"].value,
      observCoti: e.target["observCoti"].value,
      cantidad: e.target["cantidad"].value,
      vUnitario: e.target["vUnitario"].value,
      grupo: e.target["grupo"].value,
      formaPago: e.target["formaPago"].value,
      total: e.target["total"].value,
      FechaInicioV: e.target["FechaInicioV"].value,
      FechaFinV: e.target["FechaFinV"].value,
      noCotizacion: e.target["noCotizacion"].value,
      noFactura: e.target["noFactura"].value,
      estado: e.target["estado"].value,
      pasaporte: e.target["pasaporte"].value,
      alergias: e.target["alergias"].value,
      rh: e.target["rh"].value,
      prepagada: e.target["prepagada"].value,
      eps: e.target["eps"].value,
      visaAmericana: e.target["visaAmericana"].value,
      fechaVacuna: e.target["fechaVacuna"].value,
      contactoEmergencia: e.target["contactoEmergencia"].value,
      telefonoEmergencia: e.target["telefonoEmergencia"].value,
    };
    console.log(data);
    axios
      .put(`${process.env.REACT_APP_SERVIDOR}/api/clientes/update/${id}`, data, {
        headers: {
          token: "JaRvIs92!",
          correo: "alecapo@gmail.com",
          password: "123456",
        },
      })
      .then((e) => {
        console.log(e.data);
        alert("Actualizado");
      })
      .catch((e) => console.log(e));
    console.log(data);
  };

  const formHandlerAdjuntos = (tipo) => {
    const file = document.getElementById(tipo);

    var myFormData = new FormData();
    myFormData.append(tipo, file.files[0]);

    axios
      .put(`${process.env.REACT_APP_SERVIDOR}/api/clientes/update/archivos/${id}`, myFormData)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: "Genial! ",
          text: "Subiste Correctamente: " + tipo,
          icon: "success",
        });
      })
      .catch((err) => console.log(err));
  };

  const esLBChandler = (e) => {
    console.log(e.target.value);
    const data = {
      esLBC: e.target.value,
    };
    axios
      .put(`${process.env.REACT_APP_SERVIDOR}/api/clientes/update/${id}`, data, {
        headers: {
          token: "JaRvIs92!",
          correo: "alecapo@gmail.com",
          password: "123456",
        },
      })
      .then((e) => {
        console.log(e.data);
        alert("Actualizado");
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getCliente();
    getGrupos();
  }, []);

  return (
    <div>
      <div className="EditarCliente mx-4 py-5">
        <h1 className="mb-4">Editar Cliente</h1>
        <form onSubmit={submitHandler} className="mx-4 py-5">
          <input type="hidden" name="id" id="id" value={cliente.id} />
          <div className="col-md-3 my-4">
            <div className="form-group">
              <label htmlFor="nit">
                <strong>ES LBC?</strong>
              </label>
              <select name="esLBC" id="esLBC" className="form-control" onChange={(e) => esLBChandler(e)}>
                <option value="- Seleccione -">- Seleccione -</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div className="row">
            <h4>Datos del cliente</h4>

            <div className="col-md-6">
              <div className="row">
                <div className="col-md-8">
                  <div className="form-group">
                    <label htmlFor="empresa">Nombre de la Empresa</label>
                    <input type="text" name="empresa" id="empresa" className="form-control" defaultValue={cliente.empresa} />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="empresa">Tipo Persona</label>
                    <select name="tipoPersona" id="tipoPersona" className="form-control">
                      <option value={cliente.tipoPersona}>{cliente.tipoPersona}</option>
                      <option value="Juridica">Juridica</option>
                      <option value="Natural">Natural</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="nit">Nit</label>
                <input type="text" name="nit" id="nit" className="form-control" defaultValue={cliente.nit} />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="cc">Cedula</label>
                    <input type="text" name="cc" id="cc" className="form-control" defaultValue={cliente.cc} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="pasaporte"> No de Pasaporte</label>
                    <input type="text" name="pasaporte" id="pasaporte" className="form-control" defaultValue={cliente.pasaporte} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="cargo">Cargo</label>
                    <input type="text" name="cargo" id="cargo" className="form-control" defaultValue={cliente.cargo} />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="correo">Correo</label>
                  <input type="text" name="correo" id="correo" className="form-control" defaultValue={cliente.correo} />
                </div>
              </div>
              <div className="row"></div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="contacto">Contacto</label>
                <input type="text" name="contacto" id="contacto" className="form-control" defaultValue={cliente.contacto} />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input type="text" name="telefono" id="telefono" className="form-control" defaultValue={cliente.telefono} />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="celular1">Celular 1</label>
                  <input type="text" name="celular1" id="celular1" className="form-control" defaultValue={cliente.celular1} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="celular2">Celular 2</label>
                  <input type="text" name="celular2" id="celular2" className="form-control" defaultValue={cliente.celular2} />
                </div>
              </div>
              <div className="col-md-12">
                <label htmlFor="web">Sitio Web</label>
                <input type="text" name="web" id="web" className="form-control" defaultValue={cliente.web} />
              </div>
            </div>
          </div>
          <div className="row my-2">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="direccion">Dirección</label>
                <input type="text" name="direccion" id="direccion" className="form-control" defaultValue={cliente.direccion} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="ciudad">Ciudad</label>
                <input type="text" name="ciudad" id="ciudad" className="form-control" defaultValue={cliente.ciudad} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="departamento">Departamento</label>
                <input type="text" name="departamento" id="departamento" className="form-control" defaultValue={cliente.departamento} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="categoria">Categoría (Interés)</label>
                <select name="categoria" id="categoria" className="form-control" defaultValue={cliente.categoria}>
                  <option value={cliente.categoria}>{cliente.categoria}</option>
                  <option value="Comercio">Comercio</option>
                  <option value="Cultura y Turismo">Cultura y Turismo</option>
                  <option value="Academia">Academia</option>
                  <option value="Gobierno">Gobierno</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="subCategoria">Sub Categoría (Perfil)</label>
                <select name="subCategoria" id="subCategoria" className="form-control" defaultValue={cliente.subCategoria}>
                  <option value={cliente.subCategoria}>{cliente.subCategoria}</option>
                  <option value="Comercio - agricultura">Comercio - agricultura</option>
                  <option value="Comercio - energia">Comercio - energia y mineria</option>
                  <option value="Comercio - textiles">Comercio - textiles</option>
                  <option value="Comercio - ganaderia">Comercio - ganaderia</option>
                  <option value="Comercio - negocios">Comercio - negocios y finanzas</option>
                  <option value="Comercio - aeroespacial">Comercio - aeroespacial</option>
                  <option value="Comercio - tecnologia">Comercio - tecnologia</option>
                  <option value="Comercio - camara">Comercio - camara de comercio</option>
                  <option value="Academia - ingenieria">Academia - ingenieria</option>
                  <option value="Academia - publicidad">Academia - publicidad y mercadeo</option>
                  <option value="Academia - administracion">Academia - administracion y negocios</option>
                  <option value="Academia - humanidades">Academia - humanidades</option>
                  <option value="Academia - arquitectura">Academia - arquitectura</option>
                  <option value="Academia - leyes">Academia - leyes</option>
                  <option value="Academia - medicina">Academia - medicina</option>
                  <option value="Academia - General">Academia - General</option>
                  <option value="Gobierno - gobernacion">Gobierno - gobernacion</option>
                  <option value="Gobierno - alcaldia">Gobierno - alcaldia</option>
                  <option value="Gobierno - otro">Gobierno - otro</option>
                  <option value="Gobierno - Agencia Nacional Mineria">Gobierno - Agencia Nacional Mineria</option>
                  <option value="Turismo">Turismo</option>
                </select>
              </div>
            </div>
          </div>

          <section className="my-4">
            <h3>Informacion Adicional</h3>
            <div className="row">
              <div className="col-md-3">
                <label htmlFor="alergias">Alergias</label>
                <input type="text" name="alergias" id="alergias" className="form-control" defaultValue={cliente.alergias} />
              </div>
              <div className="col-md-3">
                <label htmlFor="rh">Rh</label>
                <input type="text" name="rh" id="rh" className="form-control" defaultValue={cliente.rh} />
              </div>
              <div className="col-md-3">
                <label htmlFor="prepagada">Prepagada</label>
                <input type="text" name="prepagada" id="prepagada" className="form-control" defaultValue={cliente.prepagada} />
              </div>
              <div className="col-md-3">
                <label htmlFor="eps">Eps</label>
                <input type="text" name="eps" id="eps" className="form-control" defaultValue={cliente.eps} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <label htmlFor="visaAmericana">Tiene Visa Americana?</label>
                <input type="text" name="visaAmericana" id="visaAmericana" className="form-control" defaultValue={cliente.visaAmericana} />
              </div>
              <div className="col-md-3">
                <label htmlFor="fechaVacuna">fecha ultima de Vacuna</label>
                <input type="text" name="fechaVacuna" id="fechaVacuna" className="form-control" defaultValue={cliente.fechaVacuna} />
              </div>
              <div className="col-md-3">
                <label htmlFor="contactoEmergencia">Contacto de Emergencia</label>
                <input
                  type="text"
                  name="contactoEmergencia"
                  id="contactoEmergencia"
                  className="form-control"
                  defaultValue={cliente.contactoEmergencia}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="telefonoEmergencia">Telefono de Emergencia</label>
                <input
                  type="text"
                  name="telefonoEmergencia"
                  id="telefonoEmergencia"
                  className="form-control"
                  defaultValue={cliente.telefonoEmergencia}
                />
              </div>
            </div>
          </section>

          <section className="mt-5">
            <div className="row text-center">
              <div className="col-md-3">
                <a href={`${process.env.REACT_APP_SERVIDOR}/api/clientes/archivos/pasaportes/${id}?query=pasaportes`} target="_blank">
                  <h4>Pasaporte</h4>
                </a>
                <iframe
                  src={`${process.env.REACT_APP_SERVIDOR}/api/clientes/archivos/pasaportes/${id}?query=pasaportes`}
                  width="100%"
                  height="200px"
                />

                <div className="form-group my-4">
                  <input type="file" name="passFile" id="passFile" className="form-control" />
                </div>
                <button type="button" onClick={() => formHandlerAdjuntos("passFile")} className="btn btn-secondary btn-sm">
                  Guardar
                </button>
              </div>
              <div className="col-md-3">
                <a href={`${process.env.REACT_APP_SERVIDOR}/api/clientes/archivos/pasaportes/${id}?query=vacunas`} target="_blank">
                  <h4>Vacuna</h4>
                </a>
                <iframe src={`${process.env.REACT_APP_SERVIDOR}/api/clientes/archivos/pasaportes/${id}?query=vacunas`} width="100%" height="200px" />

                <div className="form-group my-4">
                  <input type="file" name="vacuFile" id="vacuFile" className="form-control" />
                </div>
                <button type="button" onClick={() => formHandlerAdjuntos("vacuFile")} className="btn btn-secondary btn-sm">
                  Guardar
                </button>
              </div>
              <div className="col-md-3">
                <a href={`${process.env.REACT_APP_SERVIDOR}/api/clientes/archivos/pasaportes/${id}?query=rut`} target="_blank">
                  <h4>Rut</h4>
                </a>
                <iframe src={`${process.env.REACT_APP_SERVIDOR}/api/clientes/archivos/pasaportes/${id}?query=rut`} width="100%" height="200px" />

                <div className="form-group my-4">
                  <input type="file" name="rutFile" id="rutFile" className="form-control" />
                </div>
                <button type="button" onClick={() => formHandlerAdjuntos("rutFile")} className="btn btn-secondary btn-sm">
                  Guardar
                </button>
              </div>
              <div className="col-md-3">
                <a href={`${process.env.REACT_APP_SERVIDOR}/api/clientes/archivos/pasaportes/${id}?query=cotizaciones`} target="_blank">
                  <h4>Cotizacion</h4>
                </a>
                <iframe
                  src={`${process.env.REACT_APP_SERVIDOR}/api/clientes/archivos/pasaportes/${id}?query=cotizaciones`}
                  width="100%"
                  height="200px"
                />
                <div className="form-group my-4">
                  <input type="file" name="cotiFile" id="cotiFile" className="form-control" />
                </div>
                <button type="button" onClick={() => formHandlerAdjuntos("cotiFile")} className="btn btn-secondary btn-sm">
                  Guardar
                </button>
              </div>
            </div>
          </section>
          {/* <section className="mt-4">
            <div className="form-group">
              <a
                href={`https://www.ccac.com.co/storage/${cliente.recibosFile}`}
                target="_blank"
                rel="noreferrer"
              >
                Descargar Recibo
              </a>
            </div>
          </section> */}
          <div className="row my-4">
            {/* <form
                action={`https://www.ccac.com.co/api/arch/recibos/${cliente.id}`}
                method="POST"
                enctype="multipart/form-data"
                name="recibos"
              >
                <div className="form-group">
                  <label htmlFor="recibos">Subir Recibos</label>
                  <input
                    type="file"
                    name="recibos"
                    id="recibos"
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-secondary btn-sm">
                  Guardar
                </button>
              </form> */}
          </div>
          <div className="row mt-5">
            <h4>Valor de la Oportunidad</h4>
            <div className="row">
              <div className="col-md-3">
                <label htmlFor="fechaLlamada">No. Pasajeros</label>
                <input type="text" name="cantidad" id="cantidad" className="form-control" defaultValue={cliente.cantidad} />
              </div>
              <div className="col-md-3">
                <label htmlFor="vUnitario">V. Unitario</label>
                <input type="text" name="vUnitario" id="vUnitario" className="form-control" defaultValue={cliente.vUnitario} />
              </div>
              <div className="col-md-3">
                <label htmlFor="mesViaje">Valor Total</label>
                <input type="text" name="total" id="total" className="form-control" defaultValue={cliente.total} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <label htmlFor="formaPago">Forma de Pago</label>
              <select name="formaPago" id="formaPago" className="form-control">
                <option value={cliente.formaPago}>{cliente.formaPago}</option>
                <option value="Tarjeta de Credito">Tarjeta de Credito - </option>
                <option value="Efectivo COP">Efectivo COP</option>
                <option value="Efectivo USD">Efectivo USD</option>
                <option value="Transferencia Davivienda">Transferencia Davivienda</option>
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="grupo">Grupo</label>
              <select name="grupo" id="grupo" className="form-control">
                {cliente.grupo ? <option value={cliente.grupo}>{cliente.grupo}</option> : <option value="NO HAY GRUPO">NO HAY GRUPO</option>}
                {/* <option value={cliente.grupo}>{cliente.grupo}</option> */}
                {grupos.map((i, index) => (
                  <option key={index} value={i.nombre}>
                    {i.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row my-4">
            <div className="col-md-6">
              <label htmlFor="observCoti">Observaciones de la cotizacion</label>
              <textarea name="observCoti" id="observCoti" cols="30" rows="5" className="form-control" defaultValue={cliente.observCoti}></textarea>
            </div>
          </div>
          <div className="row mt-5">
            <h4>Seguimiento</h4>
            <div className="col-md-3">
              <label htmlFor="fechaLlamada">Fecha de Seguimiento</label>
              <input type="date" name="fechaLlamada" id="fechaLlamada" className="form-control" defaultValue={cliente.fechaLlamada} />
            </div>
            <div className="col-md-3">
              <label htmlFor="kam">KAM (Vendedor)</label>
              <select name="kam" id="kam" className="form-control">
                <option value={cliente.kam}>{cliente.kam}</option>
                <option value="Leidy">Leidy</option>
                <option value="Alejandra">Alejandra</option>
                <option value="Jessica">Jessica</option>
                <option value="Juliana">Juliana</option>
                <option value="Jesus">Jesus</option>
                <option value="Cecilia">Cecilia</option>
                <option value="Nicolas">Nicolas</option>
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="mesViaje">Mes posible del Viaje</label>
              <select name="mesViaje" id="mesViaje" className="form-control">
                <option value={cliente.mesViaje}>{cliente.mesViaje}</option>
                <option value="Octubre 2021">Octubre 2021</option>
                <option value="Noviembre 2021">Noviembre 2021</option>
                <option value="Diciembre 2021">Diciembre 2021</option>
                <option value="Enero 2022">Enero 2022</option>
                <option value="Febrero 2022">Febrero 2022</option>
                <option value="Marzo 2022">Marzo 2022</option>
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="estado">Estado</label>
              <select name="estado" id="estado" className="form-control">
                <option value={cliente.estado}>{cliente.estado}</option>
                <option value="Imposible de Contactar">Imposible de Contactar</option>
                <option value="Pendiente Enviar Informacion">Pendiente Enviar Informacion</option>
                <option value="Revision Informacion">Revision Informacion</option>
                <option value="Pendiente Enviar Cotizacion">Pendiente Enviar Cotizacion</option>
                <option value="Cotizacion Enviada">Cotizacion Enviada</option>
                <option value="Cotizacion Cargada">Cotizacion Cargada</option>
                <option value="Facturado">Facturado</option>
                <option value="Cerrado Perdido">Cerrado Perdido</option>
                <option value="Abonado">Abonado</option>
                <option value="Pagado">Pagado</option>
                <option value="Devuelto">Devuelto</option>
                <option value="Variaciones">Variaciones</option>
                <option value="Emitir Tiquetes">Emitir Tiquetes</option>
                <option value="En Logistica">En Logistica</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 m-0">
              <label htmlFor="probabilidadCierre">Probabilidad de Cierre</label>
              <select name="probabilidadCierre" id="probabilidadCierre" className="form-control" defaultValue={cliente.probabilidadCierre}>
                <option value={cliente.probabilidadCierre}>{cliente.probabilidadCierre}</option>
                <option value="Identificado">Identificado (0%)</option>
                <option value="Bajo">Bajo (40%)</option>
                <option value="Medio">Medio (40%-80%)</option>
                <option value="Alto">Alto (80% - 90%)</option>
                <option value="Cerrado Ganado">Cerrado Ganado</option>
                <option value="Cerrado Perdido">Cerrado Perdido</option>
              </select>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="cargo">Origen del Contacto</label>
                <select name="origen" id="origen" className="form-control" defaultValue={cliente.origen}>
                  <option value={cliente.origen}>{cliente.origen}</option>
                  <option value="Manual - Otro">Manual - Otro</option>
                  <option value="Redes Sociales">Redes Sociales</option>
                  <option value="URL - Participantes">URL - Participantes</option>
                  <option value="URL - Landing Expo2020">URL - Landing Expo2020</option>
                  <option value="URL - Contactenos">URL - Contactenos</option>
                  <option value="URL - Mailing">URL - Mailing</option>
                  <option value="URL - Inscripciones">URL - Inscripciones</option>
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <label htmlFor="FechaInicioV">Fecha Inicio Viaje</label>
              <input type="date" name="FechaInicioV" id="FechaInicioV" className="form-control" defaultValue={cliente.FechaInicioV} />
            </div>
            <div className="col-md-3">
              <label htmlFor="FechaFinV">Fecha Fin Viaje</label>
              <input type="date" name="FechaFinV" id="FechaFinV" className="form-control" defaultValue={cliente.FechaFinV} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <label htmlFor="noCotizacion">No Cotizacion</label>
              <input type="text" name="noCotizacion" id="noCotizacion" className="form-control" defaultValue={cliente.noCotizacion} />
            </div>
            <div className="col-md-3">
              <label htmlFor="noFactura">No Factura</label>
              <input type="text" name="noFactura" id="noFactura" className="form-control" defaultValue={cliente.noFactura} />
            </div>
          </div>
          <div className="row my-4">
            <div className="col-md-6">
              <label htmlFor="observLlamada">Observaciones Llamada</label>
              <textarea
                name="observLlamada"
                id="observLlamada"
                cols="20"
                rows="5"
                className="form-control"
                defaultValue={cliente.observLlamada}
              ></textarea>
            </div>
          </div>

          <Link to="/clientes/ver">
            <button type="button" className="btn btn-warning me-2">
              Regresar
            </button>
          </Link>
          <button type="submit" className="btn btn-success ms-2">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarCliente;
