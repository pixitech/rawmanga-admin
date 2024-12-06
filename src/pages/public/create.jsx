import Head from "@/components/head";
import CreateContent from "@/features/public/create";

const PublicCreateContainer = () => {
	return (
		<>
			<Head
				title="Public"
				breadcrumb={{
					title: "Public",
					breadcrumb: [],
				}}
			/>
			<CreateContent />
		</>
	);
};
export default PublicCreateContainer;
