import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";

export default function useVoiceCall(socket, onlineUsers) {
  const [voiceCallState, setVoiceCallState] = useState();
  const [caller, setCaller] = useState();
  const [callLoad, setCallLoad] = useState(true);
  const receiverUserRef = useRef(null);
  let peer = useRef(null);
  let localStream = useRef(null);
  
  useEffect(() => {
    if (!socket) return;
    
    socket.on("incoming call", async ({ from, signal, video }) => {
      setVoiceCallState("isIncoming");
      setCaller({ from, signal });
    });

    socket.on("call accepted", (signal) => {
      peer.current.signal(signal);
      setVoiceCallState("isCall");
    });

    socket.on("call ended", () => {
      if (peer.current) {
        peer.current.destroy();
        peer.current = null;
      }
      setVoiceCallState();
      setCaller();
    });

    const interval = setInterval(() => {
      setCallLoad((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, [socket]);

  const startVoiceCall = async (targetUserId) => {
    const constraints = {
      audio: true,
    };

    localStream = await navigator.mediaDevices.getUserMedia(constraints);

    setVoiceCallState("isConnection");

    peer.current = new Peer({
      initiator: true,
      trickle: false,
      stream: localStream,
    });

    peer.current.on("signal", (data) => {
      socket.emit("call user", {
        to: targetUserId,
        signalData: data,
        video: false,
      });
    });

    peer.current.on("stream", (stream) => {
      const audio = new Audio();
      audio.srcObject = stream;
      audio.play();
    });

    peer.current.on("close", () => {
      console.log(voiceCallState);
    });

    receiverUserRef.current = onlineUsers.find(
      (u) => Number(u.id) === Number(targetUserId)
    );
  };

  const answerVoiceCall = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    setVoiceCallState("isCall");

    peer.current = new Peer({
      initiator: false,
      trickle: false,
      stream: localStream,
    });

    peer.current.on("signal", (data) => {
      socket.emit("answer call", {
        to: caller.from.id,
        signal: data,
      });
    });

    peer.current.on("stream", (stream) => {
      const audio = new Audio();
      audio.srcObject = stream;
      audio.play();
    });

    peer.current.signal(caller.signal);
  };

  const endVoiceCall = () => {
    if (peer.current) peer.current.destroy();
    socket.emit("end call");
    setVoiceCallState();
    setCaller();
  };

  return {
    voiceCallState,
    caller,
    receiverUser: receiverUserRef.current,
    startVoiceCall,
    answerVoiceCall,
    endVoiceCall,
    callLoad,
  };
}
