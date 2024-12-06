/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import CardContainer from "@/components/card/CardContainer";
import FilmComponent from "@/components/film-component/FilmComponent";
import FormWrapper from "@/components/form/form-wraper";
import InputField from "@/components/form/input-field";
import SelectField from "@/components/form/select-field";
import Loading from "@/components/loading";
import { FILM_STATUS } from "@/constant/title";
import { useGetMappingFilmById, useUploadBanner } from "@/hooks";
import { Box, FormLabel, Grid, Typography } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import ActionComponent from "@/components/action/ActionComponent";
import ButtonAdd from "@/components/button/ButtonAdd";
import GridList from "@/components/table/GridList";
import LineComponent from "@/components/text/LineComponent";
import { schemaForm2 } from "./const/schema";
import ShowImage from "@/components/upload/ShowImage";
import MySnackBar from "@/utils/snackbar";
import { validateFileImageExtension } from "@/utils";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";

const EditComponent = ({ value, isLoadingDefault, refetch }) => {
	const id = value?._id;
	const navigate = useNavigate();
	const fileInputRef = useRef(null);
	const [fileImage, setFileImage] = useState(null);
	const [selectedImage, setSelectedImage] = useState();
	const [optionUpload, setOptionUpload] = useState("file");
	const [page, setPage] = useState(1);
	let rowsPerPage = 12;
	const [params, setParams] = useState({
		page: page,
		pageSize: rowsPerPage,
		id: id,
	});
	const { data = { items: [] }, isLoading } = useGetMappingFilmById(params);
	const [values, setValues] = useState({
		id: id,
		status: value?.status,
	});

	const [isReset, setIsReset] = useState(false);
	const [filmList, setFilmList] = useState([]);
	const [selectFilm, setSelectFilm] = useState();
	const { mutateAsync, isLoading: loadingBanner } = useUploadBanner();
	const handleOptionChange = (event) => {
		setOptionUpload(event.target.value);
		setSelectedImage(null);
	};
	const handleFileChange = (event) => {
		const file = event.target.files?.[0];
		if (!validateFileImageExtension(file?.name)) {
			MySnackBar.error({ message: "Please select an image file!" });
			return;
		}
		if (file) {
			const imageURL = URL.createObjectURL(file);
			setSelectedImage(imageURL);
			setFileImage(file);
		}
	};
	const handleDivClick = () => {
		if (!fileInputRef.current || optionUpload === "url") return;
		fileInputRef.current.click();
	};
	const handleUploadAvatar = async () => {
		if (!fileImage) return;
		const formData = new FormData();
		formData.append("image", fileImage);
		try {
			const response = await mutateAsync(formData);
			if (response === true) {
				navigate("/");
				MySnackBar.success({ message: "Upload avatar successfully!" });
			} else if (typeof response === "object" && response.code === 400) {
				MySnackBar.error({
					message: response?.message || "Something was wrong!",
				});
			} else {
				MySnackBar.error({ message: "Unexpected response!" });
			}
		} catch (error) {
			console.log("error", error);
		}
	};
	// useEffect(() => {
	// 	if (typeof avatar === "string") {
	// 		setSelectedImage(avatar);
	// 	}
	// }, [avatar]);
	useEffect(() => {
		let avatar = null;
		let other_name = "";
		if (value?.image?.url) {
			avatar = {
				name: value?.image?.url,
				url: value?.image?.url,
			};
		}
		if (value?.titles) {
			value?.titles.forEach((item) => {
				other_name += item?.title;
			});
		}
		setIsReset(!isReset);
		setValues({
			id: id,
			title: value?.title,
			released: value?.released,
			status_info: value?.status_info,
			other_name: other_name,
			year: value?.year,
			synopsis: value?.synopsis,
			background: value?.background,
			avatar: avatar,
			status: value?.status,
			trailer: value?.trailer,
		});
	}, [value, isLoadingDefault]);

	useEffect(() => {
		if (Array.isArray(data?.items)) {
			setFilmList(data?.items);
		}
	}, [data?.items?.length]);
	useEffect(() => {
		if (id) {
			setParams({ page: page, pageSize: rowsPerPage, id: id });
		}
	}, [id]);

	let rows = filmList?.length ? filmList : [];
	const total = data?.total ?? 0;
	const totalPage = Math.ceil(total / rowsPerPage);

	const columns = [
		{
			id: "current_episode",
			label: "Episode",
			format: (value, data) => <LineComponent line1={value} />,
		},
		{
			id: "video",
			label: "Video Url",
			format: (value, data) => (
				<a href={value?.url} target="_blank" rel="noopener noreferrer">
					<div className="limit-text-1" style={{ maxWidth: "1000px", wordBreak: "break-all" }}>
						{value?.url}
					</div>
				</a>
			),
		},
		// {
		// 	id: "source",
		// 	label: "Source",
		// 	format: (value, data) => (
		// 		<a href={value} target="_blank" rel="noopener noreferrer" style={{ wordBreak: "break-all" }}>
		// 			{value}
		// 		</a>
		// 	),
		// },
		// {
		// 	id: "original_url",
		// 	label: "Crawl Source",
		// 	format: (value, data) => (
		// 		<a href={value} target="_blank" rel="noopener noreferrer" style={{ wordBreak: "break-all" }}>
		// 			{value}
		// 		</a>
		// 	),
		// },
		// {
		// 	id: "status",
		// 	label: "Status",
		// 	format: (value, data) => <StatusComponent value={value} />,
		// },
		{
			id: "action",
			label: "Action",
			format: (value, data) => {
				return (
					<ActionComponent
						onEdit={() => {
							setSelectFilm(data);
						}}
						isHiddenDelete={false}
					/>
				);
			},
		},
	];

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		setParams({ ...params, page: newPage, id: id });
	};

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
												<SelectField
													label="Upload Banner"
													value={optionUpload}
													registration={register("optionUpload")}
													onChange={(e) => handleOptionChange(e)}
													selectList={[
														{
															value: "file",
															title: "Upload File",
															class: "input-active",
														},
														{
															value: "url",
															title: "Upload URL",
															class: "input-inactive",
														},
													]}
												/>
											</Box>
										</Grid>
										{optionUpload === "url" ? (
											<Grid item xs={24} md={12}>
												<Box>
													<InputField
														label="Image URL"
														placeholder="Image URL"
														registration={register("imageURL")}
														error={errors["imageURL"]}
													/>
												</Box>
											</Grid>
										) : null}
										<Grid item xs={24} md={24}>
											<Box>
												<div style={{ position: "relative", width: "600px", aspectRatio: 2.5, marginBottom: "20px" }}>
													<div
														onClick={handleDivClick}
														style={{
															position: "relative",
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															width: "600px",
															aspectRatio: 2.5,
															borderRadius: "10px",
															overflow: "hidden",
															cursor: "pointer",
															border: "1px dashed #A3A3A3",
															background: "#ffffff",
														}}
													>
														{selectedImage ? (
															<img
																alt="Avatar"
																src={selectedImage}
																style={{
																	width: "100%",
																	height: "100%",
																	objectFit: "cover",
																}}
															/>
														) : (
															<div
																style={{
																	display: "flex",
																	flexDirection: "column",
																	alignItems: "center",
																}}
															>
																<ImageIcon fontSize="large" />
																<p style={{ color: "#A3A3A3" }}>Upload Banner</p>
															</div>
														)}
													</div>
													<input
														type="file"
														ref={fileInputRef}
														onChange={handleFileChange}
														style={{ display: "none" }}
														accept="image/*"
													/>
													{selectedImage && optionUpload === "file" && (
														<button
															onClick={(e) => {
																e.stopPropagation();
																setSelectedImage(null);
															}}
															style={{ position: "absolute", top: 0, right: 0, cursor: "pointer" }}
														>
															<ClearIcon />
														</button>
													)}
												</div>
											</Box>
											<ButtonAdd
												handleChange={() => {
													setSelectFilm({ app_url: values?.trailer?.embed_url });
												}}
												isHiddenIcon={true}
												type="submit"
												label={"Upload Image"}
												disabled={!fileImage}
											/>
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
													registration={register("status_info")}
													error={errors["status_info"]}
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
													registration={register("year")}
													error={errors["year"]}
													disabled={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={24}>
											<Box>
												<InputField
													label="Summary"
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
													<ShowImage id={id} type={"mapping"} />
													{/* {values?.avatar?.url ? (
														<>
															<a
																href={values?.avatar?.url}
																target="_blank"
																rel="noopener noreferrer"
																style={{ cursor: "pointer" }}
															>
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
													)} */}
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
						</>
					);
				}}
			</FormWrapper>
			<CardContainer>
				<GridList
					isLoading={isLoading}
					columns={columns}
					rows={rows}
					totalPage={totalPage}
					rowsPerPage={rowsPerPage}
					handleChangePage={handleChangePage}
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
};

export default EditComponent;
