import { useDispatch, useSelector } from "react-redux";
import { upvote } from "../reducers/anecdoteReducer";
import {setNotification} from '../reducers/messageReducer'

const Anecdote =({content, votes, handleUpvote})=>{
    return(
        <div>
         <div>{content}</div> 
         <div> has {votes} <button onClick={handleUpvote}> vote</button></div>
        </div>
    )

}

const AnecdoteList =()=>{
    const dispatch=useDispatch()
    var anecdotes=[...useSelector(state=>state.anecdotes)]
    const filter=useSelector(state=>state.filter)
    console.log(filter)
    if (filter!==''){
        anecdotes=anecdotes.filter(a=>a.content.toLowerCase().includes(filter.toLowerCase()))
    }
    anecdotes.sort((a,b)=>b.votes-a.votes)
    return(
        <div>
            {anecdotes.map(a=><Anecdote
                key={a.id}
                content={a.content}
                votes={a.votes}
                handleUpvote={()=>{
                    dispatch(upvote(a.id))
                    dispatch(setNotification(`you voted for '${a.content}'`,5))
                }}
            />)}
        </div>
    )


}
export default AnecdoteList