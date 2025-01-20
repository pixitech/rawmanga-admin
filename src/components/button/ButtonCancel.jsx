import { Box, Button, Typography } from "@mui/material";

const ButtonCancel = ({ handleChange, title, loading, ...props }) => {
	return (
		<Button
			className="cursor-pointer"
			onClick={handleChange}
			disabled={loading}
			sx={{
				width: "200px",
				height: "40px",
				borderRadius: "6px",
				position: "relative",
				backgroundImage: "url(/images/button-3.svg)",
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
				}}
			>
				{loading ? (
					<span className="loader"></span>
				) : (
					<Typography variant="body1" fontFamily={600} fontSize={"16px"}>
						{title ?? "Tìm kiếm"}
					</Typography>
				)}
			</Box>
		</Button>
	);
};

export default ButtonCancel;
