const colorBases = {
	white: "#FDFDFD",
	whiteSmoke: "#F0F0F0",
	whiteSmoke2: "#FFFFFFE5",
	black: "#000",
	primary: "#1B65F8",
	primary1: "#768394",
	blue: "#1B65F8",
	yellow: "#FFCE00",
	orange: "#FB7F08",
	orange10: "#F38D03",
	pink: "#DB1B78",
	mint: "#00CF89",
	purple: "#A238EE",
	success: "#0DB129",
	warning: "#FFBD4A",
	error: "#CD2011",
	helper: "#6E6E6E",
	stroke: "#BACBD5",
	textBody: "#515151",
	textDisable: "#A3A3A3",
	textSecondary: "#515151",
	textPlaceholder: "#A3A3A3",
	textSubTitle: "#6F7D8A",
	divider: "#DBDBDB",
	textButtonDisable: "#A3A3A3",
	secondary: "#23AC38",
	warningText: "#EF5023",
	grey10: "#F0F0F0",
	grey30: "#C2C2C2",
	grey50: "#898989",
	grey60: "#6E6E6E",
	grey65: "#64686E",
	grey70: "#525252",
	grey75: "#474747",
	transparent: "transparent",
	interest: "#0067FF",
	black20: "#212626",
};

export function themePalette() {
	return {
		mode: "light",
		text: {
			primary: colorBases.textBody,
			primary1: colorBases.primary1,
			active: colorBases.orange10,
			white: colorBases.white,
			secondary: colorBases.textSecondary,
			disabled: colorBases.textDisable,
			grey70: colorBases.grey70,
			blue: colorBases.blue,
		},
		primary: {
			contrastText: colorBases.white,
			light: colorBases.primary,
			main: colorBases.primary,
			blue: colorBases.blue,
		},
		secondary: {
			main: colorBases.blue,
		},
		common: {
			blue: colorBases.blue,
			yellow: colorBases.yellow,
			orange: colorBases.orange,
			mint: colorBases.mint,
			purple: colorBases.purple,
			pink: colorBases.pink,
			stroke: colorBases.stroke,
			black: colorBases.black,
			grey10: colorBases.grey10,
			grey30: colorBases.grey30,
			grey50: colorBases.grey50,
			grey60: colorBases.grey60,
			grey65: colorBases.grey65,
			grey70: colorBases.grey70,
			grey75: colorBases.grey75,
			black20: colorBases.black20,
		},
		success: {
			contrastText: colorBases.white,
			light: colorBases.success,
			dark: colorBases.white,
			main: colorBases.success,
		},
		warning: {
			contrastText: colorBases.white,
			main: colorBases.warning,
			light: colorBases.warningText,
		},
		error: {
			contrastText: colorBases.white,
			main: colorBases.error,
		},
		divider: colorBases.divider,
		action: {
			disabled: colorBases.textButtonDisable,
		},
		background: {
			disabled: colorBases.grey30,
			transparent: colorBases.transparent,
			white: colorBases.white,
			main: colorBases.white,
			whiteSmoke: colorBases.whiteSmoke,
			whiteSmoke2: colorBases.whiteSmoke2,
			interest: colorBases.interest,
		},
	};
}