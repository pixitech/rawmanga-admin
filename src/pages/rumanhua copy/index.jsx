import Head from "@/components/head";
import MoviesComponent from "@/features/rumanhua";

const MoviesContainer = () => {
	return (
		<>
			<Head
				title="Rumanhua"
				breadcrumb={{
					title: "Rumanhua",
					breadcrumb: [],
				}}
			/>
			<MoviesComponent />
		</>
	);
};
export default MoviesContainer;
