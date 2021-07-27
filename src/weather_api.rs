use exitfailure::ExitFailure;
use reqwest::Url;
use serde_derive::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Debug)]
struct WeatherAPI {
    visibility: i32,
}

impl WeatherAPI {
    async fn get() -> Result<Self, ExitFailure> {
        let base_url= format!("http://api.openweathermap.org/data/2.5/weather?q={city_name},{state_code},{country_code}&appid={api_key}",api_key="7af4edd80277ecd98c9eb7b15f9cfb84",country_code= "US", state_code = "Tennesse" , city_name = "Chattanooga");
        let url = Url::parse(&*base_url)?;
        let res = reqwest::get(url).await?.json::<WeatherAPI>().await?;
        Ok(res)
    }
}

#[tokio::main]
pub async fn weather_api() -> Result<(), ExitFailure> {
    let res = WeatherAPI::get().await?;
    println!("visibility: {:?} coordinates", res.visibility);

    Ok(())
}

// //  "weather": [
//     {
//         "id": i32,
//         "main": &str,
//         "description": &str,
//         "icon": &str
//       }
//     ],
//     "base": &str,
//     "main": {
//       "temp": 282.55,
//       "feels_like": 281.86,
//       "temp_min": 280.37,
//       "temp_max": 284.26,
//       "pressure": 1023,
//       "humidity": 100
//     },
//     "visibility": 16093,
//     "wind": {
//       "speed": 1.5,
//       "deg": 350
//     },
//     "clouds": {
//       "all": 1
//     },
//     "dt": 1560350645,
//     "sys": {
//       "type": 1,
//       "id": 5122,
//       "message": 0.0139,
//       "country": "US",
//       "sunrise": 1560343627,
//       "sunset": 1560396563
//     },
//     "timezone": -25200,
//     "id": 420006353,
//     "name": "Mountain View",
//     "cod": 200
//     }
