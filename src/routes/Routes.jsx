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
import Deals from "../components/pages2/Deals/Deals";
import Inicio2 from "../components/pages2/Inicio/Inicio2";
import Participantes from "../components/participantes/Participantes";
import "../css/style.css";

export const AppRouter = () => {
  return (
    <Router>
      <Fragment>
        <Switch>
          {/* <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/tarjetas">
            <Navbar />
            <Tarjetas />
          </Route>
          <Route exact path="/clientes/editar/:id">
            <Navbar />
            <EditarCliente />
          </Route>
          <Route exact path="/clientes">
            <Navbar />
            <Clientes />
          </Route>

          <Route exact path="/clientes/crear">
            <Navbar />
            <CrearCliente />
          </Route>
          <Route exact path="/clientes/anm">
            <Navbar />
            <Anm />
          </Route>
          <Route exact path="/costos">
            <Navbar />
            <Costos />
          </Route>
          <Route exact path="/participantes">
            <Navbar />
            <Participantes />
          </Route>
          <Route exact path="/export">
            <Export />
          </Route>
          <Route exact path="/logistica/:id">
            <Logistica />
          </Route>
          <Route exact path="/grupos">
            <Grupos />
          </Route>
          <Route exact path="/pendientes">
            <Navbar />
            <Pendientes />
          </Route>
          <Route exact path="/misiones">
            <Navbar />
            <Misiones />
          </Route>
          <Route exact path="/lbc">
            <Navbar />
            <Lbc />
          </Route> */}
          <Route exact path="/">
            <Navbar />
            <Inicio2 />
          </Route>
          <Route exact path="/deals">
            <Navbar />
            <Deals />
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
