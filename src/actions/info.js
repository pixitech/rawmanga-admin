import { baseService } from "@/lib/axios";

export const getInfoList = async ({ pageSize, page, status, group, keyword, typeSearch, mapping_status }) => {
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
	let output = await baseService.get(`/film-infos/get-all`, {
		params: input,
	});
	return output;
};

export const getInfoById = async ({ id }) => {
	let output = await baseService.get(`/film-infos/get-one/${id}`);
	return output;
};

export const getFilmInfoById = async ({ id, pageSize, page, status, group, keyword, typeSearch }) => {
	console.log(id);
	let input = {
		limit: pageSize,
		page,
		status,
		group,
		keyword,
	};
	let output = await baseService.get(`/episode-infos/film/${id}`, {
		params: input,
	});
	return output;
};
