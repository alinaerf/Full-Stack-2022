import {useState} from 'react'
import userService from '../services/users'
const RegisterForm = ({setNotification, setErrorMessage, allUsers, setAllUsers})=>{
    const [newUsername, setNewUsername]=useState('')
    const [newPassword, setNewPassword]=useState('')
    const [newName, setNewName]=useState('')
    const handleRegister =async(event)=>{
        event.preventDefault()
        if (newUsername.length<3 || newPassword.length<3){
            //send error about the length
            setErrorMessage('Username and Password should be longer than 3 charachters.')
            window.setTimeout(()=>{setErrorMessage(null)},5000)
            return null
        } 
        const newUser={
            name:newName,
            username:newUsername,
            password:newPassword
        }
        try{
            const existingUsernames=allUsers.map(r=>r.username)
            if (existingUsernames.includes(newUser.username)){
                setErrorMessage('Username should be unique. Choose another username.')
                window.setTimeout(()=>{setErrorMessage(null)},5000)
                return null
            }
            userService.create(newUser)
            //notification about registration --> say the user to log into the application
            setNotification('Successfully registered!')
            window.setTimeout(()=>{setNotification(null)},5000)
            setNewName('')
            setNewUsername('')
            setNewPassword('')
            setAllUsers(allUsers.concat(newUser))

        }catch (exception){
            setErrorMessage('An error occurred!')
            window.setTimeout(()=>{setErrorMessage(null)},5000)
        }

    }

    return(
        <form onSubmit={handleRegister}>
            <div>
                name
                <input type='text' value={newName} name='Name' onChange={({target})=>setNewName(target.value)} />
            </div>

            <div>
                username
                <input type='text' value={newUsername} name='Username' onChange={({target})=>setNewUsername(target.value)} />
            </div>
            <div>
                password
                <input type='password' value={newPassword} name='Password' onChange={({target})=>setNewPassword(target.value)} />
            </div>
            <button type='submit'>Register</button>
        </form>
    )
}
export default RegisterForm