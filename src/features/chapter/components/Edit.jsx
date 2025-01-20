/* eslint-disable react-hooks/exhaustive-deps */
import ButtonAdd from "@/components/button/ButtonAdd";
import CardContainer from "@/components/card/CardContainer";
import FormWrapper from "@/components/form/form-wraper";
import InputField from "@/components/form/input-field";
import SelectField from "@/components/form/select-field";
import Loading from "@/components/loading";
import { CHAPTER_STATE, LIST_CHAPTER_STATUS } from "@/constant/title";
import { useChangeStatusChapter, useGetImageChapter } from "@/hooks/manga";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Grid, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { schemaForm2 } from "./const/schema";
import ListImageChapter from "./list-image-chapter";
import ReadChapter from "./reading";
import DeleteModal from "@/components/modal/DeleteModal";
import MySnackBar from "@/utils/snackbar";

const EditComponent = ({ value, isLoadingDefault, refetch }) => {
	let { id } = useParams();
	const { data } = useGetImageChapter(id);
	const [isPreview, setIsPreview] = useState(false);
	const [openChangeStatus, setOpenChangeStatus] = useState(null);
	const [title, setTitle] = useState();
	const [values, setValues] = useState({
		id: id,
		name: title,
		status: CHAPTER_STATE[value?.state],
		released: value?.released,
		original_url: value?.url,
		status_film: value?.status_film?.name,
		other_name: value?.titles?.[0]?.title,
		type: value?.category_subs?.[0]?.type,
	});
	const [isReset, setIsReset] = useState(false);

	const { mutateAsync, isLoading: isLoadingChangeStatusChapter } = useChangeStatusChapter({
		onError: (message) => {
			console.log(message);
			MySnackBar.error({ message: message ?? "Some thing went wrong!" });
			setValues({ status: CHAPTER_STATE[value?.state] });
		},
		onSuccess: (e) => {
			MySnackBar.success({ message: "Change status successfully!" });
			refetch();
			setOpenChangeStatus(null);
		},
	});

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
			avatar: avatar,
			status: CHAPTER_STATE[value?.state],
			type: value?.category_subs?.[0]?.type,
		});
	}, [value, isLoadingDefault, title]);

	useEffect(() => {
		if (value) {
			const enTitle = value.titles.find((item) => item.type === "en");
			if (enTitle) {
				setTitle(enTitle.title);
			} else {
				const zhTitle = value.titles.find((item) => item.type === "zh");
				setTitle(zhTitle ? zhTitle.title : null);
			}
		}
	}, [value]);

	const handlePreviewChapter = () => {
		setIsPreview(!isPreview);
	};

	const handleSubmitChangeStatus = () => {
		mutateAsync({ id: id, status: openChangeStatus });
	};

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
				{({ register, formState: { errors }, getValues, setValue }) => {
					return (
						<>
							<CardContainer mb={2.5}>
								<Box>
									<Grid container columns={24} spacing={2.5}>
										<Grid item xs={24} md={24}>
											<Box
												sx={{
													display: "flex",
													flexDirection: "row",
													justifyContent: "space-between",
													alignItems: "center",
												}}
											>
												<Typography variant="h5" fontSize="20px" mr={1.25} fontWeight={600}>
													Information Chapter
												</Typography>
												<ButtonAdd
													isHiddenIcon={true}
													handleChange={handlePreviewChapter}
													type="button"
													label={"Preview"}
													disabled={!data?.length}
												/>
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
													disabled={[
														LIST_CHAPTER_STATUS.CRAWLING.key,
														LIST_CHAPTER_STATUS.CRAWLED.key,
														LIST_CHAPTER_STATUS.PROCESSING.key,
													].includes(getValues("status"))}
													onChangeInput={(e) => {
														const key = Object.entries(CHAPTER_STATE).find(([key, value]) => value === e)?.[0];
														setOpenChangeStatus(Number(key));
													}}
													label="Status"
													registration={register("status")}
													error={errors["status"]}
													selectList={[
														{
															value: LIST_CHAPTER_STATUS.CRAWLING.key,
															title: LIST_CHAPTER_STATUS.CRAWLING.title,
															class: "input-active",
															disabled: true,
														},
														{
															value: LIST_CHAPTER_STATUS.CRAWLED.key,
															title: LIST_CHAPTER_STATUS.CRAWLED.title,
															class: "input-inactive",
														},
														{
															value: LIST_CHAPTER_STATUS.PROCESSING.key,
															title: LIST_CHAPTER_STATUS.PROCESSING.title,
															disabled: true,
														},
														{
															value: LIST_CHAPTER_STATUS.PROCESSED.key,
															title: LIST_CHAPTER_STATUS.PROCESSED.title,
														},
														{
															value: LIST_CHAPTER_STATUS.TRANSLATING.key,
															title: LIST_CHAPTER_STATUS.TRANSLATING.title,
															disabled: true,
														},
														{
															value: LIST_CHAPTER_STATUS.TRANSLATED.key,
															title: LIST_CHAPTER_STATUS.TRANSLATED.title,
															disabled: true,
														},
													]}
												/>
											</Box>
										</Grid>
										<Grid item xs={24} md={24}>
											<Box>
												<InputField
													label="Original name"
													placeholder="Original name"
													registration={register("other_name")}
													error={errors["other_name"]}
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
									</Grid>
								</Box>
							</CardContainer>
							<DeleteModal
								open={Boolean(openChangeStatus)}
								handleClose={() => {
									if (!isLoadingChangeStatusChapter) {
										setOpenChangeStatus(null);
										setValue("status", CHAPTER_STATE[value?.state]);
									}
								}}
								handleSubmit={handleSubmitChangeStatus}
								title={"Change status chapter"}
								content={"Do you want change status this chapter?"}
								isCancelLoading={isLoadingChangeStatusChapter}
								isSubmiLoading={isLoadingChangeStatusChapter}
							/>
						</>
					);
				}}
			</FormWrapper>
			<ListImageChapter data={data} />
			<Modal open={isPreview} onClose={() => setIsPreview(false)}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						borderRadius: "6px",
						width: 900,
						maxHeight: 800,
						bgcolor: "background.paper",
						borderColor: "background.paper",
						boxShadow: 24,
						p: "10px",
						display: "flex",
						flexDirection: "column",
						"&:focus": {
							outline: "none",
						},
					}}
				>
					<Box className="rowy-center-end">
						<Box
							className="cursor-pointer"
							onClick={() => setIsPreview(false)}
							sx={{
								".MuiSvgIcon-root": {
									color: "#768394",
									width: "24px",
									height: "24px",
								},
							}}
						>
							<CancelIcon />
						</Box>
					</Box>
					<Box sx={{ height: "100%", overflow: "auto" }}>
						<ReadChapter data={data} />
					</Box>
				</Box>
			</Modal>
		</>
	);
};

export default EditComponent;
