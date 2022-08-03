//import { useDispatch } from "react-redux"
import {connect} from 'react-redux'
import {setNotification} from '../reducers/messageReducer'
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm =(props)=>{
    //const dispatch=useDispatch()
    const addAnecdote =(event)=>{
        event.preventDefault()
        const content= event.target.anecdote.value
        console.log(content)
        event.target.anecdote.value=''
        props.createAnecdote(content)
        props.setNotification(`you added '${content}'`, 5)

    }

    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
      </div>
    )
}
export default connect(null, {setNotification, createAnecdote})(AnecdoteForm)