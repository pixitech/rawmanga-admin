import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { MenuItem, OutlinedInput, Select } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";

const usePlaceholderStyles = makeStyles((theme) => ({
	placeholder: {
		color: "#aaa",
	},
}));

const Placeholder = ({ children }) => {
	const classes = usePlaceholderStyles();
	return <div className={classes.placeholder}>{children}</div>;
};

const SelectItems = ({ classCustomer, placeholder, value, handleChangeInput, selectList = [], ...selectProps }) => {
	const [values, setValues] = useState("");
	useEffect(() => {
		if (value) {
			setValues(value);
		}
	}, [value]);
	let selectListData = selectList ?? [];
	return (
		<Select
			sx={{
				fontWeight: 400,
				fontSize: "14px",
				color: "#515151",
				"&.MuiSvgIcon-root": {
					color: "#768394",
				},
				"&.MuiOutlinedInput-input": {
					padding: "10px, 12px, 10px, 16px !important",
					color: "#768394",
				},
				"&.Mui-focused": {
					color: "#768394 !important",
				},
				"&.MuiOutlinedInput-root": {
					borderRadius: "6px !important",
					borderTopLeftRadius: "6px !important",
					borderTopRightRadius: "6px !important",
					background: "#FFFFFF",
				},
				"&.Mui-disabled": {
					background: "#F1F1F1",
				},
			}}
			className={classCustomer}
			MenuProps={{
				className: "select-custom",
			}}
			placeholder={placeholder}
			defaultValue={values}
			value={values}
			onChange={handleChangeInput}
			input={<OutlinedInput />}
			inputProps={{ "aria-label": "Without label" }}
			IconComponent={KeyboardArrowDownIcon}
			displayEmpty
			renderValue={values ? undefined : () => <Placeholder>{placeholder}</Placeholder>}
			{...selectProps}
		>
			{selectListData.map((item, index) => {
				return (
					<MenuItem disabled={Boolean(item.disabled)} value={item?.value} key={index}>
						{item?.title && item?.title?.length > 30 ? item?.title.slice(0, 48) + "..." : (item?.title ?? "")}
					</MenuItem>
				);
			})}
		</Select>
	);
};

export default SelectItems;
