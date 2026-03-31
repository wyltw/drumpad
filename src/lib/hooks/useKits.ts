import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";

export const useKits = () => {
  const kits = useLiveQuery(() => db.kit.toArray());
  const kitOptions = kits?.map(({ id, name }) => ({ id, name })) || [];

  return { kitOptions };
};

export const useKit = (selectedKitId: number) => {
  const kit = useLiveQuery(async () => db.kit.get(selectedKitId));
  return { kit };
};
