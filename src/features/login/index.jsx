import ButtonAdd from "@/components/button/ButtonAdd";
import FormWrapper from "@/components/form/form-wraper";
import InputField from "@/components/form/input-field";
import InputFieldPassword from "@/components/form/input-field-password";
import { useLogin } from "@/hooks";
import { storage } from "@/utils";
import MySnackBar from "@/utils/snackbar";
import { Box, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import {
	Link,
	// useLocation,
	useNavigate,
} from "react-router-dom";
import { schemaLogin } from "./const";

const LoginForm = () => {
	// const location = useLocation();
	// const redirectAfterLogin = location?.state?.from?.pathname;

	const navigate = useNavigate();
	const { mutateAsync, isLoading } = useLogin({
		onError: (message) => {
			console.log(message);
			MySnackBar.error({ message: message ?? "Email hoặc mật khẩu không đúng" });
		},
		onSuccess: ({ status, message, data }) => {
			if (status && status === 200) {
				storage.setToken(data?.AccessToken);
				storage.setUserLogin(data?.user);
				// if (redirectAfterLogin) {
				// 	navigate(redirectAfterLogin);
				// } else {
				navigate("/");
				// }
			} else {
				MySnackBar.error({ message: message });
			}
		},
	});

	const [isEnableSubmit, setIsEnableSubmit] = useState(true);
	const handleSubmit = async (values) => {
		mutateAsync(values);
	};

	const handleChangeValue = (values) => {
		setIsEnableSubmit(values.email && values.password);
	};

	useEffect(() => {
		storage.clearVerifyToken();
	}, []);

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
					<Box className="text-center">
						<Typography fontSize={32} fontWeight={700} color={"#1C1A17"}>
							Login
						</Typography>
					</Box>
					<Box marginTop={2.5}>
						<FormWrapper
							schema={schemaLogin}
							onSubmit={handleSubmit}
							defaultValues={{ email: "test@yopmail.com", password: "Aa123456!" }}
						>
							{({ register, formState: { errors }, getValues }) => {
								return (
									<Box display={"flex"} flexDirection={"column"} gap={2.5}>
										<InputField
											onChangeInput={() => handleChangeValue(getValues())}
											label="Email"
											placeholder={"Please input email"}
											registration={register("email")}
											error={errors["email"]}
											notSpace={true}
										/>
										<Box>
											<InputFieldPassword
												onChangeInput={() => handleChangeValue(getValues())}
												label="Password"
												placeholder={"Input password"}
												registration={register("password")}
												error={errors["password"]}
												notSpace={true}
											/>
											<Box mt={1} sx={{ float: "right" }}>
												<Link to={"/forgot-password"} style={{ textDecoration: "none" }}>
													<Typography
														sx={{
															textDecoration: "none",
															cursor: "pointer",
															"&:hover": {
																textDecoration: "underline",
															},
														}}
														color={"#F38D03"}
													>
														Forgot password
													</Typography>
												</Link>
											</Box>
										</Box>
										<Box className="row-center">
											<ButtonAdd
												isHiddenIcon={true}
												loading={isLoading}
												type="submit"
												label={"Login"}
												disabled={!isEmpty(errors) || !isEnableSubmit}
											/>
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

export default LoginForm;
