// import Logo from "@components/logo";
import { Box, Grid } from "@mui/material";
import clsx from "clsx";
import Breadcrumb from "../breadcrumb";
import AvatarComponent from "../avatar/AvatarComponent";

function Header({ isAuth, setMinHeight = () => {} }) {
	return (
		<Box
			sx={{
				display: "block",
				// top: 0,
				// position: "sticky",
				// zIndex: "1000",
				// height: "92px",
			}}
		>
			<Box
				className={clsx("row-center header-navbar")}
				p={2.5}
				sx={{
					minHeight: "92px",
					background: "linear-gradient(90.39deg, rgba(255, 255, 255, 0.8) 24.92%, rgba(255, 255, 255, 0) 87.59%)",
					borderBottom: "1.5px solid #FFFFFF",
				}}
			>
				<Grid container columns={24} spacing={1}>
					<Grid item xs={6} md={12}>
						<Breadcrumb />
					</Grid>

					<Grid item xs={16} md={12} className="rowy-center-end">
						<AvatarComponent />
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
export default Header;
