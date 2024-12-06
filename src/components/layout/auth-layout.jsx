import { Stack } from "@mui/material";

const AuthLayout = ({ children }) => {
	return (
		<>
			<Stack className="default-background" direction={"row"} sx={{ minHeight: "100vh" }}>
				{children}
			</Stack>
		</>
	);
};

export default AuthLayout;
