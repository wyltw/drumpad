export type KitPad = {
  id: number;
  kitId: number;
  sampleName: string;
  label: string;
  slot: number;
  arrayBuffer: ArrayBuffer;
};

export type Kit = {
  id: number;
  name: string;
};

export type KitWithPads = Kit & { pads: KitPad[] };
