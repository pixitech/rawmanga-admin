import {
	getContactList,
	getFilmById,
	getFilmByOneId,
	getFilmPublicByOneId,
	getImageById,
	getMappingById,
	getMappingFilmById,
	getMappingList,
	getMoviesById,
	getMoviesList,
	uploadBanner,
} from "@/actions";
import { storage } from "@/utils";
import { useMutation, useQuery } from "react-query";

export const useGetMoviesList = ({
	pageSize,
	page,
	status,
	group,
	keyword,
	typeSearch,
	mapping_status,
	review_status,
}) => {
	const token = storage.getToken();
	return useQuery({
		queryKey: ["useGetMoviesList", pageSize, page, status, group, keyword, typeSearch, mapping_status, review_status],
		queryFn: () =>
			getMoviesList({
				pageSize,
				page,
				status,
				group,
				keyword,
				typeSearch,
				mapping_status,
				review_status,
			}),
		enabled: !!token && review_status !== "done",
	});
};
export const useGetMoviesMappingList = ({
	pageSize,
	page,
	status,
	group,
	keyword,
	typeSearch,
	mapping_status,
	review_status,
}) => {
	const token = storage.getToken();
	return useQuery({
		queryKey: [
			"useGetMoviesMappingList",
			pageSize,
			page,
			status,
			group,
			keyword,
			typeSearch,
			mapping_status,
			review_status,
		],
		queryFn: () =>
			getMappingList({
				pageSize,
				page,
				status,
				group,
				keyword,
				typeSearch,
			}),
		enabled: !!token && review_status === "done",
	});
};
export const useGetMappingList = ({ pageSize, page, status, group, keyword, typeSearch }) => {
	const token = storage.getToken();
	return useQuery({
		queryKey: ["useGetMappingList", pageSize, page, status, group, keyword, typeSearch],
		queryFn: () =>
			getMappingList({
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

export const useGetMovies = (id) => {
	return useQuery({
		queryKey: ["useGetMovies", id],
		queryFn: () => getMoviesById({ id }),
		// onSuccess: () => { },
		// onError: () => { },
		enabled: !!id,
	});
};
export const useGetMappingById = (id) => {
	return useQuery({
		queryKey: ["useGetMappingById", id],
		queryFn: () => getMappingById({ id }),
		// onSuccess: () => { },
		// onError: () => { },
		enabled: !!id,
	});
};
export const useGetFilm = (id) => {
	return useQuery({
		queryKey: ["useGetFilm", id],
		queryFn: () => getFilmById({ id }),
		// onSuccess: () => { },
		// onError: () => { },
		enabled: !!id,
	});
};

export const useGetFilmById = (id) => {
	return useQuery({
		queryKey: ["useGetFilmById", id],
		queryFn: () => getFilmByOneId({ id }),
		// onSuccess: () => { },
		// onError: () => { },
		enabled: !!id,
	});
};

export const useGetMappingFilmById = ({ pageSize, page, id }) => {
	return useQuery({
		queryKey: ["useGetMappingFilmById", pageSize, page, id],
		queryFn: () =>
			getMappingFilmById({
				pageSize,
				page,
				id,
			}),
		enabled: !!id,
	});
};

export const useGetImage = (id) => {
	return useQuery({
		queryKey: ["useGetImage", id],
		queryFn: () => getImageById({ id }),
		enabled: !!id,
	});
};

export const useGetContactList = ({ pageSize, page, status, group, keyword, typeSearch }) => {
	const token = storage.getToken();
	return useQuery({
		queryKey: ["useGetContactList", pageSize, page, status, group, keyword, typeSearch],
		queryFn: () =>
			getContactList({
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

export const useGetFilmPublicByOneId = (id) => {
	return useQuery({
		queryKey: ["useGetFilmPublicByOneId", id],
		queryFn: () => getFilmPublicByOneId({ id }),
		enabled: !!id,
	});
};
export const useUploadBanner = (config = {}) => {
	return useMutation({
		...config,
		mutationFn: uploadBanner,
	});
};
