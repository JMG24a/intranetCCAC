import React from 'react';
import { ModalCalendar } from './ModalCalendar';
// import { ImCross } from 'react-icons/im'
// import '../css/detail.css'
import './calendarStyle.css'

function DetailCalendar(props) {
  const {
      details,
      handleClick,
      setIsOpen,
      removed
  } = props

  return (
    <ModalCalendar>
      <div className='container-detail'>
        <h3 className='detail-title'>DETALLES DEL EVENTO</h3>
        <div className='container-detail-group'>
          <i
              className='close-detail    fa fa-times fa-2x'
              onClick={()=>setIsOpen(false)}
          />

          <div className='details-descriptions'>
            <p>{details.title}</p>
            <p>{details.nota}</p>
            <p>autor: {details.name}</p>
          </div>

          <div className='detail-options'>
            <button onClick={handleClick}>Editar</button>
            <button onClick={()=>removed(details)}>Eliminar</button>
          </div>
        </div>
      </div>
    </ModalCalendar>
  );
}

export { DetailCalendar }
