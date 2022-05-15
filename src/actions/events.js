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
            event.id = body.id;
            event.user = {
               _id: uid,
               name: name
            }
            console.log(event);
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

export const ModifyEvent = (event) => ({
   type: types.eventModify,
   payload: event
})

export const DeleteEvent = () => ({
   type: types.eventDelete
})

const eventLoaded = (events) => ({
   type: types.eventLoaded,
   payload: events
})