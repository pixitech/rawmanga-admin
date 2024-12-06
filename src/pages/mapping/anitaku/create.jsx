import Head from "@/components/head";
import CreateContent from "@/features/mapping/anitaku/create";

const AnitakuCreateContainer = () => {
	return (
		<>
			<Head
				title="Anitaku Mapping"
				breadcrumb={{
					title: "Anitaku Mapping",
					breadcrumb: [],
				}}
			/>
			<CreateContent />
		</>
	);
};
export default AnitakuCreateContainer;
