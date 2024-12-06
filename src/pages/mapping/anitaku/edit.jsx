import Head from "@/components/head";
import EditContent from "@/features/mapping/anitaku/edit";
import { useGetMovies } from "@/hooks";
import { useParams } from "react-router-dom";

const AnitakuEditContainer = () => {
	let { id } = useParams();
	const { data, isLoading, refetch } = useGetMovies(id);
	return (
		<>
			<Head
				title="Anitaku Mapping"
				breadcrumb={{
					title: data?.name ?? "",
					breadcrumb: [
						{
							title: "Anitaku Mapping",
							path: "/mapping/anitaku",
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
export default AnitakuEditContainer;
