import { Context } from "../../context/Context";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const { auth: { register } } = useContext(Context)
  const history = useHistory();
  const [form, setForm] = useState([]);

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if(form.password !== form.password2){
      Swal.fire({
        icon: "error",
        title: "Las contraceñas nos coinciden",
        text: "Revisa con atencion la informacion",
      });
      return 0
    }
    const body = {
      email: form.email,
      password: form.password
    }
    const response = await register(body)
    const regex = /\error/g

    if(regex.test(response)){
      Swal.fire({
        icon: "error",
        title: "Servicio no disponible",
        text: "Porfavor intenta mas tarde",
      });
    }

    Swal.fire({
      icon: "success",
      title: "cuenta creada con exito",
      text: "Ya puedes acceder a la pagina",
    });
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
                type="email"
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
            <div className="form-group mt-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                id="password2"
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
        Ya tienes una cuenta? <Link to={'/login'} className="text-danger text-decoration-none"> clik aqui!</Link>
      </p>
    </div>
  );
};

export default Register;
