import React, { Fragment } from "react";
import { Icon } from "@iconify/react";

function Day(props) {
  return (
    <Fragment>
      <div class="day">
        <div class="weather">
          <Icon icon={props.image} color="white" height="50" />
        </div>
        <div class="temperature">{props.cur_temp} °C</div>
        <div class="date">
          {props.date} | {props.day}
        </div>
        <div class="details">
          {props.description}
          <br />
          {props.min_temp} °C {props.max_temp} °C
        </div>
      </div>
    </Fragment>
  );
}

export default Day;
