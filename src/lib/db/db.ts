import Dexie, { type EntityTable } from "dexie";
import { Kit, KitPad } from "../types/kit";

type DrumpadDatabase = Dexie & {
  kits: EntityTable<Kit, "id">;
  pads: EntityTable<KitPad, "id">;
};

export const db = new Dexie("drumpad") as DrumpadDatabase;

db.version(1).stores({
  kits: "++id,&name",
  pads: "++id,kitId,&[kitId+slot]",
});
