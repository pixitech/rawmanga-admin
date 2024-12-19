import {
	FILM_STATUS,
	IMAGE_CHAPTER_STATE_TO_STATUS,
	STATUS_MAPPING_TITLE_ENUM,
	STATUS_REVIEW_TITLE_ENUM,
	STATUS_TITLE_ENUM,
} from "@/constant/title";
import { Chip } from "@mui/material";

const StatusComponent = ({ value, label, origin_state }) => {
	let style = {
		backgroundColor: "#EFF1F5",
		border: "1px solid #C6C6C6",
		fontWeight: 500,
		fontSize: "12px",
		lineHeight: "18px",
		color: "#57617C",
		height: "22px",
		textAlign: "center",
		padding: "2px 8px",
		".MuiChip-label": {
			padding: "0px",
		},
	};
	let labelValue = value;
	switch (value) {
		case STATUS_MAPPING_TITLE_ENUM.SUCCESSFULLY_MAPPED.key:
		case IMAGE_CHAPTER_STATE_TO_STATUS.PROCESSED:
			labelValue = value || STATUS_MAPPING_TITLE_ENUM.SUCCESSFULLY_MAPPED.title;
			style = {
				backgroundColor: "#EFF8E5",
				border: "1px solid #BBE981",
				fontWeight: 500,
				fontSize: "12px",
				lineHeight: "18px",
				color: "#62AC03",
				height: "22px",
				textAlign: "center",
				padding: "2px 8px",
				".MuiChip-label": {
					padding: "0px",
				},
			};
			break;
		case STATUS_REVIEW_TITLE_ENUM.Rejected.key:
		case IMAGE_CHAPTER_STATE_TO_STATUS.PENDING:
			labelValue = value || STATUS_REVIEW_TITLE_ENUM.Rejected.title;
			style = {
				backgroundColor: "#FFEEEE",
				border: "1px solid #FCA1A3",
				fontWeight: 500,
				fontSize: "12px",
				lineHeight: "18px",
				color: "#F42222",
				height: "22px",
				textAlign: "center",
				padding: "2px 8px",
				".MuiChip-label": {
					padding: "0px",
				},
			};
			break;
		case STATUS_REVIEW_TITLE_ENUM.APPROVE.key:
			labelValue = STATUS_REVIEW_TITLE_ENUM.APPROVE.title;
			style = {
				backgroundColor: "#EFF8E5",
				border: "1px solid #BBE981",
				fontWeight: 500,
				fontSize: "12px",
				lineHeight: "18px",
				color: "#62AC03",
				height: "22px",
				textAlign: "center",
				padding: "2px 8px",
				".MuiChip-label": {
					padding: "0px",
				},
			};
			break;
		case STATUS_MAPPING_TITLE_ENUM.MAPPING_FAILED.key:
			labelValue = STATUS_MAPPING_TITLE_ENUM.MAPPING_FAILED.title;
			style = {
				backgroundColor: "#FFEEEE",
				border: "1px solid #FCA1A3",
				fontWeight: 500,
				fontSize: "12px",
				lineHeight: "18px",
				color: "#F42222",
				height: "22px",
				textAlign: "center",
				padding: "2px 8px",
				".MuiChip-label": {
					padding: "0px",
				},
			};
			break;
		case STATUS_TITLE_ENUM.ACTIVE.key:
			labelValue = STATUS_TITLE_ENUM.ACTIVE.title;
			style = {
				backgroundColor: "#EFF8E5",
				border: "1px solid #BBE981",
				fontWeight: 500,
				fontSize: "12px",
				lineHeight: "18px",
				color: "#62AC03",
				height: "22px",
				textAlign: "center",
				padding: "2px 8px",
				".MuiChip-label": {
					padding: "0px",
				},
			};
			break;
		case STATUS_TITLE_ENUM.INACTIVE.key:
			labelValue = STATUS_TITLE_ENUM.INACTIVE.title;
			style = {
				backgroundColor: "#FFEEEE",
				border: "1px solid #FCA1A3",
				fontWeight: 500,
				fontSize: "12px",
				lineHeight: "18px",
				color: "#F42222",
				height: "22px",
				textAlign: "center",
				padding: "2px 8px",
				".MuiChip-label": {
					padding: "0px",
				},
			};
			break;
		case STATUS_TITLE_ENUM.REMOVED.key:
			labelValue = STATUS_TITLE_ENUM.REMOVED.title;
			style = {
				backgroundColor: "#EFF1F5",
				border: "1px solid #C6C6C6",
				fontWeight: 500,
				fontSize: "12px",
				lineHeight: "18px",
				color: "#57617C",
				height: "22px",
				textAlign: "center",
				padding: "2px 8px",
				".MuiChip-label": {
					padding: "0px",
				},
			};
			break;
		case FILM_STATUS.COMPLETED.key:
			labelValue = FILM_STATUS.COMPLETED.title;
			style = {
				backgroundColor: "#EFF8E5",
				border: "1px solid #BBE981",
				fontWeight: 500,
				fontSize: "12px",
				lineHeight: "18px",
				color: "#62AC03",
				height: "22px",
				textAlign: "center",
				padding: "2px 8px",
				".MuiChip-label": {
					padding: "0px",
				},
			};
			break;
		case FILM_STATUS.PROCESSING.key:
			labelValue = FILM_STATUS.PROCESSING.title;
			style = {
				backgroundColor: "#DAEBFB",
				border: "1px solid #A0C3F6",
				fontWeight: 500,
				fontSize: "12px",
				lineHeight: "18px",
				color: "#338FEB",
				height: "22px",
				textAlign: "center",
				padding: "2px 8px",
				".MuiChip-label": {
					padding: "0px",
				},
			};
			break;
		case STATUS_MAPPING_TITLE_ENUM.NOT_YET_MAPPED.key:
			labelValue = STATUS_MAPPING_TITLE_ENUM.NOT_YET_MAPPED.title;
			break;
		case STATUS_REVIEW_TITLE_ENUM.Pending.key:
			labelValue = STATUS_REVIEW_TITLE_ENUM.Pending.title;
			break;
		case FILM_STATUS.PENDING.key:
			labelValue = FILM_STATUS.PENDING.title;
			break;
		default:
			style = {
				backgroundColor: "#EFF1F5",
				border: "1px solid #C6C6C6",
				fontWeight: 500,
				fontSize: "12px",
				lineHeight: "18px",
				color: "#57617C",
				height: "22px",
				textAlign: "center",
				padding: "2px 8px",
				".MuiChip-label": {
					padding: "0px",
				},
			};
			break;
	}
	return (
		<Chip
			label={
				<div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
					{origin_state ? `${origin_state} - ` : "0 - "}
					{label ?? labelValue}
				</div>
			}
			sx={style}
		/>
	);
};

export default StatusComponent;
