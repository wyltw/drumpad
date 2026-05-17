export const HOUSE_KIT = [
  {
    sampleName: "kick",
    source: new URL("../assets/sounds/909s/kick.WAV", import.meta.url).href,
  },
  {
    sampleName: "snare",
    source: new URL("../assets/sounds/909s/snare.WAV", import.meta.url).href,
  },
  {
    sampleName: "clap",
    source: new URL("../assets/sounds/909s/clap.WAV", import.meta.url).href,
  },
  {
    sampleName: "tom",
    source: new URL("../assets/sounds/909s/tom.WAV", import.meta.url).href,
  },
  {
    sampleName: "closed_hat",
    source: new URL("../assets/sounds/909s/closed_hat.WAV", import.meta.url)
      .href,
  },
  {
    sampleName: "opened_hat",
    source: new URL("../assets/sounds/909s/opened_hat.WAV", import.meta.url)
      .href,
  },
  {
    sampleName: "rimshot",
    source: new URL("../assets/sounds/909s/rimshot.WAV", import.meta.url).href,
  },
  {
    sampleName: "ride",
    source: new URL("../assets/sounds/909s/ride.WAV", import.meta.url).href,
  },
  {
    sampleName: "crash",
    source: new URL("../assets/sounds/909s/crash.WAV", import.meta.url).href,
  },
];

export const DEFAULT_VOLUME = 1;

export const MASTER_SLOT = 9;
export const CHANNEL_COUNT = MASTER_SLOT + 1;

export const KEYBIND: Record<number, string[]> = {
  0: ["Numpad7", "KeyQ"],
  1: ["Numpad8", "KeyW"],
  2: ["Numpad9", "KeyE"],
  3: ["Numpad4", "KeyA"],
  4: ["Numpad5", "KeyS"],
  5: ["Numpad6", "KeyD"],
  6: ["Numpad1", "KeyZ"],
  7: ["Numpad2", "KeyX"],
  8: ["Numpad3", "KeyC"],
};

export const SAMPLE_FILE_TYPES = ["audio/mpeg", "audio/wav"];
