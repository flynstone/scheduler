import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, setDay, value} = props;

  const getDayList =
    Array.isArray(days) &&
    days.map((day) => {  
      return (<DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === value}
        setDay={setDay}
      />
      );
    });

  return <ul>{getDayList}</ul>;
}