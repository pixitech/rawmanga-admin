/* eslint-disable react/display-name */
import React, { useCallback, useEffect, useImperativeHandle, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cloneDeep } from "lodash";
import { Box } from "@mui/material";

const FormWrapper = React.forwardRef((props, ref) => {
	const {
		onSubmit,
		children,
		options,
		schema,
		boxProps,
		fieldArrayName = "",
		isNested = false,
		mode = "onChange",
		defaultValues = {},
		isReset = false,
		values = {},
	} = props;
	const methods = useForm({
		...options,
		defaultValues: defaultValues,
		resolver: schema && zodResolver(schema),
		shouldFocusError: true,
		shouldUnregister: true,
		mode,
		values,
	});
	const fieldArrayMethods = useMemo(
		() => ({
			control: methods.control,
			name: fieldArrayName,
		}),
		[{ ...methods }, fieldArrayName]
	);

	const handleSubmit = useCallback(
		(dataForm, event) => {
			let dataFormHere = cloneDeep(dataForm);

			onSubmit(dataFormHere, methods, event);
		},
		[{ ...methods }, onSubmit]
	);

	const handleAffectSubmitForm = useCallback(
		(event) => {
			if (isNested) {
				event?.preventDefault();
				event?.stopPropagation();
			}

			return methods.handleSubmit(handleSubmit)(event);
		},
		[handleSubmit, isNested, { ...methods }]
	);

	const renderFormChildren = useMemo(() => {
		return children(methods, fieldArrayMethods);
	}, [children, fieldArrayMethods, { ...methods }]);

	useEffect(() => {
		methods.reset(defaultValues);
	}, [isReset]);

	useImperativeHandle(
		ref,
		() => ({
			methods,
		}),
		[{ ...methods }]
	);

	return (
		<>
			<FormProvider {...methods}>
				<Box component="form" onSubmit={handleAffectSubmitForm} {...boxProps}>
					{renderFormChildren}
				</Box>
			</FormProvider>
		</>
	);
});

export default FormWrapper;
