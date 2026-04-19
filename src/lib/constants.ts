export const HOUSE_KIT = [
  { sampleName: "kick", source: "./src/assets/sounds/909s/kick.wav" },
  { sampleName: "snare", source: "./src/assets/sounds/909s/snare.wav" },
  { sampleName: "clap", source: "./src/assets/sounds/909s/clap.wav" },
  { sampleName: "tom", source: "./src/assets/sounds/909s/tom.wav" },
  {
    sampleName: "closed_hat",
    source: "./src/assets/sounds/909s/closed_hat.wav",
  },
  {
    sampleName: "opened_hat",
    source: "./src/assets/sounds/909s/opened_hat.wav",
  },
  { sampleName: "rimshot", source: "./src/assets/sounds/909s/rimshot.wav" },
  { sampleName: "ride", source: "./src/assets/sounds/909s/ride.wav" },
  { sampleName: "crash", source: "./src/assets/sounds/909s/crash.wav" },
];

export const KEYBIND: Record<number, string[]> = {
  1: ["Numpad7", "KeyQ"],
  2: ["Numpad8", "KeyW"],
  3: ["Numpad9", "KeyE"],
  4: ["Numpad4", "KeyA"],
  5: ["Numpad5", "KeyS"],
  6: ["Numpad6", "KeyD"],
  7: ["Numpad1", "KeyZ"],
  8: ["Numpad2", "KeyX"],
  9: ["Numpad3", "KeyC"],
};

export const SAMPLE_FILE_TYPES = ["audio/mpeg", "audio/wav"];
