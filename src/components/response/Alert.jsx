import React, { useEffect } from 'react';

function Alert({setAlert, alert}) {

  useEffect(()=>{
    setTimeout(()=>{
      setAlert(false)
    },5000)
  })

  return(
    <div>
      <p>{alert.message}</p>
    </div>
  )
}

export { Alert }
