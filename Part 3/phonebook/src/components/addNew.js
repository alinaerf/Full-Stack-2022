const addNew=({addPerson, newName, personChange, newNumber, numberChange})=>{
    return(
        <div>
        <h2>add a new</h2>
        <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={personChange} />
          </div>
          <div>
          number: <input value={newNumber} onChange={numberChange}/>
          </div>
          <div>
            <button type="submit" >add</button>
          </div>
        </form>
        </div>
    )
}
export default addNew