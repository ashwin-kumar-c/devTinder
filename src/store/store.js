import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../reducers/userSlice'
import feedReducer from '../reducers/feedSlice'

const store = configureStore({
    reducer: { 
        user: userReducer,
        feed: feedReducer
    }
})


export default store