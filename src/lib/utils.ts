import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const audioContext = new AudioContext();

const arrayBuffer = async (url: string) => {
  const sound = await fetch(url);
  const arrayBuffer = await sound.arrayBuffer();
  return audioContext.decodeAudioData(arrayBuffer);
};

export const playback = async (url: string) => {
  const playSound = audioContext.createBufferSource();
  playSound.buffer = await arrayBuffer(url);
  playSound.connect(audioContext.destination);
  playSound.start(audioContext.currentTime);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
