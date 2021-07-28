import { useState, useEffect} from "react";
import useFetchData from "../hooks/useFetchData";

export default function Weather({
  zip_code = 37416,
  country_code = "US",
  state_code = "Tennesse",
  city_name = "Chattanooga",
}) {
  const [weather, setWeather] = useState();
  let [isLoading, setIsLoading] = useState(true);
  const [fetchData, setFetchData] = useState(false);
  let [location, setLocation] = useState({ lat: null, long: null });
  async function useNavigation() {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        let { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
        setFetchData(true);
      });
    } catch (err) {
      console.log(err);
    }
  }
  let api_key = "7af4edd80277ecd98c9eb7b15f9cfb84";
  let { response, error } = useFetchData(
    fetchData,
    `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${api_key}&units=imperial`
  );
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation may not be supported");
      return;
    }
    if (error) {
      alert(`Something went wrong: ${error}`);
      return;
    }
    if (response && isLoading) {
      setWeather(response);
      setIsLoading(false);
    }
    if (location) {
    }
  }, [location, response, isLoading, error]);
  return (
    <div>
      {isLoading ? (
        <button onClick={useNavigation}>Find My Location</button>
      ) : (
        <div>
          <h1>Showing the weather for: {weather.name}</h1>
          <img
            alt={`weather icon shows ${weather?.weather[0]?.main}`}
            src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
          />
          <h1>{`Air Temperature: ${weather.main.temp} °F`}</h1>
          <h1>{`Feels Like: ${weather.main.feels_like} °F`}</h1>
        </div>
      )}
    </div>
  );
}
