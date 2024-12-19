/* eslint-disable react-hooks/exhaustive-deps */
import CardContainer from "@/components/card/CardContainer";
import FilmComponent from "@/components/film-component/FilmComponent";
import FormWrapper from "@/components/form/form-wraper";
import InputField from "@/components/form/input-field";
import SelectField from "@/components/form/select-field";
import Loading from "@/components/loading";
import { LIST_MANGA_STATUS, MANGA_STATE } from "@/constant/title";
import ChapterComponent from "@/features/chapter";
import { Box, FormLabel, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { schemaForm2 } from "./const/schema";
import { useParams } from "react-router-dom";

const EditComponent = ({ value, isLoadingDefault, refetch }) => {
	let { id } = useParams();
	const [title, setTitle] = useState();
	const [description, setDescription] = useState();
	const [values, setValues] = useState({
		id: id,
		name: title,
		plot_summary: description,
		status: MANGA_STATE[value?.manga_state],
		released: value?.released,
		original_url: value?.url,
		status_film: value?.status_film?.name,
		other_name: value?.titles?.[0]?.title,
		type: value?.category_subs?.[0]?.type,
	});
	const [isReset, setIsReset] = useState(false);
	const [selectFilm, setSelectFilm] = useState();

	useEffect(() => {
		let avatar = null;
		if (value?.url_image) {
			avatar = {
				name: value?.url_image,
				url: value?.url_image,
			};
		}
		setIsReset(!isReset);
		setValues({
			id: id,
			name: title,
			released: value?.released,
			original_url: value?.url,
			status_film: value?.status_film?.name,
			other_name: value?.titles?.[0]?.title,
			plot_summary: description,
			avatar: avatar,
			status: MANGA_STATE[value?.manga_state],
			type: value?.category_subs?.[0]?.type,
		});
	}, [value, isLoadingDefault, title]);

	useEffect(() => {
		if (value && value.code !== 400) {
			const enTitle = value.titles.find((item) => item.type === "en");
			const enDescription = value.descriptions.find((item) => item.type === "en");
			if (enTitle) {
				setTitle(enTitle.title);
			} else {
				const zhTitle = value.titles.find((item) => item.type === "zh");
				setTitle(zhTitle ? zhTitle.title : null);
			}
			if (enDescription) {
				setDescription(enDescription.description);
			} else {
				const zhDescription = value.descriptions.find((item) => item.type === "zh");
				setDescription(zhDescription ? zhDescription.description : null);
			}
		}
	}, [value]);

	return (
		<>
			<Loading isLoading={isLoadingDefault} />
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
													Information Manga
												</Typography>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<InputField
													label="Title"
													placeholder="name"
													registration={register("name")}
													error={errors["name"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={12}>
											<Box>
												<SelectField
													disabled={true}
													label="Status"
													registration={register("status")}
													error={errors["status"]}
													selectList={[
														{
															value: LIST_MANGA_STATUS.CRAWLED_BASIC_INFO.key,
															title: LIST_MANGA_STATUS.CRAWLED_BASIC_INFO.title,
															class: "input-active",
														},
														{
															value: LIST_MANGA_STATUS.CRAWLED_DETAIL_INFO.key,
															title: LIST_MANGA_STATUS.CRAWLED_DETAIL_INFO.title,
															class: "input-inactive",
														},
														{
															value: LIST_MANGA_STATUS.CRAWLING_INFO_CHAPTER.key,
															title: LIST_MANGA_STATUS.CRAWLING_INFO_CHAPTER.title,
															class: "input-inactive",
														},
														{
															value: LIST_MANGA_STATUS.TRANSLATING_CHAPTERS.key,
															title: LIST_MANGA_STATUS.TRANSLATING_CHAPTERS.title,
															class: "input-inactive",
														},
														{
															value: LIST_MANGA_STATUS.WAITING_NEW_CHAPTER.key,
															title: LIST_MANGA_STATUS.WAITING_NEW_CHAPTER.title,
														},
													]}
												/>
											</Box>
										</Grid>
										{/* <Grid item xs={24} md={24}>
											<Box>
												<InputField
													label="Type"
													placeholder="Type"
													registration={register("type")}
													error={errors["type"]}
													disabled={true}
												/>
											</Box>
										</Grid> */}
										{/* <Grid item xs={24} md={24}>
											<Box>
												<InputField
													label="Status Film"
													placeholder="Status film"
													registration={register("status_film")}
													error={errors["status_film"]}
													disabled={true}
												/>
											</Box>
										</Grid> */}
										<Grid item xs={24} md={24}>
											<Box>
												<InputField
													label="Origin name"
													placeholder="Origin name"
													registration={register("other_name")}
													error={errors["other_name"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										{/* <Grid item xs={24} md={24}>
											<Box>
												<InputField
													label="Released"
													placeholder="released"
													registration={register("released")}
													error={errors["released"]}
													disabled={true}
												/>
											</Box>
										</Grid> */}
										<Grid item xs={24} md={24}>
											<Box>
												<InputField
													label="Original url"
													placeholder="Original url"
													registration={register("original_url")}
													error={errors["original_url"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={24}>
											<Box>
												<InputField
													label="Summary"
													placeholder="plot_summary"
													registration={register("plot_summary")}
													error={errors["plot_summary"]}
													disabled={true}
													inputClassName="input-area"
													minRows={6}
													multiline
												/>
											</Box>
										</Grid>
										{/* <Grid item xs={24} md={24}>
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
													Episode
												</FormLabel>
												<div
													className="d-flex d-flex-nowrap"
													style={{
														marginTop: "6px",
													}}
												>
													{filmList.map((i, index) => {
														return (
															<div
																key={index}
																className="row-center"
																style={{
																	minWidth: "30px",
																	minHeight: "30px",
																	borderRadius: "8px",
																	backgroundColor: "#A3A3A3",
																	color: "white",
																	cursor: "pointer",
																}}
																onClick={() => setSelectFilm(i)}
															>
																{i?.current_episode}
															</div>
														);
													})}
												</div>
											</Box>
										</Grid> */}
										<Grid item xs={24} md={12}>
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
													<img width={"400px"} alt={title} src={value?.cover_image} />
												</div>
											</Box>
										</Grid>
									</Grid>
								</Box>
							</CardContainer>
						</>
					);
				}}
			</FormWrapper>
			<ChapterComponent idManga={id} />
			{selectFilm && <FilmComponent setSelectFilm={setSelectFilm} selectFilm={selectFilm} />}
		</>
	);
};

export default EditComponent;
