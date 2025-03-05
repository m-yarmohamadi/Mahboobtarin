import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

const useChat = () => {
  const [socketData, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const userToken = Cookies.get("accessToken");

  const username = "09365456309";
  const password = "mf5755";
  const toUser = "989030066309";

  useEffect(() => {
    socket = io("wss://api.mahbubtarin.com:2024", {
      transports: ["websocket"],
    });

    // socket.emit("authenticate", userToken);

    // socket.on("private-message", (data) => {
    //   const decodedMessage = decodeURIComponent(escape(atob(data.message)));
    //   console.log(data);

    //   setMessages((prev) => [
    //     ...prev,
    //     { sender: data.sender_id, text: decodedMessage },
    //   ]);
    // });
    // console.log(socket);
    socket.on("connect", () => {
      console.log("اتصال برقرار شد!");
      socket.emit("set_username", {
        username,
        password,
      }); // ارسال نام کاربری
      socket.emit("check_online", toUser);
    });

    socket.on("private_message", (data) => {
      console.log(data);
    });

    // socket.on("connect", () => console.log("✅ سوکت متصل شد!"));
    // socket.on("connect_error", (err) => console.log("❌ خطای اتصال:", err));
    // socket.on("disconnect", () => console.log("❌ سوکت قطع شد!"));

    socket.on("error_message", (data) => {
      console.log(data);
    });

    setSocket(socket);

    // return () => socket.disconnect();
  }, []);
  console.log(socketData);

  const sendMessage = (senderId, receiverId, text) => {
    // if (socket) {

    socket.on("online_status", (data) => {
      console.log(data);

      socket.emit("private_message", { to: toUser, message: "سلام" });
    });

    // const encodedMessage = btoa(unescape(encodeURIComponent(text)));
    // socket.emit("private-message", {
    //   sender_id: senderId,
    //   receiver_id: receiverId,
    //   message: encodedMessage,
    // });
    // }
  };

  return { messages, sendMessage };
};

export default useChat;
