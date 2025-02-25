import { useGetProfileQuery } from "../../redux/api/auth";
import { Skeleton } from "@mui/material";

const Profile = () => {
    const { data, isLoading } = useGetProfileQuery();
    console.log(data);


    if (isLoading) {
        return <Skeleton variant="rectangular" width="100%" height={300} />;
    }

    if (!data || !data.profile) {
        return <p className="text-center text-red-500">Profile not found!</p>;
    }

    const { profile } = data;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            {/* Cover Image */}
            <div className="relative">
                <img
                    src={profile.coverImage || "https://via.placeholder.com/800x300"}
                    alt="Cover"
                    className="w-full h-48 object-cover rounded-lg"
                />
                {/* User Picture */}
                <img
                    src={profile.userDetail.avatar || "https://via.placeholder.com/150"}
                    alt="User"
                    className="w-24 h-24 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 -bottom-12"
                />
            </div>

            {/* User Info */}
            <div className="text-center mt-16">
                <h2 className="text-2xl font-semibold">{profile.userDetail.name}</h2>
                <p className="text-gray-500">{profile.userDetail.email}</p>

                {/* Extra Profile Info */}
                {profile.bio && <p className="mt-2 text-gray-700">{profile.bio}</p>}
                {profile.phone && (
                    <p className="mt-1 text-gray-700">📞 {profile.phone}</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
