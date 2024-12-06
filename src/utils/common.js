export const trimString = (u) => (typeof u === "string" ? u.trim() : u);

export const checkImgWork = (url) => {
	if (!url || typeof url !== "string") return Promise.resolve(false);
	return new Promise((resolve) => {
		const imgElement = new Image();
		imgElement.addEventListener("error", () => resolve(false));
		imgElement.addEventListener("load", () => resolve(true));
		imgElement.src = url;
	});
};

export const numberWithCommas = (x) => {
	if (!x) {
		return 0;
	}
	var parts = x.toString().split(".");
	if (parts[0]) {
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return parts.join(".");
	}
	return parts.join(".");
};

export const validateFileImageExtension = (fileName) => {
	var exp = /^.*\.(jpg|jpeg|gif|JPG|png|PNG)$/;
	return exp.test(fileName);
};
