import { theme } from "@/themes";
import { useMediaQuery } from "@mui/material";

const DesktopContainer = (props) => {
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

	return isDesktop ? props.children : null;
};
export default DesktopContainer;
