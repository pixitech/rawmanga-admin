import { Container } from "@mui/material";
import CreateComponent from "./components/Create";

const CreateContent = () => {
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

export default CreateContent;
