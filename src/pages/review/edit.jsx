import Head from "@/components/head";
import EditContent from "@/features/review/edit";
import { useGetMovies } from "@/hooks";
import { useParams, useSearchParams } from "react-router-dom";

const ReviewEditContainer = () => {
	let { id } = useParams();
	let [searchParams] = useSearchParams();
	const status = searchParams.get("status") || "";
	const { data, isLoading, refetch } = useGetMovies(id);
	return (
		<>
			<Head
				title="Review"
				breadcrumb={{
					title: data?.name ?? "",
					breadcrumb: [
						{
							title: "Review",
							path: `/review?status=${status}`,
						},
						{
							title: data?.name ?? "",
						},
					],
				}}
			/>
			<EditContent value={data ?? {}} isLoading={isLoading} refetch={refetch} />
		</>
	);
};
export default ReviewEditContainer;
