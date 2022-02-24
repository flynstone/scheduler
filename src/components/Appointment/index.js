import React, { useEffect } from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Form from "./Form";
import Error from "./Error";
import Confirm from "./Confirm";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
  //                         Save
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
  //                         Delete
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
  function deleteInterview() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => {
        transition(ERROR_DELETE);
      });
  }

  function onConfirm() {
    transition(CONFIRM);
  }

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (!props.interview && mode === SHOW) {
      transition(EMPTY);
    }
  }, [mode, props.interview, transition]);

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={
            props.interview.interviewer || { interviewer: { name: "" } }
          }
          onDelete={onConfirm}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}

      {mode === SAVING && <Status message={"Saving"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={deleteInterview}
          onCancel={() => transition(SHOW)}
        />
      )}

      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}

      {mode === ERROR_SAVE && <Error message="Unable to save" onClose={back} />}
      {mode === ERROR_DELETE && (
        <Error message="Unable to delete" onClose={back} />
      )}
    </article>
  );
}
