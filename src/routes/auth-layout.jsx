import { Navigate, useLocation, Outlet } from "react-router-dom";
import { storage } from "@/utils";
import AuthLayout from "@/components/layout/auth-layout";

export const AuthRoute = () => {
	const location = useLocation();

	const token = storage.getToken();

	if (token) {
		return <Navigate to={"/"} state={{ from: location }} replace />;
	}
	return (
		<AuthLayout>
			<Outlet />
		</AuthLayout>
	);
};
