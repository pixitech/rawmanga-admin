import { trimString } from "@/utils/common";
import { z } from "zod";

export const schemaForgotPassword = z.object({
	email: z.preprocess(trimString, z.string().email("Email không hợp lệ")),
});
