import { db } from "../db/db";
import { handleError } from "../utils/utils";
import { KitPad } from "../types/kit";

export const updatePad = async (
  id: number,
  fields: Partial<KitPad>,
): Promise<string | undefined> => {
  try {
    await db.pads.update(id, fields);
  } catch (error) {
    return handleError(error);
  }
};

export const updatePadLabel = async (
  id: number,
  label: string,
): Promise<string | undefined> => {
  try {
    await db.pads.update(id, { label });
  } catch (error) {
    return handleError(error);
  }
};
