const display = ({displayedPerson, deleteNumber, id})=>{
    return(
        <ul key={id}>
            {displayedPerson.name} {displayedPerson.number}
        <button onClick={deleteNumber}> delete</button>
        </ul>
    )
}
export default display