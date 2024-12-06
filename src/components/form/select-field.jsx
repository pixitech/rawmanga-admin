// import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import SelectItems from "../select/SelectItems";
import FieldWraper from "./field-wraper";

const SelectField = (props) => {
	const {
		label,
		registration,
		error,
		boxProps,
		labelProps,
		onChangeInput,
		isRequired,
		placeholder,
		selectList,
		...selectProps
	} = props;
	const { control } = useFormContext();
	return (
		<FieldWraper label={label} error={error} boxProps={boxProps} labelProps={labelProps} isRequired={isRequired}>
			<Controller
				name={registration.name}
				control={control}
				render={({ field: { onChange, value, ...otherFields } }) => {
					const handleChangeInput = (event) => {
						onChange(event.target.value);
						onChangeInput?.(event.target.value);
					};
					let classCustomer = "";
					if (selectList) {
						const findClass = selectList.find((item) => item.value === value);
						classCustomer = findClass?.class ?? "";
					}
					return (
						<SelectItems
							classCustomer={classCustomer}
							placeholder={placeholder}
							value={value}
							handleChangeInput={handleChangeInput}
							selectList={selectList}
							{...selectProps}
						/>
					);
				}}
			/>
		</FieldWraper>
	);
};
export default SelectField;
