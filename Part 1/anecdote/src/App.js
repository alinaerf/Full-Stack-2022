import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints]=useState(new Array(7).fill(0));
  const [max, setMax]=useState(0);
  const copy=[...points];
  const generateNumber =()=>{
    const NEWselected=Math.floor(Math.random()*6);
    return(NEWselected)
  }
  const maxValue =(array)=>{
    var max=array[0];
    var maxIndex=0;
    for (var i=1; i<array.length; i++){
      if (array[i]>max){
        maxIndex=i;
        max=array[i];
      }}
    return maxIndex

  }
  const Vote =(anecdoteNumber)=>{
    copy[anecdoteNumber]+=1;
    setPoints(copy);
    setMax(maxValue(copy));}
  
  return (
    <div>
      <h1> Anecodote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div> has {points[selected]} votes</div>
      <button onClick={()=>Vote(selected)}>vote</button>
      <button onClick={()=>setSelected(generateNumber())}> next anecdote</button>
      <h1>Anecodote with the most votes</h1>
      <div> {anecdotes[max]}</div>
      <div> has {points[max]} votes</div>
    </div>
  )
}

export default App