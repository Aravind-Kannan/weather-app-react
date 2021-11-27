import React from "react";
import { Icon } from "@iconify/react";

function Today(props) {
  return (
    <div class="today">
      <Icon class="weather" icon={props.image} color="white" height="50" />
      <div class="temperature">{props.cur_temp} °C</div>
      <div class="details">
        {props.description}
        <br />
        {props.min_temp} °C {props.max_temp} °C
      </div>
      <div class="date">
        {props.date} | {props.day}
      </div>
    </div>
  );
}

export default Today;
