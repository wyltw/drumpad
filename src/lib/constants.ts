const soundModules = import.meta.glob("../assets/sounds/**/*.{WAV,wav}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export const HOUSE_KIT = [
  {
    sampleName: "kick",
    source: soundModules["../assets/sounds/909s/kick.WAV"],
  },
  {
    sampleName: "snare",
    source: soundModules["../assets/sounds/909s/snare.WAV"],
  },
  {
    sampleName: "clap",
    source: soundModules["../assets/sounds/909s/clap.WAV"],
  },
  {
    sampleName: "tom",
    source: soundModules["../assets/sounds/909s/tom.WAV"],
  },
  {
    sampleName: "closed_hat",
    source: soundModules["../assets/sounds/909s/closed_hat.WAV"],
  },
  {
    sampleName: "opened_hat",
    source: soundModules["../assets/sounds/909s/opened_hat.WAV"],
  },
  {
    sampleName: "rimshot",
    source: soundModules["../assets/sounds/909s/rimshot.WAV"],
  },
  {
    sampleName: "ride",
    source: soundModules["../assets/sounds/909s/ride.WAV"],
  },
  {
    sampleName: "crash",
    source: soundModules["../assets/sounds/909s/crash.WAV"],
  },
];

export const JAZZ_KIT = [
  {
    sampleName: "kick",
    source: soundModules["../assets/sounds/jazz-funk-kit/kick.wav"],
  },
  {
    sampleName: "bop-kick",
    source: soundModules["../assets/sounds/jazz-funk-kit/bop-kick.wav"],
  },
  {
    sampleName: "snare",
    source: soundModules["../assets/sounds/jazz-funk-kit/snare.wav"],
  },
  {
    sampleName: "hihat-closed",
    source: soundModules["../assets/sounds/jazz-funk-kit/hihat-closed.wav"],
  },
  {
    sampleName: "hihat-opened",
    source: soundModules["../assets/sounds/jazz-funk-kit/hihat-opened.wav"],
  },
  {
    sampleName: "rimshot",
    source: soundModules["../assets/sounds/jazz-funk-kit/rimshot.wav"],
  },
  {
    sampleName: "stickshot",
    source: soundModules["../assets/sounds/jazz-funk-kit/stickshot.wav"],
  },
  {
    sampleName: "ride",
    source: soundModules["../assets/sounds/jazz-funk-kit/ride.wav"],
  },
  {
    sampleName: "floor-tom",
    source: soundModules["../assets/sounds/jazz-funk-kit/floor-tom.wav"],
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

export const EMPTY_PADS = Array.from({ length: 9 }, (_, i) => ({
  slot: i,
}));
