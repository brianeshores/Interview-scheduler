import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode.js";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERRORSAVE = "ERRORSAVE";
  const ERRORDELETE = "ERRORDELETE";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onAdd() {
    transition(CREATE);
  }

  function onCancel(){
    back()
  }

  function save(name, interviewer, cb) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING);
    
    props.bookInterview(props.id, interview)
      .then( () => transition(SHOW))
      .catch(error => transition(ERRORSAVE, true));
  }

  function cancelInterview() {
    transition(DELETING, true)
    props.deleteInterview(props.id)
      .then( () => transition(EMPTY))
      .catch(error => transition(ERRORDELETE, true)); 
  }	  

  return (
    <article className="appointment">
      <Header time={props.time}/>
        {mode === EMPTY && <Empty 
        onAdd={onAdd} 
        mode={mode}
        replace={"true"}
      />}
      {mode === CREATE && (
        <Form
          name={""}
          interviewers={props.interviewers}
          onCancel={onCancel}
          onSave={save}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer.name}
          onCancel={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
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
      {mode === CONFIRM && (
        <Confirm 
          onDelete={cancelInterview}
          onCancel={() => transition(SHOW)}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={onCancel}
          onSave={save}
          interviewers={props.interviewers}
        />
      )}
      {mode === ERRORSAVE && <Error onClose={() => transition(EMPTY)} />}
      {mode === ERRORDELETE && <Error onClose={() => transition(SHOW)} />}
    </article>
  )
}