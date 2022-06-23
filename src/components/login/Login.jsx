import { Context } from "../../context/Context";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const { auth: { login, user } } = useContext(Context)
  const history = useHistory();
  const [form, setForm] = useState([]);

  useEffect(()=>{
    if(user.isLogin){
      history.replace(`${user.root}`);
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
      Swal.fire({
        icon: "error",
        title: "Error de inicio",
        text: "Revisa la informacion con atencion",
      });
    }
  }

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
