import { theme } from "@/themes";
import { Box } from "@mui/material";

const Content = ({ children, Breadcrumb = null, contentStyle = {}, ...props }) => {
	return (
		<Box sx={{ overflow: "auto" }} {...props}>
			<Box
				sx={{
					background: theme.palette.background.white,
					margin: { xs: 2, md: 4 },
					...contentStyle,
				}}
			>
				{children}
			</Box>
		</Box>
	);
};
export default Content;
