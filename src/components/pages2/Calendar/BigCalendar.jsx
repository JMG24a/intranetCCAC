import React, { useContext } from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

import { Context } from '../../../context/Context';
import { CalendarEvent } from './CalendarEvent'
import 'react-big-calendar/lib/css/react-big-calendar.css'
require("moment/locale/es.js");

const message = {
  next: ">",
  previous: "<",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  allDay: "Todo el día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "No hay eventos en este rango",
}

const localizer = momentLocalizer(moment)

function BigCalendar() {
  const { calendar:{events} } = useContext(Context)

  return (
    <Calendar
      localizer={localizer}
      events={events}
      messages={message}
      style={{ height: 400 }}
      startAccessor="start"
      endAccessor="end"
      components={{
          event: CalendarEvent,
      }}
    />
  );
}

export { BigCalendar }


// import React, { useState } from "react";
// // import Modal from "react-modal";
// // import "./modalStyle.css";

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//   },
// };

// // Modal.setAppElement("#root");

// export const CalendarModal = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   const closeModal = () => {
//     setIsOpen(false);
//   };
//   return (
//     <div>
//       {/* <Modal
//         isOpen={isOpen}
//         // onAfterOpen={afterOpenModal}
//         onRequestClose={closeModal}
//         style={customStyles}
//         closeTimeoutMS={200}
//         className="modal"
//         overlayClassName="modal-fondo"
//       >
//         <h1>Hola</h1>
//         <hr />
//         <p>Lorem ipsum dolor sit.</p>
//       </Modal> */}
//     </div>
//   );
// };
