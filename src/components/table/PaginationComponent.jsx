import { Pagination } from "@mui/material";

const PaginationComponent = ({ page, onChange, rowsPerPage = 12, rows, totalPage }) => {
	const count = totalPage ? totalPage : rows.length > rowsPerPage ? Math.ceil(rows.length / rowsPerPage) : 1;
	const isHidden = rows.length < 1;
	return isHidden ? (
		<></>
	) : (
		<Pagination
			count={count}
			page={page}
			onChange={onChange}
			shape="rounded"
			sx={{
				".MuiPaginationItem-page": {
					border: "none",
					color: "#768394",
				},
				".MuiPaginationItem-root": {
					border: "none",
					color: "#768394",
				},
				".Mui-selected": {
					color: "#515151",
					border: "1px solid var(--Admin-Color-Neutral-3, #ECECEC)",
					backgroundColor: "var(--Admin-Color-Neutral-4, #EFF1F5)",
				},
			}}
		/>
	);
};

export default PaginationComponent;
