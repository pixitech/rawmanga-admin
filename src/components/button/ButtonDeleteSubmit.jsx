import { Box, Button, Typography } from "@mui/material";

const ButtonDeleteSubmit = ({ handleChange, label, loading, ...props }) => {
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
				backgroundImage: "url(/images/button-5.svg)",
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
				{loading ? (
					<span className="loader"></span>
				) : (
					<Typography variant="h6" fontSize={"16px"}>
						{label ?? "Xác nhận"}
					</Typography>
				)}
			</Box>
		</Button>
	);
};

export default ButtonDeleteSubmit;
