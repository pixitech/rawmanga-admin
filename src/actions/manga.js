import { baseService } from "@/lib/axios";

export const getMangaList = async ({
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
	let output = await baseService.get(`/mangas/get-all`, {
		params: input,
	});
	return output;
};

export const getMangaById = async ({ id }) => {
	let output = await baseService.get(`/mangas/get-one/${id}`);
	return output;
};

export const getListChapterById = async ({ id, pageSize, page, keyword }) => {
	let input = {
		limit: pageSize,
		page,
		keyword,
	};
	let output = await baseService.get(`/chapters/mangas/${id}/get-all`, {
		params: input,
	});
	return output;
};

export const getChapterById = async ({ id }) => {
	let output = await baseService.get(`/chapters/get-one/${id}`);
	return output;
};

export const getImageChapter = async ({ id }) => {
	let output = await baseService.get(`/images/chapters/${id}/get-all`);
	return output;
};
