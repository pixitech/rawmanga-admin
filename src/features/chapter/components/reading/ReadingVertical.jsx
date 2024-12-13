import { Box } from "@mui/material";
import TextOverlayImage from "./TextOverlayImage";

const ReadingVertical = ({ comicList }) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				height: "100%",
				alignItems: "center",
				overflow: "auto",
			}}
		>
			{comicList.map((item, index) => {
				return (
					<div key={index}>
						<div>
							<TextOverlayImage src={item?.url} value={item?.text_coordinates} color="black" />
						</div>
					</div>
				);
			})}
			{/* <div className="flex flex-row justify-between items-center w-[90%] md:w-[70%] bg-[#1E1E1E] rounded-md p-3 mb-32">
				<div className="flex flex-row gap-2 bg-[#444444] py-2 px-3 rounded-md cursor-pointer active:scale-95 transition-all">
					<p className="font-semibold text-sm">Prev Chapter</p>
				</div>
				<div className="flex flex-row gap-2 bg-[#444444] py-2 px-3 rounded-md cursor-pointer active:scale-95 transition-all">
					<p className="font-semibold text-sm">Next Chapter</p>
				</div>
			</div> */}
		</Box>
	);
};

export default ReadingVertical;
