/* eslint-disable react-hooks/rules-of-hooks */
import Loading from "@/components/loading";
import { Box, Modal, Typography } from "@mui/material";
import { useGetFilmById, useGetFilmPublicByOneId } from "@/hooks";
import CancelIcon from "@mui/icons-material/Cancel";
import { useLocation } from "react-router-dom";
import VideoPlayer from "./VideoPayer";

const FilmComponent = ({ setSelectFilm, selectFilm }) => {
	const location = useLocation();
	const handleClose = () => {
		setSelectFilm(null);
	};

	const isAnitaku = location.pathname.includes("anitaku");
	const { data, isLoading } = isAnitaku ? useGetFilmById(selectFilm?._id) : useGetFilmPublicByOneId(selectFilm?._id);

	if (!selectFilm?._id && selectFilm?.app_url) {
		return (
			<>
				<Loading isLoading={isLoading} />
				<Modal open={!!selectFilm} onClose={handleClose}>
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							borderRadius: "6px",
							width: 900,
							minHeight: 506,
							bgcolor: "background.paper",
							borderColor: "background.paper",
							boxShadow: 24,
							p: "20px",
							display: "flex",
							flexDirection: "column",
							"&:focus": {
								outline: "none",
							},
						}}
					>
						<Box className="rowy-center-end">
							<Box
								className="cursor-pointer"
								onClick={handleClose}
								sx={{
									".MuiSvgIcon-root": {
										color: "#768394",
										width: "24px",
										height: "24px",
									},
								}}
							>
								<CancelIcon />
							</Box>
						</Box>
						<Box>
							<Typography variant="h5" fontSize="20px" mb={1.25} fontWeight={600}>
								Episode
							</Typography>
						</Box>
						<iframe width="900" height="506" src={selectFilm?.app_url}></iframe>
					</Box>
				</Modal>
			</>
		);
	}

	return (
		<>
			<Loading isLoading={isLoading} />
			<Modal open={!!selectFilm && !!data} onClose={handleClose}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						borderRadius: "6px",
						width: 900,
						minHeight: 506,
						bgcolor: "background.paper",
						borderColor: "background.paper",
						boxShadow: 24,
						p: "20px",
						display: "flex",
						flexDirection: "column",
						"&:focus": {
							outline: "none",
						},
					}}
				>
					<Box className="rowy-center-end">
						<Box
							className="cursor-pointer"
							onClick={handleClose}
							sx={{
								".MuiSvgIcon-root": {
									color: "#768394",
									width: "24px",
									height: "24px",
								},
							}}
						>
							<CancelIcon />
						</Box>
					</Box>
					<Box>
						<Typography variant="h5" fontSize="20px" mb={1.25} fontWeight={600}>
							Episode {data?.current_episode}
						</Typography>
					</Box>
					<VideoPlayer src={isAnitaku ? data?.app_url : data} />
				</Box>
			</Modal>
		</>
	);
};

export default FilmComponent;
