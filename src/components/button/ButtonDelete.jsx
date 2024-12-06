import { Box, Typography } from "@mui/material";

const ButtonDelete = ({ handleChange, title }) => {
	return (
		<Box
			className="cursor-pointer"
			onClick={handleChange}
			sx={{
				width: "150px",
				height: "40px",
				borderRadius: "6px",
				position: "relative",
				backgroundImage: "url(/images/button-4.svg)",
			}}
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
				}}
			>
				<Typography variant="body1" fontFamily={600} fontSize={"16px"}>
					{title ?? "Tìm kiếm"}
				</Typography>
			</Box>
		</Box>
	);
};

export default ButtonDelete;
