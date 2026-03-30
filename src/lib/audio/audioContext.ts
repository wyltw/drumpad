let audioContext: AudioContext | null = null;

export const getAudioContext = () => {
  if (audioContext === null) {
    audioContext = new AudioContext();
  }

  return audioContext;
};

export const ensureAudioContextReady = async () => {
  const context = getAudioContext();

  if (context.state === "suspended") {
    await context.resume();
  }

  return context;
};
