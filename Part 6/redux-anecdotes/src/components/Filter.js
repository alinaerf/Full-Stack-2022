import {change} from '../reducers/filterReducer'
//import { useDispatch } from 'react-redux'
import {connect} from 'react-redux'
const Filter = (props)=>{
    //const dispatch=useDispatch()
    const style={
        marginBottom:10
    }
    const handleChange =(event)=>{
        event.preventDefault()
        const content=event.target.value
        props.change(content)
    }
    return(
        <div style={style}>
            <h2> Anecdotes</h2>
        <div>
            filter <input onChange={handleChange}/>
        </div>
        </div>
    )
}

export default connect(null, {change})(Filter)