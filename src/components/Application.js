import React, { useState, useEffect } from "react";
import DayList from './DayList';
import Appointment from './Appointment/index.js';
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from './helpers/selectors';

import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
    .put(`/api/appointments/${id}`, { interview })
    .then((response) => {
      // console.log(response);
      setState({
        ...state,
        appointments,
      });
    })
    .catch((err) => {
      console.log('Error: ', err.message);
    });
  }
  


  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
    .delete(`/api/appointments/${id}`)
    .then((response) => {
      console.log('test');
      setState({
        ...state,
        appointments,
      });
    })
    .catch((err) => {
      console.log('Error: ', err.message);
    });
  }

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const getDailyAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}  
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  });
    


  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
      ]).then((all) => {
          const [first, second, third] = all;
          setState((prev) => ({
            ...prev,
            days: first.data,
            appointments: second.data,
            interviewers: third.data,
          }));
        });
  }, []);

  const setDay = (day) => setState({ ...state, day });

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