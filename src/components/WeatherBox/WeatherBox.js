import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import {useCallback, useEffect, useState} from "react";
import ErrorBox from "../ErrorBox/ErrorBox";

const WeatherBox = props => {

  const [weatherData, setWeatherData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback((cityName) => {
    setLoading(true);
    // eslint-disable-next-line
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
      .then(res => {
        if(res.status === 200) {
          return res.json()
            .then(data => {
              setLoading(false);
              setError(false);
              setWeatherData({
                city: data.name,
                temp: data.main.temp,
                icon: data.weather[0].icon,
                description: data.weather[0].main
              });
            })
        } else {
          setLoading(false);
          setError(true);
        }
      });
  }, [])

  return (
    <section>
      <PickCity action={handleCityChange}/>
      {(weatherData && !loading && !error) && <WeatherSummary weatherData={weatherData}/>}
      {loading && <Loader />}
      {error && <ErrorBox>There is no such city!</ErrorBox>}
    </section>
  )
};

export default WeatherBox;