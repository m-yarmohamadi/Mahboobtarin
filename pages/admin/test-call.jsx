import Permission from "@/components/admin/adminProfileSteps/videoCall/Permission";
import { useEffect, useRef, useState } from "react"
import io from 'socket.io-client';
import Peer from 'simple-peer';
// import VideoCall from "@/components/admin/adminProfileSteps/videoCall/VideoCall";
import { MdCall, MdCallEnd, MdOutlineKeyboardVoice } from 'react-icons/md';
import { BsCameraVideo, BsFillCameraVideoFill, BsFillCameraVideoOffFill } from 'react-icons/bs';
import { AiOutlineAudioMuted } from 'react-icons/ai';
import { useRouter } from "next/navigation";
import Loading from "@/tools/Loading";
import useProfile from "@/hooks/useProfile";
import { HiOutlineVideoCamera, HiOutlineVideoCameraSlash } from "react-icons/hi2";

let socket;

export default function TestVideoCall() {
    const { user, isLoading } = useProfile();
    const [step, setStep] = useState(0);
    const [permission, setPermission] = useState({
        mic: false, video: false
    })
    const [idText, setIdText] = useState("");

    const [stream, setStream] = useState(null);
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [me, setMe] = useState('');
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [caller, setCaller] = useState('');
    const [callerSignal, setCallerSignal] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [idToCall, setIdToCall] = useState('');
    const [isConnection, setIsConnection] = useState(false);

    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const [remoteMicOn, setRemoteMicOn] = useState(true);
    const [remoteCameraOn, setRemoteCameraOn] = useState(true);

    const myVideo = useRef(null);
    const checkVideo = useRef(null);
    const userVideo = useRef(null);
    const connectionRef = useRef(null);


    useEffect(() => {
        const constraints = {
            video: {
                width: { min: 320, ideal: 640, max: 1280 },
                height: { min: 240, ideal: 360, max: 720 },
                frameRate: { min: 10, ideal: 15, max: 30 }
            },
            audio: true
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then((str) => {
                setStream(str);
                setPermission({ mic: true, video: true });
                checkVideo.current.srcObject = str;
                myVideo.current.srcObject = str;
            })
            .catch((err) => {
                console.error("Error accessing media devices:", err);
            });

        socket = io(process.env.NEXT_PUBLIC_SERVER_SOCKET);

        socket.on('me', (id) => {
            setMe(id);
        });

        socket.on('receive-call', (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setName(data.name);
            setAvatar(data.avatar);
            setCallerSignal(data.signal);
            setRemoteCameraOn(data.camera);
            setRemoteMicOn(data.mic);
        });

        socket.on('call-answered', () => {
            setIsConnection(false);
        });

        socket.on('end-call', () => {
            setCallEnded(true);
            connectionRef.current && connectionRef.current.destroy();
            setIsConnection(false);
            setStep(0);
            window.location.reload();
        });

        socket.on('camera-status-changed', (data) => {
            setRemoteCameraOn(data.cameraOn);
            if (data.cameraOn) {
                userVideo.current.srcObject.getVideoTracks()[0] = data.cameraOn
            }
        });

        socket.on('mic-status-changed', (data) => {
            setRemoteMicOn(data.micOn);
            if (data.micOn) {
                userVideo.current.srcObject.getAudioTracks()[0] = data.micOn
            }
        });
    }, [])

    const callUser = () => {
        setIdToCall(idText);
        setStep(1);
        setIsConnection(true);

        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        peer.on('signal', (data) => {
            socket.emit('call-user', {
                userToCall: idText,
                signalData: data,
                from: me,
                name: `${user?.name} ${user?.lastname}` || "",
                avatar: user && user.avatar && user.avatar.length ? user.avatar[0] : null,
                camera: cameraOn,
                mic: micOn
            });
        });

        peer.on('stream', (remoteStr) => {
            userVideo.current.srcObject = remoteStr;

            // const videoTrack = remoteStr.getVideoTracks()[0];
            // setRemoteCameraOn(videoTrack ? videoTrack.enabled : false);
            // console.log(videoTrack);

            // const audioTrack = remoteStr.getAudioTracks()[0];
            // setRemoteMicOn(audioTrack ? audioTrack.enabled : false);
        });

        socket.on('call-accepted', (data) => {
            setCallAccepted(true);
            peer.signal(data.signal);
            setName(data.name);
            setAvatar(data.avatar);
            setRemoteCameraOn(data.camera);
            setRemoteMicOn(data.mic);
        });

        connectionRef.current = peer;
    };

    const answerCall = () => {
        setCallAccepted(true);
        setStep(1);

        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });

        peer.on('signal', (data) => {
            socket.emit('answer-call', {
                signal: data,
                to: caller,
                name: `${user?.name} ${user?.lastname}` || "",
                avatar: user && user.avatar && user.avatar.length ? user.avatar[0] : null,
                camera: cameraOn,
                mic: micOn
            });
            socket.emit('call-answered', { to: caller });
        });

        peer.on('stream', (remoteStr) => {
            userVideo.current.srcObject = remoteStr;

            // const videoTrack = remoteStr.getVideoTracks()[0];
            // setRemoteCameraOn(videoTrack ? videoTrack.enabled : false);

            // const audioTrack = remoteStr.getAudioTracks()[0];
            // setRemoteMicOn(audioTrack ? audioTrack.enabled : false);
        });

        peer.signal(callerSignal);

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        setIsConnection(false);
        setStep(0);
        socket.emit("end-call", { to: caller || idToCall });
        connectionRef.current.destroy();
        window.location.reload();
    };

    const toggleMic = () => {
        const newMicStatus = !micOn;
        setMicOn(newMicStatus);
        stream.getAudioTracks()[0].enabled = newMicStatus;

        socket.emit('mic-status-change', { micOn: newMicStatus, to: caller || idToCall });
    };

    const toggleCamera = () => {
        const newCameraStatus = !cameraOn;
        setCameraOn(newCameraStatus);
        stream.getVideoTracks()[0].enabled = newCameraStatus;

        socket.emit('camera-status-change', { cameraOn: newCameraStatus, to: caller || idToCall });
    };


    return (
        <>
            <Permission
                permission={permission}
                setPermission={setPermission}
                idText={idText}
                setIdText={setIdText}
                myId={me}
                callUser={callUser}
                isConnection={isConnection}
                hidden={step !== 0}
                toggleMic={toggleMic}
                toggleCamera={toggleCamera}
                cameraOn={cameraOn}
                micOn={micOn}
            >
                <video ref={checkVideo} autoPlay muted className={`scale-x-[-1] w-full h-full object-cover object-center`} />
            </Permission>

            <div className={`w-full h-screen flex-col p-4 ${step === 1 ? "flex" : "hidden"}`}>
                <div className='w-full h-[90%] grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-3 pb-4'>
                    <div className='overflow-hidden w-full min-h-full flex items-center justify-center rounded-xl bg-slate-300 relative'>
                        {!remoteMicOn &&
                            <div className='absolute top-4 right-4 w-8 h-8 z-50 rounded-full bg-slate-500 text-white flex items-center justify-center'>
                                <AiOutlineAudioMuted className='w-5 h-5' />
                            </div>
                        }

                        {callAccepted && !callEnded ?
                            <>
                                <video ref={userVideo} autoPlay className={`scale-x-[-1] w-full h-full object-cover object-center ${!remoteCameraOn && "hidden"}`} />
                                <div className={`absolute bottom-4 right-4 flex items-center gap-4  ${!remoteCameraOn && "!hidden"}`}>
                                    <div className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden border-2 border-white">
                                        <img
                                            className={avatar && "object-cover w-full h-full"}
                                            src={avatar ? avatar.path : "/images/defaultUser.png"}
                                            alt=''
                                        />
                                    </div>
                                    <div className="text-sm text-white font-bold">
                                        {name}
                                    </div>
                                </div>
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-white overflow-hidden ${remoteCameraOn && "hidden"}`}>
                                    {
                                        avatar ?
                                            <img src={avatar.path} alt="User profile" />
                                            :
                                            <div className="w-full min-h-full flex items-center justify-center text-2xl text-primary-01 font-bold">
                                                <span>
                                                    {name[0] || ""}
                                                </span>
                                            </div>
                                    }
                                </div>
                            </>
                            :
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-white overflow-hidden`}>
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-white overflow-hidden ${remoteCameraOn && "hidden"}`}>
                                    {
                                        avatar ?
                                            <img src={avatar.path} alt="User profile" />
                                            :
                                            <div className="w-full min-h-full flex items-center justify-center text-2xl text-primary-01 font-bold">
                                                <span>
                                                    {name[0] || ""}
                                                </span>
                                            </div>
                                    }
                                </div>
                            </div>
                        }

                    </div>
                    <div className='overflow-hidden w-full flex items-center justify-center rounded-xl bg-slate-300 relative'>
                        <video ref={myVideo} autoPlay className={`scale-x-[-1] w-full h-full object-cover object-center ${!cameraOn && "hidden"}`} />
                        <div className={`absolute bottom-4 right-4 flex items-center gap-4  ${!cameraOn && "!hidden"}`}>
                            <div className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden border-2 border-white">
                                <img
                                    className={user?.avatar[0]?.path && "object-cover w-full h-full"}
                                    src={user?.avatar[0]?.path || "/images/defaultUser.png"}
                                    alt=''
                                />
                            </div>
                            <div className="text-sm text-white font-bold">
                                {`${user?.name} ${user?.lastname}` || ""}
                            </div>
                        </div>
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-white overflow-hidden ${cameraOn && "hidden"}`}>
                            {
                                user && user.avatar && user.avatar.length && !isLoading ?
                                    <img src={user.avatar[0].path} alt="User profile" />
                                    :
                                    <div className="w-full min-h-full flex items-center justify-center text-2xl text-primary-01 font-bold">
                                        <span>
                                            {user?.name[0] || ""}
                                        </span>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='w-full !h-[10%] flex items-center justify-center gap-3'>
                    <button onClick={toggleMic} className={`btn btn--secondary !w-12 !h-12 !p-2 !rounded-xl`}>
                        {micOn ? <MdOutlineKeyboardVoice className='w-7 h-7' /> : <AiOutlineAudioMuted className='w-6 h-6' />}
                    </button>
                    <button onClick={toggleCamera} className='btn btn--secondary !w-12 !h-12 !p-2 !rounded-xl'>
                        {cameraOn ? <HiOutlineVideoCamera className='w-7 h-7' /> : <HiOutlineVideoCameraSlash className='w-7 h-7' />}
                    </button>
                    {callAccepted && !callEnded && (
                        <button onClick={leaveCall} className='btn btn--danger !w-20 !h-12 !p-2 !rounded-xl'>
                            <MdCallEnd className='w-6 h-6' />
                        </button>
                    )}
                </div>
            </div>

            {isConnection &&
                <div className='w-full h-screen absolute top-0 right-0 z-50 text-white flex-col font-bold gap-4 bg-slate-800 backdrop-blur-lg flex items-center justify-center'>
                    <Loading />
                    <button onClick={leaveCall} className='btn btn--danger !w-20 !h-12 !p-2 !rounded-xl'>
                        <MdCallEnd className='w-6 h-6' />
                    </button>
                </div>
            }

            {receivingCall && !callAccepted && (
                <div className='w-full h-screen absolute top-0 right-0 z-50 text-white flex-col font-bold gap-4 bg-slate-800/80 backdrop-blur-lg flex items-center justify-center'>
                    در انتظار پاسخ شما...
                    از {name}
                    <div className='flex items-center gap-4'>
                        <button onClick={answerCall} className='btn btn--primary !w-12 !h-12'>
                            <MdCall className='w-6 h-6' />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
