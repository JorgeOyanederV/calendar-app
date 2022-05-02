import React from 'react'
import {
   BrowserRouter as Router,
   Switch,
   Route
} from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
   return (
      <Router>
         <Switch>
            <Route exact path="/login">
               <LoginScreen />
            </Route>
            <Route exact path="/calendar">
               <CalendarScreen />
            </Route>
            <Route path="/">
               <LoginScreen />
            </Route>
         </Switch>
      </Router>
   )
}
