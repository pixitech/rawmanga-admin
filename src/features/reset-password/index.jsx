import ButtonAdd from "@/components/button/ButtonAdd";
import FormWrapper from "@/components/form/form-wraper";
import InputField from "@/components/form/input-field";
import InputFieldPassword from "@/components/form/input-field-password";
import { useConfirmRestPassword } from "@/hooks";
import { storage } from "@/utils";
import MySnackBar from "@/utils/snackbar";
import { Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { schemaResetPassword } from "./const";

const ResetPassword = () => {
	const navigate = useNavigate();

	const token = storage.getToken();
	const redirectAfterLogin = location?.state?.from?.pathname;

	if (token) {
		navigate(redirectAfterLogin);
	}

	const { mutateAsync: confirmResetPasswordApi, isLoading } = useConfirmRestPassword({
		onSuccess: (props) => {
			if (props?.status === 200) {
				navigate("/login");
			} else {
				console.log("props..........", props);
				MySnackBar.error({ message: props?.message });
			}
		},
		onError: (props) => {
			MySnackBar.error({ message: props?.message });
		},
	});

	const handleSubmit = async (values) => {
		const email = storage.getEmail();
		confirmResetPasswordApi({
			email: email,
			newPassword: values.password,
			confirmPassword: values.confirmPassword,
			confirmationCode: values.otp,
		});
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
						<FormWrapper schema={schemaResetPassword} onSubmit={handleSubmit}>
							{({ register, formState: { errors }, watch }) => {
								const password = watch("password");
								const confirmPassword = watch("confirmPassword");
								const otp = watch("otp");

								return (
									<Box display={"flex"} flexDirection={"column"}>
										<Box mb={2}>
											<InputField
												label="OTP"
												placeholder={"OTP"}
												registration={register("otp")}
												error={errors["otp"]}
												notSpace={true}
											/>
										</Box>
										<Box mb={2}>
											<InputFieldPassword
												label="New password"
												placeholder={"New password"}
												registration={register("password")}
												error={errors["password"]}
												notSpace={true}
											/>
										</Box>
										<Box mb={4}>
											<InputFieldPassword
												label="Confirm password"
												placeholder={"Confirm password"}
												registration={register("confirmPassword")}
												error={errors["confirmPassword"]}
												notSpace={true}
											/>
										</Box>
										<Box className="row-center" mb={2}>
											<ButtonAdd
												isHiddenIcon={true}
												loading={isLoading}
												type="submit"
												label={"Submit"}
												disabled={!otp || !password || !confirmPassword || password !== confirmPassword}
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
													Back to login
												</Typography>
											</Link>
										</Box>
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

export default ResetPassword;
