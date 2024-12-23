import Head from "@/components/head";
import MoviesCreateComponent from "@/features/rumanhua/create";

const MoviesCreateContainer = () => {
	return (
		<>
			<Head
				title="Anitaku"
				breadcrumb={{
					title: "Anitaku",
					breadcrumb: [],
				}}
			/>
			<MoviesCreateComponent />
		</>
	);
};
export default MoviesCreateContainer;
