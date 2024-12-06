import Head from "@/components/head";
import ListComponentContent from "@/features/review";

const ReviewContainer = () => {
	return (
		<>
			<Head
				title="Review"
				breadcrumb={{
					title: "Review",
					breadcrumb: [],
				}}
			/>
			<ListComponentContent />
		</>
	);
};
export default ReviewContainer;
