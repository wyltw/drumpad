import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";

export const useKits = () => {
  const kits = useLiveQuery(async () => {
    const kitsCount = await db.kits.count();
    if (kitsCount > 0) return await db.kits.toArray();
  });
  const kitOptions = kits?.map(({ id, name }) => ({ id, name })) || [];

  return { kitOptions };
};

export const useKit = (selectedKitId: number | undefined) => {
  const kit = useLiveQuery(async () => {
    if (!selectedKitId) return undefined;
    return await db.kits.get(selectedKitId);
  }, [selectedKitId]);
  return { kit };
};
