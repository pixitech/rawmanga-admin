const typographyBases = {
	lineHeight: "137.5%",
	fontStyle: "normal",
};

export function themeTypography() {
	return {
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
		fontFamily: "Nunito, Roboto, sans-serif",
		h1: {
			...typographyBases,
			fontSize: "3.5rem",
			fontWeight: "bold",
		},
		h2: {
			...typographyBases,
			fontWeight: "bold",
			fontSize: "2.5rem",
		},
		h3: {
			...typographyBases,
			fontWeight: "bold",
			fontSize: "2rem",
		},
		h4: {
			...typographyBases,
			fontWeight: "bold",
			fontSize: "1.5rem",
		},
		h5: {
			...typographyBases,
			fontWeight: "bold",
			fontSize: "1.25rem",
		},
		h6: {
			...typographyBases,
			fontWeight: "bold",
			fontSize: "1.125rem",
		},
		body1: {
			...typographyBases,
			fontSize: "1rem",
			fontWeight: 400,
		},
		body2: {
			...typographyBases,
			fontSize: "1rem",
			fontWeight: 500,
		},
		body3: {
			...typographyBases,
			fontSize: "1.125rem",
			fontWeight: 400,
		},
		body4: {
			...typographyBases,
			fontSize: "1.375rem",
			fontWeight: 400,
		},
		body5: {
			...typographyBases,
			fontSize: "1.5rem",
			fontWeight: 500,
		},
		button: {
			...typographyBases,
			fontSize: "1.125rem",
			fontWeight: 500,
			textTransform: "none",
		},
		button1: {
			...typographyBases,
			fontSize: "0.875rem",
			fontWeight: 500,
		},
		button2: {
			...typographyBases,
			fontSize: "1.375rem",
			fontWeight: 500,
		},
		subtitle1: {
			...typographyBases,
			fontSize: "0.875rem",
			fontWeight: 400,
		},
		subtitle2: {
			...typographyBases,
			fontSize: "0.75rem",
			fontWeight: 400,
		},
		caption: {
			...typographyBases,
			fontSize: "0.75rem",
			fontWeight: 400,
		},
		caption1: {
			...typographyBases,
			fontSize: "0.875rem",
			fontWeight: 500,
		},
		caption2: {
			...typographyBases,
			fontSize: "1rem",
			fontWeight: 400,
		},
		overline: {
			...typographyBases,
			fontSize: "0.75rem",
			fontWeight: 400,
		},
		desciption: {
			...typographyBases,
			fontSize: "0.875rem",
			fontWeight: 400,
		},
	};
}
