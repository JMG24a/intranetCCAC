import { Context } from "../../context/Context";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { MenuAdmin } from "./MenuAdmin";

const Navbar = () => {
  const { auth: { user, getUser, logout } } = useContext(Context)
  const [isMenu, setIsMenu] = useState(false);
  const history = useHistory();
  const locate = useLocation()

  useEffect(()=>{
    if(!user.isLogin){
      validationSession()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[locate.pathname, user.isLogin])

  const validationSession = async () => {
    const success = await getUser();

    const router = locate.pathname.replace('/', '');
    const isValid = ['login','register'].includes(router);

    if(!success && !isValid){
      history.replace("/login");
    }
  }

  // const [user, setUser] = useState({ nombre: "", imagen: "" });
  // const cookies = new Cookies();
  // const userId = cookies.get("userId");

  // const getUser = async () => {
  //   await axios
  //     .get(`${process.env.REACT_APP_SERVIDOR}/api/usuarios/${userId}`, {
  //       headers: {
  //         token: "JaRvIs92!",
  //         correo: "alecapo@gmail.com",
  //         password: "123456",
  //       },
  //     })
  //     .then((e) => {
  //       setUser(e.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <img src="/images/LogoCCACacostado.svg" alt="LogoCCAC" style={{ width: "15%", padding: "15px" }} />

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
              <Link to="/accounts" className="nav-link">
                Accounts
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/deals" className="nav-link">
                Deals
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/employees" className="nav-link">
                Employees
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/leads" className="nav-link">
                Leads
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="/cotizaciones" className="nav-link">
                Quotations
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cotizaciones/ver" className="nav-link">
                Ver Quotations
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-white">
          <i className="fas fa-tasks fa-2x"></i>
        </div>
          {!!user.isLogin &&
            <div className="userContainer ms-5 text-center" onClick={()=>setIsMenu(!isMenu)}>
              <img
                className="user"
                src={user.image}
                alt="Imagen de perfil"
                // width={50}
              />
              <p className="mx-2 mt-2 text-white">{user.name}</p>
            </div>
          }
      </div>
    </nav>
    {!!user.isLogin && !!isMenu && <MenuAdmin logout={logout} setIsMenu={setIsMenu}/>}
    </>
  );
};

export default Navbar;
