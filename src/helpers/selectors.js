export function getAppointmentsForDay(state, day) {
  const selectedDay = [];
  state.days.forEach(element => {
    if (day === element.name) {
      element.appointments.forEach((el) => {
        for(const id in state.appointments) {
          if(el.toString() === id) {
            selectedDay.push(state.appointments[`${id}`])
          }
        }
      })
    }
  })
  return selectedDay;
}

export function getInterview(state, interview) {
  const interviewerObj = {};
  const interviewObj = {};
  console.log("interview", interview)
  if(interview === null) {
    return null;
  } else {
    interviewObj.student = interview.student;
    interviewObj.interviewer = state.interviewers[`${interview.interviewer}`];
    return interviewObj;
  }
}