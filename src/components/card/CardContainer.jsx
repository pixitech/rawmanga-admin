import { theme } from "@/themes";
import { Box } from "@mui/material";

const CardContainer = ({ className, children, background, height, ...props }) => {
	return (
		<Box
			className={className}
			sx={{
				background: background ?? theme.palette.background.whiteSmoke2,
				height: height ?? "100%",
				padding: "20px",
				borderRadius: "6px",
			}}
			{...props}
		>
			{children}
		</Box>
	);
};

export default CardContainer;
