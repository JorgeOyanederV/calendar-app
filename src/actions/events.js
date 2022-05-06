import { types } from "../types/types";

export const SetActiveEvent = (event) => ({
   type: types.event,
   payload: event
});

export const AddNewEvent = (event) => ({
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