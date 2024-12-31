 'use client'
import Image from 'next/image'
import { Suspense, useEffect, useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';


export default  function getWeather() {

  const [data, setData] = useState([]);
  const [weather, setWeather] = useState([])
  const [temp, setTemp] = useState([])
  const [location, setLocation] = useState();

  useEffect(() => { if (!navigator.geolocation) { // Geolocation is not supported by the browser // Handle the error or show a message to the user return; }
    return <p>Your Browser doesn't support geolocation. I don't know where to check the weather for!</p>;
  }},
  useEffect(() => { 
    if('geolocation' in navigator) {
        // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords;
            setLocation({ latitude, longitude });
            console.log(latitude, longitude)
        })
    }
  }, []));

  useEffect(() => {
    // Fetch data from API if `location` object is set
    if (location) {
        fetchApiData(location);
    }
  }, [location]);
  const fetchApiData = async ({latitude, longitude}) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&exclude=minutely,hourly,alerts&appid=b9316050883f5ed7d98200bbf5de873e`);
    const data = await res.json();
    setData(data);
    const preData = JSON.stringify(data);
    const weather = JSON.parse(preData);
    setWeather(weather), console.log(JSON.stringify(weather, null,2))
    const temp = weather.main.temp;
    setTemp(temp)
    console.log(temp)
    if (!weather) {
      return <div>Loading...</div>;
    }
  }

  return ( 
    <div>
      <Image src={`/skybox.svg`} alt="Skybox" width="400" height="500" />
      <Card>
        <CardContent>
        <h3>The Current Temp is: {temp} degreees F</h3>
        <p>The temperature takes time to load, give it a second.</p>
        </CardContent>
      </Card>
        

      </div>
  );

}
