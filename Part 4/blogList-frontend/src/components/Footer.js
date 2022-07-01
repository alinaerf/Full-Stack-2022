import {useState} from 'react'
const Footer = ()=>{
    const [mode, setMode]=useState(true)
    const changeMode =(a)=>{
        var body= document.body
        if (a){
            body.classList.remove('dark-mode')
        }else{
            body.className='dark-mode'
            document.getElementById('sidebar').style.color='black'        
        }
        setMode(!mode)
    }
    return(
        <footer>
            <input type='button' value={mode?'Dark Mode':'Light Mode'} onClick={()=>changeMode(!mode)}/>
        </footer>
    )
}
export default Footer