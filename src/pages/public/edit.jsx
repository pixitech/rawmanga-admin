import Head from "@/components/head";
import EditContent from "@/features/public/edit";
import { useGetMappingById } from "@/hooks";
import { useParams } from "react-router-dom";

const PublicEditContainer = () => {
	let { id } = useParams();
	const { data, isLoading, refetch } = useGetMappingById(id);
	return (
		<>
			<Head
				title="Public"
				breadcrumb={{
					title: data?.title ?? "",
					breadcrumb: [
						{
							title: "Public",
							path: "/public",
						},
						{
							title: data?.title ?? "",
						},
					],
				}}
			/>
			<EditContent value={data ?? {}} isLoading={isLoading} refetch={refetch} />
		</>
	);
};
export default PublicEditContainer;
