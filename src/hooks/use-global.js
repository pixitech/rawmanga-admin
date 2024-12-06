import { theme } from "@/themes";
import { useMediaQuery } from "@mui/material";
const useGlobal = () => {
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
	return {
		isDesktop,
		isMobile,
	};
};
export default useGlobal;
