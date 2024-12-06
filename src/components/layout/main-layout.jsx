import { Box, Stack } from "@mui/material";
import Menu from "../menu";
import Header from "./header";
import { MENU_CONFIG } from "@/utils";
import { useState } from "react";

const MainLayout = ({ children }) => {
	const [isShowMenu, setIsShowMenu] = useState(false);
	return (
		<Stack className="default-background" direction={"row"} sx={{ minHeight: "100vh" }}>
			<Menu subMenu={MENU_CONFIG} setIsShowMenu={setIsShowMenu} />
			<Box
				height={"100%"}
				display={"flex"}
				direction="column"
				className={`direction-column ${isShowMenu ? "menu-hidden" : "menu-show"}`}
			>
				<Header isAuth={true} />
				<Stack direction="column" className="flex-grow-1">
					{children}
				</Stack>
			</Box>
		</Stack>
	);
};
export default MainLayout;
