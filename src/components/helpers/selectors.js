export function getAppointmentsForDay(state, day) {
  let dayAppointments = [];
  let filteredAppointments = [];

  for (let objDay of state.days) {
    if (objDay.name === day ) {
      dayAppointments = objDay.appointments;
    }
  }

  for (let appId of dayAppointments) {
    filteredAppointments.push(state.appointments[appId]);
  }

  return filteredAppointments;
}; 


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let result = {};

  const interviewerId = interview.interviewer;
  result.student = interview.student;
  result.interviewer = state.interviewers[interviewerId];

  return result;
}; 

export function getInterviewersForDay(state, day) {
  let dayInterviewers = [];
  let filteredInterviewers = [];

  for (let objDay of state.days) {
    if (objDay.name === day) {
      dayInterviewers = objDay.interviewers;
    }
  }

  // appointments: [1, 2, 3]
  for (let intId of dayInterviewers) {
    filteredInterviewers.push(state.interviewers[intId]);
  }

  return filteredInterviewers;
};