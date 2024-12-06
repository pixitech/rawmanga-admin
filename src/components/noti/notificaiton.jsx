import { Box } from "@mui/material";
import { closeSnackbar } from "notistack";

export const successComponent = (message) => {
	return message ? (
		<>
			<img
				src={"/images/success.png"}
				alt="success"
				style={{ maxHeight: "24px", maxWidth: "24px", marginRight: "16px" }}
			/>
			<Box>{message}</Box>
		</>
	) : (
		""
	);
};
export const errorComponent = (message) => {
	return message ? (
		<>
			<img
				src={"/images/error.png"}
				alt="success"
				style={{ maxHeight: "24px", maxWidth: "24px", marginRight: "16px" }}
			/>
			<Box>{message}</Box>
		</>
	) : (
		""
	);
};
export const warningComponent = (message) => {
	return message ? (
		<>
			<img
				src={"/images/warning.png"}
				alt="success"
				style={{ maxHeight: "24px", maxWidth: "24px", marginRight: "16px" }}
			/>
			<Box>{message}</Box>
		</>
	) : (
		""
	);
};

export const closeAction = (snackbarId) => (
	<>
		<img
			onClick={() => {
				closeSnackbar(snackbarId);
			}}
			className="cursor-pointer"
			src={"/images/close.png"}
			alt="close"
			style={{ maxHeight: "24px", maxWidth: "24px" }}
		/>
	</>
);
