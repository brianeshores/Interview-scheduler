export function getAppointmentsForDay(state, day) {
  const selectedDay = [];
  console.log("state", state)
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