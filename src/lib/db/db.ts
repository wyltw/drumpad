import Dexie, { type EntityTable } from "dexie";
import { Kit } from "../types/kit";

type DrumpadDatabase = Dexie & {
  kit: EntityTable<Kit, "id">;
};

export const db = new Dexie("drumpad") as DrumpadDatabase;

db.version(1).stores({
  kit: "++id,&name",
});
