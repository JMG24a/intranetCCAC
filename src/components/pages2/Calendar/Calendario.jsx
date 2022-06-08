import React, { useState, useContext } from 'react';

import { Calendar as Context } from '../../../context/CalendarContext'
import { BigCalendar } from './BigCalendar'
import { ModalCalendar } from './ModalCalendar';
import { FormCalendar } from './FormCalendar';
import './calendarStyle.css'

function CalendarWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const { create, isLoading } = useContext(Context)

  const handleEvent = () => {
      setIsOpen(!isOpen)
  }

  return (
    <div className='wrapper-calendar'>
      <h2>Calendario</h2>
      <div>
        <button
          className='btn btn-primary mb-2'
          variant="primary"
          size="sm"
          onClick={handleEvent}
        >
          Crear Nuevo
        </button>
      </div>

      {!!isLoading &&
        <ModalCalendar>
          <div className="spinner-border text-light loader-calendar" role="status">
            <span class="sr-only"></span>
          </div>
        </ModalCalendar>
      }

      <BigCalendar/>

      {!!isOpen &&
        <ModalCalendar>
            <FormCalendar
                title={'CREAR EVENTO'}
                event={create}
                setIsOpen={setIsOpen}
            />
        </ModalCalendar>
      }
    </div>
  )
}

export default CalendarWrapper


// import React, { useEffect } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "moment/locale/es";
// import CalendarEvent from "./CalendarEvent";
// import { CalendarModal } from "./CalendarModal";

// moment.locale("es");
// const localizer = momentLocalizer(moment);
// const myEventsList = [
//   {
//     title: "Reunion con Universidad de Antioquia",
//     start: moment().toDate(),
//     end: moment().add(2, "hours").toDate(),
//     bgcolor: "#6A1525",
//     name: "Alejandro Cabrejo",
//     notes: "Notas",
//   },
//   {
//     title: "Reunion con Legicomex",
//     start: moment().subtract(48, "hours").toDate(),
//     end: moment().subtract(24, "hours").toDate(),
//     bgcolor: "#ffffff",
//     name: "Juliana Cabrejo",
//     notes: "Notas",
//   },
// ];
// export const messages = {
//   allDay: "Todo el día",
//   previous: "<",
//   next: ">",
//   today: "Hoy",
//   month: "Mes",
//   week: "Semana",
//   day: "Día",
//   agenda: "Agenda",
//   date: "Fecha",
//   time: "Hora",
//   event: "Evento",
//   noEventsInRange: "No hay eventos en este rango",
//   showMore: (total) => `+ Ver más (${total})`,
// };

// const Calendario = () => {
//   const onDoubleClick = (e) => {
//     console.log(e);
//   };

//   const onSelectEvent = (e) => {
//     console.log(e);
//   };

//   const eventStyleGetter = (event, start, end, isSelected) => {
//     console.log(event, start, end, isSelected);

//     const style = {
//       backgroundColor: "#6A1525",
//       borderRadius: "0px",
//       opacity: 0.9,
//       display: "block",
//     };

//     return {
//       style,
//     };
//   };

//   return (
//     <div>
//       <div className="bg-white p-4">
//         <h1>Calendario</h1>
//         <section style={{ height: "500px" }}>
//           <Calendar
//             localizer={localizer}
//             events={myEventsList}
//             messages={messages}
//             startAccessor="start"
//             endAccessor="end"
//             style={{ height: 500 }}
//             onDoubleClickEvent={onDoubleClick}
//             onSelectEvent={onSelectEvent}
//             eventPropGetter={eventStyleGetter}
//             components={{
//               event: CalendarEvent,
//             }}
//           />
//         </section>
//       </div>
//       <CalendarModal />
//     </div>
//   );
// };

// export default Calendario;
