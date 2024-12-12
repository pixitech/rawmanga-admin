/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ActionComponent from "@/components/action/ActionComponent";
import ButtonSearch from "@/components/button/ButtonSearch";
import CardContainer from "@/components/card/CardContainer";
import SearchComponent from "@/components/search/SearchComponent";
import StatusComponent from "@/components/status/StatusComponent";
import GridList from "@/components/table/GridList";
import LineComponent from "@/components/text/LineComponent";
import { useGetMangaList } from "@/hooks/manga";
import { Box, Typography } from "@mui/material";
import { MANGA_STATE, MANGA_STATE_TO_STATUS } from "@/constant/title";

const ListComponent = () => {
	let [searchParams] = useSearchParams();
	let pageDefault = searchParams.get("page") || 1;
	const [page, setPage] = useState(Number(pageDefault));
	let rowsPerPage = 50;
	const [keyword, setKeyword] = useState("");
	const [params, setParams] = useState({
		page: page,
		pageSize: rowsPerPage,
	});
	const { data, refetch, isLoading } = useGetMangaList(params);

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
					<LineComponent
						className={"cursor-pointer"}
						line1={title}
						onClick={() => navigate(`/rumanhua/${data?._id}`)}
					/>
				);
			},
		},
		// {
		// 	id: "released",
		// 	label: "Released",
		// 	format: (value, data) => <LineComponent line1={value} />,
		// },
		// {
		// 	id: "total_episode",
		// 	label: "Episode",
		// 	format: (value, data) => <LineComponent line1={value} />,
		// },
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
			id: "manga_state",
			label: "State",
			format: (value, data) => {
				const state = MANGA_STATE[value];
				const status = MANGA_STATE_TO_STATUS[state];
				return <StatusComponent value={status} />;
			},
		},
		{
			id: "action",
			label: "Action",
			format: (value, data) => {
				return (
					<a href={`/rumanhua/${data?._id}`}>
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
							<Box className="d-flex">
								<Typography variant="h5" fontSize="20px" mr={1.25}>
									Total Manga: {total}
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
