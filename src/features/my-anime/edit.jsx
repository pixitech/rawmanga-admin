import { Container } from "@mui/material";
import EditComponent from "./components/Edit";

const DataEditComponent = ({ value, isLoading, refetch }) => {
	return (
		<>
			<Container
				sx={{
					height: "100%",
					padding: "20px",
				}}
			>
				<EditComponent value={value} isLoadingDefault={isLoading} refetch={refetch} />
			</Container>
		</>
	);
};

export default DataEditComponent;
