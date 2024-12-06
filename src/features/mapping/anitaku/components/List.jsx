import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import ActionComponent from "@/components/action/ActionComponent";
import CardContainer from "@/components/card/CardContainer";
import StatusComponent from "@/components/status/StatusComponent";
import GridList from "@/components/table/GridList";
import LineComponent from "@/components/text/LineComponent";
import { useGetMoviesList } from "@/hooks";
import { Box, Typography } from "@mui/material";
import SearchComponent from "@/components/search/SearchComponent";
import ButtonSearch from "@/components/button/ButtonSearch";
import { STATUS_MAPPING_ENUM, STATUS_MAPPING_SEARCH_ENUM, STATUS_MAPPING_TITLE_ENUM } from "@/constant/title";
import SelectSort from "@/components/select/SelectSort";

const ListComponent = () => {
	let [searchParams] = useSearchParams();
	let pageDefault = searchParams.get("page") ?? 1;
	const [page, setPage] = useState(pageDefault);
	let rowsPerPage = 50;
	const [keyword, setKeyword] = useState("");
	const [status, setStatus] = useState(
		`${STATUS_MAPPING_SEARCH_ENUM.NOT_YET_MAPPED},${STATUS_MAPPING_SEARCH_ENUM.MAPPING_FAILED}`
	);
	const [params, setParams] = useState({
		page: page,
		pageSize: rowsPerPage,
		mapping_status: status,
	});

	const { data, refetch, isLoading } = useGetMoviesList(params);

	let rows = data?.items ? data.items : [];
	const total = data?.total ?? 0;
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
		setParams({ ...params, page: 1, pageSize: 12, mapping_status: value, keyword: keyword });
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
			id: "name",
			label: "Title",
			format: (value, data) => (
				<LineComponent
					className={"cursor-pointer"}
					line1={value}
					onClick={() => navigate(`/mapping/anitaku/${data?._id}`)}
				/>
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
			id: "mapping_status",
			label: "Mapping Status",
			format: (value, data) => <StatusComponent value={data?.mapping_status ?? STATUS_MAPPING_ENUM.NOT_YET_MAPPED} />,
		},
		{
			id: "download_status",
			label: "Status",
			format: (value, data) => <StatusComponent value={data?.download_status} />,
		},
		{
			id: "action",
			label: "Action",
			format: (value, data) => {
				return (
					<a href={`/mapping/anitaku/${data?._id}`}>
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
							<SelectSort
								handleChange={handleChangeStatus}
								value={status}
								sortList={[
									{
										value: `${STATUS_MAPPING_SEARCH_ENUM.NOT_YET_MAPPED},${STATUS_MAPPING_SEARCH_ENUM.MAPPING_FAILED}`,
										title: "All status",
									},
									{
										value: `${STATUS_MAPPING_SEARCH_ENUM.MAPPING_FAILED}`,
										title: STATUS_MAPPING_TITLE_ENUM.MAPPING_FAILED.title,
									},
									{
										value: STATUS_MAPPING_SEARCH_ENUM.NOT_YET_MAPPED,
										title: STATUS_MAPPING_TITLE_ENUM.NOT_YET_MAPPED.title,
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
