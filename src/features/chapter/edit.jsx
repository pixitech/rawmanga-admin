import { Container } from "@mui/material";
import EditComponent from "./components/Edit";

const ChapterEditComponent = ({ value, isLoading, refetch, filmList }) => {
	return (
		<>
			<Container
				sx={{
					height: "100%",
					padding: "20px",
				}}
			>
				<EditComponent value={value} isLoadingDefault={isLoading} refetch={refetch} filmList={filmList} />
			</Container>
		</>
	);
};

export default ChapterEditComponent;
