// UserChatHome.jsx
import React, { useEffect, useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 5000,
});

const formatTimestamp = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const UserChatHome = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userName, setuserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const messageListRef = useRef(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (messageListRef.current) {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      }
    };

    socket.on("load messages", (loadedMessages) => {
      setMessages(loadedMessages);
      scrollToBottom();
    });

    socket.on("chat message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      scrollToBottom();
    });

    if (!userName) {
      const name = prompt("Enter your userName:");
      setuserName(name);
      localStorage.setItem("userName", name);
      socket.emit("userName", name);
    } else {
      socket.emit("userName", userName);
    }

    return () => {
      socket.off("load messages");
      socket.off("chat message");
    };
  }, [userName]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      author: userName,
      content: message.trim(),
      timestamp: new Date().toISOString(),
    };

    socket.emit("chat message", newMessage);
    setMessage("");
  };

  const navigate = useNavigate()

  return (
    <div className="h-screen bg-gray-900 overflow-y-auto">
      {/* Conditionally Render Navbar */}
      {userName !== "admin" && (
        <nav className="bg-blue-500 shadow-md py-4 px-8 flex justify-between items-center transition-transform transform">
          <h1
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
            className="text-2xl font-bold text-white"
          >
            MedManage
          </h1>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition duration-300 transform hover:translate-y-1"
          >
            Logout
          </button>
        </nav>
      )}
  
      {/* Chat Container */}
      <div className="max-w-3xl mx-auto mt-8 bg-gray-800 rounded-lg shadow-md ">
        {/* Chat Header */}
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-center text-white">
            MedManage Consultation {userName ? `(${userName})` : ""}
          </h2>
        </div>
  
        {/* Messages Container */}
        <div
          ref={messageListRef}
          className="h-[calc(100vh-280px)] overflow-y-auto p-4 space-y-4"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                msg.author === userName ? "items-end" : "items-start"
              }`}
            >
              <span className="text-sm text-gray-400 mb-1">{msg.author}</span>
              <div className="max-w-[70%]">
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    msg.author === userName
                      ? "bg-blue-500 text-white rounded-tr-none"
                      : "bg-gray-200 text-gray-800 rounded-tl-none"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {formatTimestamp(msg.timestamp || msg.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
  
        {/* Message Input */}
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default UserChatHome;
