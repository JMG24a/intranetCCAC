import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Anm from "../components/anm/Anm";
import CrearCliente from "../components/clientes/CrearCliente";
import EditarCliente from "../components/clientes/EditarCliente";
import VerClientes from "../components/clientes/VerClientes";
import Costos from "../components/costos/Costos";
import Export from "../components/export/Export";
import Grupos from "../components/grupos/Grupos";
import Navbar from "../components/includes/Navbar";
import Lbc from "../components/lbc/Lbc";
import Login from "../components/login/Login";
import Logistica from "../components/logistica/Logistica";
import Clientes from "../components/pages/clientes/Clientes";
import Inicio from "../components/pages/inicio/Inicio";
import Misiones from "../components/pages/misiones/Misiones";
import Pendientes from "../components/pages/pendientes/Pendientes";
import Tarjetas from "../components/pages/tarjetas/Tarjetas";

import Calendario from "../components/pages2/Calendar/Calendario";
import Deals from "../components/pages2/Deals/Deals";
import Employees from "../components/pages2/Employees/Employees";
import Inicio2 from "../components/pages2/Inicio/Inicio2";
import Leads from "../components/pages2/Leads/Leads";
import Quotation from "../components/pages2/Quotations/Quotation";
import QuotationPDF from "../components/pages2/Quotations/QuotationPDF";
import QuotationShow from "../components/pages2/Quotations/QuotationShow";
import Participantes from "../components/participantes/Participantes";
//jmg24a dependencies
import { CalendarContext } from '../context/CalendarContext';
import "../css/style.css";

export const AppRouter = () => {
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route exact path="/">
            <Navbar />
            <CalendarContext>
              <Calendario />
            </CalendarContext>
          </Route>
          <Route exact path="/deals">
            <Navbar />
            <Deals />
          </Route>
          <Route exact path="/accounts">
            <Navbar />
            <Inicio2 />
          </Route>
          <Route exact path="/employees">
            <Navbar />
            <Employees />
          </Route>
          <Route exact path="/leads">
            <Navbar />
            <Leads />
          </Route>
          <Route exact path="/cotizaciones">
            <Navbar />
            <Quotation />
          </Route>
          <Route exact path="/cotizaciones/ver">
            <Navbar />
            <QuotationShow />
          </Route>
          <Route exact path="/cotizaciones/imprimir/:noCoti">
            <Navbar />
            <QuotationPDF />
          </Route>
          <Route path="/">
            <Navbar />
            <Inicio2 />
          </Route>
        </Switch>
      </Fragment>
    </Router>
  );
};

export default AppRouter;
