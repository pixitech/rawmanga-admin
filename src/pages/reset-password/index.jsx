import Head from "@/components/head";
import Content from "@/components/layout/content";
import ResetPassword from "@/features/reset-password";
import { Box, Grid } from "@mui/material";

const ResetPasswordContainer = () => {
	return (
		<>
			<Head title="AniSage" />
			<Grid container columns={24} spacing={1}>
				<Grid item xs={24} md={10}>
					<Content
						sx={{
							maxWidth: 584,
							minHeight: "100svh",
							display: "flex",
							justifyContent: "center",
							flexDirection: "column",
							height: "100%",
						}}
						contentStyle={{
							height: "100%",
							padding: "120px 48px 40px 48px",
							borderRadius: "16px",
							gap: "32px",
							position: "relative",
						}}
					>
						<ResetPassword />
					</Content>
				</Grid>

				<Grid item xs={24} md={14}>
					<Box
						sx={{
							maxWidth: 646,
							minHeight: "100svh",
							marginLeft: "auto",
							marginRight: "auto",
							display: "flex",
							justifyContent: "center",
							flexDirection: "column",
						}}
					>
						<img src={"/images/auth-icon.svg"} alt={"auth-icon"} />
					</Box>
				</Grid>
			</Grid>
		</>
	);
};
export default ResetPasswordContainer;
