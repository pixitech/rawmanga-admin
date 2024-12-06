import { logoutMutationFn } from "@/actions";
import { ERROR_MESSAGE } from "@/constant";

export const getMessage = (value, messageValue) => {
	if (!value) {
		return "Đã xảy ra sự cố";
	}
	let message = ERROR_MESSAGE[value];
	if (message) {
		return message;
	}

	if (value === "User does not exist.") {
		return "Người dùng không tồn tại.";
	}

	if (value === "UserNotFoundException") {
		if (value === "User does not exist.") {
			return "Tài khoản không tồn tại";
		}
		return "Không tìm thấy Email";
	}

	if (value === "LimitExceededException") {
		return "Đã vượt quá giới hạn số lần thử, vui lòng thử lại sau một thời gian.";
	}

	if (value === "CodeMismatchException") {
		return "Mã xác minh được cung cấp không hợp lệ, vui lòng thử lại.";
	}

	if (value === "NotAuthorizedException") {
		if (messageValue === "Incorrect username or password.") {
			return "Email hoặc mật khẩu không đúng";
		}
		return "Tài khoản đã bị khóa";
	}

	if (value === "InvalidParameterException") {
		return "Mã xác minh không hợp lệ";
	}

	if (value === "CodeMismatchException") {
		if (messageValue === "Invalid verification code provided, please try again.") {
			return "Mã xác minh được cung cấp không hợp lệ, vui lòng thử lại.";
		}
		return "Mã xác minh không hợp lệ, vui lòng thử lại.";
	}
	if (value === "ExpiredCodeException") {
		if (messageValue === "Invalid code provided, please request a code again.") {
			return "Mã được cung cấp không hợp lệ, vui lòng yêu cầu lại mã.";
		}
		return messageValue;
	}
	if (value === "UserAlreadyAuthenticatedException") {
		logoutMutationFn();
		return "Đăng nhập bị lỗi vui lòng thử lại";
	}

	return value;
};
