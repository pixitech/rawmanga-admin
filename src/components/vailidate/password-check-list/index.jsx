import { Box } from "@mui/material";
import CheckListItem from "./check-list-item";
import { useEffect, useState } from "react";
import {
	isPassRegex,
	regexLowercase,
	regexMinlength,
	regexNumber,
	regexUppercase,
	regexspecialCharacte,
} from "@/utils/regex";
import { useQueryRouter } from "@/hooks";

const PasswordCheckList = ({ value, onChange, checkList }) => {
	const queryRouter = useQueryRouter();
	const email = queryRouter.get("email");
	const userId = queryRouter.get("userId");
	const [state, setState] = useState({
		minLength: false,
		uppercase: false,
		lowercase: false,
		number: false,
		mustNotSameAccount: false,
		specialChar: false,
		isPassOptional: false,
		isPassAll: false,
	});

	useEffect(() => {
		onChange?.(state.isPassAll);
	}, [onChange, state.isPassAll]);

	useEffect(() => {
		setState(checkList);
	}, [checkList]);

	useEffect(() => {
		const stateEdit = {};
		if (!value) {
			setState((prev) => ({
				...prev,
				...{
					minLength: false,
					uppercase: false,
					lowercase: false,
					number: false,
					specialChar: false,
					isPassOptional: false,
					isPassAll: false,
				},
			}));
			return;
		}

		stateEdit.mustNotSameAccount = value !== email && value !== userId;
		stateEdit.minLength = isPassRegex(regexMinlength, value);
		stateEdit.uppercase = isPassRegex(regexUppercase, value);
		stateEdit.lowercase = isPassRegex(regexLowercase, value);
		stateEdit.number = isPassRegex(regexNumber, value);
		stateEdit.specialChar = isPassRegex(regexspecialCharacte, value);

		setState((prev) => ({ ...prev, ...stateEdit }));
	}, [email, userId, value]);

	useEffect(() => {
		const valueArray = [state.uppercase, state.lowercase, state.number, state.specialChar];

		setState((prev) => ({
			...prev,
			isPassOptional: valueArray.filter((item) => !!item).length >= 2,
		}));
	}, [state.uppercase, state.lowercase, state.number, state.specialChar]);

	useEffect(() => {
		if (state.minLength && state.isPassOptional && state.mustNotSameAccount) {
			setState((prev) => ({
				...prev,
				isPassAll: true,
			}));
		} else {
			setState((prev) => ({
				...prev,
				isPassAll: false,
			}));
		}
	}, [state.minLength, state.isPassOptional, state.mustNotSameAccount]);

	return (
		<Box display={"flex"} flexDirection="column" gap={0.5}>
			<CheckListItem isPass={state.minLength} title={"A minimum 12 characters"} />
			<CheckListItem isPass={state.isPassOptional} title={"At least 2 of the following:"} />
			<Box display={"flex"} flexDirection="column" gap={0.5} pl={2}>
				<CheckListItem isPass={state.uppercase} title={"At least 1 uppercase letter (A-Z)"} />
				<CheckListItem isPass={state.lowercase} title={"At least 1 lowercase letter (a-z)"} />
				<CheckListItem isPass={state.number} title={"At least 1 number (0-9)"} />
				<CheckListItem isPass={state.specialChar} title={"At least 1 special character ($@#)"} />
			</Box>
			<CheckListItem
				isPass={state.mustNotSameAccount}
				title={"Must not be the same as the system account ID or user ID"}
			/>
		</Box>
	);
};

export default PasswordCheckList;
