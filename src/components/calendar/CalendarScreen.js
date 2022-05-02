import React from 'react';
import { Navbar } from '../ui/Navbar';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';

moment.locale('es');

const localizer = momentLocalizer(moment);

const myEventsList = [{
  title: 'Cumpleanos de pepe',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  bgcolor: '#FAFAFA',
  notes: 'comprar las cosas'
}]

export const CalendarScreen = () => {

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }
    return {
      style
    }
  }
  return (
    <div className='calendar-screen'>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  )
}