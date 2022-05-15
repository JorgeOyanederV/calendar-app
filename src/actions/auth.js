import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch"
import { types } from "../types/types";
import Swal from 'sweetalert2'

export const startLogin = (email, password) => {
   return async (dispatch) => {
      const data = { email, password };
      const resp = await fetchWithoutToken('auth', data, 'POST');
      const body = await resp.json();

      if (body.ok) {
         localStorage.setItem('token', body.token);
         localStorage.setItem('token-init-date', new Date().getTime());

         const user = {
            uid: body.uid,
            name: body.name
         }

         dispatch(login(user))
      } else {
         Swal.fire('Error', body.msg, 'error')
      }
   }
}

export const startRegister = (email, password, name) => {

   return async (dispatch) => {
      const data = { email, password, name };
      const resp = await fetchWithoutToken('auth/new', data, 'POST');
      const body = await resp.json();

      if (body.ok) {
         localStorage.setItem('token', body.token);
         localStorage.setItem('token-init-date', new Date().getTime());

         const user = {
            uid: body.uid,
            name: body.name
         }

         dispatch(login(user))
      } else {
         Swal.fire('Error', body.msg, 'error')
      }
   }
}

export const startChecking = () => {
   return async (dispatch) => {
      const resp = await fetchWithToken('auth/renew');
      const body = await resp.json();

      if (body.ok) {
         localStorage.setItem('token', body.token);
         localStorage.setItem('token-init-date', new Date().getTime());

         const user = {
            uid: body.uid,
            name: body.name
         }

         dispatch(login(user))
      } else {
         dispatch(checkingFinish())
      }
   }
}

export const startLogout = () => {
   return (dispatch) => {
      localStorage.clear();
      dispatch(logout());
   }
}

const checkingFinish = () => ({
   type: types.authCheckingFinish
})

const login = (user) => ({
   type: types.authLogin,
   payload: user
})

const logout = () => ({
   type: types.authLogout
})