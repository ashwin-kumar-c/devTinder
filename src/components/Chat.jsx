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
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const senderUserId = user?._id;

  const messageEndRef = useRef(null);

  const scrollToBottom = (behavior) => {
    messageEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom("smooth");
  }, [messages]);

  useEffect(() => {
    const socket = createSocketConnection();

    socket.on("user online", ({ userId }) => {
      if (userId === targetUserId) {
        setIsOnline(true);
      }
    });

    socket.on("user offline", ({ userId }) => {
      if (userId === targetUserId) {
        setIsOnline(false);
      }
    });

    return () => {
      socket.off("user online");
      socket.off("user offline");
    };
  }, [targetUserId]);

  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit("check user online", { targetUserId }, (online) => {
      setIsOnline(online);
    });
  }, [targetUserId]);

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
    <div
      className="
    w-full sm:w-[95%] md:w-3/4 lg:w-2/3
    mx-auto my-4
    h-[85vh] sm:h-[80vh]
    flex flex-col
    rounded-xl
    border border-gray-700
    bg-gray-900
    shadow-lg
  "
    >
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between border-b border-gray-700">
        {/* Left: Chat title + status */}
        <div className="flex flex-col">
          <h1 className="text-base sm:text-lg font-semibold text-white">
            Chat
          </h1>

          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isOnline ? "bg-green-500 animate-pulse" : "bg-gray-500"
              }`}
            />
            <span className="text-xs sm:text-sm text-gray-400">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* Right: Back */}
        <button
          className="text-sm sm:text-base text-white font-semibold hover:text-violet-400 transition"
          onClick={() => navigate("/connections")}
        >
          Back
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {messages?.map((msg, i) => (
          <div
            key={i}
            className={
              user?.firstName === msg.senderName
                ? "chat chat-end"
                : "chat chat-start"
            }
          >
            <div className="chat-header text-xs opacity-70">
              {msg.senderName}
              <time className="ml-2">12:45</time>
            </div>

            <div className="chat-bubble text-sm">{msg.text}</div>

            <div className="chat-footer text-xs opacity-50">Delivered</div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Input */}
      <div className="px-3 sm:px-4 py-3 border-t border-gray-700 flex items-center gap-3 bg-gray-800 rounded-b-xl">
        <input
          type="text"
          value={newMessage}
          placeholder="Type a message..."
          onChange={(e) => setNewMessage(e.target.value)}
          className="
        flex-1
        bg-gray-900
        text-white
        placeholder-gray-400
        border border-gray-700
        rounded-lg
        px-4 py-2
        text-sm
        focus:outline-none
        focus:ring-2
        focus:ring-violet-500
      "
        />
        <button
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 sm:px-5 py-2 rounded-lg text-sm transition"
          onClick={handeSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
