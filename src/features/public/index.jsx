import { Container } from "@mui/material";
import ListComponent from "./components/List";

const ListComponentContent = () => {
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

export default ListComponentContent;
