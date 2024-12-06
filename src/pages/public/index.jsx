import Head from "@/components/head";
import ListComponentContent from "@/features/public";

const PublicContainer = () => {
	return (
		<>
			<Head
				title="Public"
				breadcrumb={{
					title: "Public",
					breadcrumb: [],
				}}
			/>
			<ListComponentContent />
		</>
	);
};
export default PublicContainer;
