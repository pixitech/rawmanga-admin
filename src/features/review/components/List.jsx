/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import ActionComponent from "@/components/action/ActionComponent";
import ButtonSearch from "@/components/button/ButtonSearch";
import CardContainer from "@/components/card/CardContainer";
import SearchComponent from "@/components/search/SearchComponent";
import SelectSort from "@/components/select/SelectSort";
import StatusComponent from "@/components/status/StatusComponent";
import GridList from "@/components/table/GridList";
import LineComponent from "@/components/text/LineComponent";
import { STATUS_REVIEW_TITLE_ENUM } from "@/constant/title";
import { useGetMoviesList, useGetMoviesMappingList } from "@/hooks";
import { Box, Typography } from "@mui/material";

const ListComponent = () => {
	let [searchParams] = useSearchParams();
	let pageDefault = searchParams.get("page") || 1;
	let statusDefault = searchParams.get("status") || "";
	const [page, setPage] = useState(Number(pageDefault));
	const [rows, setRows] = useState([]);
	const [columns, setColumns] = useState([]);
	const [total, setTotal] = useState(0);
	let rowsPerPage = 50;
	const [keyword, setKeyword] = useState("");
	const [status, setStatus] = useState(statusDefault || STATUS_REVIEW_TITLE_ENUM.Pending.key);
	const [params, setParams] = useState({
		page: page,
		pageSize: rowsPerPage,
		mapping_status: "not-yet-mapped",
		review_status: status,
	});

	const { data = { items: [] }, isLoading } = useGetMoviesList(params);
	const { data: dataMapping = { items: [] }, isLoading: loadingMapping } = useGetMoviesMappingList(params);
	const totalPage = Math.ceil(total / rowsPerPage);

	const navigate = useNavigate();

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		setParams({ ...params, page: newPage });
	};

	const handleChangeStatus = (event) => {
		const {
			target: { value },
		} = event;
		setStatus(value);
		setPage(1);
		setParams({ ...params, page: 1, review_status: value, keyword: keyword });
		navigate(`/review?status=${value}`);
	};

	const columnsList = [
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
			id: "name",
			label: "Title",
			format: (value, data) => (
				<LineComponent className={"cursor-pointer"} line1={value} onClick={() => navigate(`/review/${data?._id}`)} />
			),
		},
		{
			id: "released",
			label: "Released",
			format: (value, data) => <LineComponent line1={value} />,
		},
		{
			id: "total_episode",
			label: "Episode",
			format: (value, data) => <LineComponent line1={value} />,
		},
		{
			id: "original_url",
			label: "Crawl Source",
			format: (value, data) => (
				<a href={value} target="_blank" rel="noopener noreferrer">
					{value}
				</a>
			),
		},
		{
			id: "review_status",
			label: "Status",
			format: (value, data) => <StatusComponent value={data?.review_status} />,
		},
		{
			id: "action",
			label: "Action",
			format: (value, data) => {
				return (
					<a href={`/review/${data?._id}?status=${status}`}>
						<ActionComponent onEdit={() => {}} isHiddenDelete={false} />
					</a>
				);
			},
		},
	];
	const columnsListMergWithSelf = [
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
			id: "name",
			label: "Title",
			format: (value, data) => (
				<LineComponent className={"cursor-pointer"} line1={value} onClick={() => navigate(`/review/${data?._id}`)} />
			),
		},
		{
			id: "released",
			label: "Released",
			format: (value, data) => <LineComponent line1={value} />,
		},
		{
			id: "total_episode",
			label: "Episode",
			format: (value, data) => <LineComponent line1={value} />,
		},
		{
			id: "original_url",
			label: "Crawl Source",
			format: (value, data) => (
				<a href={value} target="_blank" rel="noopener noreferrer">
					{value}
				</a>
			),
		},
		{
			id: "review_status",
			label: "Status",
			format: (value, data) => <StatusComponent value={data?.review_status} />,
		},
	];
	const columnsMapping = [
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
					<a href={`/review/${data?.sources?.[1]?.id}?anime_list=${data?.sources?.[0]?.id}&&status=${status}`}>
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
		switch (status) {
			case STATUS_REVIEW_TITLE_ENUM.DONE.key:
				setRows(dataMapping?.items);
				setColumns(columnsMapping);
				setTotal(dataMapping?.total);
				break;
			case STATUS_REVIEW_TITLE_ENUM.Rejected.key:
				setRows(data?.items);
				setColumns(columnsListMergWithSelf);
				setTotal(data?.total);
				break;
			default:
				setRows(data?.items);
				setColumns(columnsList);
				setTotal(data?.total);
				break;
		}
	}, [data?.items?.length, dataMapping?.items?.length]);

	return (
		<CardContainer>
			<GridList
				isLoading={isLoading || loadingMapping}
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
							<SelectSort
								handleChange={handleChangeStatus}
								value={status}
								sortList={[
									{
										value: STATUS_REVIEW_TITLE_ENUM.Rejected.key,
										title: STATUS_REVIEW_TITLE_ENUM.Rejected.title,
									},
									{
										value: STATUS_REVIEW_TITLE_ENUM.Pending.key,
										title: STATUS_REVIEW_TITLE_ENUM.Pending.title,
									},
									{
										value: STATUS_REVIEW_TITLE_ENUM.DONE.key,
										title: STATUS_REVIEW_TITLE_ENUM.DONE.title,
									},
								]}
							/>
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
