import { useState, useEffect, useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import useFetchData from "../hooks/useFetchData";
export default function Weather({
  api_key = "7af4edd80277ecd98c9eb7b15f9cfb84",
  country_code = "US",
  zip_code = 37416,
  state_code = "Tennesse",
  city_name = "Chattanooga",
}) {
  const [location, setLocation] = useState({ long: null, lat: null });
  const [weather, setWeather] = useState();
  let [isLoading, setIsLoading] = useState(true);
  let [hide, setHide] = useState(true);
  let { response, errors } = useFetchData(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.long}&appid=${api_key}&units=imperial`
  );
  const getLocation = async () => {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        let { longitude, latitude } = position.coords;
        setLocation({ lat: latitude, long: longitude });
      });
    } catch (err) {
      alert("Unable to retrieve your location");
    }
  };
  useEffect(() => {
    if (response && isLoading) {
      setWeather(response);
      setIsLoading(false);
      setHide(false);
    }
    if (errors) {
      setHide(false);
      alert("Cannot obtain weather");
      setIsLoading(false);
    }
  }, [isLoading, response, errors]);
  return (
    <div>
      {isLoading ? (
        <div>
          <button onClick={getLocation}>Get My Location</button>
          {hide || <h3>Obtaining Location</h3>}
        </div>
      ) : (
        <div>
          <h1>{weather.name}</h1>
          <image
            alt={`weather icon shows ${weather?.weather[0]?.main}`}
            src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}d@2x.png`}
          />
          <h1>{`${weather?.weather[0]?.icon}`}</h1>
          <h1>{`Air Temperature: ${weather.main.temp} °F`}</h1>
          <h1>{`Feels Like: ${weather.main.feels_like} °F`}</h1>
        </div>
      )}
    </div>
  );
}
