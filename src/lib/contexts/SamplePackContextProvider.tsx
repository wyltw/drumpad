import { createContext, useEffect, useRef } from "react";
import { Kit } from "../types";
import { getArrayBuffer, getSampleArrayBuffer } from "../utils/utils";
import { buffer } from "stream/consumers";
import { HOUSE_KIT } from "../constants";

const SamplePackContext = createContext(null);

export default function AudioContextProvider() {
  const audioContextRef = useRef<AudioContext>(null);
  const getAudioData = (sources: Kit[]) =>
    sources.map((source) => ({
      sampleName: source.name,
      buffer: getArrayBuffer(source.source),
    }));
  const result = Promise.all(getAudioData(HOUSE_KIT));

  useEffect(() => {
    if (audioContextRef.current) return;
    audioContextRef.current = new AudioContext();
  }, []);
  return <SamplePackContext.Provider value={null}></SamplePackContext.Provider>;
}
