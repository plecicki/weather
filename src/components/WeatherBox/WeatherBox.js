import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import {useCallback} from "react";

const WeatherBox = props => {

  const handleCityChange = useCallback((cityName) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a8c2c741a470f57c6bb8c04742d3c9c8&units=metric`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const weatherData = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main
        };
      });
  }, [])

  return (
    <section>
      <PickCity action={handleCityChange}/>
      <WeatherSummary />
      <Loader />
    </section>
  )
};

export default WeatherBox;