import React, { useState } from "react";

import "components/Button.scss";

export default function Button(props) {

   let buttonClass = "button";

   if (props.confirm) {
      buttonClass += "--confirm";
   }

   if (props.danger) {
      buttonClass += "--danger";
   }


   return <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
   >
      {props.children}
   </button>
}
