 'use client'
import Image from 'next/image'
import { Suspense, useEffect, useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default  function getWeather() {

  const [data, setData] = useState([]);
  const [weather, setWeather] = useState([])
  const [temp, setTemp] = useState([])

  const [location, setLocation] = useState();

  useEffect(() => { if (!navigator.geolocation) { // Geolocation is not supported by the browser // Handle the error or show a message to the user return; }
    return Error;
  }},
  useEffect(() => { 
    if('geolocation' in navigator) {
        // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords;
            setLocation({ latitude, longitude });
        })
    }
  }, []));

  useEffect(() => {
    // Fetch data from API if `location` object is set
    if (location) {
        fetchApiData(location);
    }
  }, [location]);
  const fetchApiData = async () => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=46.174885&lon=-123.008958&units=imperial&exclude=minutely,hourly,alerts&appid=53ba2863d8b27c94247b127e5a04d789`);
    const data = await res.json();
    setData(data);
    const preData = JSON.stringify(data);
    const weather = JSON.parse(preData);
    setWeather(weather), console.log(JSON.stringify(weather.main.temp, null,2))
    const temp = weather.main.temp;
    setTemp(temp)
    if (!data) {
      return <div>Loading...</div>;
    }


  return ( 
    <div>
      <Image className='place-content-center' src={`/skybox.svg`} alt="Skybox" width="400" height="500" />
      <Suspense fallback={<p>Loading</p>}>
        <h3>The Current Temp is: {temp} degreees F</h3>
        <p>The temperature takes time to load, give it a second.</p>
      </Suspense>

      </div>
  );
}}
