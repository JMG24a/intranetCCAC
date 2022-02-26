import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
const Navbar = () => {
  const [user, setUser] = useState({ nombre: "", imagen: "" });
  const cookies = new Cookies();
  const userId = cookies.get("userId");
  const getUser = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVIDOR}/api/usuarios/${userId}`, {
        headers: {
          token: "JaRvIs92!",
          correo: "alecapo@gmail.com",
          password: "123456",
        },
      })
      .then((e) => {
        setUser(e.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <img
          src="/images/LogoCCACacostado.svg"
          alt="LogoCCAC"
          style={{ width: "15%", padding: "15px" }}
        />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/clientes" className="nav-link">
                Clientes
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/misiones" className="nav-link">
                Misiones
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-white">
          <i className="fas fa-tasks fa-2x"></i>
        </div>
        <div className="userContainer ms-5">
          <img
            className="user"
            src={user.imagen}
            alt="Imagen de perfil"
            // width={50}
          />
          <p className="mx-2 mt-2 text-white">{user.nombre}</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
