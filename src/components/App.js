import React from "react";
import { API_KEY, ICON_MAPPING } from "../constants";
import Day from "./Day";

// Styling
import "../styles/App.css";
import { Icon } from "@iconify/react";

/*
const CardInfo = {
  image: "any",
  cur_temp: "number",
  min_temp: "number",
  max_temp: "number",
  description: "string",
  date: "string",
  day: "string",
};
*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      result_city: "",
      country: "",
      error: false,
      data: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.parseData = this.parseData.bind(this);
  }

  parseData(data) {
    this.setState({
      data: data.daily.map((day) => {
        let unixFormattedDate = new Date(day.dt * 1000);
        let optionsDay = { weekday: "long" };
        let optionsDate = { year: "numeric", month: "long", day: "numeric" };
        return {
          image: ICON_MAPPING[day.weather[0].icon],
          cur_temp: day.temp.day,
          max_temp: day.temp.max,
          min_temp: day.temp.min,
          description: day.weather[0].description,
          date: unixFormattedDate.toLocaleDateString("en-US", optionsDate),
          day: unixFormattedDate.toLocaleDateString("en-US", optionsDay),
        };
      }),
    });
    console.log(this.state.data);
  }

  handleChange(event) {
    this.setState({ city: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    // city to geo-location
    const city = this.state.city;
    const loc_url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
    // const loc_url = `http://localhost:3002/geo`;
    const loc_response = await fetch(loc_url);
    const loc_data = await loc_response.json();

    if (
      parseInt(loc_data.cod) === 404 ||
      parseInt(loc_data.cod) === 400 ||
      loc_data.length === 0
    ) {
      this.setState({
        result_city: city,
        error: true,
      });
      return Promise.resolve(1);
    } else {
      const lon = loc_data[0].lon;
      const lat = loc_data[0].lat;
      const cou = loc_data[0].country;

      // geo-location weather
      const units = ["metric", "imperial"];

      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units[0]}`;
      // const url = `http://localhost:3002/onecall`;
      const response = await fetch(url);
      const data = await response.json();

      this.parseData(data);
      this.setState({
        error: false,
        result_city: city,
        country: cou,
      });
    }
  }

  render() {
    return (
      <div>
        <section>
          <h1 className="title">Weather App</h1>
          <form className="search" onSubmit={this.handleSubmit}>
            <input
              className="query"
              type="text"
              value={this.state.city}
              onChange={this.handleChange}
            />
            <button className="search-icon" type="submit">
              <Icon icon="mdi:magnify" color="black" height="40" />
            </button>
          </form>
        </section>
        {this.state.error ? (
          <section className="error">
            {this.state.result_city}: No match found!
          </section>
        ) : (
          <section>
            <h1>
              {this.state.result_city}
              &nbsp;&nbsp;
              <Icon
                height="20"
                icon={`cif:${this.state.country.toLowerCase()}`}
              />
            </h1>
          </section>
        )}
        <section className="result">
          {this.state.data.map((datum) => {
            return (
              <Day
                image={datum.image}
                cur_temp={datum.cur_temp}
                date={datum.date}
                day={datum.day}
                description={datum.description}
                min_temp={datum.min_temp}
                max_temp={datum.max_temp}
              />
            );
          })}
        </section>
      </div>
    );
  }
}

export default App;
