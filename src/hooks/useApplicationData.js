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

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        const count = updateSpots(state.day, state.days, "REMOVE_SPOT");

        setState({
          ...state,
          days: count,
          appointments,
        });
      })
      .catch((err) => {
        console.log("Error: ", err.message);
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
        const count = updateSpots(state.day, state.days, "ADD_SPOT");
        setState({
          ...state,
          days: count,
          appointments,
        });
      })
      .catch((err) => {
        console.log("Error: ", err.message);
      });
  }

  const updateSpots = (request) => {
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        if (request === "bookAppointment") {
          return { ...day, spots: day.spots - 1 };
        } else {
          return { ...day, spots: day.spots + 1 };
        }
      } else {
        return { ...day };
      }
    });
    return days;
  };

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
