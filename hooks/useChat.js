import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import useProfile from "./useProfile";

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const userToken = Cookies.get("accessToken");
  // const [currentUser, setCurrentUser] = useState();
  const [newMessage, setNewMessage] = useState();

  const socketRef = useRef(null);
  const currentUserRef = useRef(null);
  console.log(messages);

  useEffect(() => {
    const externalServerURL = "wss://api.mahbubtarin.com:6001";
    const socket = io(externalServerURL, {
      auth: { token: userToken },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("current user", (user) => {
      currentUserRef.current = user;
    });
    console.log(currentUserRef.current);

    socket.on("online users", (users) => {
      setOnlineUsers((prev) => [...prev, ...users]);
    });
    socket.on("private message", ({ from, text, to, name }) => {
      setNewMessage({
        message: text,
        created_at: new Date().toISOString(),
        sender_name: currentUserRef.current.name,
        sender_lastname: currentUserRef.current.lastname,
        sender_id: Number(currentUserRef.current.id),
        receiver_name: name,
        receiver_lastname: "",
        receiver_id: Number(to),
      });
    });
    socket.on("previous messages", (messages) => {
      setMessages((prev) => [...prev, ...messages]);
    });

  },[]);

  useEffect(() => {
    if (newMessage) {
      setMessages((prev) => [...prev, newMessage]);
    }
  }, [newMessage]);

  const sendMessagePublic = (text) => {};

  const sendMessagePrivate = (text, username) => {
    socketRef.current.emit("private message", { to: username, text });
  };

  const getOnlineUsers = onlineUsers.filter(
    (user, index, self) => index === self.findIndex((u) => u.id === user.id)
  );

  return {
    messages,
    getOnlineUsers,
    sendMessagePublic,
    sendMessagePrivate,
  };
};

export default useChat;
