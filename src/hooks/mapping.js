import { rejectMapping, updateMapping } from "@/actions";
import { useMutation } from "react-query";

export const useUpdateMapping = (config = {}) => {
	return useMutation({
		...config,
		mutationFn: updateMapping,
	});
};

export const useRejectMapping = (config = {}) => {
	return useMutation({
		...config,
		mutationFn: rejectMapping,
	});
};
