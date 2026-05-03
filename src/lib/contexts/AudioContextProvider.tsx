import { createContext, ReactNode, useContext, useRef } from "react";
import { CHANNEL_COUNT, MASTER_SLOT } from "../constants";

type AudioContextValue = {
  audioContext: AudioContext;
  gainNodes: GainNode[];
};

const AudioContext = createContext<AudioContextValue | null>(null);

function initGainNodes(ctx: AudioContext): GainNode[] {
  const nodes = Array.from({ length: CHANNEL_COUNT }, () => ctx.createGain());
  const masterNode = nodes[MASTER_SLOT];
  masterNode.connect(ctx.destination);
  for (let i = 0; i < MASTER_SLOT; i++) {
    nodes[i].connect(masterNode);
  }
  return nodes;
}

export default function AudioContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodesRef = useRef<GainNode[] | null>(null);

  if (!audioContextRef.current) {
    audioContextRef.current = new window.AudioContext();
    gainNodesRef.current = initGainNodes(audioContextRef.current);
  }

  return (
    <AudioContext.Provider
      value={{
        audioContext: audioContextRef.current,
        gainNodes: gainNodesRef.current!,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudioContext() {
  const ctx = useContext(AudioContext);
  if (!ctx)
    throw new Error("useAudioContext must be used within AudioContextProvider");
  return ctx;
}
