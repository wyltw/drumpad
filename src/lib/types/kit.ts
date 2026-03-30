import { z } from "zod";

export const kitPadSchema = z.object({
  id: z.uuid(),
  sampleName: z.string(),
  order: z.number(),
  arrayBuffer: z.instanceof(ArrayBuffer),
});

export const kitSchema = z.object({
  id: z.number(),
  name: z.string(),
  pads: z.array(kitPadSchema),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export type KitPad = z.infer<typeof kitPadSchema>;
export type Kit = z.infer<typeof kitSchema>;
