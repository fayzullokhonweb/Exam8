import { useState, useEffect } from "react";

import axios from "axios";
function WeatherLocation() {
  let [weath, setWeath] = useState(null);
  let [errorWeath, setErrorWeath] = useState(null);
  useEffect(() => {
    let fetchWeath = async (lat, lon) => {
      try {
        let apiKey = "b6afc409541d0600c37ad4f4013172b7";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        setWeath(response.data);
      } catch (err) {
        setErrorWeath(err.message);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let { latitude, longitude } = position.coords;
          fetchWeath(latitude, longitude);
        },
        (err) => {
          setError("Unable to retrieve your location");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }, []);

  if (weath) {
    let iconcode = weath.weather[0].icon;
    let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

    return (
      <div className="flex gap-2 mr-3">
        <div className="flex  items-center justify-center gap-2">
            <h3 className="font-mon">{weath.name}</h3>
            <h4 className=" font-medium ">{Math.round(weath.main.temp)}°С</h4>
        </div>
        <img src={iconurl} alt="" />
      </div>
    );
  }
}

export default WeatherLocation;
