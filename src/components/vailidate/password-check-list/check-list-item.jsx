import { Typography } from "@mui/material";
import { theme } from "@/themes";
import UncheckCircleIcon from "@/components/icons/uncheck-circle-icon";

const CheckListItem = ({ title, isPass }) => {
	return (
		<div>
			<Typography display={"flex"} gap={0.5} fontSize={12} color={theme.palette.common.grey60}>
				<UncheckCircleIcon color={isPass ? "rgba(20, 198, 50, 1)" : "#C2C2C2"} />
				{title}
			</Typography>
		</div>
	);
};
export default CheckListItem;
