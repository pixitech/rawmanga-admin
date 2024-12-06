import { baseService } from "@/lib/axios";

export const getMoviesList = async ({
	pageSize,
	page,
	status,
	group,
	keyword,
	typeSearch,
	mapping_status,
	review_status,
}) => {
	let input = {
		limit: pageSize,
		page,
		status,
		group,
		keyword,
		review_status,
	};
	if (typeSearch) {
		input.typeSearch = typeSearch;
	}
	if (review_status !== "reject" && mapping_status) {
		input.mapping_status = mapping_status;
	}
	if (review_status) {
		input.review_status = review_status;
	}
	let output = await baseService.get(`/films/get-all`, {
		params: input,
	});
	return output;
};

export const getMoviesById = async ({ id }) => {
	let output = await baseService.get(`/films/get-one/${id}`);
	return output;
};

export const getFilmById = async ({ id }) => {
	let output = await baseService.get(`/episodes/film/${id}`);
	return output;
};

export const getFilmByOneId = async ({ id }) => {
	let output = await baseService.get(`/episodes/get-one/${id}`);
	return output;
};

export const getMappingList = async ({ pageSize, page, status, group, keyword, typeSearch, mapping_status }) => {
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
	let output = await baseService.get(`/film-mappings/get-all`, {
		params: input,
	});
	return output;
};

export const getMappingById = async ({ id }) => {
	let output = await baseService.get(`/film-mappings/get-one/${id}`);
	return output;
};

export const getMappingFilmById = async ({ pageSize, page, id }) => {
	let input = {
		limit: pageSize,
		page,
	};
	let output = await baseService.get(`/episode-mappings/film-mapping/${id}`, { params: input });
	return output;
};

export const getImageById = async ({ id }) => {
	let output = await baseService.get(`/film-infos/image/${id}`);
	return output;
};

export const getImageMappingsById = async ({ id }) => {
	let output = await baseService.get(`/film-mappings/image/${id}`);
	return output;
};

export const getImageFilmsById = async ({ id }) => {
	let output = await baseService.get(`/films/image/${id}`);
	return output;
};

export const getContactList = async ({ pageSize, page, status, group, keyword, typeSearch, mapping_status }) => {
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
	let output = await baseService.get(`/contacts/get-all`, {
		params: input,
	});
	return output;
};

export const getFilmPublicByOneId = async ({ id }) => {
	let output = await baseService.get(`/episode-mappings/get-url/${id}`);
	return output;
};
export const uploadBanner = async (data) => {
	return await baseService.post(`/users/upload-banner `, data);
};
