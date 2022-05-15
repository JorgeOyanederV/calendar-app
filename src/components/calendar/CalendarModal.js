import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventStartAddNew, ModifyEvent, SetActiveEvent } from '../../actions/events';

const customStyles = {
   content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
   },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).second(0).add(1, 'hours');
const nowClone = now.clone().add(1, 'hours');
const initEvent = {
   title: '',
   notes: '',
   start: now.toDate(),
   end: nowClone.toDate()
};
export const CalendarModal = () => {
   const { modalOpen } = useSelector(store => store.ui);
   const { activeEvent } = useSelector(store => store.calendar);
   const dispatch = useDispatch();

   const [dateStart, setDateStart] = useState(now.toDate());
   const [dateEnd, setDateEnd] = useState(nowClone.toDate());

   const [isValidTitle, setIsValidTitle] = useState(true);

   const [formValues, setFormValues] = useState(initEvent);

   useEffect(() => {
      if (activeEvent) {
         setFormValues(activeEvent);
      } else {
         setFormValues(initEvent)
      }
   }, [activeEvent, setFormValues])


   const handleInputChange = ({ target }) => {
      setFormValues({
         ...formValues,
         [target.name]: target.value
      })
   };
   const { title, notes, start, end } = formValues;


   const closeModal = () => {
      dispatch(uiCloseModal());
      dispatch(SetActiveEvent(null));
      setFormValues(initEvent);
   }

   const handleStartDate = (e) => {
      setDateStart(e);
      setFormValues({
         ...formValues,
         start: e
      });
   }
   const handleEndDate = (e) => {
      setDateEnd(e);
      setFormValues({
         ...formValues,
         end: e
      })
   }

   const handleSubmitForm = (e) => {
      e.preventDefault();
      const momentStart = moment(start)
      const momentEnd = moment(end)

      if (momentStart.isSameOrAfter(momentEnd)) {
         return Swal.fire('Fechas Erroneas',
            'La fecha de finalizacion debe ser despues de la fecha de inicio.',
            'error'
         )
      }
      if (title.trim().length < 2) {
         return setIsValidTitle(false);
      } else {
         setIsValidTitle(true)
      }
      // TODO: Realizar conexiones con base de datos.
      if (activeEvent) {
         dispatch(ModifyEvent(formValues));
      } else {
         dispatch(eventStartAddNew(formValues))
      }
      closeModal();
   }

   return (
      <Modal
         isOpen={modalOpen}
         // onAfterOpen={afterOpenModal}
         onRequestClose={closeModal}
         style={customStyles}
         closeTimeoutMS={200}
         className='modal'
         overlayClassName='modal-fondo'
      >
         <h1> {(activeEvent) ? "Editando Evento" : "Nuevo Evento"} </h1>
         <hr />
         <form className="container" onSubmit={handleSubmitForm}>

            <div className="form-group">
               <label>Fecha y hora inicio</label>
               {/* <input className="form-control" placeholder="Fecha inicio" /> */}
               <DateTimePicker onChange={handleStartDate} value={dateStart} className='form-control' />
            </div>

            <div className="form-group">
               <label>Fecha y hora fin</label>
               <DateTimePicker onChange={handleEndDate} value={dateEnd} className='form-control' minDate={nowClone.toDate()} />
            </div>

            <hr />
            <div className="form-group">
               <label>Titulo y notas</label>
               <input
                  type="text"
                  className={`form-control ${isValidTitle ? 'is-valid' : 'is-invalid'}`}
                  placeholder="Título del evento"
                  name="title"
                  value={title}
                  autoComplete="off"
                  onChange={handleInputChange}
               />
               <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group">
               <textarea
                  type="text"
                  className="form-control"
                  placeholder="Notas"
                  rows="5"
                  name="notes"
                  value={notes}
                  onChange={handleInputChange}
               ></textarea>
               <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
               type="submit"
               className="btn btn-outline-primary btn-block"
            >
               <i className="far fa-save"></i>
               <span> Guardar</span>
            </button>

         </form>
      </Modal>
   )
}
