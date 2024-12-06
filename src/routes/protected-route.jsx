import MainLayout from "@/components/layout/main-layout";
import Loading from "@/components/loading";
import { useGetProfile } from "@/hooks";
import { useProfileStore } from "@/stores";
import { storage } from "@/utils";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
	const { profile } = useProfileStore();
	const location = useLocation();
	const { refetch } = useGetProfile();

	const fetchProfile = async () => {
		refetch();
	};

	const token = storage.getToken();
	useEffect(() => {
		fetchProfile();
		setTimeout(() => {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}, 200);
	}, [location.pathname]);

	useEffect(() => {
		if (!location.pathname.includes("/search")) storage.removeData("searchParam");
	}, []);

	if (!token) {
		return <Navigate to={"/login"} state={{ from: location }} replace />;
	}

	if (profile) {
		return (
			<MainLayout>
				<Outlet />
			</MainLayout>
		);
	}

	return (
		<h1>
			<Loading isLoading={true} />
		</h1>
	);
};
