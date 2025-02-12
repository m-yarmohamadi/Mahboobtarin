import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket

const useChat = () => {
  const [socketData, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const userToken = Cookies.get("accessToken");
  console.log(userToken);

  useEffect(() => {
    socket = io("https://api.mahbubtarin.com:2021");

    socket.emit("authenticate", userToken);

    socket.on("private-message", (data) => {
      const decodedMessage = decodeURIComponent(escape(atob(data.message)));
      console.log(data);

      setMessages((prev) => [
        ...prev,
        { sender: data.sender_id, text: decodedMessage },
      ]);
    });
    console.log(socket);
    
    setSocket(socket);

    return () => socket.disconnect();
  }, [userToken]);
//   console.log(socketData);

  const sendMessage = (senderId, receiverId, text) => {
    // if (socket) {
    console.log(senderId, receiverId, text);
    
      const encodedMessage = btoa(unescape(encodeURIComponent(text)));
      socket.emit("private-message", {
        sender_id: senderId,
        receiver_id: receiverId,
        message: encodedMessage,
      });
    // }
  };

  return { messages, sendMessage };
};

export default useChat;
