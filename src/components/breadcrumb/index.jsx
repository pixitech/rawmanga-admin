import { Box, Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useBreadcrumbStore } from "@/stores";
import { Link } from "react-router-dom";

function Breadcrumb({ isFixed = true }) {
	const { breadcrumbs } = useBreadcrumbStore();
	let paths = [];
	if (breadcrumbs?.breadcrumb && breadcrumbs?.breadcrumb?.length > 0) {
		let breadcrumb = breadcrumbs?.breadcrumb?.length > 0 ? breadcrumbs?.breadcrumb : [];
		breadcrumb?.map((item, index) => {
			if (item?.path) {
				paths.push(
					<Link className="link" style={{ fontSize: "16px" }} key={index} to={item?.path}>
						{item?.title}
					</Link>
				);
			} else {
				paths.push(
					<Typography key={index} color={"#768394"} fontSize="16px">
						{item?.title}
					</Typography>
				);
			}
		});
	}
	const styleFixed = {
		zIndex: 100,
	};
	return (
		<Box sx={{ ...(isFixed ? styleFixed : {}) }}>
			<Typography fontSize="27px" fontWeight={700}>
				{breadcrumbs?.title && breadcrumbs?.title?.length > 30
					? breadcrumbs?.title.slice(0, 48) + "..."
					: breadcrumbs?.title ?? ""}
			</Typography>
			<Breadcrumbs
				className="breadcrumb"
				separator={
					<NavigateNextIcon
						fontSize="medium"
						sx={{
							color: "#768394",
						}}
					/>
				}
				sx={{
					padding: "0",
					...(isFixed ? styleFixed : {}),
					"& .MuiBreadcrumbs-ol": {
						alignItems: "center",
						alignContent: "center",

						"& .MuiBreadcrumbs-li:last-child": {
							color: "#f38d03 !important",
							"& .MuiTypography-root": {
								color: "#f38d03 !important",
							},
						},
						"& .MuiBreadcrumbs-separator:nth-last-of-type(2)": {
							filter: "invert(47%) sepia(98%) saturate(489%) hue-rotate(357deg) brightness(105%) contrast(102%)",
						},
					},
					"& a, p": {
						// lineHeight: "20px",
						fontWeight: 600,
					},
				}}
			>
				{paths}
			</Breadcrumbs>
		</Box>
	);
}

export default Breadcrumb;
