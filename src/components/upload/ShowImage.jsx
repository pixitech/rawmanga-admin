/* eslint-disable react-hooks/exhaustive-deps */
import { getImageById, getImageFilmsById, getImageMappingsById } from "@/actions";
import useHandleImageUrl from "@/hooks/use-validate-image";
import { useEffect, useState } from "react";

export default function ShowImage({ id, type, imageURl }) {
	const [avatar, setAvatar] = useState(null);
	const getImage = async (id) => {
		if (!id) {
			setAvatar(null);
			return;
		}
		let data;
		switch (type) {
			case "mapping":
				data = await getImageMappingsById({ id });
				break;
			case "films":
				data = await getImageFilmsById({ id });
				break;
			default:
				data = await getImageById({ id });
				break;
		}
		if (typeof data === "string" && data && !data.errorCode) {
			setAvatar(data);
		}
	};
	const image = useHandleImageUrl(avatar, imageURl);
	useEffect(() => {
		getImage(id);
	}, [id]);
	if (avatar || imageURl) {
		return (
			<>
				<a href={avatar || imageURl} target="_blank" rel="noopener noreferrer" style={{ cursor: "pointer" }}>
					<img src={image} />
				</a>
				<a href={avatar || imageURl} target="_blank" rel="noopener noreferrer">
					<div className="limit-text-3 mt-8" style={{ wordBreak: "break-all" }}>
						{avatar || imageURl}
					</div>
				</a>
			</>
		);
	}
	return <></>;
}
