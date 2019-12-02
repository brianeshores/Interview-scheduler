import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersByDay } from "helpers/selectors.js";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  

   useEffect(() => {
    Promise.all([Promise.resolve(axios.get("/api/days")),
                 Promise.resolve(axios.get("/api/appointments")),
                 Promise.resolve(axios.get("/api/interviewers"))])
           .then((all) => {
             setState(prev => ({day: "Monday", days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
           })
    }, []);

  const setDay = day => {
    setState({ ...state, day });
  }


  function bookInterview(id, interview) {
    return axios.put("http://localhost:8001/api/appointments/"+id, 
    {interview}).then( data => {
      setState((prev) => {
        return (
          {...prev,
            appointments:{...prev.appointments, [id]: {
          ...prev.appointments[id], interview:interview
          }}}
        )
      })
    })
  }

  function deleteInterview(id, interview) {
    return axios.delete("http://localhost:8001/api/appointments/"+id).then( data => {
      setState((prev) => {
        return (
          {...prev,
            appointments:{...prev.appointments, [id]: {
              ...prev.appointments[id], interview:null
          }}}
        )
      })
    })
  }
  console.log("day spots", state.days[0])
  const appointmentArray = getAppointmentsForDay(state, state.day);
  const interviewersArray = getInterviewersByDay(state, state.day);

  const printAppointments = appointmentArray.map((appointment) => {
      const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersArray}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
      />
    )
  })
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {printAppointments}
        {<Appointment className='last'/>}
      </section>
    </main>
  );
}


