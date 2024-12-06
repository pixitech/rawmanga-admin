import React from "react";
import { Box, Collapse, FormControl, FormHelperText, FormLabel } from "@mui/material";

// eslint-disable-next-line react/display-name
const FieldWraper = React.memo((props) => {
	const { label, error, children, boxProps, labelProps, isRequired } = props;
	return (
		<Box {...boxProps}>
			<FormControl fullWidth size="small">
				{label && (
					<FormLabel
						{...{
							sx: {
								marginBottom: 1,
								fontSize: "12px",
								fontWeight: 500,
								color: "#768394 !important",
							},
							...labelProps,
						}}
						className={`${isRequired ? "starDanger" : ""}`}
					>
						{label}
					</FormLabel>
				)}
				{children}
				<Collapse in={!!error?.message}>
					{error?.message && (
						<FormHelperText error={!!error?.message} role="alert" aria-label={error.message}>
							{error?.message === "Required" ? `${label} là trường bắt buộc !` : error.message}
						</FormHelperText>
					)}
				</Collapse>
			</FormControl>
		</Box>
	);
});

export default FieldWraper;
