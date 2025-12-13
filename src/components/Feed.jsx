import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import axios from "axios"
import { baseUrl } from "../utils/constant"
import { addFeed } from "../reducers/feedSlice"
import UserFeedCard from "./UserFeedCard"

const Feed = () => {
    const dispatch = useDispatch()
    const userfeed = useSelector(store => store.feed)

    const fetchFeed = async () => {
        if(userfeed) return
        try {
            const res = await axios.get(`${baseUrl}/user/feed`, {withCredentials: true})
            dispatch(addFeed(res.data))
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchFeed()
    }, [])

    return(
        userfeed &&
        <div>
            <UserFeedCard user={userfeed[0]}/>
        </div>
    )
}

export default Feed