import './message.css'
const Error =({message})=>{
    if (message){
        return(
            <div className="error">{message}</div>
        )
    }
    return null
}
export default Error