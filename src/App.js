import React, { useState } from "react";
import "./App.css";
function App() {
  const [cityName, setCityName] = useState("");
  const [place, setPlace] = useState("");
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const newDate = new Date();
  const temp = document.querySelector(".temp");
  const date = document.querySelector(".date");

  function inputChangeHandler(e) {
    setCityName(e.target.value);
  }
  function getWeatherData() {
    const apiKey = "4b795612d32ec836d583d2df6c2575eb";
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey +
      "&units=metric";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          setPlace(data.name + "," + data.sys.country);
          date.textContent =
            months[newDate.getMonth()] +
            " " +
            newDate.getDate() +
            ", " +
            newDate.getFullYear();
          setTemperature("🌡" + data.main.temp + "°C");
          setDescription(data.weather[0].description);
          setIconUrl(
            "https://openweathermap.org/img/wn/" +
              data.weather[0].icon +
              "@2x.png"
          );
          setCityName("");
        } else {
          const element = document.createElement("div");
          element.className = "invalid-city";
          element.innerHTML = "No such city!";
          document.querySelector(".weather").appendChild(element);
          setCityName("");
          setTimeout(() => {
            document.querySelector(".weather").removeChild(element);
          }, 5000);
        }
      });
  }
  return (
    <div>
      <div className="App">
        <div className="head1">
          <div className="main">
            <h4 className="heading">Search Weather Here !</h4>
            <input
              className="field"
              onChange={inputChangeHandler}
              type="text"
              placeholder="enter city"
              value={cityName}
            />
            <button className="button" onClick={getWeatherData}>
              check It
            </button>
          </div>
          <div className="side">
            <h1 className="heading1">WOW you founded the Weather !!</h1>
            <h2 className="heading2">{place}</h2>
            <small className="date"></small>
            <div className="circle3">
              <h2 className="side_p">{temperature}</h2>
            </div>
            ||||
            <div>
              {iconUrl !== "" ? (
                <img className="rectangle" src={iconUrl} alt={description} />
              ) : null}
            </div>
            <h2 className="desc">{description}</h2>
          </div>
        </div>
        <div className="circle1"></div>
        <div className="circle2"></div>
      </div>
    </div>
  );
}

export default App;
