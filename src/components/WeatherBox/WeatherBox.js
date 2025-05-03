import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import {useCallback, useEffect, useState} from "react";

const WeatherBox = props => {

  const [weatherData, setWeatherData] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCityChange = useCallback((cityName) => {
    setLoading(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a8c2c741a470f57c6bb8c04742d3c9c8&units=metric`)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        console.log(data);
        setWeatherData({
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main
        });
      });
  }, [])

  return (
    <section>
      <PickCity action={handleCityChange}/>
      {(weatherData && !loading) && <WeatherSummary weatherData={weatherData}/>}
      {loading && <Loader />}
    </section>
  )
};

export default WeatherBox;