import { useState } from 'react'

const Button =(props)=>{

  return(
    <button onClick={props.action}>{props.text}</button>
  )
}

const StatisticLine=(props)=>{
  return(
    <tr>
      <td> {props.text}</td>
      <td>{props.stat} {[props.text1]}</td>
    </tr>
  )
}

const Statistics =(props)=>{
  if (props.good+props.bad+props.neutral===0){
    return(
      <div> No feedback given</div>
    )
  }
  return(
    <table>
    <StatisticLine text="good" stat={props.good}/>
    <StatisticLine text="neutral" stat={props.neutral}/>
    <StatisticLine text="bad" stat={props.bad}/>
    <StatisticLine text="all" stat={props.bad+props.good+props.neutral}/>
    <StatisticLine text="average" stat={(props.good-props.bad)/(props.good+props.bad+props.neutral)}/>
    <StatisticLine text="positive" stat={props.good/(props.bad+props.good+props.neutral)*100} text1=" %"/>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const setGoodScore=()=>{
    setGood(good+1)
  }
  const setNeutralScore =()=>{
    setNeutral(neutral+1)
  }
  const setBadScore =()=>{
    setBad(bad+1)
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button action={setGoodScore} text="good"/>
      <Button action={setNeutralScore} text="neutral"/>
      <Button action={setBadScore} text="bad"/>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App
