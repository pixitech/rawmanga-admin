import { Box, Typography } from "@mui/material";

const LineComponent = ({ className, line1, line2, line1ClassName, line2ClassName, onClick }) => {
	return (
		<Box className={className} onClick={onClick}>
			{line1 && (
				<Typography color="text.secondary" fontSize="14px" lineHeight={"20px"} className={line1ClassName}>
					{line1}
				</Typography>
			)}
			{line2 && (
				<Typography color="text.secondary" fontSize="14px" lineHeight={"20px"} className={line2ClassName}>
					{line2}
				</Typography>
			)}
		</Box>
	);
};

export default LineComponent;
