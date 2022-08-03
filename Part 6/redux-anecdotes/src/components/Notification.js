//import { useSelector } from "react-redux"
import {connect} from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  //const notification=useSelector(state=>state.message)
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps=(state)=>{
  return {
    notification:state.message
  }
}

export default connect(mapStateToProps, null)(Notification)