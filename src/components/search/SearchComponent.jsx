import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@/components/icons/search-icon";
import { Box } from "@mui/material";

const SearchComponent = ({ handleChange, value, handleSubmit }) => {
	const handleChangeSearch = (e) => {
		if (e.key === "Enter") {
			handleSubmit();
		}
	};
	return (
		<Paper
			sx={{
				display: "flex",
				alignItems: "center",
				width: "250px",
				height: "40px",
				padding: "12px 16px 12px 16px",
				gap: "8px",
				borderRadius: "6px",
				background: "#FFFFFF",
				border: "1px solid #DDDDDD",
				color: "#727C8A",
				boxShadow: "none",
				opacity: 1,
				"input::placeholder": {
					color: "#727C8A !important",
					opacity: 1,
				},
			}}
		>
			<Box className={"rowy-center"}>
				<SearchIcon />
			</Box>
			<InputBase
				value={value}
				sx={{ flex: 1 }}
				placeholder="Search"
				onChange={handleChange}
				onKeyDown={handleChangeSearch}
			/>
		</Paper>
	);
};

export default SearchComponent;
