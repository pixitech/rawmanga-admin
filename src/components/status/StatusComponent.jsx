import { FILM_STATUS, STATUS_MAPPING_TITLE_ENUM, STATUS_REVIEW_TITLE_ENUM, STATUS_TITLE_ENUM } from "@/constant/title";
import { Chip } from "@mui/material";

const StatusComponent = ({ value, label }) => {
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

	if (value === STATUS_MAPPING_TITLE_ENUM.NOT_YET_MAPPED.key) {
		labelValue = STATUS_MAPPING_TITLE_ENUM.NOT_YET_MAPPED.title;
	}
	if (value === STATUS_MAPPING_TITLE_ENUM.SUCCESSFULLY_MAPPED.key) {
		labelValue = STATUS_MAPPING_TITLE_ENUM.SUCCESSFULLY_MAPPED.title;
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
	}
	if (value === STATUS_REVIEW_TITLE_ENUM.APPROVE.key) {
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
	}
	if (value === STATUS_REVIEW_TITLE_ENUM.Rejected.key) {
		labelValue = STATUS_REVIEW_TITLE_ENUM.Rejected.title;
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
	}
	if (value === STATUS_REVIEW_TITLE_ENUM.Pending.key) {
		labelValue = STATUS_REVIEW_TITLE_ENUM.Pending.title;
	}
	if (value === STATUS_MAPPING_TITLE_ENUM.MAPPING_FAILED.key) {
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
	}

	if (value === STATUS_TITLE_ENUM.ACTIVE.key) {
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
	}
	if (value === STATUS_TITLE_ENUM.INACTIVE.key) {
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
	}
	if (value === STATUS_TITLE_ENUM.REMOVED.key) {
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
	}
	if (value === FILM_STATUS.COMPLETED.key) {
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
	}
	if (value === FILM_STATUS.PROCESSING.key) {
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
	}
	if (value === FILM_STATUS.PENDING.key) {
		labelValue = FILM_STATUS.PENDING.title;
	}
	return <Chip label={label ?? labelValue} sx={style} />;
};

export default StatusComponent;
