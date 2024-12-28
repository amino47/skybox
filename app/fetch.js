import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
 
 Repo = {
  temp: Number,
}
 
export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=46.174885&lon=-123.008958&units=imperial&exclude=minutely,hourly,alerts&appid=${process.env.KEY}')
  const Repo = await res.json()
  // Pass data to the page via props
  return { props: { repo } }
})