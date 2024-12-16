import ReadingVertical from "./ReadingVertical";

const ReadChapter = ({ data }) => {
	const sortedData = data?.sort((a, b) => a.current_index - b.current_index) || [];
	const comicList = sortedData.map((item) => {
		const listTextTranslate = item?.text_coordinates?.map((textItem) => {
			const listtranslations = Array.isArray(textItem?.translations) ? textItem.translations : [];
			const textTranslations = listtranslations.find((translation) => translation.language === "en");

			return {
				...textItem,
				text: textTranslations?.translated_text || textItem?.text,
			};
		});

		return {
			url: item?.url,
			text_coordinates: listTextTranslate,
		};
	});

	return <ReadingVertical comicList={comicList} />;
};

export default ReadChapter;
