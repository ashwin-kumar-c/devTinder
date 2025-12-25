import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSocketConnection } from "../store/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../utils/constant";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate()

  const messageEndRef = useRef(null)

  const scrollToBottom = (behavior) => {
    messageEndRef.current?.scrollIntoView({behavior})
  }

  useEffect(() => {
    scrollToBottom("smooth")
  }, [messages])

  const senderUserId = user?._id;

  const fetchChats = async () => {
    const chat = await axios.get(`${baseUrl}/chat/${targetUserId}`, {
      withCredentials: true,
    });

    const messages = chat?.data?.messages.map((msg) => {
      return { senderName: msg.senderId.firstName, text: msg.text };
    });
    setMessages(messages);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (!senderUserId) return;
    const socket = createSocketConnection();
    socket.emit("join chat", { targetUserId });

    socket.on("message received", ({ senderName, text }) => {
      setMessages((messages) => [...messages, { senderName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [senderUserId, targetUserId]);

  const handeSendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("send message", {
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-2/3 mx-auto m-6 h-[75vh] flex flex-col rounded-xl border border-gray-700 bg-gray-900 shadow-lg">
      {/* Header */}
      <div className="px-6 py-4 flex justify-between border-b border-gray-700">
        <h1 className="text-lg font-semibold text-white">Chat</h1>
        <button className="text-white font-semibold" onClick={() => navigate("/connections")}>Back</button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {messages &&
          messages?.map((msg, i) => {
            return (
              <div
                className={
                  user?.firstName === msg.senderName
                    ? "chat chat-end"
                    : "chat chat-start"
                }
                key={i}
              >
                <div className="chat-header">
                  {msg.senderName}
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            );
          })}
            <div ref={messageEndRef}/>
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 border-t border-gray-700 flex items-center gap-3 bg-gray-800 rounded-b-xl">
        <input
          type="text"
          value={newMessage}
          placeholder="Type a message..."
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 bg-gray-900 text-white placeholder-gray-400 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="bg-violet-600 text-white px-5 py-2 rounded-lg transition"
          onClick={handeSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
