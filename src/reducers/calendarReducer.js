import { types } from "../types/types";
// {
//    id: new Date().getTime(),
//       title: 'Cumpleanos de pepe',
//          start: moment().toDate(),
//             end: moment().add(2, 'hours').toDate(),
//                bgcolor: '#FAFAFA',
//                   notes: 'Comprar pastel',
//                      user: {
//       _id: '123',
//          name: 'jorge'
//    }
// }
const initialState = {
   events: [],
   activeEvent: null
}
export const calendarReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.eventLoaded:
         return {
            ...state,
            events: [...action.payload]
         }
      case types.event:
         return {
            ...state,
            activeEvent: action.payload
         }
      case types.eventAddNew:
         return {
            ...state,
            events: [action.payload, ...state.events]
         }
      case types.eventModify:
         return {
            ...state,
            events: state.events.map((event) => (event.id === action.payload.id) ? action.payload : event)
         }
      case types.eventDelete:
         return {
            ...state,
            events: state.events.map((event) => (event.id !== state.activeEvent.id)),
            activeEvent: null
         }
      default:
         return state;
   }
}