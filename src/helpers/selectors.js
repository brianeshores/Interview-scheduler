export function getAppointmentsForDay(state, day) {
  const selectedDay = [];
  state.days.forEach(element => {
    if (day === element.name) {
      element.appointments.forEach((el) => {
        for(const id in state.appointments) {
          if(el == id) {
            selectedDay.push(state.appointments[`${id}`])
          }
        }
      })
    }
  })
  return selectedDay;
}