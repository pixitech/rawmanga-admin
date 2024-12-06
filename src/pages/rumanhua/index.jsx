import Head from "@/components/head";
import MangaComponent from "@/features/rumanhua";

const MangaContainer = () => {
	return (
		<>
			<Head
				title="Rumanhua"
				breadcrumb={{
					title: "Rumanhua",
					breadcrumb: [],
				}}
			/>
			<MangaComponent />
		</>
	);
};
export default MangaContainer;
