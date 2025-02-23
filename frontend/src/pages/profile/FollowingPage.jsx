import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "../../components/common/LoadingSpinner";

const FollowingPage = () => {
	const { username } = useParams();

	const { data: following, isLoading, error } = useQuery({
		queryKey: ["following", username],
		queryFn: async () => {
			const res = await fetch(`/api/users/${username}/following`);
			if (!res.ok) throw new Error("Failed to fetch following list");
			return res.json();
		},
	});

	if (isLoading) {
		return (
			<div className="flex justify-center h-full items-center">
				<LoadingSpinner size="lg" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center p-4 font-bold text-red-500">
				Error fetching following list. Please try again.
			</div>
		);
	}

	return (
		<div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen">
			<div className="p-4 border-b border-gray-700">
				<h2 className="font-bold text-xl">{username}'s Following</h2>
			</div>
			{following?.length === 0 ? (
				<div className="text-center p-4 font-bold">Not following anyone yet.</div>
			) : (
				<ul>
					{following.map((user) => (
						<li key={user._id} className="border-b border-gray-700 p-4">
							<Link to={`/profile/${user.username}`} className="flex items-center gap-3">
								<div className="avatar">
									<div className="w-10 rounded-full">
										<img src={user.profileImg || "/avatar-placeholder.png"} alt={user.username} />
									</div>
								</div>
								<div className="flex flex-col">
									<span className="font-bold">{user.fullName}</span>
									<span className="text-slate-500">@{user.username}</span>
								</div>
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default FollowingPage;
