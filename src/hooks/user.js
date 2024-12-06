import {
	changePassword,
	confirmResetPasswordApi,
	createUser,
	delUserById,
	getImageList,
	getStudentsList,
	getUserById,
	getUserList,
	getUserProfileQueryFn,
	loginMutationFn,
	logoutMutationFn,
	requestResetPassword,
	updateAvatar,
	updatePassword,
	updateUserById,
} from "@/actions";
import { STATUS_ENUM } from "@/constant/title";
import { setProfile } from "@/stores";
import { storage } from "@/utils";
import { useMutation, useQuery } from "react-query";

//response {accessToken}
export const useLogin = (config = {}) => {
	return useMutation({
		...config,
		mutationFn: loginMutationFn,
	});
};

export const useRequestResetPassword = (config = {}) => {
	return useMutation({
		...config,
		mutationFn: requestResetPassword,
	});
};

export const useConfirmRestPassword = (config = {}) => {
	return useMutation({
		...config,
		mutationFn: confirmResetPasswordApi,
	});
};

export const useChangePassword = (config = {}) => {
	return useMutation({
		...config,
		mutationFn: changePassword,
	});
};

//response {userData}
export const useGetProfile = () => {
	const token = storage.getToken();
	return useQuery({
		queryKey: ["useGetProfile"],
		queryFn: () => getUserProfileQueryFn(),
		onSuccess: ({ user }) => {
			if (user && user?.status === STATUS_ENUM?.ACTIVE) {
				setProfile(user);
				storage.setUser(user);
			} else {
				logoutMutationFn();
				setProfile(undefined);
				storage.clearToken();
				window.location.href = "/login";
			}
		},
		onError: () => {
			logoutMutationFn();
			setProfile(undefined);
			storage.clearToken();
			window.location.href = "/login";
		},
		enabled: !!token,
	});
};

export const useLogout = () => {
	return useMutation({
		mutationFn: () => {
			logoutMutationFn();
			storage.clearToken();
			setProfile(undefined);
		},
		// onSuccess: (res) => { },
	});
};

export const useGetList = ({ pageSize, page, status, group, keyword, typeSearch }) => {
	const token = storage.getToken();
	return useQuery({
		queryKey: ["useGetList", pageSize, page, status, group, keyword, typeSearch],
		queryFn: () =>
			getUserList({
				pageSize,
				page,
				status,
				group,
				keyword,
				typeSearch,
			}),
		enabled: !!token,
	});
};

export const useCreateUser = (config = {}) => {
	return useMutation({
		...config,
		mutationFn: createUser,
	});
};

export const useGetUser = (id) => {
	return useQuery({
		queryKey: ["useGetUser", id],
		queryFn: () => getUserById({ id }),
		// onSuccess: () => { },
		// onError: () => { },
		enabled: !!id,
	});
};

export const useUpdateUser = (config = {}) => {
	return useMutation({
		...config,
		mutationFn: updateUserById,
	});
};
export const useDeleteUser = (config = {}) => {
	return useMutation({
		...config,
		mutationFn: delUserById,
	});
};
export const useGetImageList = (config = {}) => {
	return useMutation({
		...config,
		mutationFn: getImageList,
	});
};
export const useUpdateAvatar = (config = {}) => {
	return useMutation({
		...config,
		mutationFn: updateAvatar,
	});
};
export const useUpdatePassword = (config = {}) => {
	return useMutation({
		...config,
		mutationFn: updatePassword,
	});
};

export const useGetStudents = ({ pageSize, page, status, group, keyword, typeSearch, idsToExclude }) => {
	const token = storage.getToken();
	return useQuery({
		queryKey: ["useGetStudents", pageSize, page, status, group, keyword, typeSearch, idsToExclude],
		queryFn: () =>
			getStudentsList({
				pageSize,
				page,
				status,
				group,
				keyword,
				typeSearch,
				idsToExclude,
			}),
		enabled: !!token,
	});
};
