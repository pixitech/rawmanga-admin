/* eslint-disable react-hooks/exhaustive-deps */
import CardContainer from "@/components/card/CardContainer";
import FilmComponent from "@/components/film-component/FilmComponent";
import FormWrapper from "@/components/form/form-wraper";
import InputField from "@/components/form/input-field";
import SelectField from "@/components/form/select-field";
import Loading from "@/components/loading";
import { CHAPTER_STATE, LIST_CHAPTER_STATUS } from "@/constant/title";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { schemaForm2 } from "./const/schema";
import { useGetImageChapter } from "@/hooks/manga";
import { useParams } from "react-router-dom";

const EditComponent = ({ value, isLoadingDefault, refetch }) => {
	let { id } = useParams();
	const { data } = useGetImageChapter(id);
	console.log("data", data);

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
															value: LIST_CHAPTER_STATUS.CRAWLING.key,
															title: LIST_CHAPTER_STATUS.CRAWLING.title,
															class: "input-active",
														},
														{
															value: LIST_CHAPTER_STATUS.CRAWLED.key,
															title: LIST_CHAPTER_STATUS.CRAWLED.title,
															class: "input-inactive",
														},
														{
															value: LIST_CHAPTER_STATUS.PROCESSING.key,
															title: LIST_CHAPTER_STATUS.PROCESSING.title,
														},
														{
															value: LIST_CHAPTER_STATUS.PROCESSED.key,
															title: LIST_CHAPTER_STATUS.PROCESSED.title,
														},
														{
															value: LIST_CHAPTER_STATUS.TRANSLATING.key,
															title: LIST_CHAPTER_STATUS.TRANSLATING.title,
														},
														{
															value: LIST_CHAPTER_STATUS.TRANSLATED.key,
															title: LIST_CHAPTER_STATUS.TRANSLATED.title,
														},
													]}
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
						</>
					);
				}}
			</FormWrapper>
			{selectFilm && <FilmComponent setSelectFilm={setSelectFilm} selectFilm={selectFilm} />}
		</>
	);
};

export default EditComponent;
