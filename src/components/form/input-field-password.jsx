import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import FieldWraper from "./field-wraper";

const InputFieldPassword = (props) => {
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const { label, registration, error, boxProps, labelProps, onChangeInput, ...inputProps } = props;

	const { control } = useFormContext();

	return (
		<FieldWraper label={label} error={error} boxProps={boxProps} labelProps={labelProps}>
			<Controller
				name={registration.name}
				control={control}
				render={({ field: { onChange, value, ...otherFields } }) => {
					const handleChangeInput = (event) => {
						onChange(event.target.value);
						onChangeInput?.(event.target.value);
					};
					return (
						<TextField
							sx={{
								"& .MuiInputBase-root": {
									border: "none",
								},
							}}
							value={value}
							fullWidth
							error={!!error}
							{...inputProps}
							{...registration}
							{...otherFields}
							type={showPassword ? "text" : "password"}
							onChange={handleChangeInput}
							InputProps={{
								className: "input-login",
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
											{showPassword ? (
												<VisibilityOffIcon fontSize="24px" sx={{ color: "#768394" }} />
											) : (
												<VisibilityIcon fontSize="24px" sx={{ color: "#768394" }} />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					);
				}}
			/>
		</FieldWraper>
	);
};

export default InputFieldPassword;
