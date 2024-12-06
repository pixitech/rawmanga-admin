import { useState } from "react";

const useHandleImageUrl = (imageCache, imageUrl) => {
	const [validImageUrl, setValidImageUrl] = useState(imageUrl || imageCache || "");
	const testImage = (URL) => {
		var tester = new Image();
		tester.onload = imageFound;
		tester.onerror = imageNotFound;
		tester.src = URL;
	};
	function imageFound() {
		setValidImageUrl(imageCache || imageUrl);
	}
	function imageNotFound() {
		setValidImageUrl("/images/anisage-load.jpg");
	}
	testImage(imageCache || imageUrl);
	return validImageUrl;
};

export default useHandleImageUrl;
