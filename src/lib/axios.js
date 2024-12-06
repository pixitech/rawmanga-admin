import { ERR_BAD_RESPONSE_CODE, NOT_AUTHORIZED_CODE } from "@/constant";
import { Environment } from "@/utils";
import { storage } from "@/utils/storage";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import axios from "axios";

const authRequestInterceptor = async (config) => {
	// const token = storage.getToken();
	const cognitoTokens = (await fetchAuthSession()).tokens;
	let token = cognitoTokens?.accessToken?.toString();
	if (token) {
		config.headers.authorization = `Bearer ${token}`;
	}

	config.headers.Accept = "application/json; charset=utf-8";
	config.params = {
		...config.params,
	};
	return config;
};

const authRequestInterceptorUploadImage = async (config) => {
	// const token = storage.getToken();
	const cognitoTokens = (await fetchAuthSession()).tokens;
	let token = cognitoTokens?.accessToken?.toString();
	config.headers = { "content-type": "multipart/form-data" };
	if (token) {
		config.headers.authorization = `Bearer ${token}`;
	}
	config.params = {
		...config.params,
	};
	return config;
};

const authResponseInterceptor = async (response) => {
	if (response.status === NOT_AUTHORIZED_CODE) {
		// Logout
		await signOut();
		storage.clearToken();
		window.location.reload();
	}
	return response?.data?.data || response?.data;
};

const createAxiosService = (url) => {
	const axiosInstance = axios.create({
		baseURL: url,
	});
	axiosInstance.interceptors.request.use(authRequestInterceptor);
	axiosInstance.interceptors.response.use(authResponseInterceptor, async (error) => {
		if (error?.response?.status === ERR_BAD_RESPONSE_CODE) {
			try {
				console.log("refresh token");
				const cognitoTokens = (await fetchAuthSession()).tokens;
				let token = cognitoTokens?.idToken?.toString();
				storage.setToken(token ?? null);
				axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
				return axiosInstance;
			} catch (e) {
				await signOut();
				storage.clearToken();
				return Promise.reject(e?.response?.data ? e?.response?.data : e);
			}
		}
		return Promise.reject(error);
	});
	return axiosInstance;
};
const createAxiosServiceAvatar = (url) => {
	const axiosInstance = axios.create({
		baseURL: url,
	});

	axiosInstance.interceptors.request.use(authRequestInterceptorUploadImage);
	axiosInstance.interceptors.response.use(authResponseInterceptor, async (error) => {
		if (error?.response?.status === ERR_BAD_RESPONSE_CODE) {
			try {
				console.log("refresh token");
				const cognitoTokens = (await fetchAuthSession()).tokens;
				let token = cognitoTokens?.idToken?.toString();
				storage.setToken(token ?? null);
				axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
				return axiosInstance;
			} catch (e) {
				await signOut();
				storage.clearToken();
				return Promise.reject(e?.response?.data ? e?.response?.data : e);
			}
		}
		return Promise.reject(error);
	});

	return axiosInstance;
};

export let baseServiceAvatar = createAxiosServiceAvatar(Environment?.baseUrl);
export let baseService = createAxiosService(Environment?.baseUrl);
export let productService = createAxiosService(Environment?.serviceUrl);
