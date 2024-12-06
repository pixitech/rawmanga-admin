import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Logo = (props) => {
	const navigate = useNavigate();
	const handleMenuLogo = () => {
		props.handleMenuMobile();
		navigate("/");
	};
	return (
		<Box onClick={handleMenuLogo} className="cursor-pointer" display="flex" alignItems="center" gap={1.5}>
			<img src={"/manga-logo.svg"} alt="logo" style={{ maxHeight: "35px", maxWidth: "81px" }} />
			{/* <Typography fontSize={18} lineHeight={"22px"} fontWeight={700} color="#022B7F">
				Anisage
			</Typography> */}
		</Box>
	);
};
export default Logo;
