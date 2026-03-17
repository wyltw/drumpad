const audioContext = new AudioContext();

export const getArrayBuffer = async (url: string) => {
  const response = await fetch(url);
  return response.arrayBuffer();
};

export const playback = async (url: string) => {
  const playSound = audioContext.createBufferSource();
  playSound.buffer = await arrayBuffer(url);
  playSound.connect(audioContext.destination);
  playSound.start(audioContext.currentTime);
};
