import ActionComponent from "@/components/action/ActionComponent";
import CardContainer from "@/components/card/CardContainer";
import StatusComponent from "@/components/status/StatusComponent";
import GridList from "@/components/table/GridList";
import LineComponent from "@/components/text/LineComponent";
import { IMAGE_CHAPTER_STATE, IMAGE_CHAPTER_STATE_TO_STATUS } from "@/constant/title";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Modal } from "@mui/material";
import { useState } from "react";
import CompareImage from "./CompareImage";

const ListImageChapter = ({ data = [] }) => {
	const [page, setPage] = useState(1);
	const [isPreview, setIsPreview] = useState(null);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const sortedData = data?.sort((a, b) => a.current_index - b.current_index) || [];
	const comicList = sortedData.map((item) => {
		const listTextTranslate = item?.text_coordinates?.map((textItem) => {
			const listtranslations = Array.isArray(textItem?.translations) ? textItem.translations : [];
			const textTranslations = listtranslations.find((translation) => translation.language === "en");

			return {
				...textItem,
				text: textTranslations?.translated_text || textItem?.text,
			};
		});

		return {
			...item,
			url: item?.url,
			text_coordinates: listTextTranslate,
		};
	});

	const columns = [
		{
			id: "createdAt",
			label: "Id",
			format: (value, data, index) => <LineComponent line1ClassName={"min-width-100"} line1={index} />,
		},
		{
			id: "url",
			label: "Image",
			format: (value, data, index) => (
				<LineComponent
					line1ClassName={"min-width-100 cursor-pointer"}
					line1={value}
					onClick={() => setIsPreview({ index: index, local_path: data?.local_path })}
				/>
			),
		},
		{
			id: "status",
			label: "State",
			format: (value, data) => {
				const state = IMAGE_CHAPTER_STATE[value];
				const status = IMAGE_CHAPTER_STATE_TO_STATUS[state];
				return <StatusComponent value={status} />;
			},
		},
		{
			id: "action",
			label: "Action",
			format: (value, data) => {
				return (
					<a href={`/chapter/${data?._id}`}>
						<ActionComponent onEdit={() => {}} isHiddenDelete={false} />
					</a>
				);
			},
		},
	];
	return (
		<CardContainer>
			<GridList
				isLoading={false}
				columns={columns}
				rows={comicList}
				handleChangePage={handleChangePage}
				page={page}
				totalPage={1}
			/>
			<Modal open={isPreview?.index} onClose={() => setIsPreview(null)}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						borderRadius: "6px",
						width: 1400,
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
						<CompareImage comicList={comicList} isPreview={isPreview} />
					</Box>
				</Box>
			</Modal>
		</CardContainer>
	);
};

export default ListImageChapter;
