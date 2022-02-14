import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplication() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const firstState = { ...state, appointments };
      const remainingSpotsState = spotsRemaining(firstState, firstState.day);
      setState(remainingSpotsState);
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
        const firstState = { ...state, appointments };
        const remainingSpotsState = spotsRemaining(firstState, firstState.day);
        setState(remainingSpotsState);
      })
      .catch((err) => {
        console.log("Error: ", err.message);
      });
  }

  function spotsRemaining(state, day) {
    const remainingDay = day || state.day;
    const objectDay = state.days.find((day) => day.name === remainingDay);
    const listId = objectDay.appointments;
    const spots = listId.filter(
      (appointmentID) => !state.appointments[appointmentID].interview
    ).length;

    const newDay = { ...objectDay, spots };
    const newDays = [...state.days];
    const dayObjIndex = state.days.findIndex(
      (day) => day.name === remainingDay
    );
    newDays[dayObjIndex] = newDay;
    return { ...state, days: newDays };
  }

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
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

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
