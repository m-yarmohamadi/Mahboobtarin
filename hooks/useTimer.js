import { useEffect, useRef, useState } from "react";

export function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => {
    pause();
    setSeconds(0);
  };

  useEffect(() => {
    return pause;
  }, []);

  const minutes = Math.floor(seconds / 60);
  const displaySeconds = seconds % 60;

  return {
    minutes,
    seconds: displaySeconds,
    totalSeconds: seconds,
    start,
    pause,
    reset,
    isRunning: intervalRef.current !== null,
  };
}
