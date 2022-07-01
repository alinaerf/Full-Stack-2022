import './search.css'
import { useState } from 'react'

const Search = ({setDisplayedBlogs, blogs})=>{
    const options=['Title', 'Author', 'Contributor']
    const dbOptions=['title','author', 'user']
    const defaultOption=dbOptions[0]
    const change =(e)=>{
        console.log(e.target.value)
        setCriteria(e.target.value)
    }
    const [search, setSearch]=useState('')
    const [criteria, setCriteria]=useState(defaultOption)
    const searchBlog= ()=>{
        if (criteria==='user'){
            const blogsToDisplay=blogs.filter(b=>b.user.name.startsWith(search))
            setDisplayedBlogs(blogsToDisplay)
        } else if (criteria==='title'){
            const blogsToDisplay=blogs.filter(b=>b.title.startsWith(search))
            setDisplayedBlogs(blogsToDisplay)
        } else if (criteria==='author'){
            const blogsToDisplay=blogs.filter(b=>b.author.startsWith(search))
            setDisplayedBlogs(blogsToDisplay)
        }
        
    }
    const clearSearch =()=>{
        setSearch('')
        setDisplayedBlogs(blogs)
    }
    return(
        <div className='search-bar'>
            <select className='dropdown-menu' onChange={change} value={criteria}>
                <option value={dbOptions[0]}>{options[0]}</option>
                <option value={dbOptions[1]}>{options[1]}</option>
                <option value={dbOptions[2]}>{options[2]}</option>
            </select>

            <input type='text' className='search-input' value={search} onChange={(event)=>{setSearch(event.target.value)}}/>
            <button onClick={searchBlog} className='search-button'/>
            <button onClick={clearSearch} className='cancel-button' />
        </div>
    )
}
export default Search