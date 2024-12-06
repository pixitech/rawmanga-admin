import { QueryClient } from "react-query";

const queryConfig = {
	queries: {
		refetchOnWindowFocus: false,
		onError: () => {},
	},
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
