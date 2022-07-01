import './message.css'
const Notification =({message})=>{
    if (message){
        return(
            <div className="notification">{message}</div>
        )
    }
    return null
}
export default Notification