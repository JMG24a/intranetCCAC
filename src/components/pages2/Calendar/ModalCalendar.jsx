import React from 'react';
import ReactDOM from 'react-dom';
// import '../css/modal.css'
import './calendarStyle.css'

function ModalCalendar(props) {
  return ReactDOM.createPortal(
    <div className='modal-calendar'>
      {props.children}
    </div>,
    document.getElementById('modal')
  )
}

export { ModalCalendar }
