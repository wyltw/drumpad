import { useLiveQuery } from "dexie-react-hooks";
import { getKit, listKits } from "../services/KitsService";

export const useKits = () => {
  const kits = useLiveQuery(async () => {
    return listKits();
  });

  const kitsOptions = kits?.map(({ id, name }) => ({ id, name })) || [];

  return { kitsOptions };
};

export const useKit = (selectedKitId: number | undefined) => {
  const kit = useLiveQuery(async () => {
    if (!selectedKitId) return undefined;
    return getKit(selectedKitId);
  }, [selectedKitId]);

  return { kit };
};
