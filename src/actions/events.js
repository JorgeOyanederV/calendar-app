import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { fixEvents } from "../helpers/fixEvents";
import { types } from "../types/types";


export const eventStartAddNew = (event) => {
   return async (dispatch, getState) => {
      const { uid, name } = getState().auth;

      try {
         const resp = await fetchWithToken('events', event, 'POST');
         const body = await resp.json();

         if (body.ok) {
            event.id = body.event.id;
            event.user = {
               _id: uid,
               name: name
            }
            dispatch(AddNewEvent(event));
         }
      } catch (error) {
         console.log(error);
      }

   }
}

export const startLoadEvents = () => {
   return async (dispatch) => {
      try {
         const resp = await fetchWithToken('events');
         const body = await resp.json();
         if (body.ok) {
            const fixedEvents = fixEvents(body.events);
            dispatch(eventLoaded(fixedEvents));
         }

      } catch (error) {
         console.log(error);
      }
   }
}

export const SetActiveEvent = (event) => ({
   type: types.event,
   payload: event
});

const AddNewEvent = (event) => ({
   type: types.eventAddNew,
   payload: event
});

export const startModifyEvent = (event) => {
   return async (dispatch) => {

      try {
         const resp = await fetchWithToken(`events/${event.id}`, event, 'PUT');
         const body = await resp.json();

         if (body.ok) {
            dispatch(ModifyEvent(event));
         } else {
            Swal.fire('Error', body.msg, 'error');
         }

      } catch (error) {
         console.log(error);
      }
   }
}

const ModifyEvent = (event) => ({
   type: types.eventModify,
   payload: event
})

export const startEventDelete = () => {
   return async (dispatch, getState) => {
      const { id } = getState().calendar.activeEvent;
      
      try {
         const resp = await fetchWithToken(`events/${id}`, {}, 'DELETE');
         const body = await resp.json();

         if (body.ok) {
            dispatch(DeleteEvent());
         } else {
            Swal.fire('Error', body.msg, 'error');
         }

      } catch (error) {
         console.log(error);
      }
   }
}

const DeleteEvent = () => ({
   type: types.eventDelete
})

const eventLoaded = (events) => ({
   type: types.eventLoaded,
   payload: events
})