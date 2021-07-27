import { useState, useEffect } from "react";
import useFetchData from "../hooks/useFetchData";
const user = {
  first_name: "Rowan",

  last_name: "Atkinson",
};
//   https://dev.to/nipu/tips-tricks-of-javascript-react-3ncc
window.user = user;
const dateBuilder = (d) => {
  let months = [
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};
export default function Weather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState();
  let [isLoading, setIsLoading] = useState(true);
  let api_key = "7af4edd80277ecd98c9eb7b15f9cfb84";
  let country_code = "US";
  let zip_code = 37416;
  let state_code = "Tennesse";
  let city_name = "Chattanooga";
  let { response, errors } = useFetchData(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zip_code},${country_code}&appid=${api_key}&units=imperial`
  );
  useEffect(() => {
    if (response && isLoading) {
      setWeather(response);
      setIsLoading(false);
    }
  }, []);
  return (
    <div>
      {!isLoading && (
        <div>
          <h1>{weather.name}</h1>
          <h1>{`Air Temperature: ${weather.main.temp} °F`}</h1>
          <h1>{`Feels Like: ${weather.main.feels_like} °F`}</h1>
        </div>
      )}
    </div>
  );
}
