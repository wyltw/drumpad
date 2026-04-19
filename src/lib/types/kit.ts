import { z } from "zod";

export const kitPadSchema = z.object({
  id: z.number(),
  kitId: z.number(),
  sampleName: z.string(),
  label: z.string(),
  slot: z.number(),
  arrayBuffer: z.instanceof(ArrayBuffer),
});

export const kitSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type KitPad = z.infer<typeof kitPadSchema>;
export type Kit = z.infer<typeof kitSchema>;
export type KitWithPads = Kit & { pads: KitPad[] };
