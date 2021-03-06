import React, { useContext, useState } from 'react';

import { Calendar } from '../../../context/CalendarContext';
import { FormCalendar } from './FormCalendar';
import { ModalCalendar } from './ModalCalendar';
import { DetailCalendar } from './DetailCalendar';
// import '../css/calendarEvent.css';
import './calendarStyle.css'

function CalendarEvent(props) {
  const { removed, edit } = useContext(Calendar)
  const [isOpen, setIsOpen] = useState(false)
  const [isConfig, setIsConfig] = useState(false)

  const handleDouble = () => {
    setIsOpen(!isOpen)
  }

  const handleClick = () => {
    setIsOpen(!isOpen)
    setIsConfig(!isConfig)
  }

  return (
    <div
      className='calendar-event'
      style={{background: `${props.event.color}`}}
      onDoubleClick={handleDouble}
    >

      <div className='calendar-event-description'>
        <p>{props.event.title}</p>
        <p>Autor: {props.event.name}</p>
      </div>

      {!!isOpen &&
        <DetailCalendar
          details={props.event}
          handleClick={handleClick}
          setIsOpen={setIsOpen}
          removed={removed}
        />
      }

      {isConfig &&
        <ModalCalendar>
          <FormCalendar
              title={'Editar Evento'}
              setIsOpen={setIsConfig}
              event={edit}
              initialV={props.event}
          />
        </ModalCalendar>
      }
    </div>
  );
}

export { CalendarEvent }



// import React from "react";

// const CalendarEvent = ({ event }) => {
//   const { title, name } = event;
//   return (
//     <div>
//       <strong>{title}</strong> <br />
//       <span>- {name}</span>
//     </div>
//   );
// };

// export default CalendarEvent;
