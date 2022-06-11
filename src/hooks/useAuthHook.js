import axios from "axios";
import { useState } from "react";

function useAuthHook() {
  const [user, setUser] = useState({
    isLogin: false,
    name: '',
    image: '',
  });

  let loading = false;

  const login = async (body) => {
    loading = true

    if(body.email === 'admin@mail.com' && body.password === 'admin_intranet') {
      setUser({
        isLogin: true,
        name: 'User Admin',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHu9ChhiW6BNfVmsm0VZhJWTcLkyVMYo2D9Q&usqp=CAU',
      })
    }
    // const { data } = await axios({
    //   method: 'POST',
    //   url: 'URL',
    //   data: body,
    // })
    // setUser(data.user)
    // window.sessionStorage.setItem('key', 'value')
    loading = false
  }

  const logout = () => {
    setUser({
      isLogin: false,
      name: '',
      image: '',
    })
    // window.sessionStorage.removeItem('key')
  }


  const register = (email, password) => {
    // setLoading(true)
    // const body = {
    //   email,
    //   password
    // }
    // const { data } = await axios({
    //   method: 'POST',
    //   url: 'URL',
    //   data: body,
    // })
    return 'success'
  }

  return {
    user,
    loading,
    login,
    logout,
    register,
  }
}

export { useAuthHook }
