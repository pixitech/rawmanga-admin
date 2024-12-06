/* eslint-disable react-hooks/exhaustive-deps */
import ActionComponent from "@/components/action/ActionComponent";
import ButtonSearch from "@/components/button/ButtonSearch";
import CardContainer from "@/components/card/CardContainer";
import SearchComponent from "@/components/search/SearchComponent";
import StatusComponent from "@/components/status/StatusComponent";
import GridList from "@/components/table/GridList";
import LineComponent from "@/components/text/LineComponent";
import { CHAPTER_STATE, CHAPTER_STATE_TO_STATUS } from "@/constant/title";
import { useGetListChapter } from "@/hooks/manga";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListComponent = ({ idManga }) => {
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	let rowsPerPage = 10;
	const [keyword, setKeyword] = useState("");
	const [params, setParams] = useState({
		page: page,
		pageSize: rowsPerPage,
		id: idManga,
	});
	const { data, refetch, isLoading } = useGetListChapter(params);
	let rows = data?.items ? data.items : [];
	const total = data?.total ?? 0;
	const totalPending = data?.total_pending ?? 0;
	const totalCompleted = data?.total_completed ?? 0;
	const totalPage = Math.ceil(total / rowsPerPage);
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
					line1ClassName={"min-width-100"}
					line1={value ? moment(moment.utc(value).toDate()).local()?.format("HH:mm") : ""}
					line2={value ? moment(moment.utc(value).toDate()).local()?.format("DD/MM/YYYY") : ""}
				/>
			),
		},
		{
			id: "titles",
			label: "Title",
			format: (value = [], data) => {
				let title;
				const enTitle = value.find((item) => item.type === "en");
				if (enTitle) {
					title = enTitle.title;
				} else {
					const zhTitle = value.find((item) => item.type === "zh");
					title = zhTitle ? zhTitle.title : null;
				}
				return (
					<LineComponent className={"cursor-pointer"} line1={title} onClick={() => navigate(`/anitaku/${data?._id}`)} />
				);
			},
		},
		{
			id: "url",
			label: "Crawl Source",
			format: (value, data) => (
				<a href={value} target="_blank" rel="noopener noreferrer">
					{value}
				</a>
			),
		},
		{
			id: "state",
			label: "State",
			format: (value, data) => {
				const state = CHAPTER_STATE[value];
				const status = CHAPTER_STATE_TO_STATUS[state];
				return <StatusComponent value={status} />;
			},
		},
		{
			id: "action",
			label: "Action",
			format: (value, data) => {
				return (
					<a href={`/chapter/${data?._id}`}>
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

	useEffect(() => {
		setParams({ ...params, id: idManga });
	}, [idManga]);
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
							<Box className="d-flex">
								<Typography variant="h5" fontSize="20px" mr={1.25}>
									Total: {total},
								</Typography>
								<Typography variant="h5" fontSize="20px" mr={1.25}>
									Pending: {totalPending},
								</Typography>
								<Typography variant="h5" fontSize="20px" mr={1.25}>
									Completed: {totalCompleted}
								</Typography>
							</Box>
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
