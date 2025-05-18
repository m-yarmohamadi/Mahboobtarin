import { useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Cookies from "js-cookie";
import { createContext } from "react";
import { useParams } from "next/navigation";
import useVoiceCall from "@/hooks/useVoiceCall";
import IncomingVoiceCall from "@/components/admin/adminProfileSteps/chats/voiceCallState/IncomingVoiceCall";
import CallingVoiceCall from "@/components/admin/adminProfileSteps/chats/voiceCallState/CallingVoiceCall";
import VoiceCall from "@/components/admin/adminProfileSteps/chats/voiceCallState/VoiceCall";

const ChatContext = createContext(null);

export default function ChatProvider({ children }) {
    const [messages, setMessages] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const userToken = Cookies.get("accessToken");
    const params = useParams();
    const socketRef = useRef(null);
    const currentUserRef = useRef(null);
    const receiverUserRef = useRef(null);

    const {
        answerVoiceCall,
        caller,
        endVoiceCall,
        receiverUser,
        startVoiceCall,
        voiceCallState,
        callLoad
    } = useVoiceCall(socketRef?.current, onlineUsers);

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

        socket.on("latest services", (data) => {
            const mergedArray = [
                ...(data?.[0]?.service_provision || []),
                ...(data?.[1]?.get_service || []),
            ];
            setOnlineUsers((prev) => [...prev, ...mergedArray]);
        });

        socket.on("private message", ({ from, text, to, name }) => {
            const isOwnMessage = Number(from.id) === Number(currentUserRef?.current?.id);

            setMessages((prev) => [{
                message: text,
                created_at: new Date().toISOString(),
                sender_name: from?.name,
                sender_lastname: from?.lastname,
                sender_id: Number(from?.id),
                receiver_name: to?.name,
                receiver_lastname: to?.lastname,
                receiver_id: Number(to?.id || 0),
                isOwnMessage,
            }, ...prev]);

        });



        // ** calls **
    }, []);

    useEffect(() => {
        if (!socketRef.current || !params?.chatId || !currentUserRef.current) return;

        socketRef.current.emit("get private messages", { targetUserId: params?.chatId });
        socketRef.current.on("get private messages", (messages) => {
            setMessages(messages.map((item) => ({ ...item, isOwnMessage: Number(item?.sender_id) === currentUserRef?.current?.id })));
        });

    }, [socketRef.current, params?.chatId, currentUserRef.current]);

    const sendMessagePublic = (text) => {
        // Add logic if needed
    };

    const sendMessagePrivate = (text, username) => {
        socketRef.current.emit("private message", { to: username, text });
    };

    const getOnlineUsers = onlineUsers.filter(
        (user, index, self) => index === self.findIndex((u) => u.id === user.id)
    );

    const getMessages = [...messages].filter((m) =>
        Number(m.sender_id) === Number(currentUserRef?.current?.id) ||
        Number(m.receiver_id) === Number(params.chatId)
    )

    const renderVoiceCalls = () => {
        switch (voiceCallState) {
            case "isIncoming": return (
                <IncomingVoiceCall
                    answer={answerVoiceCall}
                    caller={caller}
                    end={endVoiceCall}
                />
            )

            case "isConnection": return (
                <CallingVoiceCall
                    end={endVoiceCall}
                    receiverUser={receiverUser}
                    callLoad={callLoad}
                />
            )

            case "isCall": return (
                <VoiceCall
                    end={endVoiceCall}
                    receiverUser={receiverUser}
                />
            )

            default:
                break;
        }
    }

    return (
        <ChatContext.Provider
            value={{
                messages: [...messages].reverse(),
                getOnlineUsers,
                sendMessagePublic,
                sendMessagePrivate,
                startVoiceCall,
                endVoiceCall,
                receiverUser,
                currentUser: currentUserRef.current
            }}
        >
            {renderVoiceCalls()}
            {children}
        </ChatContext.Provider>
    );
};


export function useChatContext() {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};
