const audioContext = new AudioContext();

const arrayBuffer = async (url: string) => {
  const sound = await fetch(url);
  const arrayBuffer = await sound.arrayBuffer();
  return audioContext.decodeAudioData(arrayBuffer);
};

export const playback = async () => {
  const playSound = audioContext.createBufferSource();
  playSound.buffer = await arrayBuffer("./src/assets/sounds/909s/kick.wav");
  playSound.connect(audioContext.destination);
  playSound.start(audioContext.currentTime);
};
