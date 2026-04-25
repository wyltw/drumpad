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

export const MASTER_SLOT = 9;

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
