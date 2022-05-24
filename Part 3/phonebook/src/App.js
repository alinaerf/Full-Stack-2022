import { useState, useEffect } from 'react'
import SearchBar from "./components/search"
import AddNew from './components/addNew'
import Display from './components/display'
import dataChanges from './services/numbers'
import Notification from './components/notification'
import Error from './components/error'
import './style.css'
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]=useState("")
  const [nameFilter, changeNameFilter]=useState("")
  const [displayedPersons, changeDisplay]=useState(persons.concat())
  const [message, setMessage]=useState(null)
  const [errorMessage, setErrorMessage]=useState(null)
  const personChange=(event)=>{
    setNewName(event.target.value)
  }
  const numberChange=(event)=>{
    setNewNumber(event.target.value)
  }
  const addPerson=(event)=>{
    event.preventDefault()
    if (newNumber==="" || newName===""){
      alert("Number or name are not filled in.")
    }
    else{
      const addedPerson={
        name:newName,
        number:newNumber
      }
      if (persons.find(person=>person.name===newName)!==undefined){
        console.log(persons.find(n=>n.name===addedPerson.name))
        if (window.confirm(addedPerson.name + " is already added to the phonebook, replace the old number with a new one?")){
          addedPerson.id=persons.find(n=>n.name===addedPerson.name).id
          console.log("Added Person:",addedPerson)
          dataChanges
          .update(addedPerson.id, addedPerson)
          .then(response=>{
            console.log(response)
            setPersons(persons.map(person=>
              person.name!==addedPerson.name?person:response))
            changeDisplay(displayedPersons.map(
              person=>person.name!==addedPerson.name?person:response
            ))
            setMessage(addedPerson.name)
            window.setTimeout(()=>{setMessage(null)}, 5000)
          })
          .catch(error=>{
            changeDisplay(displayedPersons.filter(n=>n.name!==addedPerson.name))
            setPersons(persons.filter(n=>n.name!==addedPerson.name))
            setErrorMessage(addedPerson.name)
            window.setTimeout(()=>{setErrorMessage(null)}, 5000)
          })
        }
        else{
          console.log('cancel')
        }
      }
      else{
        dataChanges
        .create(addedPerson)
        .then(response=>{
          setPersons(persons.concat(response))
          changeDisplay(displayedPersons.concat(response))
          setMessage(addedPerson.name)
          window.setTimeout(()=>{setMessage(null)}, 5000)
        })
        
      }
      setNewName("")
      setNewNumber("")
    }
  }
  const findPeople=(event)=>{
    changeNameFilter(event.target.value)
    const shownPeople=persons.filter((person)=>{
      const name=person.name.toLowerCase()
      const search=event.target.value.toLowerCase()
      return(name.startsWith(search))
    })
    changeDisplay(shownPeople)
  }
  const deleteNumberOf = (id)=>{
    const name=persons.find(n=>n.id===id).name
    if (window.confirm(`Delete ${name}?`)){
      dataChanges
      .omit(id)
      changeDisplay(displayedPersons.filter(n=>n.id!==id))
      setPersons(persons.filter(n=>n.id!==id))
    }
  }
  useEffect(()=>{
    dataChanges
    .getAll()
    .then(response=>{
      setPersons(response)
      changeDisplay(response)
    })
  },[])
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Error message={errorMessage}/>
      <div>
        <SearchBar nameFilter={nameFilter} findPeople={findPeople}/>
      </div>
      <AddNew addPerson={addPerson} newName={newName} personChange={personChange} newNumber={newNumber} numberChange={numberChange}/>
      <h2>Numbers</h2>
      {displayedPersons.map((person)=>
        <Display displayedPerson={person} deleteNumber={()=>deleteNumberOf(person.id)} id={person.id}/>
        )}
      
    </div>
  )
}

export default App