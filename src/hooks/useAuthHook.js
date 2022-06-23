import axios from "axios";
import { useState } from "react";

function useAuthHook() {
  const [user, setUser] = useState({
    root: '/',
    isLogin: false,
    email: '',
    name: '',
    image: '',
  });

  let loading = false;

  const login = async (body) => {
    loading = true

    try{
      loading = true
      const { data } = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVIDOR}/api/v1/login`,
        data: body,
      })

      if(data){
        setUser({
          root: `/`,
          isLogin: true,
          email: data.user.email,
          name: data.user.nameEmployee,
          image: data.user.photo,
        })
        window.sessionStorage.setItem('key', `${data.token}`)
      }

      loading = false
      return data.msg
    }catch (e) {
      console.error(e)
    }

    loading = false
    return 'incorrect Auth';
  }

  const getUser = async(root) => {
    loading = true;
    const jwt = window.sessionStorage.getItem('key')
    const token = {
      token: `${jwt}`
    }

    try{
      const { data } = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVIDOR}/api/v1/authorization`,
        data: token
      })

      if(data){
        setUser({
          root: `${root}`,
          isLogin: true,
          name: data?.employee?.nameEmployee,
          email: data?.employee?.email,
          image: data?.employee?.photo,
        })
        window.sessionStorage.removeItem('key')
        window.sessionStorage.setItem('key', `${data.token}`)
      }

      loading = false;
      return data
    }catch(e){
      console.error(e)
    }
  }

  const logout = () => {
    setUser({
      isLogin: false,
      name: '',
      email: '',
      image: '',
    })
    window.sessionStorage.removeItem('key')
  }


  const register = async (body) => {
    // try{
    //   const { data } = await axios({
    //     method: 'POST',
    //     url: 'URL',
    //     data: body,
    //   })

    //   return data.msg
    // }catch (e) {
    //   console.error(e)
    // }

    return 'success'
  }

  const getToken = () => {
    const token = window.sessionStorage.getItem('key')
    return token
  }

  return {
    user,
    loading,
    getUser,
    login,
    logout,
    register,
    getToken
  }
}

export { useAuthHook }
