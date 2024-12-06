export function componentStyleOverrides() {
	return {
		MuiTypography: {
			defaultProps: {
				variantMapping: {
					h1: "h1",
					h2: "h2",
					h3: "h3",
					h4: "h4",
					h5: "h5",
					h6: "h6",
					subtitle1: "h2",
					subtitle2: "h3",
					body1: "p",
					body2: "p",
					body3: "p",
					body4: "p",
					body5: "p",
					span: "span",
				},
			},
		},
		MuiButton: {
			variants: [
				{
					props: { variant: "delete" },
					style: {
						borderRadius: "6px",
						color: "#768394",
						background: "#EFF1F5",
						minWidth: "150px",
						minHeight: "40px",
						padding: "10px 12px",
						gap: "8px",

						"&:hover": {
							background: "#EFF1F5",
						},
						"&:active": {
							background: "#EFF1F5",
						},
					},
				},
				{
					props: { variant: "active" },
					style: {
						borderRadius: "6px",
						color: "#FFFFFF",
						background: "#7EC820",
						minWidth: "150px",
						minHeight: "40px",
						padding: "10px 12px",

						"&:hover": {
							background: "#7EC820",
						},
						"&:active": {
							background: "#7EC820",
						},
					},
				},
				{
					props: { variant: "inactive" },
					style: {
						borderRadius: "6px",
						color: "#FFFFFF",
						background: "#EF563F",
						minWidth: "150px",
						minHeight: "40px",
						padding: "10px 12px",

						"&:hover": {
							background: "#EF563F",
						},
						"&:active": {
							background: "#EF563F",
						},
					},
				},
				{
					props: { variant: "outlined" },
					style: {
						border: "1px solid #898989",
						color: "#515151",
						"&:hover": {
							background: "#E5E5E5",
							border: "1px solid #898989",
						},
						"&:active": {
							background: "#DBDBDB",
						},
						"&[disabled]": {
							border: "1px solid #C2C2C2",
							color: "#C2C2C2",
						},
					},
				},
				{
					props: { variant: "contained" },
					style: {
						border: "none",
						background: "#1B65F8",
						color: "#FDFDFD",
						boxShadow: "none !important",
						"&:hover": {
							background: "#0645C5",
						},
						"&:active": {
							background: "#0439A4",
						},
					},
				},
				{
					props: { variant: "secondary" },
					style: {
						border: "none",
						background: "#898989",
						color: "#FDFDFD",
						"&:hover": {
							background: "#7B7B7B",
						},
						"&:active": {
							background: "#6E6E6E",
						},
					},
				},
				{
					props: { variant: "map" },
					style: {
						border: "none",
						background: "#FDFDFD",
						color: "#FDFDFD",
						"&:hover": {
							background: "#E5E5E5",
						},
						"&:active": {
							background: "#DBDBDE",
						},
					},
				},
				{
					props: { variant: "danger" },
					style: {
						border: "none",
						background: "#DA1E28",
						color: "#FDFDFD",
						"&:hover": {
							background: "#9F0711",
						},
						"&:active": {
							background: "#7B020A",
						},
					},
				},
				{
					props: { variant: "search" },
					style: {
						border: "none",
						background: "var(--Admin-Color-Neutral-1, #768394)",
						color: "#FFFFFF",
						borderRadius: "6px",
						"&:hover": {
							background: "var(--Admin-Color-Neutral-1, #768394)",
						},
						"&:active": {
							background: "var(--Admin-Color-Neutral-1, #768394)",
						},
					},
				},
			],
			styleOverrides: {
				root: ({ theme }) => {
					return {
						padding: "16px 16px 16px 16px",
						borderRadius: 4,
						fontSize: 16,
						fontWeight: 400,
						lineHeight: "16px",
						height: 40,
						"&.MuiButton-sizeSmall": {
							height: 32,
							fontSize: 14,
						},
						"&.Mui-disabled": {
							background: theme.palette.common.grey30,
						},
						"& .MuiTouchRipple-root": {
							display: "none",
						},
					};
				},
			},
		},
		// Custom height, placeholder input and select
		MuiInputBase: {
			styleOverrides: {
				root: ({ theme, ownerState }) => {
					return {
						// config textarea = inherit
						borderTopLeftRadius: "0 !important",
						borderTopRightRadius: "0 !important",
						height: ownerState.multiline ? "inherit" : theme.spacing(5),
						maxHeight: ownerState.multiline ? "inherit" : theme.spacing(7),
						"&.Mui-disabled": {
							backgroundColor: theme.palette.common.whiteSmoke,
						},
						"& input": {
							paddingTop: theme.spacing(1), // for auto-complete insert background color
							paddingBottom: theme.spacing(1), // for auto-complete insert background color
							paddingLeft: theme.spacing(1.25), // for auto-complete insert background color
							paddingRight: theme.spacing(1.25), // for auto-complete insert background color
							fontSize: theme.typography.pxToRem(16),
							lineHeight: "150%",
							fontWeight: theme.typography.fontWeightRegular,
						},
						"&.Mui-error": {
							"&::after": {
								transform: `scaleX(1)`,
							},
						},
						"&.MuiFilledInput-root": {
							backgroundColor: `${theme.palette.common.grey10} !important`,
						},

						"&::before": {
							borderBottom: `1px solid ${theme.palette.common.grey50} !important`,
						},

						"& fieldset": {
							borderWidth: 1,
							borderStyle: "solid",
							borderColor: "theme.palette.text.title",
						},

						"&::placeholder": {
							color: theme.palette.text.disabled,
							opacity: 1,
						},
						"&::-moz-placeholder": {
							color: theme.palette.text.disabled,
							opacity: 1,
						},
						"&:-ms-input-placeholder": {
							color: theme.palette.text.disabled,
							opacity: 1,
						},
						"&::-webkit-input-placeholder": {
							color: theme.palette.text.disabled,
							opacity: 1,
						},
					};
				},
			},
		},
		MuiTableRow: {
			styleOverrides: {
				root: ({ theme }) => {
					return {
						"&.Mui-selected, &:hover td": {
							backgroundColor: `${theme.palette.secondary.light} !important`,
						},
					};
				},
			},
		},
		MuiRating: {
			styleOverrides: {
				root: ({ theme }) => {
					return {
						color: "#FFCE00",
					};
				},
			},
		},
	};
}

export function iosInputStyleOverrides() {
	return {
		styleOverrides: {
			root: {
				"*": {
					"-webkit-user-select": "text !important" /* Chrome, Opera, Safari */,
					"-moz-user-select": "text !important" /* Firefox 2+ */,
					"-ms-user-select": "text !important" /* IE 10+ */,
					"user-select": "text !important" /* Standard syntax */,
				},
			},
		},
	};
}
