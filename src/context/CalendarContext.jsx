import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import moment from "moment";
import axios from 'axios';

const Calendar = createContext({})

function CalendarContext(props){
  const [ events, setEvents] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(()=>{
    if(events.length <= 0){getEvents()}
 }, [])

  const getEvents = async() => {
    const { data } = await axios.get('https://alejocabrejo.com/api/v1/calendar')
    const response = data.calendars.map(item => {
      const starting = moment(item.start, 'DD/MM/YYYY');
      const ending = moment(item.end, 'DD/MM/YYYY');

      const calendar = {
        ...item,
        start: starting._d,
        end: ending._d,
        color: item.bgcolor
      }
      return calendar
    })

    setEvents(response)
    setIsLoading(false)
  }

  const create = async(data) => {
    setIsLoading(true)
    const starting = moment(data.start, 'YYYY-MM-DDTHH:mm').format('DD/MM/YYYY');
    const ending = moment(data.end, 'YYYY-MM-DDTHH:mm').format('DD/MM/YYYY');

    const newDate = {
      title:  data.title,
      start: starting,
      end: ending,
      name: data.name,
      bgcolor: data.color,
      nota:  data.nota
    }

    try{
      await axios({
        method: 'POST',
        url: 'https://alejocabrejo.com/api/v1/calendar',
        data: newDate
      })
      await getEvents()
      setIsLoading(false)
    }
    catch(e){
      console.error(e)
    }
  }

  const edit = async(data) => {
    setIsLoading(true)
    const starting = moment(data.start,'YYYY-MM-DDTHH:mm').format('DD/MM/YYYY');
    const ending = moment(data.end,'YYYY-MM-DDTHH:mm').format('DD/MM/YYYY');
    const id = data.id;

    const editDate = {
      title:  data.title,
      start: starting,
      end: ending,
      bgcolor: data.color,
      name: data.name,
      nota:  [data.nota]
    }

    const edit = [editDate,id]
    try{
      await axios({
        method: 'PUT',
        url:'https://alejocabrejo.com/api/v1/calendar',
        data: edit
      })

      await getEvents()
      setIsLoading(false)
    }
    catch(e){
      console.error(e)
    }

  }

  const removed = async(data) => {
    setIsLoading(true)
    const id = {id: data.id}
    try{
      await axios({
        method: 'DELETE',
        url:'https://alejocabrejo.com/api/v1/calendar',
        data: id
      })

      await getEvents()
      setIsLoading(false)
    }
    catch(e){
      console.log(e)
    }
  }

  return(
    <Calendar.Provider value={{
      events,
      create,
      edit,
      removed,
      isLoading
    }}>
      {props.children}
    </Calendar.Provider>
  );
}

export { Calendar, CalendarContext }
