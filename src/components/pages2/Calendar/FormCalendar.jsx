import React from 'react';

import { useInputValue } from '../../../hooks/useInputValue'
// import { ImCross } from 'react-icons/im'
// import '../css/form.css';
import './calendarStyle.css'

function FormCalendar(props){
  const id = props?.initialV?.id;
  let title = useInputValue(props?.initialV?.title)
  let start = useInputValue()
  let end = useInputValue()
  let color = useInputValue(props?.initialV?.color || '#7f1232')
  let name = useInputValue(props?.initialV?.name)
  let nota = useInputValue(props?.initialV?.nota)

  const handleCanceled = () => {
      props.setIsOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.event({
      id,
      title: title.getValue,
      start: start.getValue,
      end: end.getValue,
      color: color.getValue,
      name: name.getValue,
      nota: nota.getValue,
    })
    props.setIsOpen(false)
  }

  return (
    <div className='container-form'>
      <i
        className='close-detail fa fa-times fa-2x'
        onClick={()=>handleCanceled(false)}
      />

      <h3 className='title'>{props.title}</h3>

      <form
          className='form'
          onSubmit={(e)=>handleSubmit(e)}
      >
        <div className='group-title-author'>
          <input
              className='title-author'
              onChange={(e) => title.onChange(e)}
              placeholder='Titulo'
              name='title'
              value={title.getValue}
          />
          <input
              className='title-author'
              onChange={(e)=>name.onChange(e)}
              placeholder='Autor'
              name='name'
              value={name.getValue}
          />
        </div>

        <label>Inicio</label>
        <input
            onChange={(e)=>start.onChange(e)}
            type='datetime-local'
            placeholder='name'
            name='start'
            required={true}
            value={start.getValue}
        />
        <label>Cierre</label>
        <input
            onChange={(e)=>end.onChange(e)}
            type='datetime-local'
            placeholder='name'
            name='end'
            required={true}
            value={end.getValue}
        />
        <label>Color</label>
        <input
            onChange={(e)=>color.onChange(e)}
            className='inputColor'
            type={'color'}
            placeholder='name'
            name='color'
            value={color.getValue}
        />
        <textarea
            onChange={(e)=>nota.onChange(e)}
            type='text-area'
            placeholder='name'
            name='nota'
            value={nota.getValue}
        />

        <button className='submit' >{props.title}</button>
      </form>
    </div>
  );
}

export { FormCalendar }
