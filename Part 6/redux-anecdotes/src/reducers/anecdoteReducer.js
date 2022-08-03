import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice=createSlice({
  name:'anecdotes', 
  initialState:[],
  reducers:{
    add(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state,action){
      return action.payload
    }
  }
})

export const {add, setAnecdotes}=anecdoteSlice.actions
export const initializeAnecdotes=()=>{
  return async dispatch =>{
    const anecdotes=await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote=content=>{
  return async dispatch=>{
    const newAnecdote=await anecdoteService.createNew(content)
    dispatch(add(newAnecdote))
  }
}
export const upvote=id=>{
  return async dispatch=>{
    const allObjects=await anecdoteService.getAll()
    const object=allObjects.find(n=>n.id===id)
    const newObject={
      ...object, 
      votes:object.votes+1
    }
    await anecdoteService.makeChanges(id, newObject)
    const updated=allObjects.map(a=>a.id!==id?a:newObject)  
    dispatch(setAnecdotes(updated))
  }
}

export default anecdoteSlice.reducer

/*
upvote(state, action){
      const id=action.payload
      const anecdoteToChange=state.find(n=>n.id===id)
      const changedAnecdote={
        ...anecdoteToChange, 
        votes:anecdoteToChange.votes+1
      }
      return state.map(a=>a.id!==id?a:changedAnecdote)  

    }
*/