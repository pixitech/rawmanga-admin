import { useEffect, useState } from "react";

import CardContainer from "@/components/card/CardContainer";
import FilmComponent from "@/components/film-component/FilmComponent";
import FormWrapper from "@/components/form/form-wraper";
import InputField from "@/components/form/input-field";
import SelectField from "@/components/form/select-field";
import Loading from "@/components/loading";
import { FILM_STATUS } from "@/constant/title";
import { useGetFilm, useGetInfoList, useUpdateMapping } from "@/hooks";
import { Autocomplete, Box, FormLabel, Grid, TextField, Typography } from "@mui/material";

import { schemaForm, schemaForm2 } from "./const/schema";
import ButtonAdd from "@/components/button/ButtonAdd";
import MySnackBar from "@/utils/snackbar";

const EditComponent = ({ value, isLoadingDefault, refetch }) => {
	const id = value?._id;
	const { data, isLoading } = useGetFilm(id);
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

	const { mutateAsync: mutateUpdate, isLoading: loadingUpdate } = useUpdateMapping();

	const [params, setParams] = useState({
		page: 1,
		pageSize: 50,
	});
	const { data: dataValue, isLoading: isLoadingList } = useGetInfoList(params);
	let dataList = dataValue?.items
		? dataValue?.items.map((i) => {
				return {
					label: i?.title,
					value: i?._id,
				};
			})
		: [];

	const [isReset, setIsReset] = useState(false);
	const [filmList, setFilmList] = useState([]);
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
		let valueList = data;
		if (data) {
			setFilmList(valueList.reverse());
		}
	}, [data]);

	const handleSubmit = async () => {
		if (!values?.film_info) {
			MySnackBar.error({ message: "Public is required" });
			return;
		}
		let payload = {
			film_crawl: id,
			film_info: values?.film_info,
		};

		mutateUpdate(payload)
			.then((e) => {
				if (e?.errorCode) {
					MySnackBar.error({ message: e?.message });
				} else {
					MySnackBar.success({ message: "Mapping successfully" });
				}
			})
			.catch(({ response }) => {
				MySnackBar.error({ message: response?.data?.message });
			});
	};

	return (
		<>
			<Loading isLoading={isLoading || isLoadingDefault || loadingUpdate} />
			<FormWrapper
				id="formWrapper"
				schema={schemaForm}
				onSubmit={handleSubmit}
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
													Mapping
												</Typography>
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
													Public
												</FormLabel>
												<Autocomplete
													disablePortal
													id="combo-box-demo"
													loading={isLoadingList}
													sx={{
														marginTop: "10px",
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
															placeholder="Public"
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
														console.log("..........", value);
														setValues({
															...values,
															film_info: value?.value,
														});
													}}
												/>
											</Box>
										</Grid>
									</Grid>
								</Box>

								<Box className={"rowy-center-end flex-row-wrap"} mt={2.5} gap={"10px"}>
									<ButtonAdd isHiddenIcon={true} type="submit" label={"Save"} />
								</Box>
							</CardContainer>
						</>
					);
				}}
			</FormWrapper>
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
													{values?.avatar?.url ? (
														<>
															<a
																href={values?.avatar?.url}
																target="_blank"
																rel="noopener noreferrer"
																style={{ cursor: "pointer" }}
															>
																{/* <iframe
																	width="auto"
																	height="auto"
																	style={{ border: "none" }}
																	src={values?.avatar?.url}
																></iframe> */}
																<img src={values?.avatar?.url} />
															</a>
															<a href={values?.avatar?.url} target="_blank" rel="noopener noreferrer">
																<div className="limit-text-3 mt-8" style={{ wordBreak: "break-all" }}>
																	{values?.avatar?.url}
																</div>
															</a>
														</>
													) : (
														<Box
															sx={{
																position: "relative",
																minWidth: "100%",
																minHeight: "100%",
																display: "flex",
																textAlign: "center",
																justifyContent: "center",
																overflow: "hidden",
																border: "none",
															}}
														>
															<img
																src="/images/manga-logo.svg"
																alt="images"
																style={{
																	width: "auto",
																	height: "auto",
																	minWidth: "100%",
																	minHeight: "100%",
																	maxWidth: "auto !important",
																	maxHeight: "auto !important",
																}}
															/>
															<Box
																sx={{
																	position: "absolute",
																	minWidth: "100%",
																	minHeight: "100%",
																	background: "#00000080",
																}}
															></Box>
														</Box>
													)}
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
			{selectFilm && <FilmComponent setSelectFilm={setSelectFilm} selectFilm={selectFilm} />}
		</>
	);
};

export default EditComponent;
