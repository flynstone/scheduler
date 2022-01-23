export function getAppointmentsForDay(state, day) {
  let dayAppointmentsArr = [];
  let filteredAppointments = [];

  for (let objDay of state.days) {
    if (objDay.name === day ) {
      dayAppointmentsArr = objDay.appointments;
    }
  }

  for (let appId of dayAppointmentsArr) {
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

