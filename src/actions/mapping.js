import { baseService } from "@/lib/axios";
import MySnackBar from "@/utils/snackbar";

export const updateMapping = async (payload) => {
	try {
		const value = await baseService.post(`/film-mappings/create/manual`, payload);
		return value;
	} catch (error) {
		console.log("error.......", error);
		MySnackBar.error({ message: error?.data?.message });
		return {
			status: 400,
			message: error?.data?.message,
		};
	}
};

export const rejectMapping = async (payload) => {
	try {
		const value = await baseService.post(`/film-mappings/reject`, payload);
		return value;
	} catch (error) {
		console.log("error.......", error);
		MySnackBar.error({ message: error?.data?.message });
		return {
			status: 400,
			message: error?.data?.message,
		};
	}
};
