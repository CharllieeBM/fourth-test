import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export default function App(props) {
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then((response) => {
      setTemperature(response.data.main.temp);
    });
  }, [props.city]);

  if (temperature === null) {
    return <h2>Loading temperature for {props.city}...</h2>;
  }

  return (
    <h2>
      The temperature in {props.city} is {Math.round(temperature)}°C
    </h2>
  );
}
