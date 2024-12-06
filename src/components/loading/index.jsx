import { Backdrop, CircularProgress } from "@mui/material";

const Loading = (props) => {
	return (
		<Backdrop sx={{ color: "#FDFDFD", zIndex: (theme) => theme.zIndex.drawer + 1000 }} open={props.isLoading}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};
export default Loading;
