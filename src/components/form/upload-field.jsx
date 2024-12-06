import { Controller, useFormContext } from "react-hook-form";

import UploadImage from "../upload/UploadImage";
import FieldWraper from "./field-wraper";

const UploadField = (props) => {
	const {
		label,
		registration,
		error,
		boxProps,
		labelProps,
		onChangeInput,
		isRequired,
		group,
		disabled,
		...inputProps
	} = props;
	const { control } = useFormContext();

	return (
		<FieldWraper label={label} error={error} boxProps={boxProps} labelProps={labelProps} isRequired={isRequired}>
			<Controller
				name={registration.name}
				control={control}
				render={({ field: { onChange, value, ...otherFields } }) => {
					const handleChangeInput = (value) => {
						onChange(value);
						onChangeInput?.(value);
					};
					return (
						<UploadImage
							error={!!error}
							{...inputProps}
							{...registration}
							{...otherFields}
							value={value}
							onChange={handleChangeInput}
							group={group}
							disabled={disabled}
						/>
					);
				}}
			/>
		</FieldWraper>
	);
};
export default UploadField;
