import { closeAction, errorComponent, successComponent, warningComponent } from "@/components/noti/notificaiton";
import { enqueueSnackbar } from "notistack";

const MySnackBar = {
	success: ({ message = "", duration = 7000, action = undefined }) =>
		enqueueSnackbar({
			anchorOrigin: {
				horizontal: "center",
				vertical: "top",
			},
			autoHideDuration: duration,
			message: successComponent(message),
			action: action ? action : (snackbarId) => closeAction(snackbarId),
			variant: "success",
			hideIconVariant: true,
		}),
	error: ({ message = "", duration = 7000, action = undefined }) =>
		enqueueSnackbar({
			anchorOrigin: {
				horizontal: "center",
				vertical: "top",
			},
			variant: "error",
			autoHideDuration: duration,
			message: errorComponent(message),
			action: action ? action : (snackbarId) => closeAction(snackbarId),
			hideIconVariant: true,
		}),
	warning: ({ message = "", duration = 7000, action = undefined }) =>
		enqueueSnackbar({
			anchorOrigin: {
				horizontal: "center",
				vertical: "top",
			},
			variant: "warning",
			autoHideDuration: duration,
			message: warningComponent(message),
			action: action ? action : (snackbarId) => closeAction(snackbarId),
			hideIconVariant: true,
		}),
};

export default MySnackBar;
