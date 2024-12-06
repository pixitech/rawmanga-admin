const storagePrefix = "FAFI_";

export const storage = {
	getUser: () => {
		if (!window.localStorage.getItem(`${storagePrefix}user`)) return undefined;
		return JSON.parse(window.localStorage.getItem(`${storagePrefix}user`));
	},
	setUser: (user) => {
		window.localStorage.setItem(`${storagePrefix}user`, JSON.stringify(user));
	},
	getVerifyToken: () => {
		if (!window.localStorage.getItem(`${storagePrefix}verify_token`)) {
			return null;
		}
		return JSON.parse(window.localStorage.getItem(`${storagePrefix}verify_token`));
	},
	clearVerifyToken: () => {
		window.localStorage.removeItem(`${storagePrefix}verify_token`);
	},
	setVerifyToken: (token) => {
		window.localStorage.setItem(`${storagePrefix}verify_token`, JSON.stringify(token));
		window.dispatchEvent(new Event("storage"));
	},
	getToken: () => {
		if (!window.localStorage.getItem(`${storagePrefix}token`)) {
			return null;
		}
		return JSON.parse(window.localStorage.getItem(`${storagePrefix}token`));
	},
	setToken: (token) => {
		window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
		window.dispatchEvent(new Event("storage"));
	},
	getRefreshToken: () => {
		if (!window.localStorage.getItem(`${storagePrefix}refresh_token`)) return undefined;
		return JSON.parse(window.localStorage.getItem(`${storagePrefix}refresh_token`));
	},
	setRefreshToken: (refreshToken) => {
		window.localStorage.setItem(`${storagePrefix}refresh_token`, JSON.stringify(refreshToken));

		window.dispatchEvent(new Event("storage"));
	},
	getHistorySearch: () => {
		if (!window.localStorage.getItem(`${storagePrefix}search`)) {
			return [];
		}
		return JSON.parse(window.localStorage.getItem(`${storagePrefix}search`));
	},
	setHistorySearch: (history) => {
		window.localStorage.setItem(`${storagePrefix}search`, JSON.stringify(history));
	},
	clearToken: () => {
		window.localStorage.removeItem(`${storagePrefix}user`);
		window.localStorage.removeItem(`${storagePrefix}token`);
	},
	setSessionStorage: (token, value) => {
		window.sessionStorage.setItem(`${storagePrefix}_${token}`, value);
		window.dispatchEvent(new Event("storage"));
	},
	clearSessionStore: (token) => {
		window.sessionStorage.removeItem(`${storagePrefix}_${token}`);
	},
	getSessionStorage: (token) => {
		return window.sessionStorage.getItem(`${storagePrefix}_${token}`);
	},
	removeKey: (key) => {
		window.localStorage.removeItem(key);
	},
	getKey: (key) => {
		window.localStorage.getItem(key);
	},
	setData: (key, data) => {
		window.localStorage.setItem(`${storagePrefix}_${key}`, data);
	},
	getData: (key) => window.localStorage.getItem(`${storagePrefix}_${key}`),
	removeData: (key) => window.localStorage.removeItem(`${storagePrefix}_${key}`),
	getBreadcrumbs: () => {
		if (!window.localStorage.getItem(`${storagePrefix}_breadcrumbs`)) return undefined;
		return JSON.parse(window.localStorage.getItem(`${storagePrefix}_breadcrumbs`));
	},
	setBreadcrumbs: (breadcrumbs) => {
		window.localStorage.setItem(`${storagePrefix}_breadcrumbs`, JSON.stringify(breadcrumbs));
	},
	setUserLogin: (token) => {
		window.localStorage.setItem(`${storagePrefix}userLogin`, JSON.stringify(token));
		window.dispatchEvent(new Event("storage"));
	},
	getUserLogin: () => {
		if (!window.localStorage.getItem(`${storagePrefix}userLogin`)) return undefined;
		return JSON.parse(window.localStorage.getItem(`${storagePrefix}userLogin`));
	},

	getEmail: () => {
		if (!window.localStorage.getItem(`${storagePrefix}_Email`)) {
			return null;
		}
		return JSON.parse(window.localStorage.getItem(`${storagePrefix}_Email`));
	},
	setEmail: (token) => {
		window.localStorage.setItem(`${storagePrefix}_Email`, JSON.stringify(token));
		window.dispatchEvent(new Event("storage"));
	},
};
