import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";

import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";

import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";

function App() {
	const { data: authUser, isLoading, error } = useQuery({
		queryKey: ["authUser"],
		queryFn: async () => {
			try {
				const res = await fetch("/api/auth/me");
				if (!res.ok) throw new Error("Failed to fetch user data");

				const data = await res.json();
				if (data.error) return null;
				return data;
			} catch (error) {
				console.error("Error fetching auth user:", error.message);
				return null;
			}
		},
		retry: false,
	});

	if (isLoading) {
		return (
			<div className="h-screen flex justify-center items-center">
				<LoadingSpinner size="lg" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="h-screen flex justify-center items-center text-red-500">
				Error fetching user data. Please try again.
			</div>
		);
	}

	return (
		<div className="flex max-w-6xl mx-auto">
			{authUser && <Sidebar />}
			<Routes>
				<Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
				<Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
				<Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
				<Route path="/notifications" element={authUser ? <NotificationPage /> : <Navigate to="/login" />} />
				<Route path="/profile/:username" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
			</Routes>
			{authUser && <RightPanel />}
			<Toaster />
		</div>
	);
}

export default App;
