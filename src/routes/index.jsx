import ChapterEditContainer from "@/pages/rumanhua copy/edit";
import ContactContainer from "@/pages/contact";
import ForgotPasswordContainer from "@/pages/forgot-password";
import LoginFormContainer from "@/pages/login";
import PublicContainer from "@/pages/public";
import PublicCreateContainer from "@/pages/public/create";
import PublicEditContainer from "@/pages/public/edit";
import ResetPasswordContainer from "@/pages/reset-password";
import MangaContainer from "@/pages/rumanhua";
import MangaEditContainer from "@/pages/rumanhua/edit";
import { AuthRoute } from "@/routes/auth-layout";
import { ProtectedRoute } from "@/routes/protected-route";
import { Navigate, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<AuthRoute />}>
				<Route path={"/login"} element={<LoginFormContainer />} />
				<Route path={"/forgot-password"} element={<ForgotPasswordContainer />} />
				<Route path={"/reset-password"} element={<ResetPasswordContainer />} />
			</Route>
			<Route element={<ProtectedRoute />}>
				<Route path={"/rumanhua"} element={<MangaContainer />} />
				<Route path={"/rumanhua/:id"} element={<MangaEditContainer />} />
				<Route path={"/chapter/:id"} element={<ChapterEditContainer />} />
				<Route path={"/public"} element={<PublicContainer />} />
				<Route path={"/public/create"} element={<PublicCreateContainer />} />
				<Route path={"/public/:id"} element={<PublicEditContainer />} />
				<Route path={"/contact"} element={<ContactContainer />} />
			</Route>
			<Route path="/" element={<Navigate to="/rumanhua" />} />
		</Routes>
	);
};
