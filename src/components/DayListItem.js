import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { spots, selected } = props;

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });

  const formatSpots = (spots) => {
    if (spots > 1) {
      return <h3 className="text--light">{spots} spots remaining</h3>
    } else if (spots === 1) {
      return <h3 className="text--light">{spots} spot remaining</h3>
    } else {
      return <h3 className="text--light">no spots remaining</h3>
    }
  }


  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}