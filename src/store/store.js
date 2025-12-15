import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../reducers/userSlice'
import feedReducer from '../reducers/feedSlice'
import connectionReducer from '../reducers/connectionSlice'

const store = configureStore({
    reducer: { 
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer
    }
})


export default store