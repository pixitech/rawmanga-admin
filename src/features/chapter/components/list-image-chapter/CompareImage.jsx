import { Box, Typography } from "@mui/material";
import TextOverlayImage from "../reading/TextOverlayImage";

const CompareImage = ({ comicList, isPreview }) => {
	const result = isPreview?.local_path?.split("/static/")[1];

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
			<Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
				<Typography variant="h3">Original Image</Typography>
				<Typography variant="h3">New Image</Typography>
			</Box>

			<Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
				<img src={`http://75.119.137.187:8080/get-image/${result}`} alt="Original Image" width={"48%"} />
				<TextOverlayImage
					src={comicList[isPreview?.index - 1]?.url}
					value={comicList[isPreview?.index - 1]?.text_coordinates}
					color="black"
					isCompare={true}
				/>
			</Box>
		</Box>
	);
};

export default CompareImage;
