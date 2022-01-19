import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const {days, setDay} = props;

  const getDayList = Array.isArray(days) && days.map((day) => {
        
    return <DayListItem key={day.id} {...day}
      selected={day.name === props.day}    
      setDay={setDay} />
  });
  
  return(
    <ul>
      {getDayList}     
    </ul>
  )
}