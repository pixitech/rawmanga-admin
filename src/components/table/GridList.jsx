import { Box, CircularProgress } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import PaginationComponent from "./PaginationComponent";

const GridList = ({ columns, rows, handleChangePage, totalPage, rowsPerPage, page, searchComponent, isLoading }) => {
	const [rowList, setRowList] = useState([]);

	useEffect(() => {
		setRowList(rows);
	}, [rows]);

	return (
		<Box>
			{searchComponent ? searchComponent : <></>}
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow className="table-header">
							{columns.map((column) => (
								<TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody className="table-body">
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={columns?.length ?? 0} align="center">
									<CircularProgress />
								</TableCell>
							</TableRow>
						) : (
							rowList.map((row, index) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={`${index}`}>
										{columns.map((column, indexColumns) => {
											const value = row[column.id];
											return (
												<TableCell key={column.id} align={column.align}>
													{column.format ? column.format(value, row, index + 1) : value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<Box className="row-center" mt={2.5} mb={2.5}>
				<PaginationComponent
					page={page}
					onChange={handleChangePage}
					rowsPerPage={rowsPerPage}
					rows={rows}
					totalPage={totalPage}
				/>
			</Box>
		</Box>
	);
};

export default GridList;
