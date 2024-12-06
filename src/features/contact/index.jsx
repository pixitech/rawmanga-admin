import { Container } from "@mui/material";
import ListComponent from "./components/List";

const ListComponentContact = () => {
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

export default ListComponentContact;
