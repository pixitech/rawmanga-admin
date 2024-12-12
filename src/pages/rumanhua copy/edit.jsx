import Head from "@/components/head";
import ChapterEditComponent from "@/features/chapter/edit";
import { useGetChapterById } from "@/hooks/manga";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ChapterEditContainer = () => {
	let { id } = useParams();
	const { data, isLoading, refetch } = useGetChapterById(id);
	const [title, setTitle] = useState();
	useEffect(() => {
		if (data) {
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
				title="Chapter"
				breadcrumb={{
					title: title ?? "",
					breadcrumb: [
						{
							title: "Detail Manga",
							path: -1,
						},
						{
							title: title ?? "",
						},
					],
				}}
			/>
			<ChapterEditComponent value={data} isLoading={isLoading} refetch={refetch} />
		</>
	);
};
export default ChapterEditContainer;
