import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode.js";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm"

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onAdd() {
    transition(CREATE);
  }

  // function onCancel() {
  //   back();
  // }

  function save(name, interviewer, cb) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview).then( () => transition(SHOW))
  }

  function cancelInterview() {
    transition(DELETING)
    props.deleteInterview(props.id).then( () => transition(EMPTY)
    ) 
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
        onCancel={cancelInterview}
      />
      )}
      {mode === CREATE && (
      <Form
        name={""}
        interviewers={props.interviewers}
        onCancel={cancelInterview}
        onSave={save}
      />
      )}
      {mode === SAVING && (
        <Status
          message={props.message}
        />
      )}
      {mode === DELETING && (
        <Status deleting={DELETING}/>
      )}
    </article>
  )
}