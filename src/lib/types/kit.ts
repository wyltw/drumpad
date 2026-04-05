import { z } from "zod";

export const kitPadSchema = z.object({
  id: z.uuid(),
  sampleName: z.string(),
  label: z.string(),
  order: z.number(),
  arrayBuffer: z.instanceof(ArrayBuffer),
});

export const kitSchema = z.object({
  id: z.number(),
  name: z.string(),
  pads: z.array(kitPadSchema),
});

export type KitPad = z.infer<typeof kitPadSchema>;
export type Kit = z.infer<typeof kitSchema>;
export type LastSelectedKit = Omit<Kit, "pads">;
