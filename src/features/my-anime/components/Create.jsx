import FormWrapper from "@/components/form/form-wraper";
import { STATUS_TITLE_ENUM } from "@/constant/title";
import { useState } from "react";
import { schemaForm } from "./const/schema";

const CreateComponent = () => {
	const [values, setValues] = useState({
		status: STATUS_TITLE_ENUM.ACTIVE.key,
	});

	const handleSubmit = async () => {
		let payload = {};
	};

	return (
		<>
			<FormWrapper
				id="formWrapper"
				schema={schemaForm}
				onSubmit={handleSubmit}
				// values={{
				// 	...values,
				// }}
				defaultValues={{
					...values,
				}}
			>
				{({ register, formState: { errors }, getValues }) => {
					return <>Create</>;
				}}
			</FormWrapper>
		</>
	);
};

export default CreateComponent;
