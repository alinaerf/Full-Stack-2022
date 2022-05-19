const Part = (props)=>{
  const name=props.name;
  const exercises=props.exercises;
  return(
    <div>
      Chapter: {name}
      <ul> Exercises: {exercises}</ul>
    </div>
  )
}

const Header =(props)=>{
  console.log(props);
  return (
    <h1> {props.course.name}</h1>
  )
}

const Content=(props)=>{

  return(
    <div>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </div>
  )
}
const Total =(props)=>{
  return(
    <div>
    <div> Total number of chapters: {props.parts.length}</div>
    <div> Total number of exercises: {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}</div>
    </div>
  )
}

const App = () => {
  const course ={ 
    name:'Half Stack application development',
    parts:[
      {
        name:'Fundamentals of React', 
        exercises:10},
      {
        name:"Using props to pass data",
        exercises:7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
    
  )
}

export default App