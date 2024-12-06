import { Container } from "@mui/material";
import CreateComponent from "./components/Create";

const DataCreateComponent = () => {
	return (
		<Container
			sx={{
				height: "100%",
				padding: "20px",
			}}
		>
			<CreateComponent />
		</Container>
	);
};

export default DataCreateComponent;
