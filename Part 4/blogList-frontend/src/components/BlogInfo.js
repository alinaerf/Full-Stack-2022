import {useState} from 'react'
import './icons.css'
const BlogInfo = ({blog, deleteBlog, likeBlog})=>{
    const [liked,setLiked]=useState(false)
    const [visible,setVisible]=useState(false)
    const hideWhenVisible={display:visible?'none':''}
    const showWhenVisible={display:visible?'':'none'}
    const toggleVisibility = ()=>{
        setVisible(!visible)
    }
    return(
      <div key={blog.id}>
        <div style={hideWhenVisible}>
          {blog.title} {blog.author}<button onClick={toggleVisibility} className='openInfo'></button>
        </div>
        <div style={showWhenVisible}>
          {blog.title} {blog.author}<button onClick={toggleVisibility} className='closeInfo'></button>
          <p>{blog.url}</p>
          <p>likes {blog.likes}<input type="button" className={liked?'liked':'notLiked' } id={blog.id} onClick={()=>likeBlog(blog, liked,setLiked)}/></p>
          <p> {blog.user.name}</p>
          <input type='button' value='delete' onClick={()=>deleteBlog(blog)}/>
        </div>
      </div>
    )
}

export default BlogInfo