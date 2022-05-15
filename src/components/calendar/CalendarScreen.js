import React, { useEffect, useState } from 'react';
import { Navbar } from '../ui/Navbar';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { SetActiveEvent, startLoadEvents } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

// const initEvent = [{
//   title: 'Cumpleanos de pepe',
//   start: moment().toDate(),
//   end: moment().add(2, 'hours').toDate(),
//   bgcolor: '#FAFAFA',
//   notes: 'Comprar pastel',
//   user: {
//     _id: '123',
//     name: 'jorge'
//   }
// }]

export const CalendarScreen = () => {

  const { uid } = useSelector(state => state.auth);

  const { events } = useSelector(state => state.calendar);

  const dispatch = useDispatch();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  useEffect(() => {
    dispatch(startLoadEvents());
  }, [dispatch])


  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  }
  const onSelectEvent = (e) => {
    dispatch(SetActiveEvent(e));
  }
  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }
    return {
      style
    }
  }
  const onSelectSlot = (e) => {
    dispatch(SetActiveEvent(null))
  }

  return (
    <div className='calendar-screen'>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
        components={{ event: CalendarEvent }}
        selectable={true}
        onSelectSlot={onSelectSlot}
      />
      <AddNewFab />

      <DeleteEventFab />
      <CalendarModal />


    </div>
  )
}
