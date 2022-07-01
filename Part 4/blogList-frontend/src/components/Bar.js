import { useState } from "react"
const Bar =(props)=>{
    const [visible, setVisibility]=useState(true)
    const hideWhenVisible={display:visible?'none':''}
    const showWhenVisible={display:visible?'':'none'}
    const change=()=>{
        setVisibility(!visible)

        if (visible){
            document.getElementById('page-wrap').style.marginLeft='200px'
            document.getElementById('sidebar').style.width = "200px"
            document.getElementById('sidebar').style.display = 'inline-block'
            document.getElementById('sidebar').style.backgroundColor='lightgray'
        }else{
            document.getElementById('page-wrap').style.marginLeft='0px'
            document.getElementById('sidebar').style.width = "0px"
        }

    }
    return(
        <div className="sidebar" id='sidebar'>
            <button className="sidebar-open-button"style={showWhenVisible} onClick={change}/>
            <div style={hideWhenVisible}>
                <button className='sidebar-close-button' onClick={change}/>
                {props.children}
            </div>

        </div>
    )
}
export default Bar