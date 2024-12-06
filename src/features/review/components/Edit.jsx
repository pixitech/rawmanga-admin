/* eslint-disable react-hooks/exhaustive-deps */
import ButtonAdd from "@/components/button/ButtonAdd";
import ButtonCancel from "@/components/button/ButtonCancel";
import CardContainer from "@/components/card/CardContainer";
import FilmComponent from "@/components/film-component/FilmComponent";
import FormWrapper from "@/components/form/form-wraper";
import InputField from "@/components/form/input-field";
import SelectField from "@/components/form/select-field";
import Loading from "@/components/loading";
import DeleteModal from "@/components/modal/DeleteModal";
import ShowImage from "@/components/upload/ShowImage";
import { FILM_STATUS, STATUS_MAPPING_SEARCH_ENUM, STATUS_REVIEW_TITLE_ENUM } from "@/constant/title";
import { useGetFilm, useGetInfoById, useGetInfoList, useRejectMapping, useUpdateMapping } from "@/hooks";
import MySnackBar from "@/utils/snackbar";
import { Autocomplete, Box, FormLabel, Grid, TextField, Typography } from "@mui/material";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { schemaForm, schemaForm2 } from "./const/schema";

const EditComponent = ({ value, isLoadingDefault, refetch }) => {
	let [searchParams] = useSearchParams();
	const id_myanime = searchParams.get("anime_list");
	const status = searchParams.get("status");
	const id = value?._id;
	const { data: dataFilmMyAnime = {} } = useGetInfoById(id_myanime);
	const { isLoading } = useGetFilm(id);
	const [values, setValues] = useState({
		id: id,
		name: value?.name,
		plot_summary: value?.plot_summary,
		status: value?.status,
		released: value?.released,
		original_url: value?.original_url,
		status_film: value?.status_film?.name,
		other_name: value?.other_name,
	});
	const [remove, setRemove] = useState(false);
	const [myAnimeListSelect, setMyAnimeListSelect] = useState();

	const { mutateAsync: mutateUpdate, isLoading: loadingUpdate } = useUpdateMapping();
	const { mutateAsync: mutateReject, isLoading: loadingReject } = useRejectMapping();
	const [params, setParams] = useState({
		page: 1,
		pageSize: 50,
		mapping_status: `${STATUS_MAPPING_SEARCH_ENUM.NOT_YET_MAPPED},${STATUS_MAPPING_SEARCH_ENUM.MAPPING_FAILED}`,
	});
	const { data: dataValue, isLoading: isLoadingList } = useGetInfoList(params);
	let dataList = dataValue?.items
		? dataValue?.items.map((i) => {
				return {
					label: `${i?.mal_id} - ${i?.title}`,
					value: i?._id,
				};
			})
		: [];

	const [isReset, setIsReset] = useState(false);
	// const [filmList, setFilmList] = useState([]);
	const [selectFilm, setSelectFilm] = useState();

	const navigate = useNavigate();

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
			name: value?.name,
			released: value?.released,
			original_url: value?.original_url,
			status_film: value?.status_film?.name,
			other_name: value?.other_name,
			plot_summary: value?.plot_summary,
			avatar: avatar,
			status: value?.download_status,
		});
	}, [value, isLoadingDefault]);
	useEffect(() => {
		if (dataFilmMyAnime?._id) {
			setMyAnimeListSelect({
				id: dataFilmMyAnime._id,
				name: dataFilmMyAnime?.title ?? "",
				released: dataFilmMyAnime?.year || dataFilmMyAnime?.aired?.prop?.from?.year || "",
				status_film: dataFilmMyAnime?.status_info || "",
				other_name: dataFilmMyAnime?.title_english || dataFilmMyAnime?.title_japanese || "",
				plot_summary: dataFilmMyAnime?.background || "",
				synopsis: dataFilmMyAnime?.synopsis || "",
				avatar: {},
				status: dataFilmMyAnime?.status || "",
			});
		}
	}, [dataFilmMyAnime?._id]);
	// useEffect(() => {
	// 	let valueList = data;
	// 	if (data) {
	// 		setFilmList(valueList.reverse());
	// 	}
	// }, [data]);
	useEffect(() => {
		if (values?.film_info && dataValue?.items) {
			let MyAnimeListSelect = dataValue?.items.find((i) => i?._id === values?.film_info);
			let avatar = null;
			if (MyAnimeListSelect?.image?.url || MyAnimeListSelect?.images?.jpg?.image_url) {
				avatar = {
					name: MyAnimeListSelect?.image?.url ?? MyAnimeListSelect?.images?.jpg?.image_url,
					url: MyAnimeListSelect?.image?.url ?? MyAnimeListSelect?.images?.jpg?.image_url,
				};
			}
			setIsReset(!isReset);
			setMyAnimeListSelect({
				id: id,
				name: MyAnimeListSelect?.title ?? "",
				released: MyAnimeListSelect?.year || MyAnimeListSelect?.aired?.prop?.from?.year || "",
				status_film: MyAnimeListSelect?.status_info ?? "",
				other_name: MyAnimeListSelect?.title_english ?? MyAnimeListSelect?.title_japanese ?? "",
				plot_summary: MyAnimeListSelect?.background ?? "",
				synopsis: MyAnimeListSelect?.synopsis ?? "",
				avatar: avatar,
				status: MyAnimeListSelect?.status ?? "",
			});
		} else {
			setIsReset(!isReset);
			if (dataFilmMyAnime?._id) {
				setMyAnimeListSelect({
					id: dataFilmMyAnime._id,
					name: dataFilmMyAnime?.title ?? "",
					released: dataFilmMyAnime?.year || dataFilmMyAnime?.aired?.prop?.from?.year || "",
					status_film: dataFilmMyAnime?.status_info || "",
					other_name: dataFilmMyAnime?.title_english || dataFilmMyAnime?.title_japanese || "",
					plot_summary: dataFilmMyAnime?.background || "",
					synopsis: dataFilmMyAnime?.synopsis || "",
					avatar: {
						name: dataFilmMyAnime?.images?.jpg?.image_url || "",
						url: dataFilmMyAnime?.images?.jpg?.image_url || "",
					},
					status: dataFilmMyAnime?.status || "",
				});
			} else {
				setMyAnimeListSelect({
					name: "",
					released: "",
					status_film: "",
					other_name: "",
					plot_summary: "",
					synopsis: "",
					avatar: null,
					status: "",
				});
			}
		}
	}, [values?.film_info]);

	const handleCancel = () => {
		let payload = {
			film_crawl: id,
			film_info: null,
		};
		if (values?.film_info) {
			payload.film_info = values?.film_info;
		}

		mutateReject(payload)
			.then((e) => {
				if (e?.errorCode) {
					MySnackBar.error({ message: e?.message ?? e?.errorCode });
				} else {
					MySnackBar.success({ message: "Reject successfully" });
					navigate(`/review`);
				}
			})
			.catch(({ response }) => {
				MySnackBar.error({ message: response?.data?.message });
			});
	};

	const handleSubmit = async () => {
		if (!values?.film_info) {
			setRemove(true);
			return;
		}
		let payload = {
			film_crawl: id,
			film_info: values?.film_info,
		};

		mutateUpdate(payload)
			.then((e) => {
				if (e?.errorCode) {
					MySnackBar.error({ message: e?.message ?? e?.errorCode });
				} else {
					MySnackBar.success({ message: "Mapping successfully" });
					navigate(`/review`);
				}
			})
			.catch(({ response }) => {
				MySnackBar.error({ message: response?.data?.message });
			});
	};

	const handleSubmit2 = async () => {
		let payload = {
			film_crawl: id,
		};

		mutateUpdate(payload)
			.then((e) => {
				if (e?.errorCode) {
					MySnackBar.error({ message: e?.message ?? e?.errorCode });
				} else {
					MySnackBar.success({ message: "Mapping successfully" });
					navigate(`/review`);
				}
			})
			.catch(({ response }) => {
				MySnackBar.error({ message: response?.data?.message });
			});
	};
	return (
		<>
			<Loading isLoading={isLoading || isLoadingDefault || loadingUpdate || loadingReject} />
			<Row gutter={24}>
				<Col span={12}>
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
														<Typography variant="h5" fontSize="20px" mr={1.25} fontWeight={600} height={"42px"}>
															Anitaku
														</Typography>
													</Box>
												</Grid>
												<Grid item xs={24} md={24}>
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
												<Grid item xs={24} md={24}>
													<Box>
														<InputField
															label="Released"
															placeholder="released"
															registration={register("released")}
															error={errors["released"]}
															disabled={true}
														/>
													</Box>
												</Grid>
												<Grid item xs={24} md={24}>
													<Box>
														<InputField
															label="Other name"
															placeholder="Other name"
															registration={register("other_name")}
															error={errors["other_name"]}
															disabled={true}
														/>
													</Box>
												</Grid>
												<Grid item xs={24} md={24}>
													<Box>
														<SelectField
															disabled={true}
															label="Crawl Status"
															registration={register("status")}
															error={errors["status"]}
															selectList={[
																{
																	value: FILM_STATUS.COMPLETED.key,
																	title: FILM_STATUS.COMPLETED.title,
																	class: "input-active",
																},
																{
																	value: FILM_STATUS.PROCESSING.key,
																	title: FILM_STATUS.PROCESSING.title,
																	class: "input-inactive",
																},
																{
																	value: FILM_STATUS.PENDING.key,
																	title: FILM_STATUS.PENDING.title,
																},
															]}
														/>
													</Box>
												</Grid>
												<Grid item xs={24} md={24}>
													<Box>
														<InputField
															label="Status Film"
															placeholder="Status film"
															registration={register("status_film")}
															error={errors["status_film"]}
															disabled={true}
														/>
													</Box>
												</Grid>
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
															<ShowImage id={id} type={"films"} />
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
				</Col>
				<Col span={12}>
					<FormWrapper
						id="formWrapper2"
						schema={schemaForm}
						isReset={isReset}
						defaultValues={{
							...myAnimeListSelect,
						}}
					>
						{({ register, formState: { errors }, getValues }) => {
							return (
								<>
									<CardContainer mb={2.5}>
										<Box>
											<Grid container columns={24} spacing={2.5}>
												<Grid item xs={12} md={12}>
													<Box>
														<Typography variant="h5" fontSize="20px" mr={1.25} fontWeight={600}>
															MyAnimeList
														</Typography>
													</Box>
												</Grid>
												<Grid item xs={12} md={12}>
													<Box>
														<Autocomplete
															disablePortal
															id="combo-box-demo"
															loading={isLoadingList}
															sx={{
																fontWeight: 400,
																fontSize: "14px",
																color: "#515151",
																"&.MuiSvgIcon-root": {
																	color: "#768394",
																},
																"&.MuiOutlinedInput-input": {
																	padding: "10px, 12px, 10px, 16px !important",
																	color: "#768394",
																},
																".MuiAutocomplete-inputRoot": {
																	padding: "10px, 12px, 10px, 16px !important",
																	height: "100%",
																	maxHeight: "100%",
																},
																".MuiAutocomplete-input": {
																	paddingLeft: "0px !important",
																},

																".MuiOutlinedInput-root": {
																	padding: "10px, 12px, 10px, 16px !important",
																	color: "#768394",
																	borderRadius: "6px !important",
																	borderTopLeftRadius: "6px !important",
																	borderTopRightRadius: "6px !important",
																	background: "#FFFFFF",
																},

																"&.Mui-disabled": {
																	background: "#F1F1F1",
																},
															}}
															options={dataList}
															renderInput={(params) => (
																<TextField
																	{...params}
																	placeholder="Select an MAL entry"
																	onChange={(event) => {
																		setParams({
																			page: 1,
																			pageSize: 50,
																			keyword: event.target.value,
																		});
																	}}
																/>
															)}
															onChange={(event, value) => {
																if (!value?.value) {
																	setParams({
																		page: 1,
																		pageSize: 50,
																		keyword: null,
																	});
																}
																setValues({
																	...values,
																	film_info: value?.value,
																});
															}}
														/>
													</Box>
												</Grid>
												<>
													<Grid item xs={24} md={24}>
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
													<Grid item xs={24} md={24}>
														<Box>
															<InputField
																label="Released"
																placeholder="released"
																registration={register("released")}
																error={errors["released"]}
																disabled={true}
															/>
														</Box>
													</Grid>
													<Grid item xs={24} md={24}>
														<Box>
															<InputField
																label="Other name"
																placeholder="Other name"
																registration={register("other_name")}
																error={errors["other_name"]}
																disabled={true}
															/>
														</Box>
													</Grid>
													<Grid item xs={24} md={24}>
														<Box>
															<InputField
																label="Status Film"
																placeholder="Status film"
																registration={register("status_film")}
																error={errors["status_film"]}
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
																<ShowImage
																	id={values?.film_info || id_myanime}
																	imageURl={dataFilmMyAnime?.images?.jpg?.image_url}
																/>
															</div>
														</Box>
													</Grid>
												</>
											</Grid>
										</Box>
									</CardContainer>
								</>
							);
						}}
					</FormWrapper>
				</Col>
			</Row>
			{status !== STATUS_REVIEW_TITLE_ENUM.DONE.key ? (
				<CardContainer mb={2.5} height={"auto"}>
					<Box className={"rowy-center-end flex-row-wrap"} mt={2.5} gap={"10px"}>
						{/* <ButtonCancel handleChange={handleCancel} title="Reject" /> */}
						<ButtonAdd isHiddenIcon={true} type="submit" label={"Approve"} handleChange={handleSubmit} />
					</Box>
				</CardContainer>
			) : null}
			{selectFilm && <FilmComponent setSelectFilm={setSelectFilm} selectFilm={selectFilm} />}
			<DeleteModal
				open={remove}
				title={"Approve"}
				content="Are you sure you want to get only data from anitaku?"
				handleSubmit={() => {
					handleSubmit2();
					setRemove(false);
				}}
				handleClose={() => {
					setRemove(false);
				}}
			/>
		</>
	);
};

export default EditComponent;
