import React from "react";
import { useLocation } from "react-router-dom";

export function useQueryRouter() {
	const { search } = useLocation();
	const searchParams = React.useMemo(() => new URLSearchParams(search), [search]);
	const get = (name) => (searchParams.get(name) ?? "").replaceAll(" ", "+");

	return { get };
}
