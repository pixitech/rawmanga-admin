import { useProfileStore } from "@/stores";
import { Avatar, Box, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { KeyIcon } from "../icons/key-icon";
import { LogoutIcon } from "../icons/logout-icon";
import { UserIcon } from "../icons/user-icon";
import { useLogout } from "@/hooks";
import { useNavigate } from "react-router-dom";

function AvatarComponent() {
	const { profile } = useProfileStore();
	const [anchorEl, setAnchorEl] = useState(null);
	const { mutateAsync: logout } = useLogout();
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const navigate = useNavigate();

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleProfile = () => {
		navigate(`/admin/edit/${profile?.id}`);
		setAnchorEl(null);
	};
	const handleLogout = async () => {
		await logout();
		handleClose();
	};
	return (
		<>
			<Box className="row-center">
				<Typography fontSize="14px" fontWeight={600} mr={1}>
					{profile?.name}
				</Typography>
				<Avatar
					className="cursor-pointer"
					aria-controls={open ? "basic-menu" : undefined}
					aria-haspopup="true"
					aria-expanded={open ? "true" : undefined}
					onClick={handleClick}
					alt={profile?.name}
					src={profile?.avatar}
					width={"32px"}
					height={"32px"}
				/>
			</Box>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
				sx={{
					".MuiMenu-list": {
						width: "204px",
						padding: "8px",
						borderRadius: "6px",
					},
				}}
			>
				{/* <MenuItem onClick={handleProfile}>
					<Box
						className="d-flex"
						sx={{
							width: "188px",
							height: "32px",
							padding: "10px 8px 10px 8px",
							gap: "10px",
						}}
					>
						<UserIcon />
						<Typography>Hồ sơ cá nhân</Typography>
					</Box>
				</MenuItem>
				<MenuItem onClick={handleProfile}>
					<Box
						className="d-flex"
						sx={{
							width: "188px",
							height: "32px",
							padding: "10px 8px 10px 8px",
							gap: "10px",
						}}
					>
						<KeyIcon />
						<Typography>Đổi mật khẩu</Typography>
					</Box>
				</MenuItem> */}
				<MenuItem
					onClick={handleLogout}
					// sx={{
					// 	borderTop: "1px solid var(--Color-Neutral-Black-100, #DEDEDE)",
					// }}
				>
					<Box
						className="d-flex"
						sx={{
							width: "188px",
							height: "32px",
							padding: "10px 8px 10px 8px",
							gap: "10px",
						}}
					>
						<LogoutIcon />
						<Typography>Đăng xuất</Typography>
					</Box>
				</MenuItem>
			</Menu>
		</>
	);
}

export default AvatarComponent;
