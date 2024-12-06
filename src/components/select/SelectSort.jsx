import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FormControl, MenuItem, OutlinedInput, Select } from "@mui/material";

const SelectSort = ({ handleChange, value, sortList = [] }) => {
	let sortListData = sortList ?? [];
	return (
		<FormControl>
			<Select
				displayEmpty
				sx={{
					fontWeight: 600,
					fontSize: "14px",
					boxShadow: "none",
					"& .MuiSvgIcon-root": {
						color: "#F38D03",
					},
					".MuiOutlinedInput-input": {
						padding: "4px 32px 4px 8px !important",
						color: "#F38D03",
					},
					".MuiOutlinedInput-notchedOutline": {
						border: 0,
					},
					"&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
						border: 0,
					},
					"&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
						border: 0,
					},
				}}
				value={value}
				onChange={handleChange}
				input={<OutlinedInput />}
				MenuProps={{
					className: "select-custom",
				}}
				inputProps={{ "aria-label": "Without label" }}
				IconComponent={KeyboardArrowDownIcon}
			>
				{sortListData.map((item, index) => {
					return (
						<MenuItem value={item?.value} key={index}>
							{item?.title}
						</MenuItem>
					);
				})}
			</Select>
		</FormControl>
	);
};

export default SelectSort;
