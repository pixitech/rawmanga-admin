import { z } from "zod";

export const schemaLogin = z.object({
	email: z.string().min(1, "Vui lòng nhập username hoặc email"),
	password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});
