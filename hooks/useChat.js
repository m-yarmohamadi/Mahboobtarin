import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const userToken = Cookies.get("accessToken");

  const socketRef = useRef(null);
  console.log(messages);

  useEffect(() => {
    const socket = new WebSocket(
      `ws://api.mahbubtarin.com:6001?token=${userToken}`
    );
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("🟢 اتصال برقرار شد");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
      if (data.type === "online_users") {
        setOnlineUsers((prev) => [...onlineUsers, ...data.users]);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  // useEffect(() => {
  //   if (messagesRef.current) {
  //     messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  //   }
  // }, [messages]);

  const sendMessagePublic = (text) => {
    socketRef.current.send(
      JSON.stringify({
        type: "public",
        message: text,
      })
    );
  };

  const sendMessagePrivate = (text, reciverId) => {
    socketRef.current.send(JSON.stringify({
      type: 'private',
      to: reciverId,
      message: text
    }));
  };

  const getOnlineUsers = onlineUsers.filter(
    (user, index, self) => index === self.findIndex((u) => u.id === user.id)
  );

  return { messages, getOnlineUsers, sendMessagePublic, sendMessagePrivate };
};

export default useChat;
