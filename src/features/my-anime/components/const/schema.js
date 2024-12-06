import { z } from "zod";

const phoneRegex = new RegExp(/^[0-9]{7,15}$/);
const passwordRegex = new RegExp(
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?^+$%"&()^_!&"-])[A-Za-z\d@$!%*#?^+$%"&()^_!&"-]{8,}$/
);
const userNameRegex = new RegExp(/^[a-z0-9_.]+$/);

export const schemaForm = z
	.object({
		name: z.string({ required_error: "Vui lòng nhập tên!" }).min(1, "Vui lòng nhập tên!"),
		user_name: z
			.string({ required_error: "Vui lòng nhập tên đăng nhập!" })
			.min(1, "Vui lòng nhập tên đăng nhập!")
			.regex(
				userNameRegex,
				"Tên đăng nhập không dấu, không chứa dấu cách, không có chữ hoa, không có kí tự đặc biệt ngoại trừ _."
			),
		password: z
			.string()
			.regex(
				passwordRegex,
				"Vui lòng nhập tối thiểu tám ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
			),
		confirmPassword: z
			.string()
			.regex(
				passwordRegex,
				"Vui lòng nhập tối thiểu tám ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
			),
		phone: z.string().regex(phoneRegex, "Số điện thoại cần là chữ số có từ 7-15 kí tự!").optional().or(z.literal("")),
		email: z.string().email("Email không hợp lệ!"),
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

export const schemaForm2 = z.object({
	name: z.string({ required_error: "Vui lòng nhập tên!" }).min(1, "Vui lòng nhập tên!"),
	user_name: z
		.string({ required_error: "Vui lòng nhập tên đăng nhập!" })
		.min(1, "Vui lòng nhập tên đăng nhập!")
		.regex(
			userNameRegex,
			"Tên đăng nhập không dấu, không chứa dấu cách, không có chữ hoa, không có kí tự đặc biệt ngoại trừ _."
		),
	phone: z.string().regex(phoneRegex, "Số điện thoại cần là chữ số có từ 7-15 kí tự!").optional().or(z.literal("")),
	email: z.string().email("Email không hợp lệ!"),
});

export const schemaForm3 = z
	.object({
		password: z
			.string()
			.regex(
				passwordRegex,
				"Vui lòng nhập tối thiểu tám ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
			),
		confirmPassword: z
			.string()
			.regex(
				passwordRegex,
				"Vui lòng nhập tối thiểu tám ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
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
