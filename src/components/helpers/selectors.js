export function getAppointmentsForDay(state, day) {
  let appointmentsDay = [];
  let filtered = [];

  for (let dayObj of state.days) {
    if (dayObj.name === day) {
      appointmentsDay = dayObj.appointments;
    }
  }

  for (let appId of appointmentsDay) {
    filtered.push(state.appointments[appId]);
  }

  return filtered;
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
  let filtered = [];

  for (let dayObj of state.days) {
    if (dayObj.name === day) {
      dayInterviewers = dayObj.interviewers;
    }
  }

  // appointments: [1, 2, 3]
  for (let intId of dayInterviewers) {
    filtered.push(state.interviewers[intId]);
  }

  return filtered;
};