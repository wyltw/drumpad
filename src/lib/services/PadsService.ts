import { db } from "../db/db";
import { handleError } from "../utils/utils";

export const updatePadLabel = async (
  id: string,
  label: string,
): Promise<string | undefined> => {
  try {
    await db.pads.update(id, { label });
  } catch (error) {
    return handleError(error);
  }
};
