import { Box, IconButton } from "@mui/material";
import EditIcon from "../icons/edit-icon";
import DeleteIcon from "../icons/delete-icon";
import CopyIcon from "../icons/copy-icon";

const ActionComponent = ({
	otherActionTitle,
	otherActionOnclick,
	onEdit,
	onDelete,
	onCopy,
	isHiddenEdit = false,
	isHiddenDelete = false,
	showDeleteIcon = false,
	isShowCopy = false,
	isOtherActionTitle = false,
}) => {
	return (
		<Box className={"rowy-center"}>
			{otherActionTitle && isOtherActionTitle && (
				<Box
					onClick={otherActionOnclick}
					className={"cursor-pointer row-center font-weight-700 orange-color-2"}
					pr={1.25}
					sx={{
						borderRight: "1px solid var(--Admin-Color-Neutral-3, #ECECEC)",
					}}
				>
					{otherActionTitle}
				</Box>
			)}
			{onCopy && isShowCopy && (
				<IconButton
					onClick={onCopy}
					className={"cursor-pointer row-center"}
					pr={1.25}
					sx={{
						borderRight: "1px solid var(--Admin-Color-Neutral-3, #ECECEC)",
					}}
				>
					<CopyIcon />
				</IconButton>
			)}
			{onEdit && !isHiddenEdit && (
				<IconButton
					onClick={onEdit}
					className={"cursor-pointer row-center"}
					pr={1.25}
					sx={{
						borderRight: "1px solid var(--Admin-Color-Neutral-3, #ECECEC)",
					}}
				>
					<EditIcon />
				</IconButton>
			)}
			{onDelete && showDeleteIcon && (
				<Box className={`row-center ${isHiddenDelete ? "disabled-button" : "cursor-pointer"}`}>
					<IconButton onClick={onDelete} pl={1.25} disabled={isHiddenDelete}>
						<DeleteIcon />
					</IconButton>
				</Box>
			)}
		</Box>
	);
};

export default ActionComponent;
