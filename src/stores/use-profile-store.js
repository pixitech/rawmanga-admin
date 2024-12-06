import { storage } from "@/utils";
import { create } from "zustand";

export const useProfileStore = create()((set) => ({
	profile: storage.getUser(),
	preferenceSettings: { isConfiged: false, subjects: [], isLoaded: false },
	setProfile: (profile) => {
		return set({ profile: profile });
	},
}));

export const setProfile = (profile) => {
	return useProfileStore.setState({
		profile,
	});
};
export const setPreferenceSetting = (preferenceSettings) => {
	return useProfileStore.setState({
		preferenceSettings: { ...preferenceSettings, isLoaded: true },
	});
};

export const useBreadcrumbStore = create()((set) => ({
	breadcrumbs: storage.getBreadcrumbs(),
	preferenceSettings: { isConfiged: false, subjects: [], isLoaded: false },
	setBreadcrumbs: (breadcrumbs) => {
		return set({ breadcrumbs: breadcrumbs });
	},
}));

export const setBreadcrumb = (breadcrumbs) => {
	return useBreadcrumbStore.setState({
		breadcrumbs: breadcrumbs ?? [],
	});
};
