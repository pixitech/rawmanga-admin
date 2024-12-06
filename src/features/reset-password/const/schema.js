import { trimString } from "@/utils/common";
import { z } from "zod";

const passwordRegex = new RegExp(
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?^+$%"&()^_!&"-])[A-Za-z\d@$!%*#?^+$%"&()^_!&"-]{8,}$/
);

export const schemaResetPassword = z
	.object({
		otp: z.string().min(1, "Vui lòng nhập mã otp!"),
		password: z.preprocess(
			trimString,
			z
				.string()
				.regex(
					passwordRegex,
					"Vui lòng nhập tối thiểu tám ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
				)
		),
		confirmPassword: z.preprocess(
			trimString,
			z
				.string()
				.regex(
					passwordRegex,
					"Vui lòng nhập tối thiểu tám ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
				)
		),
	})
	.refine(
		(data) => {
			if (data.confirmPassword && data.password) {
				return data.confirmPassword === data.password;
			}
			return true;
		},
		{
			path: ["confirmPassword"],
			message: "Mật khẩu xác nhận phải giống mật khẩu đã nhập",
		}
	);
