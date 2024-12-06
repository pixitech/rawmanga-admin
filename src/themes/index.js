import { createTheme } from "@mui/material/styles";
import { themePalette } from "@/themes/palette";
import { componentStyleOverrides } from "@/themes/component-style-overrides";
import { zIndexDefines } from "./zIndex";
import { shapeOptions } from "@/themes/shape";
import { themeTypography } from "@/themes/typography";

const createThemeOptions = () => {
	return {
		palette: themePalette(),
		typography: themeTypography(),
		components: componentStyleOverrides(),
		zIndex: zIndexDefines,
		shape: shapeOptions(),
		spacing: 8,
		breakpoints: {
			values: {
				// xs: 600,
				// sm: 600, // Tablet
				// md: 900,
				// lg: 1342, // Desktop
				// xl: 1536,
				xs: 600,
				sm: 600, // Tablet
				md: 900,
				lg: "100%", // Desktop
				xl: "100%",
			},
		},
	};
};

export const theme = createTheme(createThemeOptions());
