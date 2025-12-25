import { io } from "socket.io-client";
import { baseUrl } from "../utils/constant";

export const createSocketConnection = () => {
    return io(baseUrl, {withCredentials: true})
}
