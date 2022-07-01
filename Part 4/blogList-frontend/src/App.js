import { useState, useEffect } from "react"
import './App.css'
import loginService from './services/login'
import blogService from './services/blogs'
import Error from './components/error'
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Toggle from "./components/Toggle"
import BlogInfo from "./components/BlogInfo"
import RegisterForm from "./components/RegisterForm"
import Footer from "./components/Footer"
import userService from './services/users'
import Search from "./components/Search"
import Bar from './components/Bar'

const App = ()=>{
  const [allUsers,setAllUsers]=useState(null)
  const [blogs,setBlogs]=useState([])
  const [author, setAuthor]=useState('')
  const [title, setTitle]=useState('')
  const [url, setUrl]=useState('')
  const [username,setUsername]=useState('')
  const [password, setPassword]=useState('')
  const [user,setUser]=useState(null)
  const [error,setErrorMessage]=useState(null)
  const [notification,setNotification]=useState(null)
  const [displayedBlogs, setDisplayedBlogs]=useState(blogs)
  const authorChange= (event)=>{
    setAuthor(event.target.value)
  }
  const titleChange= (event)=>{
    setTitle(event.target.value)
  }
  const urlChange= (event)=>{
    setUrl(event.target.value)
  }
  const addBlog= (event)=>{
    event.preventDefault()
    const addedBlog={
      title:title,
      author:author,
      url:url, 
      likes:0
    }
    blogService.create(addedBlog)
    setBlogs(blogs.concat(addedBlog))
    setDisplayedBlogs(displayedBlogs.concat(addedBlog))
    setAuthor('')
    setTitle('')
    setUrl('')
    setNotification(`added ${title} to the Blog list!`)
    window.setTimeout(()=>{
      setNotification(null)
    },5000)
  }
  const handleLogin =async(event)=>{
    event.preventDefault()
    console.log('Pressed button')
    try{
      const user= await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch (exception){
      setErrorMessage('Wrong credentials')
      window.setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
      
    }
  }
  const logOut =()=>{
    window.localStorage.removeItem('loggedBlogappUser')
    setNotification(`${user.name} is logged out`)
    setUser(null)
    window.setTimeout(()=>{setNotification(null)},5000)
  }
  const deleteBlog =async(blog)=>{
    if (window.confirm(`Delete ${blog.title}?`)){
      try{
         await blogService
          .omit(blog.id)
        const newBlogs=blogs.filter(r=>r.id!==blog.id)
        setBlogs(newBlogs)
        const newDisplayedBlogs=displayedBlogs.filter(r=>r.id!==blog.id)
        setDisplayedBlogs(newDisplayedBlogs)
        setDisplayedBlogs(blogs)
        setNotification(`Successfully deleted ${blog.title}`)
        window.setTimeout(()=>{setNotification(null)},5000)
      }catch(exception){
        setErrorMessage(`User ${user.name} does not have deletion rights for the blog ${blog.title}`)
        window.setTimeout(()=>{setErrorMessage(null)}, 5000)
        }

    }

  }
  const likeBlog =async(blog, liked, setLiked)=>{
    try{
      const updatedBlog=blog
      if (!liked){
        updatedBlog.likes+=1
      }
      else{
        updatedBlog.likes-=1
      }
      await blogService
        .update(updatedBlog.id, updatedBlog)
      const newBlogs=blogs.map((blog)=>{if (blog.id===updatedBlog.id){blog.likes=updatedBlog.likes}return blog})
      newBlogs.sort(function(a,b){
          return b.likes-a.likes
      })
      const newDisplayedBlogs=displayedBlogs.map((blog)=>{if (blog.id===updatedBlog.id){blog.likes=updatedBlog.likes}return blog})
      newDisplayedBlogs.sort(function(a,b){
        return b.likes-a.likes
    })
      setLiked(!liked)
      setBlogs(newBlogs)
      setDisplayedBlogs(newDisplayedBlogs)
    }catch(exception){
      setErrorMessage(`An error occurred`)
      window.setTimeout(()=>{setErrorMessage(null)}, 5000)
    }
  }
  useEffect(()=>{
    const loggedUserJSON=window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON){
      const user=JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService
    .getAll()
    .then(response=>{
      const sortedBlogs=response
      sortedBlogs.sort(function(a,b){
        return b.likes-a.likes
      })
      setBlogs(sortedBlogs)
      setDisplayedBlogs(sortedBlogs)
    })
    
    userService.getAll()
    .then(response=>{
      const usersDb=response
      setAllUsers(usersDb)
    })
    

  },[])
  return(
    <div id="App">
      <Bar>
      {user===null?
    <div>
    <Toggle buttonLabel='Log in'>
     <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
    </Toggle>
    <Toggle buttonLabel='Register'>
      <RegisterForm setErrorMessage={setErrorMessage} setNotification={setNotification} allUsers={allUsers} setAllUsers={setAllUsers}/>
    </Toggle>
    </div>
     :<div> <p>{user.name} logged-in</p> <input type='button' value="Log Out" onClick={logOut}></input>
    <Toggle buttonLabel='Add new'>
      <BlogForm title={title} titleChange={titleChange} author={author} authorChange={authorChange} url={url} urlChange={urlChange} addBlog={addBlog}/>
    </Toggle>
     </div>}
      </Bar>
    <div id="page-wrap">
    <h1>Blogs</h1>
    <Error message={error}/>
    <Notification message={notification}/>

     <Search setDisplayedBlogs={setDisplayedBlogs} blogs={blogs}/>
    {displayedBlogs.map(blog=>{
      return(<BlogInfo blog={blog} deleteBlog={deleteBlog} likeBlog={likeBlog} key={blog.id}/>)
    })}
    
    <Footer/>
    </div>  
    </div>
  )
}

export default App;
