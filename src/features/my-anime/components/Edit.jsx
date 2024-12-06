/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import CardContainer from "@/components/card/CardContainer";
import FormWrapper from "@/components/form/form-wraper";
import InputField from "@/components/form/input-field";
import Loading from "@/components/loading";
import { useGetFilmInfoById } from "@/hooks";
import { Box, FormLabel, Grid, Typography } from "@mui/material";

import ButtonAdd from "@/components/button/ButtonAdd";
import FilmComponent from "@/components/film-component/FilmComponent";
import GridList from "@/components/table/GridList";
import LineComponent from "@/components/text/LineComponent";
import ShowImage from "@/components/upload/ShowImage";
import moment from "moment";
import { schemaForm2 } from "./const/schema";

const EditComponent = ({ value, isLoadingDefault, refetch }) => {
	const id = value?._id;
	console.log("value", value);

	const [page, setPage] = useState(1);
	const [values, setValues] = useState({
		id: id,
	});
	const [isReset, setIsReset] = useState(false);
	const [filmList, setFilmList] = useState([]);
	const [selectFilm, setSelectFilm] = useState();
	let rowsPerPage = 50;
	const [params, setParams] = useState({
		page: page,
		pageSize: rowsPerPage,
		id: id,
	});

	const { data, refetch: refetchList, isLoading } = useGetFilmInfoById(params);

	let rows = data?.items ? data.items : [];
	const total = data?.total ?? 0;
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
					line1={value ? moment(moment.utc(value).toDate()).local()?.format("HH:mm") : ""}
					line2={value ? moment(moment.utc(value).toDate()).local()?.format("DD/MM/YYYY") : ""}
				/>
			),
		},
		{
			id: "title",
			label: "Title",
			format: (value, data) => <LineComponent line1={value} />,
		},
		{
			id: "mal_id",
			label: "Episode",
			format: (value, data) => <LineComponent line1={value} />,
		},
		{
			id: "score",
			label: "Score",
			format: (value, data) => <LineComponent line1={value} />,
		},
		{
			id: "synopsis",
			label: "Synopsis",
			format: (value, data) => <LineComponent line1={value} line1ClassName={"limit-text-3"} />,
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
	];

	useEffect(() => {
		refetchList();
	}, [params]);

	useEffect(() => {
		setParams({ ...params, id: id });
	}, [id]);

	useEffect(() => {
		let avatar = null;
		if (value?.image?.url || value?.images?.jpg?.image_url) {
			avatar = {
				name: value?.image?.url ?? value?.images?.jpg?.image_url,
				url: value?.image?.url ?? value?.images?.jpg?.image_url,
			};
		}
		setIsReset(!isReset);
		let genres_string = "";
		if (value?.genres) {
			value?.genres.map((i) => {
				if (genres_string?.length > 0) {
					genres_string += `, ${i.name}`;
				} else {
					genres_string += i.name;
				}
			});
		}
		setValues({
			id: id,
			avatar: avatar,
			premiered: `${value?.season} ${value?.year}`,
			genres_string: genres_string,
			score_string: `${value?.score}  (scored by ${value?.scored_by} users)`,
			...value,
		});
	}, [value, isLoadingDefault]);

	useEffect(() => {
		let valueList = data?.items;
		if (valueList) {
			setFilmList(valueList.reverse());
		}
	}, [data]);

	return (
		<>
			<Loading isLoading={isLoading || isLoadingDefault} />
			<FormWrapper
				id="formWrapper2"
				schema={schemaForm2}
				isReset={isReset}
				defaultValues={{
					...values,
				}}
			>
				{({ register, formState: { errors }, getValues }) => {
					return (
						<>
							<CardContainer mb={2.5}>
								<Box>
									<Grid container columns={24} spacing={2.5}>
										<Grid item xs={24} md={24}>
											<Box>
												<Typography variant="h5" fontSize="20px" mr={1.25} fontWeight={600}>
													Information
												</Typography>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Title"
													placeholder="title"
													registration={register("title")}
													error={errors["title"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Type"
													placeholder="type"
													registration={register("type")}
													error={errors["type"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Year"
													placeholder="year"
													registration={register("year")}
													error={errors["year"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Episodes"
													placeholder="Episodes"
													registration={register("episodes")}
													error={errors["episodes"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Status"
													placeholder="status_info"
													registration={register("status_info")}
													error={errors["status_info"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Aired"
													placeholder="Aired"
													registration={register("aired.string")}
													error={errors["aired.string"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Premiered"
													placeholder="Premiered"
													registration={register("premiered")}
													error={errors["premiered"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Broadcast"
													placeholder="broadcast.string"
													registration={register("broadcast.string")}
													error={errors["broadcast.string"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Producers"
													placeholder="Producers"
													registration={register("producers[0].name")}
													error={errors["producers[0].name"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Licensors"
													placeholder="licensors"
													registration={register("licensors[0].name")}
													error={errors["licensors[0].name"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Studios"
													placeholder="studios"
													registration={register("studios[0].name")}
													error={errors["studios[0].name"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Source"
													placeholder="source"
													registration={register("source")}
													error={errors["source"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Genres"
													placeholder="genres_string"
													registration={register("genres_string")}
													error={errors["genres_string"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Theme"
													placeholder="Theme"
													registration={register("themes[0].name")}
													error={errors["themes[0].name"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Demographics"
													placeholder="demographics"
													registration={register("demographics[0].name")}
													error={errors["demographics[0].name"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Duration"
													placeholder="duration"
													registration={register("duration")}
													error={errors["duration"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Crawl Source"
													placeholder="Crawl Source"
													registration={register("url")}
													error={errors["url"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Rating"
													placeholder="Rating"
													registration={register("rating")}
													error={errors["rating"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Score"
													placeholder="score_string"
													registration={register("score_string")}
													error={errors["score_string"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Ranked"
													placeholder="rank"
													registration={register("rank")}
													error={errors["rank"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Popularity"
													placeholder="popularity"
													registration={register("popularity")}
													error={errors["popularity"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Members"
													placeholder="members"
													registration={register("members")}
													error={errors["members"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Favorites"
													placeholder="favorites"
													registration={register("favorites")}
													error={errors["favorites"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={24}>
											<Box>
												<InputField
													label="Synopsis"
													placeholder="synopsis"
													registration={register("synopsis")}
													error={errors["synopsis"]}
													disabled={true}
													inputClassName="input-area"
													minRows={6}
													multiline
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={24}>
											<Box>
												<InputField
													label="Background"
													placeholder="background"
													registration={register("background")}
													error={errors["background"]}
													disabled={true}
													inputClassName="input-area"
													minRows={6}
													multiline
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={24}>
											<Box>
												<FormLabel
													{...{
														sx: {
															marginBottom: 1,
															fontSize: "12px",
															fontWeight: 500,
															color: "#768394 !important",
														},
													}}
												>
													Image
												</FormLabel>
												<div>
													<ShowImage id={id} imageURl={value?.images?.jpg?.image_url} />
												</div>
											</Box>
										</Grid>
										<Grid item xs={24} md={24}>
											<Box>
												<FormLabel
													{...{
														sx: {
															marginBottom: 1,
															fontSize: "12px",
															fontWeight: 500,
															color: "#768394 !important",
														},
													}}
												>
													PV DVD Box version
												</FormLabel>
												<div>
													{values?.trailer?.embed_url && (
														<div>
															<ButtonAdd
																handleChange={() => {
																	setSelectFilm({ app_url: values?.trailer?.embed_url });
																}}
																isHiddenIcon={true}
																type="submit"
																label={"Play Trailer"}
															/>
															<div className="mt-8">
																<a href={values?.trailer?.embed_url} target="_blank" rel="noopener noreferrer">
																	{values?.trailer?.embed_url}
																</a>
															</div>
														</div>
													)}
												</div>
											</Box>
										</Grid>
									</Grid>
								</Box>
							</CardContainer>

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
													Total episode: {total}
												</Typography>
											</Box>
										</Box>
									}
								/>
							</CardContainer>

							{selectFilm && <FilmComponent setSelectFilm={setSelectFilm} selectFilm={selectFilm} />}
						</>
					);
				}}
			</FormWrapper>
		</>
	);
};

export default EditComponent;
