import React, { useState, useEffect } from "react";
import DayList from './DayList';
import Appointment from './Appointment/index.js';
import axios from 'axios';
import { getAppointmentsForDay, getInterview } from './helpers/selectors';

import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: []
  });

  const appointments = getAppointmentsForDay(state, state);

  const getDailyAppointments = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.time}
        time={appointment.true}
        interview={interview}
      />
    );
  });
    


  useEffect(() => {
    Promise.all([axios.get(`/api/days`), axios.get(`/api/appointments`)]).then(
      (all) => {
        const [arr1, arr2] = all;
      
        setState((prev) => ({
          ...prev,
          days: arr1.data,
          appointments: arr2.data,
         
        }));  
      }
    );
  }, []);

  const setDay = (day) => setState({ ...state, day });
  //const setDays = (days) => setState(prev => ({ ...prev, days }));

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {getDailyAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
