import Head from "@/components/head";
import MangaEditComponent from "@/features/rumanhua/edit";
import { useGetMangaById } from "@/hooks/manga";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MangaEditContainer = () => {
	let { id } = useParams();
	const { data, isLoading, refetch } = useGetMangaById(id);
	console.log("data", data);

	const [title, setTitle] = useState();
	useEffect(() => {
		if (data && data.code !== 400) {
			const enTitle = data.titles.find((item) => item.type === "en");
			if (enTitle) {
				setTitle(enTitle.title);
			} else {
				const zhTitle = data.titles.find((item) => item.type === "zh");
				setTitle(zhTitle ? zhTitle.title : null);
			}
		}
	}, [data]);
	return (
		<>
			<Head
				title="Rumanhua"
				breadcrumb={{
					title: title ?? "",
					breadcrumb: [
						{
							title: "Rumanhua",
							path: "/rumanhua",
						},
						{
							title: title ?? "",
						},
					],
				}}
			/>
			<MangaEditComponent value={data} isLoading={isLoading} refetch={refetch} />
		</>
	);
};
export default MangaEditContainer;
