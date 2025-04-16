import { FieldNotNullMessage } from "./schema";
import { z } from "zod";

export const storeSchema = z.object({
  productID: z
    .string()
    .min(1, FieldNotNullMessage)
    .transform((val) => Number(val)),

  sizeID: z
    .string()
    .min(1, FieldNotNullMessage)
    .transform((val) => Number(val)),

  branchID: z
    .string()
    .min(1, FieldNotNullMessage)
    .transform((val) => Number(val)),
});
