export function getAppointmentsForDay(state, day) {
  if (!state.days.length){
    return [];
  }
  
  let findDay = state.days.filter(Day => Day.name === day)
  
  if(!findDay.length) {
  return [];
  }
  
  let mapDay = findDay.map(obj => obj.appointments)[0]

  const appointments= mapDay.map(id => state.appointments[id])
  return appointments
}

export function getInterviewersByDay(state, day) {
  if (!state.days.length){
    return [];
  }
  
  let findDay = state.days.filter(Day => Day.name === day)
  
  if(!findDay.length) {
    return [];
  }
  
  let mapDay = findDay.map(obj => obj.interviewers)[0]
  const interviewers= mapDay.map(id => state.interviewers[id])
  console.log("interviewers:", interviewers)
  return interviewers
}

export function getInterview(state, interview) {
  const interviewObj = {};
  if(!interview) {
    return null
  } else {
    interviewObj.student = interview.student;
    interviewObj.interviewer = state.interviewers[`${interview.interviewer}`];
    return interviewObj;
  }
}
