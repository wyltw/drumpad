const audioContext = new AudioContext();

export const arrayBuffer = async (url: string) => {
  const sound = await fetch(url);
  const arrayBuffer = await sound.arrayBuffer();
  return audioContext.decodeAudioData(arrayBuffer);
};

const playback = async () => {
  const playSound = audioContext.createBufferSource();
  playSound.buffer = await arrayBuffer("");
};
