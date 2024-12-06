import { Box, Typography, ListItemIcon, Paper, MenuItem, MenuList } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import CircleIcon from "@mui/icons-material/Circle";

const MenuItemLink = ({
	className,
	hidden,
	link,
	icon = null,
	title,
	children,
	onMenuExpand,
	pathname,
	show = [],
	router = [],
}) => {
	let isActive;
	if (!children) {
		isActive = router.some((i) => matchPath(i, pathname));
		return (
			<MenuItem
				className={`${className} ${isActive ? "active" : ""}`}
				onClick={() => onMenuExpand(link)}
				sx={{
					background: isActive && icon ? "#FFF6ED" : "none",
				}}
			>
				{isActive && icon && <Box className="icon-active" />}
				<Link className="menu-link rowy-center rowy-sb-center menu-item-list" style={{ width: "100%" }} to={link}>
					<ListItemIcon className="menu-item rowy-center">
						{icon ? (
							<img src={icon} alt="icon" />
						) : (
							<Box
								className="row-center"
								sx={{
									width: "20px",
								}}
							>
								<CircleIcon
									sx={{
										fontSize: "6px !important",
									}}
								/>
							</Box>
						)}
						<Typography className={hidden ? "hidden" : ""} variant="inherit">
							{title}
						</Typography>
					</ListItemIcon>
				</Link>
			</MenuItem>
		);
	}
	let showData = show && show.find((i) => i === title);
	const checkIsActive = (children) => {
		return children.some((i) => i?.router.find((i) => matchPath(i, pathname)));
	};
	isActive = checkIsActive(children);

	return (
		<>
			<MenuItem
				className={`${className} ${isActive ? "active" : ""} menu-link rowy-center rowy-sb-center menu-item-list`}
				onClick={() => onMenuExpand(title)}
			>
				{isActive && <Box className="icon-active" />}
				<ListItemIcon className="menu-item rowy-center">
					{icon ? (
						<img src={icon} alt="icon" />
					) : (
						<Box
							className="row-center"
							sx={{
								width: "20px",
							}}
						>
							<CircleIcon
								sx={{
									fontSize: "6px !important",
								}}
							/>
						</Box>
					)}

					<Typography className={hidden ? "hidden" : ""} variant="inherit">
						{title}
					</Typography>
				</ListItemIcon>
				{children && (
					<Box className={`${hidden ? "hidden" : ""} rowy-center`}>
						{showData ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</Box>
				)}
			</MenuItem>
			{showData &&
				children &&
				children?.length > 0 &&
				children.map((i, index) => (
					<MenuItemLink
						className={hidden ? "hidden" : ""}
						key={`${index}-${i?.title}`}
						title={i?.title}
						icon={i?.icon}
						children={i?.children}
						link={i?.link}
						onMenuExpand={onMenuExpand}
						pathname={pathname}
						router={i?.router}
					/>
				))}
		</>
	);
};

export default function Menu({ subMenu = [], setIsShowMenu }) {
	const [showMenuItem, setShowMenuItem] = useState([]);
	const [showMenu, setShowMenu] = useState(false);
	const location = useLocation();

	const onMenuExpand = (name) => {
		if (showMenuItem && showMenuItem.find((i) => i === name)) {
			let newShow = showMenuItem.filter((i) => i !== name);
			setShowMenuItem([...newShow]);
		} else {
			setShowMenuItem([...showMenuItem, name]);
		}
	};
	const onShowMenu = (value) => {
		setShowMenu(value);
		setIsShowMenu(value);
	};

	const checkShowMenuItem = (pathname, subMenuList = [], parent) => {
		if (!subMenu) {
			return;
		}
		subMenuList.map((item) => {
			if (item?.children) {
				checkShowMenuItem(pathname, item?.children, item);
			}
			let isShow = item?.router?.find((i) => matchPath(i, pathname));
			if (isShow) {
				setShowMenuItem([...showMenuItem, parent?.title]);
			}
		});
	};

	useEffect(() => {
		checkShowMenuItem(location.pathname, subMenu);
	}, []);

	return (
		<Paper className={`menu-customer ${showMenu ? "hidden-menu" : ""}`}>
			<MenuList className="container">
				<Box className="row-center" sx={{ height: "92px" }}>
					<Link to={"/"}>
						<img
							src={showMenu ? "/rawmanga-fav.png" : "/images/manga-logo.svg"}
							alt="logo"
							className="logo"
							style={{
								width: "auto",
							}}
						/>
					</Link>
					{/* <Typography
						className={showMenu ? "hidden" : ""}
						color="text.secondary"
						fontSize="20px"
						fontWeight={600}
						ml={1}
					>
						Anisage
					</Typography> */}
				</Box>
				<Box className="menu">
					{subMenu.map((item, index) => (
						<MenuItemLink
							key={`${index}-${item?.title}`}
							title={item?.title}
							icon={item?.icon}
							children={item?.children}
							link={item?.link}
							onMenuExpand={onMenuExpand}
							pathname={location.pathname}
							show={showMenuItem}
							router={item?.router}
							hidden={showMenu}
						/>
					))}
				</Box>
				<Box
					className="row-center "
					sx={{
						position: "absolute",
						bottom: "20px",
						width: "100%",
					}}
				>
					{showMenu ? (
						<img
							onClick={() => onShowMenu(false)}
							alt="logo"
							className="cursor-pointer "
							src={"/images/menu/chevron_Right_Duo.svg"}
						/>
					) : (
						<img
							onClick={() => onShowMenu(true)}
							alt="logo"
							className="cursor-pointer "
							src={"/images/menu/chevron_Left_Duo.svg"}
						/>
					)}
				</Box>
			</MenuList>
		</Paper>
	);
}
