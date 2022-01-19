import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

/*
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>
*/

export default function InterviewerList(props) {
  const { interviewers, setInterviewer } = props;

  const getInterviewersList =
    Array.isArray(interviewers) &&
    interviewers.map((interviewer) => {
      return (
        <InterviewerListItem
          key={interviewer.id}
          {...interviewer}
          selected={interviewer.id === interviewer}
          setInterviewer={setInterviewer}
        />
      );
    });
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {getInterviewersList}
      </ul>
    </section>
  )
}
