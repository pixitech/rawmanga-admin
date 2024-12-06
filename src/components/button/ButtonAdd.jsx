import { Box, Button, Typography } from "@mui/material";
import CrossIcon from "../icons/cross-icon";

const ButtonAdd = ({ handleChange, width, height, label, isHiddenIcon = false, ...props }) => {
	return (
		<Button
			className="cursor-pointer"
			onClick={handleChange}
			sx={{
				width: width ?? "150px",
				height: height ?? "40px",
				borderRadius: "6px",
				position: "relative",
				backgroundImage: "url(/images/button-2.svg)",
			}}
			{...props}
		>
			<Box
				sx={{
					width: "100%",
					height: "40px",
					position: "absolute",
					display: "flex",
					alignItems: "center",
					justifyItems: "center",
					justifyContent: "center",
					padding: "10px 12px 10px 12px",
					color: "#FFFFFF",
					gap: "8px",
				}}
			>
				{!isHiddenIcon && <CrossIcon />}
				<Typography variant="h6" fontSize={"16px"}>
					{label ?? "Tạo"}
				</Typography>
			</Box>
		</Button>
	);
};

export default ButtonAdd;
