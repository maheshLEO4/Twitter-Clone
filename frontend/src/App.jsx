import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import LoadingSpinner from "./components/common/LoadingSpinner";

// Lazy Loaded Pages for Performance Optimization
const HomePage = lazy(() => import("./pages/home/HomePage"));
const LoginPage = lazy(() => import("./pages/auth/login/LoginPage"));
const SignUpPage = lazy(() => import("./pages/auth/signup/SignUpPage"));
const NotificationPage = lazy(() => import("./pages/notification/NotificationPage"));
const ProfilePage = lazy(() => import("./pages/profile/ProfilePage"));
const FollowersPage = lazy(() => import("./pages/profile/FollowersPage"));
const FollowingPage = lazy(() => import("./pages/profile/FollowingPage"));

// Function to Fetch Authenticated User
const fetchAuthUser = async () => {
    try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        return data.error ? null : data;
    } catch (error) {
        console.error("Error fetching auth user:", error.message);
        return null;
    }
};

function App() {
    const { data: authUser, isLoading, error } = useQuery({
        queryKey: ["authUser"],
        queryFn: fetchAuthUser,
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
            <div className="h-screen flex flex-col justify-center items-center text-red-500">
                <p>Error fetching user data. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="flex max-w-6xl mx-auto">
            {authUser && <Sidebar />}
            <Suspense fallback={<LoadingSpinner size="lg" />}>
                <Routes>
                    <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
                    <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
                    <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
                    <Route path="/notifications" element={authUser ? <NotificationPage /> : <Navigate to="/login" />} />
                    <Route path="/profile/:username" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
                    <Route path="/profile/:username/followers" element={authUser ? <FollowersPage /> : <Navigate to="/login" />} />
                    <Route path="/profile/:username/following" element={authUser ? <FollowingPage /> : <Navigate to="/login" />} />
                </Routes>
            </Suspense>
            {authUser && <RightPanel />}
            <Toaster />
        </div>
    );
}

export default App;
