import React from 'react'
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';


const Inicio = () => {

    const history = useHistory();
    const cookies = new Cookies();
    if(cookies.get('token') !== '3d33c77f6aba01680fce7ec86557886856f6e75392fc3d7e79566fd0980b6c03'){
    console.log('error de autenticacion')
    history.replace('/login')
    }
    
    
    return (
        <div>
            Pagina de Inicio
        </div>
    )
}

export default Inicio
