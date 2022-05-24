import { useState } from "react"
import DisplayInfo from "./components/DisplayCountries"
import Weather from "./components/Weather"

const App=()=>{
  const [search, setSearch]=useState('')
  const [output, setOutput]=useState()
  const findCountry = (event)=>{
    const name=event.target.value
    const url=`https://restcountries.com/v3.1/name/${name}`
    console.log(url)
    setSearch(name)
    fetch(url)
    .then((response)=>{
      return(response.json())
    })
    .then((result)=>{
      console.log(result.length)
      if (result.length>10){
        setOutput(<div> Too many matches, specify another filter</div>)
      }
      else if (result.length>1){
        setOutput (
          <div>
            {result.map(country=><DisplayInfo country={country}/>
            )}
          </div>
        )
      }
      else if (result.length===1){
        const languages=Object.entries(result[0].languages)
        setOutput(
          <div>
            <h2> {result[0].name.common}</h2>
            <div>capital {result[0].capital}</div>
            <div> area {result[0].area}</div>
            <b> languages:</b>
            <ul>
            {languages.map((lang)=>{
              return(
                <li key={lang[0]}>{lang[1]}</li>
              )
            })}
            </ul>
            <img alt="flag" src={result[0].flags.png}/>
            <h2>Weather in {result[0].capital}</h2>
            <Weather city={result[0].capital}/>
          </div>
        )
      }
      
    })
  }
  return(
    <div>
      find countries 
      <input value={search} onChange={findCountry}/>

      <div> {output}</div>
    </div>
  )
}
export default App