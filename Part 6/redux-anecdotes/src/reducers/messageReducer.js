import { createSlice } from "@reduxjs/toolkit"
const initialState='Welcome!'
const messageSlice=createSlice({
    name:'message', 
    initialState,
    reducers:{
        edit(state,action){
            const content=action.payload
            return content
        },
        remove(state,action){
            return initialState
        }
    }
})
export const {edit, remove}=messageSlice.actions
export const setNotification =(text,time)=>{
    return dispatch=>{
        dispatch(edit(text))
        window.setTimeout(()=>dispatch(remove()), time*1000)
    }
}
export default messageSlice.reducer