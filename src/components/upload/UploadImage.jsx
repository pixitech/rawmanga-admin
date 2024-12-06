import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import { Upload } from "antd";
import { useEffect, useState } from "react";

import { useGetImageList, useUpdateAvatar } from "@/hooks";
import MySnackBar from "@/utils/snackbar";
import ButtonCancel from "../button/ButtonCancel";
import ButtonDeleteSubmit from "../button/ButtonDeleteSubmit";
import AddCircleIcon from "../icons/add-circle-icon";
import ArrowRight from "../icons/arrowRight";
import RenderImage from "./RenderImage";
import PaginationComponent from "../table/PaginationComponent";
import { putS3File } from "@/actions";
import CancelIcon from "@mui/icons-material/Cancel";

export const ImageRoll = ({ src, style, onClick }) => {
	const [loaded, setLoaded] = useState();
	const showImage = () => {
		setLoaded(true);
	};

	return (
		<>
			<Box
				sx={
					loaded
						? { display: "none" }
						: {
								position: "relative",
								minWidth: "100%",
								minHeight: "100%",
								display: "flex",
								textAlign: "center",
								justifyContent: "center",
								overflow: "hidden",
								border: "none",
							}
				}
			>
				<img src="/images/image-default-icon.png" alt="images" style={{ ...style }} />
				<Box
					sx={{
						position: "absolute",
						minWidth: "100%",
						minHeight: "100%",
						background: "#00000080",
					}}
				></Box>
			</Box>
			<img src={src} alt="" onLoad={showImage} style={loaded ? { ...style } : { display: "none" }} onClick={onClick} />
		</>
	);
};

