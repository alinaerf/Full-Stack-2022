import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import messageReducer from './reducers/messageReducer'
const store=configureStore({
    reducer:{
        anecdotes:reducer,
        message:messageReducer,
        filter:filterReducer
    }
})
export default store

