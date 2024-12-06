import { Container } from "@mui/material";
import ListComponent from "./components/List";

const DataComponent = () => {
	return (
		<Container
			sx={{
				height: "100%",
				padding: "20px",
			}}
		>
			<ListComponent />
		</Container>
	);
};

export default DataComponent;
