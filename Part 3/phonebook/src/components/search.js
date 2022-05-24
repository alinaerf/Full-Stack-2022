const searchBar=({nameFilter, findPeople})=>{
    return(
        <div>
        filter shown with   
        <input value={nameFilter} onChange={findPeople}/>
      </div>
    )
}
export default searchBar