const UploadImage = ({
	value,
	onChange,
	type = 1,
	group = "avatars",
	classNameCustom,
	width = "80px",
	height = "80px",
	isDefault = false,
	disabled,
}) => {
	const [image, setImage] = useState();
	const [imageList, setImageList] = useState([]);
	const [imageDraft, setImageDraft] = useState();
	// const [placeholderImages, setPlaceholderImages] = useState();
	const [showModal1, setShowModal1] = useState(false);
	const [showModal2, setShowModal2] = useState(false);
	const [showModal3, setShowModal3] = useState(false);
	const [showImage, setShowImage] = useState(false);
	const [showImageData, setShowImageData] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const { mutateAsync: mutateGetImageList } = useGetImageList();
	const { mutateAsync: mutateUpdateAvatar } = useUpdateAvatar();

	const fetchGetImageList = async () => {
		let data = await mutateGetImageList({ group: group });
		setImageList(data?.images ?? []);
		if (isDefault) {
			// setPlaceholderImages(data?.images[0]);
			// setImageDraft({
			// 	uid: Date.now(),
			// 	url: data?.images[0],
			// });
			// onChange(data?.images[0]);
		}
	};

	const [rowList, setRowList] = useState([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (imageList && imageList?.length > 0) {
			setRowList(imageList.slice((page - 1) * 40, (page - 1) * 40 + 40));
		}
	}, [page, imageList]);

	useEffect(() => {
		if (value) {
			setImage({
				uid: Date.now(),
				url: value?.url ?? value,
			});
		} else {
			setImage(null);
		}
	}, [value]);

	useEffect(() => {
		if (type === 2) {
			fetchGetImageList();
		}
	}, []);

	const removeFileProfileItem = () => {
		setImage(null);
		onChange(null);
	};
	const showFileProfileItem = (image) => {
		setShowImageData(image);
		setShowImage(true);
	};

	const removeFileItem = () => {
		setIsLoading(true);
		setImageDraft();
		setIsLoading(false);
	};

	const beforeUploadImage = (file) => {
		const isJfif = file.name && file.name.lastIndexOf(".jfif") >= 0;
		const isJpgOrPng =
			(file.type === "image/jpeg" && !isJfif) || file.type === "image/png" || file.type === "image/jpg";
		const isLt2M = file.size / 1024 / 1024 < 3;
		if (!isJpgOrPng) {
			MySnackBar.error({ message: "Bạn chỉ có thể tải lên JPG/PNG !" });
			return false;
		} else if (!isLt2M) {
			MySnackBar.error({ message: "Kích thước hình ảnh vượt quá giới hạn (3MB)" });
			return false;
		}
		return isJpgOrPng;
	};

	const customRequestSendFile = async (files) => {
		try {
			setIsLoading(true);
			let file = files?.file;
			let payload = [
				{
					name: files?.file?.name,
					type: files?.file?.type,
				},
			];

			const response = await mutateUpdateAvatar(payload);
			if (response?.length) {
				const data = response[0];
				const fileUrl = data?.url;
				const uploadUrl = data?.uploadUrl;
				await putS3File(file, uploadUrl, fileUrl);

				setIsLoading(false);
				if (type === 2) {
					setImageDraft({
						name: data?.key,
						url: fileUrl,
					});
				} else {
					setImage({
						name: data?.key,
						url: fileUrl,
					});
					onChange({
						name: data?.key,
						url: fileUrl,
					});
				}
				return data;
			}
		} catch (err) {
			setIsLoading(false);
			if (err?.response?.data?.message === "Request Entity Too Large") {
				MySnackBar.error({ message: "Kích thước hình ảnh vượt quá giới hạn (10MB)" });
			} else {
				MySnackBar.error({ message: "Xin lỗi, hệ thống đang gặp sự cố. Vui lòng thử lại!" });
			}
		}
	};

	const showModal = () => {
		setShowModal1(true);
	};
	const handleClose = () => {
		setShowModal1(false);
		setImageDraft();
	};
	const handleClose2 = () => {
		setShowModal2(false);
		setImageDraft();
	};
	const handleClose3 = () => {
		setShowModal3(false);
		setImageDraft();
	};
	const handleClose4 = () => {
		setImageDraft();
		setShowImageData();
		setShowImage(false);
	};

	const openModal2 = () => {
		setShowModal1(false);
		setShowModal2(true);
	};
	const openModal3 = () => {
		setShowModal1(false);
		setShowModal3(true);
	};
	const handleSubmit2 = (value) => {
		setImageDraft();
		setShowModal2(false);
		setImage({
			uid: Date.now(),
			url: value?.item ? value?.item : imageDraft.item,
		});
		onChange(value?.item ? value?.item : imageDraft.item);
	};
	const handleSubmit3 = () => {
		setShowModal3(false);
		setImage(imageDraft);
		onChange(imageDraft);
		setImageDraft();
	};
	const handleBack = (value) => {
		setShowModal2(false);
		setShowModal3(false);
		setImageDraft();
		setShowModal1(true);
	};

	if (type === 2) {
		let style = {
			borderRadius: "8px",
			width: "80px",
			height: "80px",
			background: "#EFF1F5",
			alignItems: "center",
			display: "flex",
			justifyContent: "center",
			border: "1px dashed #DDDDDD!important",
		};

		return (
			<Box>
				{image && (
					<RenderImage
						image={image}
						key={image?.uid}
						removeFile={removeFileProfileItem}
						showFileProfileItem={showFileProfileItem}
						disabled={disabled}
					/>
				)}
				<Modal open={showImage} onClose={handleClose4}>
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							borderRadius: "6px",
							width: 600,
							minHeight: 500,
							bgcolor: "background.paper",
							borderColor: "background.paper",
							boxShadow: 24,
							p: "20px",
							textAlign: "center",
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
								onClick={handleClose4}
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
						<Box
							mt={2}
							sx={{
								width: "100%",
								minHeight: "100%",
								display: "flex",
								textAlign: "center",
								justifyContent: "center",
								position: "relative",
								flexGrow: 1,
							}}
						>
							<Box className="row-center">
								{showImageData && (
									<RenderImage
										hiddenEdit={true}
										className={"render-image-custom-2"}
										image={showImageData}
										removeFile={removeFileItem}
										showFileProfileItem={showFileProfileItem}
									/>
								)}
							</Box>
						</Box>
					</Box>
				</Modal>
				{!image && (
					<Box
						className="cursor-pointer"
						sx={{
							...style,
						}}
						onClick={showModal}
					>
						<AddCircleIcon />
					</Box>
				)}
				<Modal open={showModal1} onClose={handleClose}>
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							borderRadius: "6px",
							width: 700,
							minHeight: "259px",
							bgcolor: "background.paper",
							borderColor: "background.paper",
							boxShadow: 24,
							p: "32px 20px 20px 20px",
							textAlign: "center",
							"&:focus": {
								outline: "none",
							},
						}}
					>
						<Typography fontSize="24px" fontWeight="700" color="#768394">
							Tải ảnh
						</Typography>
						<Box
							mt={4}
							sx={{
								display: "flex",
								textAlign: "center",
								justifyContent: "center",
							}}
						>
							<Box
								sx={{
									width: "120px",
									textAlign: "center",
								}}
							>
								<Box
									sx={{
										borderRadius: "12px",
										width: "64px",
										height: "64px",
										background: "#DEDEDE",
										display: "flex",
										textAlign: "center",
										justifyContent: "center",
										marginLeft: "auto",
										marginRight: "auto",
									}}
								>
									<img
										onClick={openModal2}
										className="cursor-pointer"
										src={"/images/game.svg"}
										alt="images.jpg"
										style={{ width: "32px" }}
									/>
								</Box>
								<Typography sx={{ mt: 0.5 }} fontSize="16px" fontWeight="600" color="#768394">
									Chọn từ bộ
								</Typography>
							</Box>
							<Box
								sx={{
									width: "120px",
									textAlign: "center",
								}}
							>
								<Box
									sx={{
										borderRadius: "12px",
										width: "64px",
										height: "64px",
										background: "#DEDEDE",
										display: "flex",
										textAlign: "center",
										justifyContent: "center",
										marginLeft: "auto",
										marginRight: "auto",
									}}
								>
									<img
										onClick={openModal3}
										className="cursor-pointer"
										src={"/images/none.svg"}
										alt="images.jpg"
										style={{ width: "32px" }}
									/>
								</Box>
								<Typography sx={{ mt: 0.5 }} fontSize="16px" fontWeight="600" color="#768394">
									Tải lên
								</Typography>
							</Box>
						</Box>
						<Box className={"row-center"} mt={4}>
							<ButtonCancel handleChange={handleClose} title="Hủy" />
						</Box>
					</Box>
				</Modal>
				<Modal open={showModal2} onClose={handleClose2}>
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							borderRadius: "6px",
							width: 700,
							minHeight: "259px",
							bgcolor: "background.paper",
							borderColor: "background.paper",
							boxShadow: 24,
							p: "32px 20px 20px 20px",
							textAlign: "center",
							"&:focus": {
								outline: "none",
							},
						}}
					>
						<Box className="row-sb item-center">
							<Box className="cursor-pointer" onClick={handleBack}>
								<ArrowRight />
							</Box>
							<Typography fontSize="24px" fontWeight="700" color="#768394">
								Hình ảnh có sẵn
							</Typography>
							<Box></Box>
						</Box>
						<Box
							mt={4}
							sx={{
								gap: "20px",
							}}
							className={"rowy-center flex-row-wrap"}
						>
							{rowList ? (
								rowList.map((item, index) => {
									let isSelect = index === imageDraft?.index && item === imageDraft?.item;
									return (
										<Box
											key={index}
											className={isSelect ? "select-active" : ""}
											sx={{
												borderRadius: "12px",
												width: "64px",
												height: "64px",
												background: "#DEDEDE",
												display: "flex",
												textAlign: "center",
												justifyContent: "center",
												overflow: "hidden",
												border: "none",
											}}
										>
											<ImageRoll
												onClick={(e) => {
													setImageDraft({
														item: item,
														index: index,
													});
													if (e.detail > 1) {
														handleSubmit2({
															item: item,
															index: index,
														});
													}
												}}
												className="cursor-pointer"
												src={item ?? "/images/none.svg"}
												style={{ width: item ? "auto" : "32px" }}
											/>
										</Box>
									);
								})
							) : (
								<></>
							)}
						</Box>
						<Box className="row-center" mt={2.5} mb={2.5}>
							<PaginationComponent
								page={page}
								onChange={(event, newPage) => {
									setPage(newPage);
								}}
								rowsPerPage={40}
								rows={imageList}
							/>
						</Box>
						<Box className={"row-center"} gap={"20px"} mt={4}>
							<ButtonCancel handleChange={handleClose2} title="Hủy" />
							<ButtonDeleteSubmit
								handleChange={handleSubmit2}
								disabled={!imageDraft}
								isHiddenIcon={true}
								label="Xác nhận"
							/>
						</Box>
					</Box>
				</Modal>
				<Modal open={showModal3} onClose={handleClose3}>
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							borderRadius: "6px",
							width: 700,
							minHeight: "312px",
							bgcolor: "background.paper",
							borderColor: "background.paper",
							boxShadow: 24,
							p: "32px 20px 20px 20px",
							textAlign: "center",
							"&:focus": {
								outline: "none",
							},
						}}
					>
						<Box className="row-sb item-center">
							<Box className="cursor-pointer" onClick={handleBack}>
								<ArrowRight />
							</Box>
							<Typography fontSize="24px" fontWeight="700" color="#768394">
								Tải ảnh lên từ máy
							</Typography>
							<Box></Box>
						</Box>
						<Box
							mt={4}
							sx={{
								width: "100%",
								minHeight: "120px",
								display: "flex",
								textAlign: "center",
								justifyContent: "center",
								position: "relative",
							}}
						>
							<Box>
								{imageDraft && (
									<RenderImage
										className={"render-image-custom"}
										image={imageDraft}
										removeFile={removeFileItem}
										showFileProfileItem={showFileProfileItem}
									/>
								)}
								<Upload
									accept="image/*"
									className="avatar-uploader-2"
									customRequest={customRequestSendFile}
									beforeUpload={beforeUploadImage}
									showUploadList={false}
								>
									{!imageDraft && (
										<Box
											sx={{
												borderRadius: "12px",
												width: "120px",
												height: "120px",
												background: "#DEDEDE",
												display: "flex",
												textAlign: "center",
												justifyContent: "center",
												marginLeft: "auto",
												marginRight: "auto",
												alignItems: "center",
											}}
										>
											{isLoading ? (
												<CircularProgress />
											) : (
												<img
													className="cursor-pointer"
													src={"/images/none.svg"}
													alt="images.jpg"
													style={{ width: "32px" }}
												/>
											)}
										</Box>
									)}
								</Upload>
							</Box>
						</Box>
						<Box className={"row-center"} gap={"20px"} mt={4}>
							<ButtonCancel handleChange={handleClose3} title="Hủy" />
							<ButtonDeleteSubmit
								disabled={!imageDraft}
								handleChange={handleSubmit3}
								isHiddenIcon={true}
								label="Xác nhận"
							/>
						</Box>
					</Box>
				</Modal>
			</Box>
		);
	}
	return (
		<Box>
			{image && (
				<RenderImage
					hiddenEdit={disabled}
					className={classNameCustom}
					image={image}
					key={image?.uid}
					removeFile={removeFileProfileItem}
					showFileProfileItem={showFileProfileItem}
					notShowImageLoading={true}
				/>
			)}
			<Upload
				accept="image/*"
				className="avatar-uploader-2"
				customRequest={customRequestSendFile}
				beforeUpload={beforeUploadImage}
				showUploadList={false}
			>
				{!image && (
					<Box
						className="cursor-pointer"
						sx={{
							border: "1px dashed #DDDDDD!important",
							borderRadius: "8px",
							width: width,
							height: height,
							background: "#EFF1F5",
							alignItems: "center",
							display: "flex",
							justifyContent: "center",
						}}
					>
						{isLoading ? <CircularProgress /> : <AddCircleIcon />}
					</Box>
				)}
			</Upload>
			<Modal open={showImage} onClose={handleClose4}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						borderRadius: "6px",
						width: 600,
						minHeight: 500,
						bgcolor: "background.paper",
						borderColor: "background.paper",
						boxShadow: 24,
						p: "20px",
						textAlign: "center",
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
							onClick={handleClose4}
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
					<Box
						mt={2}
						sx={{
							width: "100%",
							minHeight: "120px",
							display: "flex",
							textAlign: "center",
							justifyContent: "center",
							position: "relative",
							flexGrow: 1,
						}}
					>
						<Box className="row-center">
							{showImageData && (
								<RenderImage
									hiddenEdit={true}
									className={"render-image-custom-2"}
									image={showImageData}
									removeFile={removeFileItem}
									showFileProfileItem={showFileProfileItem}
									notShowImageLoading={true}
								/>
							)}
						</Box>
					</Box>
				</Box>
			</Modal>
		</Box>
	);
};

export default UploadImage;
