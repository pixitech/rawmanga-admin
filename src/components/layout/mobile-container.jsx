import { theme } from "@/themes";
import { useMediaQuery } from "@mui/material";
const MobileContainer = (props) => {
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	return isMobile ? props.children : null;
};
export default MobileContainer;
