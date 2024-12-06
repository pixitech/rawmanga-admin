import Head from "@/components/head";
import CreateContent from "@/features/review/create";

const ReviewCreateContainer = () => {
	return (
		<>
			<Head
				title="Review"
				breadcrumb={{
					title: "Review",
					breadcrumb: [],
				}}
			/>
			<CreateContent />
		</>
	);
};
export default ReviewCreateContainer;
