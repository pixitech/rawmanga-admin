import { Box, Typography } from "@mui/material";

const ButtonCancel = ({ handleChange, title, loading }) => {
	return (
		<Box
			className="cursor-pointer"
			onClick={handleChange}
			loading={loading}
			sx={{
				width: "200px",
				height: "40px",
				borderRadius: "6px",
				position: "relative",
				backgroundImage: "url(/images/button-3.svg)",
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

export default ButtonCancel;
