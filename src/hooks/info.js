import { getFilmInfoById, getInfoById, getInfoList } from "@/actions";
import { storage } from "@/utils";
import { useQuery } from "react-query";

export const useGetInfoList = ({ pageSize, page, status, group, keyword, typeSearch, mapping_status }) => {
	const token = storage.getToken();
	return useQuery({
		queryKey: ["useGetInfoList", pageSize, page, status, group, keyword, typeSearch, mapping_status],
		queryFn: () =>
			getInfoList({
				pageSize,
				page,
				status,
				group,
				keyword,
				typeSearch,
				mapping_status,
			}),
		enabled: !!token,
	});
};

export const useGetInfoById = (id) => {
	return useQuery({
		queryKey: ["useGetInfoById", id],
		queryFn: () => getInfoById({ id }),
		enabled: !!id,
	});
};
export const useGetFilmInfoById = ({ id, pageSize, page, status, group, keyword, typeSearch }) => {
	console.log(id, !!id);
	return useQuery({
		queryKey: ["useGetFilmInfoById", id, pageSize, page, status, group, keyword, typeSearch],
		queryFn: () =>
			getFilmInfoById({
				id,
				pageSize,
				page,
				status,
				group,
				keyword,
				typeSearch,
			}),
		enabled: !!id,
	});
};
