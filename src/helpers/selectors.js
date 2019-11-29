export function getAppointmentsForDay(state, day) {
  if (!state.days.length){
    return [];
  }
  console.log("state ", state.days)
  console.log("day ", day)
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
  return interviewers
}

export function getInterview(state, interview) {
  const interviewObj = {};
  if(!interview) {
    interview = null;
  } else {
    interviewObj.student = interview.student;
    if(!interview.interviewer) {
      interview.interviewer=null;
    } else {
    interviewObj.interviewer = state.interviewers[`${interview.interviewer}`];
    return interviewObj;
    }
  }
}
