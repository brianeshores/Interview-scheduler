import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode.js";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onAdd() {
    transition(CREATE);
  }

  function onCancel() {
    back();
  }

  function save(name, interviewer, cb) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    if(interview !== null) {
      transition(SHOW);
    }
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
        {mode === EMPTY && <Empty 
          onAdd={onAdd} 
          mode={mode}
          replace={"true"}
        />}
        {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
      />
      )}
      {mode === CREATE && (
      <Form
        name={""}
        interviewers={props.interviewers}
        onCancel={onCancel}
        onSave={save}
      />
      )}
      {mode === SAVING && (
        <Status
          message={props.message}
        />
      )}
    </article>
  )
}