import Head from "@/components/head";
import Content from "@/components/layout/content";
import LoginForm from "@/features/login";
import { Box, Grid } from "@mui/material";

const LoginFormContainer = () => {
	return (
		<>
			<Head title="RawManga" />
			<Grid container columns={24} spacing={1}>
				<Grid item style={{ width: "584px" }}>
					<Content
						sx={{
							display: "flex",
							justifyContent: "center",
							height: "100%",
						}}
						contentStyle={{
							width: "100%",
							padding: "120px 48px 40px 48px",
							borderRadius: "16px",
							gap: "32px",
							position: "relative",
						}}
					>
						<LoginForm />
					</Content>
				</Grid>

				<Grid item xs className="d-flex row-center">
					<Box
						sx={{
							maxWidth: "65%",
							maxHeight: "100%",
							marginLeft: "auto",
							marginRight: "auto",
							display: "flex",
							justifyContent: "center",
						}}
					>
						<div className="row-center">
							<img src={"/images/manga-logo.svg"} alt={"Logo"} />
						</div>
					</Box>
				</Grid>
			</Grid>
		</>
	);
};
export default LoginFormContainer;
