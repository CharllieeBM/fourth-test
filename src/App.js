import React, { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

export default function App() {
  let [cityInput, setCityInput] = useState("");
  let [weather, setWeather] = useState(null);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    let savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
      fetchWeather(savedCity);
    }
  }, []);

  function fetchWeather(city) {
    setLoading(true);
    let apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios
      .get(apiUrl)
      .then((response) => {
        let description = response.data.weather[0].description
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        setWeather({
          temperature: Math.round(response.data.main.temp),
          description: description,
          humidity: response.data.main.humidity,
          wind: Math.round(response.data.wind.speed),
          icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
          city: response.data.name,
        });
        setLoading(false);
        localStorage.setItem("lastCity", city);
      })
      .catch(() => {
        alert("City not found!");
        setLoading(false);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (cityInput.trim() === "") return;
    fetchWeather(cityInput);
  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Weather Search Engine</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Search for a city"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "220px",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 16px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Search
        </button>{" "}
        <footer>
          This project was coded by{" "}
          <a
            href="https://github.com/CharllieeBM/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Charllotte Blackwell-Maleshkov
          </a>{" "}
          and is open-sourced on{" "}
          <a
            href="https://github.com/CharllieeBM/react-weather-directory"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          .
        </footer>
      </form>

      {loading && (
        <div style={{ marginTop: "30px" }}>
          <TailSpin
            height="60"
            width="60"
            color="#007BFF"
            ariaLabel="loading"
          />
        </div>
      )}

      {weather && !loading && (
        <div
          style={{
            marginTop: "30px",
            fontSize: "16pt",
            lineHeight: "1.6",
          }}
        >
          <p>
            It is {weather.temperature}°C in {weather.city}
          </p>
          <p>Description: {weather.description}</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind: {weather.wind} km/h</p>
          <img src={weather.icon} alt={weather.description} />
        </div>
      )}
    </div>
  );
}
