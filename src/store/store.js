import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../reducers/userSlice'
import feedReducer from '../reducers/feedSlice'
import connectionReducer from '../reducers/connectionSlice'
import requestsReducer from '../reducers/requestsSlice'

const store = configureStore({
    reducer: { 
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
        requests: requestsReducer,
    }
})


export default store