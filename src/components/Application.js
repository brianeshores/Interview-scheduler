import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Brian Murray",
      interviewer: {
        id: 3,
        name: "Jimmy Frank",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Alex Bell",
      interviewer: {
        id: 5,
        name: "Tony Montana",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  }
];


export default function Application(props) {
  const [day, setDay] = useState();
  const [days, setDays] = useState([])
  
  useEffect(() => {
    axios
      .get("/api/days")
      .then((response) => {
        setDays(response.data)
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log(error.response.data);
      });
  });
  
  const printAppointments = appointments.map((appointment) => 
    <Appointment
      key={appointment.id}{...appointment}
    />
  )
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
            days={days}
            day={day}
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
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}


