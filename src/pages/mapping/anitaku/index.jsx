import Head from "@/components/head";
import ListComponentContent from "@/features/mapping/anitaku";

const AnitakuContainer = () => {
	return (
		<>
			<Head
				title="Anitaku Mapping"
				breadcrumb={{
					title: "Anitaku Mapping",
					breadcrumb: [],
				}}
			/>
			<ListComponentContent />
		</>
	);
};
export default AnitakuContainer;
