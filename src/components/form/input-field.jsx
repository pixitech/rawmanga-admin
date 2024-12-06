import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";

import { generatePassword } from "@/utils";
import RefreshIcon from "../icons/refresh-icon";
import FieldWraper from "./field-wraper";

const InputField = (props) => {
	const {
		label,
		registration,
		error,
		boxProps,
		labelProps,
		onChangeInput,
		isRequired,
		type = "text",
		placeholder,
		isRefresh,
		min,
		max,
		notSpace,
		isInteger,
		showDefault = true,
		inputClassName,
		...inputProps
	} = props;
	const { control } = useFormContext();
	const [values, setValuesData] = useState();
	const isNumber = type === "number";
	return (
		<FieldWraper label={label} error={error} boxProps={boxProps} labelProps={labelProps} isRequired={isRequired}>
			<Controller
				name={registration.name}
				control={control}
				render={({ field: { onChange, value, ...otherFields } }) => {
					let valueData = values;
					if (isNumber && showDefault) {
						valueData = value > 0 ? Number(value) : 0;
						setValuesData(value > 0 ? Number(value) : 0);
					} else {
						setValuesData(value);
						valueData = value;
					}
					const handleChangeInput = (event) => {
						let value = event.target.value;
						if (notSpace) {
							value = value.trim();
						}
						if (isNumber) {
							let newValue = value || value === 0 ? Number(value) : value;
							if (Number(newValue) > max && max) {
								newValue = max;
							}
							if (Number(newValue) < min && (min || min === 0)) {
								newValue = min;
							}
							valueData = newValue;
							onChange(newValue);
							onChangeInput?.(newValue);
							event.target.value = newValue;
						} else {
							valueData = value;
							onChange(value);
							onChangeInput?.(value);
						}
					};
					const onKeyPress = (e) => {
						if (isInteger) {
							const specialCharRegex = new RegExp("[0-9]");
							const pressedKey = String.fromCharCode(!e.charCode ? e.which : e.charCode);
							if (!specialCharRegex.test(pressedKey)) {
								e.preventDefault();
								return false;
							}
						}
					};

					const onBlur = (e) => {
						let value = e.target.value;
						if (isNumber) {
							if (value > max) value = max;
							if (value < min) value = min;
							value = value || value === 0 ? Number(value) : value;
							if (value) {
								valueData = value;
								onChangeInput?.(value);
								onChange(value);
								e.target.value = value;
							}
						} else {
							value = value.trim();
							valueData = value;
							onChange(value);
							onChangeInput?.(value);
							e.target.value = value;
						}
					};

					const handleClickRefresh = () => {
						let value = generatePassword();
						onChange(value);
						onChangeInput?.(value, true);
					};

					return (
						<TextField
							sx={{
								"& .MuiInputBase-root": {
									border: "none",
								},
								"& .Mui-disabled": {
									background: "#F1F1F1 !important",
								},
							}}
							type={type}
							placeholder={placeholder}
							InputProps={{
								className: `input-login ${inputClassName}`,
								endAdornment: isRefresh && (
									<InputAdornment position="end">
										<IconButton onClick={handleClickRefresh}>
											<RefreshIcon />
										</IconButton>
									</InputAdornment>
								),
							}}
							size="small"
							fullWidth
							error={!!error}
							{...inputProps}
							{...registration}
							{...otherFields}
							value={valueData}
							displayEmpty
							onChange={handleChangeInput}
							onKeyPress={onKeyPress}
							onBlur={onBlur}
						/>
					);
				}}
			/>
		</FieldWraper>
	);
};
export default InputField;
