import { createContext, useEffect, useRef } from "react";

const SamplePackContext = createContext(null);

export default function AudioContextProvider() {
  const audioContextRef = useRef<AudioContext>(null);
  useEffect(() => {
    if (audioContextRef.current) return;
    audioContextRef.current = new AudioContext();
  }, []);
  return <SamplePackContext.Provider value={null}></SamplePackContext.Provider>;
}
