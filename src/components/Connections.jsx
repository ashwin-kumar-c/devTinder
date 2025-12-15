import axios from "axios"
import { baseUrl } from "../utils/constant"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnections } from "../reducers/connectionSlice"


const Connections = () => {
    const dispatch = useDispatch()
    const connections = useSelector(store => store.connections)

    const fetchConnections = async () => {
        try {
            const res = await axios.get(`${baseUrl}/user/connections`, {withCredentials: true})
            dispatch(addConnections(res?.data?.data))
            
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchConnections()
    }, [])

    return(
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-4xl">Connections</h1>
            {connections?.map(connection => {
                const {firstName, lastName, photoUrl, about, age, gender} = connection
                return(
                    <div key={connection._id} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                        <div>
                            <img className="w-20 h-20 rounded-full" src={photoUrl}/>
                        </div>
                        <div className="text-left mx-4">
                            <h2 className="font-bold text-xl">{`${firstName} ${lastName}`}</h2>
                            {age && gender && <p>{`${age} ${gender}`}</p>}
                            <p>{about}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Connections