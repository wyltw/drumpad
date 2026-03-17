import { createContext, useEffect, useRef } from "react";
import { useSamplePack } from "../hooks/useSamplePack";

const SamplePackContext = createContext(null);

export default function AudioContextProvider() {
  const audioContextRef = useRef<AudioContext>(null);
  if (audioContextRef.current === null) {
    audioContextRef.current = new AudioContext();
  }
  const { samplePack, isPending } = useSamplePack(audioContextRef.current);

  return <SamplePackContext.Provider value={null}></SamplePackContext.Provider>;
}
