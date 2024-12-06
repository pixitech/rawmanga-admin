import { Box, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ButtonAdd from "@/components/button/ButtonAdd";
import FormWrapper from "@/components/form/form-wraper";
import InputField from "@/components/form/input-field";
import { useRequestResetPassword } from "@/hooks";
import MySnackBar from "@/utils/snackbar";
import { schemaForgotPassword } from "./const";

const ForgotPassword = () => {
	const navigate = useNavigate();
	const [isEnableSubmit, setIsEnableSubmit] = useState(false);
	const { mutateAsync, isLoading } = useRequestResetPassword({
		onSuccess: (props) => {
			if (props?.status === 200) {
				MySnackBar.success({ message: "Email đã được gửi đi thành công." });
				navigate(`/reset-password`);
			} else {
				MySnackBar.error({ message: props?.message });
			}
		},
		onError: (e) => {
			MySnackBar.error({ message: "Không tìm thấy Email" });
		},
	});

	const handleSubmit = async (values) => {
		mutateAsync({ email: values.email });
	};
	const handleChangeValue = (values) => {
		setIsEnableSubmit(!!values.email);
	};

	return (
		<>
			<Box
				sx={{
					width: "100%",
					height: "100px",
					left: 0,
					top: "24px",
					position: "absolute",
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
				}}
			>
				<div className="row-center">
					<img src={"/images/manga-logo.svg"} alt={"Logo"} />
				</div>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					height: "100%",
				}}
			>
				<Box>
					<Box className="text-center" gap={12}>
						<Typography fontSize={32} fontWeight={700} color={"#1C1A17"}>
							Forgot password
						</Typography>
					</Box>
					<Box marginTop={2.5}>
						<FormWrapper schema={schemaForgotPassword} onSubmit={handleSubmit}>
							{({ register, formState: { errors }, getValues }) => {
								return (
									<Box display={"flex"} flexDirection={"column"}>
										<>
											<Box mb={2.5}>
												<InputField
													label="Email"
													registration={register("email")}
													error={errors["email"]}
													placeholder={"Please input email"}
													onChangeInput={() => handleChangeValue(getValues())}
													notSpace={true}
												/>
											</Box>
											<Box className="row-center" mb={2}>
												<ButtonAdd
													isHiddenIcon={true}
													loading={isLoading}
													type="submit"
													label={"Submit"}
													disabled={!isEmpty(errors) || !isEnableSubmit}
												/>
											</Box>
											<Box className="row-center">
												<Link to={"/login"} style={{ textDecoration: "none" }}>
													<Typography
														sx={{
															textDecoration: "none",
															cursor: "pointer",
															"&:hover": {
																textDecoration: "underline",
															},
														}}
														fontWeight={500}
														color={"#F38D03"}
													>
														Back
													</Typography>
												</Link>
											</Box>
										</>
									</Box>
								);
							}}
						</FormWrapper>
					</Box>
				</Box>
			</Box>
		</>
	);
};
export default ForgotPassword;
