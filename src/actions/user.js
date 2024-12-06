import { STATUS_ENUM } from "@/constant/title";
import { baseService } from "@/lib/axios";
import { getMessage, storage } from "@/utils";
import {
	confirmResetPassword,
	fetchAuthSession,
	getCurrentUser,
	resetPassword,
	signIn,
	signOut,
} from "aws-amplify/auth";
import axios from "axios";
export const loginMutationFn = async (user) => {
	try {
		// const { nextStep } = await signIn({
		// 	username: user?.email,
		// 	password: user?.password,
		// 	options: {
		// 		authFlowType: "USER_PASSWORD_AUTH",
		// 	},
		// });
		let resultData = {};

		// if (nextStep) {
		// const data = await getCurrentUser();
		// const cognitoTokens = (await fetchAuthSession()).tokens;
		// let rawToken = cognitoTokens?.idToken?.toString();
		// let rawAccessToken = cognitoTokens?.accessToken?.toString();
		let data = {};
		let rawToken = "tokentesst";
		let rawAccessToken = "tokentesst";
		resultData = {
			data: {
				AccessToken: rawAccessToken,
				IdToken: rawToken,
				user: data,
			},
			status: 200,
		};
		return resultData;
		// }
		// return {
		// 	status: 400,
		// 	message: "Email hoặc mật khẩu không đúng",
		// };
	} catch (error) {
		console.log("error.......", error);
		let message = getMessage(error?.name, error?.message);
		return {
			status: 400,
			message: message,
		};
	}
};

export const logoutMutationFn = async () => {
	await signOut();
	return;
};

/**
 * @requestResetPassword
 * @created by falcon at 10/10/2023
 * @dev it's using to request reset password for user
 * @params email { string }
 * @return { object }
 *      * token { string }
 */
export const requestResetPassword = async ({ email }) => {
	try {
		const data = await resetPassword({ username: email });
		handleResetPasswordNextSteps(data, email);
		return {
			status: 200,
		};
	} catch (error) {
		console.log(".........", error);
		let message = getMessage(error?.name, error?.message);
		return {
			status: 400,
			message: message,
		};
	}
};

const handleResetPasswordNextSteps = (output, email) => {
	const { nextStep } = output;
	storage.setEmail(email);
	switch (nextStep.resetPasswordStep) {
		case "CONFIRM_RESET_PASSWORD_WITH_CODE":
			const codeDeliveryDetails = nextStep.codeDeliveryDetails;
			// Collect the confirmation code from the user and pass to confirmResetPassword.
			console.log(`Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`);
			break;
		case "DONE":
			console.log("Successfully reset password.");
			break;
	}
};

export const confirmResetPasswordApi = async ({ email, newPassword, confirmationCode }) => {
	try {
		await confirmResetPassword({ username: email, confirmationCode: confirmationCode, newPassword: newPassword });
		return {
			status: 200,
		};
	} catch (error) {
		console.log(error);
		let message = getMessage(error?.name, error?.message);
		return {
			status: 400,
			message: message,
		};
	}
};

export const changePassword = ({ newPassword, oldPassword }) => {
	return;
};

export const getUserProfileQueryFn = async () => {
	// let output = await baseService.get(`/users/profile`);
	let output = {
		_id: "test",
		name: "test",
		status: STATUS_ENUM?.ACTIVE,
		phone: "test",
		group: "test",
		email: "test",
		avatarURL: "/rawmanga-fav.png",
		avatar: "/rawmanga-fav.png",
	};
	if (output?._id) {
		return {
			user: {
				id: output?._id,
				name: output?.name,
				status: output?.status,
				phone: output?.phone,
				group: output?.group,
				email: output?.email,
				avatar: output?.avatarURL ?? output?.avatar,
			},
		};
	}
	return { user: null };
};

export const getUserList = async ({ pageSize, page, status, group, keyword, typeSearch }) => {
	let input = {
		limit: pageSize,
		page,
		status,
		group,
		keyword,
	};
	if (typeSearch) {
		input.typeSearch = typeSearch;
	}
	// let output = await baseService.get(`/users`, {
	// 	params: input,
	// });
	let output = {};
	return output;
};

export const createUser = async (payload) => {
	// await baseService.post(`/users`, payload);
};

export const getUserById = async ({ id }) => {
	// let output = await baseService.get(`/users/${id}`);
	let output = {};
	return output;
};

export const updateUserById = async (payload) => {
	// let output = await baseService.put(`/users/${payload?._id}`, payload);
	let output = {};
	return output;
};

export const delUserById = async ({ id }) => {
	// let output = await baseService.delete(`/users/${id}`);
	let output = {};
	return output;
};

export const getImageList = async (payload) => {
	// let output = await baseService.get(`/pub/images`, {
	// 	params: payload,
	// });
	let output = {};
	return output;
};

export const updateAvatar = async (payload) => {
	// let output = await baseService.post(`/upload-url`, payload);
	let output = {};
	return output;
};

const getFileBuffer = async (file) => {
	return await new Promise((resolve) => {
		let reader = new FileReader();
		reader.onload = (e) => {
			resolve(e.target.result);
		};
		reader.readAsArrayBuffer(file);
	});
};

export const putS3File = async (file, uri, fileUrl) => {
	const fs = await getFileBuffer(file);
	if (fs) {
		return axios
			.put(uri, fs, {
				headers: {
					"Content-Type": file.type,
				},
			})
			.then((value) => {
				return {
					status: value.status,
					data: fileUrl,
				};
			})
			.catch((reason) => {
				return {
					status: 500,
					data: null,
				};
			});
	}
	return null;
};

export const updatePassword = async (payload) => {
	// let output = await baseService.put(`/users/change-password/${payload.id}`, {
	// 	pwd: payload?.pwd,
	// 	conf_pwd: payload?.conf_pwd,
	// });
	let output = {};
	return output;
};

export const getStudentsList = async ({ pageSize, page, status, group, keyword, typeSearch, idsToExclude }) => {
	let input = {
		limit: pageSize,
		page,
		status,
		group,
		keyword,
	};
	if (typeSearch) {
		input.typeSearch = typeSearch;
	}
	if (idsToExclude) {
		input._idsToExclude = idsToExclude;
	}
	// let output = await baseService.get(`/users/students`, {
	// 	params: input,
	// });
	let output = {};
	return output;
};
