import { Context } from "../../context/Context";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

const Login = () => {
  const cookies = new Cookies();
  const { auth: { login, user } } = useContext(Context)
  const history = useHistory();
  const [form, setForm] = useState([]);

  useEffect(()=>{
    if(user.isLogin){
      history.replace("/");
    }
  },[user])

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const response = await login(form)
    const regex = /\incorrect/g

    if(regex.test(response)){
      console.log(response)
      Swal.fire({
        icon: "error",
        title: "Error de inicio",
        text: "Revisa la informacion con atencion",
      });
    }
  }

  // const loginHandler = (e) => {
  //   e.preventDefault();

  //   const body = form;

  //   axios
  //     .post(`${process.env.REACT_APP_SERVIDOR}/api/usuarios`, body, {
  //       headers: {
  //         token: "JaRvIs92!",
  //         correo: form.correo,
  //         password: form.password,
  //       },
  //     })
  //     .then((e) => {
  //       const token = e.data.token;
  //       const tokenAuth = token.slice(0, 1) * 3;
  //       if (tokenAuth === 0) {
  //         console.log("autenticado");
  //         cookies.set(
  //           "token",
  //           "3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03",
  //           { path: "/", maxAge: 2592000 }
  //         );
  //         cookies.set("usuario", e.data.nombre);

  //         cookies.set("userId", e.data.id);
  //         history.replace("/");
  //       } else {
  //         return console.log("Error de autenticacion 2");
  //       }
  //     })
  //     .catch((e) => console.log(e));
  // };

  return (
    <div>
      <div className="login">
        <div
          className="col-md-4 mx-auto text-white"
          style={{ marginTop: "50px" }}
        >
          <img src="/images/LogoCCAC.svg" alt="" />
          <form action="" onSubmit={loginHandler}>
            <div className="form-group">
              <label htmlFor="email">Correo</label>
              <input
                type="text"
                className="form-control"
                name="email"
                id="email"
                onChange={formHandler}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                onChange={formHandler}
              />
            </div>
            <button type="submit" className="btn mt-3">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
      <p className="text-white text-center mt-2">
        Ya tienes una cuenta? <Link to={'/register'} className="text-danger text-decoration-none"> clik aqui!</Link>
      </p>
    </div>
  );
};

export default Login;
