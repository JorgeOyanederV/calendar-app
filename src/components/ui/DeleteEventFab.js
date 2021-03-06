import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startEventDelete } from '../../actions/events';

export const DeleteEventFab = () => {
   const { activeEvent } = useSelector(state => state.calendar);
   const dispatch = useDispatch();
   const handleDelete = () => {
      dispatch(startEventDelete());
   }
   return (
      <>
         {
            (activeEvent) && (<button
               className='btn btn-danger fab-danger'
               onClick={handleDelete}>
               <i className='fas fa-trash'></i>
               <span> Borrar Evento</span>
            </button>)
         }
      </>
   )
}
