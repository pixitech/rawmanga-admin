import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import ActionComponent from "@/components/action/ActionComponent";
import ButtonSearch from "@/components/button/ButtonSearch";
import CardContainer from "@/components/card/CardContainer";
import SearchComponent from "@/components/search/SearchComponent";
import GridList from "@/components/table/GridList";
import LineComponent from "@/components/text/LineComponent";
import { useGetMappingList } from "@/hooks";
import { Box, Typography } from "@mui/material";
import StatusComponent from "@/components/status/StatusComponent";

const ListComponent = () => {
	let [searchParams] = useSearchParams();
	let pageDefault = searchParams.get("page") ?? 1;
	const [page, setPage] = useState(Number(pageDefault));
	let rowsPerPage = 50;
	const [keyword, setKeyword] = useState("");

	const [params, setParams] = useState({
		page: page,
		pageSize: rowsPerPage,
	});

	const { data, refetch, isLoading } = useGetMappingList(params);

	let rows = data?.items ? data.items : [];
	const total = data?.total ?? 0;
	const totalPage = Math.ceil(total / rowsPerPage);

	const navigate = useNavigate();

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		setParams({ ...params, page: newPage });
	};

	const columns = [
		{
			id: "createdAt",
			label: "Created Date",
			format: (value, data) => (
				<LineComponent
					line1={value ? moment(moment.utc(value).toDate()).local()?.format("HH:mm") : ""}
					line2={value ? moment(moment.utc(value).toDate()).local()?.format("DD/MM/YYYY") : ""}
				/>
			),
		},
		{
			id: "title",
			label: "Title",
			format: (value, data) => (
				<LineComponent className={"cursor-pointer"} line1={value} onClick={() => navigate(`/public/${data?._id}`)} />
			),
		},
		{
			id: "status",
			label: "Crawl Status",
			format: (value, data) => <StatusComponent value={data?.status} />,
		},
		{
			id: "year",
			label: "Released",
			format: (value, data) => <LineComponent line1={value} />,
		},
		{
			id: "episodes",
			label: "Episode",
			format: (value, data) => <LineComponent line1={value} />,
		},
		{
			id: "action",
			label: "Action",
			format: (value, data) => {
				return (
					<a href={`/public/${data?._id}`}>
						<ActionComponent onEdit={() => {}} isHiddenDelete={false} />
					</a>
				);
			},
		},
	];

	const handleChangeSearch = (event) => {
		const {
			target: { value },
		} = event;
		setKeyword(value);
	};

	const handleSearch = () => {
		setPage(1);
		setParams({ ...params, page: 1, pageSize: rowsPerPage, keyword: keyword });
	};

	useEffect(() => {
		refetch();
	}, [params]);

	return (
		<CardContainer>
			<GridList
				isLoading={isLoading}
				columns={columns}
				rows={rows}
				handleChangePage={handleChangePage}
				totalPage={totalPage}
				rowsPerPage={rowsPerPage}
				page={page}
				searchComponent={
					<Box mb={2.5} className={"rowy-sb-center"}>
						<Box className={"rowy-center flex-row-wrap"}>
							<Typography variant="h5" fontSize="20px" mr={1.25}>
								Total: {total}
							</Typography>
						</Box>
						<Box className={"rowy-center-end flex-row-wrap"} gap={"10px"}>
							<SearchComponent value={keyword} handleChange={handleChangeSearch} handleSubmit={handleSearch} />
							<ButtonSearch handleChange={handleSearch} />
						</Box>
					</Box>
				}
			/>
		</CardContainer>
	);
};

export default ListComponent;
