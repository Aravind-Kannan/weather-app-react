import React from "react";
import ReactDOM from "react-dom";

// Styling
import "./index.css";
import "./styles/App.css";

// Components
import App from "./components/App";

ReactDOM.render(
  <div>
    <App />
    <footer>
      <div>
        Made with ❤️ using &nbsp;
        <a href="https://openweathermap.org/">OpenWeather API</a> and &nbsp;
        <a href="https://iconify.design/">Iconify</a> &nbsp;
      </div>
    </footer>
  </div>,
  document.getElementById("root")
);
