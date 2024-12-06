import { getChapterById, getImageChapter, getListChapterById, getMangaById, getMangaList } from "@/actions/manga";
import { storage } from "@/utils";
import { useQuery } from "react-query";

export const useGetMangaList = ({
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
		queryKey: ["useGetMangaList", pageSize, page, status, group, keyword, typeSearch, mapping_status, review_status],
		queryFn: () =>
			getMangaList({
				pageSize,
				page,
				status,
				group,
				keyword,
				typeSearch,
				mapping_status,
				review_status,
			}),
		enabled: !!token,
	});
};

export const useGetMangaById = (id) => {
	return useQuery({
		queryKey: ["useGetMangaById", id],
		queryFn: () => getMangaById({ id }),
		enabled: !!id,
	});
};

export const useGetListChapter = ({ pageSize, page, keyword, id }) => {
	return useQuery({
		queryKey: ["useGetListChapter", id, pageSize, page, keyword],
		queryFn: () =>
			getListChapterById({
				id,
				pageSize,
				page,
				keyword,
			}),
		enabled: !!id,
	});
};

export const useGetChapterById = (id) => {
	return useQuery({
		queryKey: ["useGetChapterById", id],
		queryFn: () => getChapterById({ id }),
		enabled: !!id,
	});
};

export const useGetImageChapter = (id) => {
	return useQuery({
		queryKey: ["useGetImageChapter", id],
		queryFn: () => getImageChapter({ id }),
		enabled: !!id,
	});
};
