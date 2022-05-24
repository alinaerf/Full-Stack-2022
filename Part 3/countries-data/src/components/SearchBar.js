const SearchBar = ({countryFilter, findCountry})=>{
    return(
        <div>
            find countries
            <input value={countryFilter} onChange={findCountry}/>
        </div>
    )
}
export default SearchBar