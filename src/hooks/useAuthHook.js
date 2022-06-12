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
      window.sessionStorage.setItem('token', 'este es mi token 00')
      return 'Success';
    }

    // try{
    //   loading = true
    //   const { data } = await axios({
    //     method: 'POST',
    //     url: 'URL',
    //     data: body,
    //   })

    //   if(data){
    //     setUser({
    //       isLogin: true,
    //       name: data.user.name,
    //       image: data.user.image,
    //     })
    //     window.sessionStorage.setItem('key', 'data.token')
    //   }

    //   loading = false
    //   return data.msg
    // }catch (e) {
    //   console.error(e)
    // }

    loading = false
    return 'incorrect Auth';
  }

  const getUser = async() => {
    loading = true;
    const token = window.sessionStorage.getItem('token')

    // try{
    //   const { data } = await axios({
    //     method: 'POST',
    //     url: 'URL',
    //     data: token,
    //   })

    //   if(data.success){
    //     setUser({
    //        isLogin: true,
    //        name: data.user.name,
    //        image: data.user.image,
    //      })
    //   }

    //   loading = false;
    //   return data.success
    // }catch(e){
    //   console.error(e)
    // }

    if(token){
      setUser({
        isLogin: true,
        name: 'User Admin',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHu9ChhiW6BNfVmsm0VZhJWTcLkyVMYo2D9Q&usqp=CAU',
      })
      return true
    }else{
      setUser({
        isLogin: false,
        name: '',
        image: '',
      })
      return false
    }
  }

  const logout = () => {
    setUser({
      isLogin: false,
      name: '',
      image: '',
    })
    window.sessionStorage.removeItem('token')
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
    const token = window.sessionStorage.getItem('token')
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
