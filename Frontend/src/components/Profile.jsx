import { useGetProfileQuery } from "../../redux/api/auth";
import { Skeleton } from "@mui/material";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { data, isLoading } = useGetProfileQuery();
    console.log(data);


    if (isLoading) {
        return (
            <>
                <Skeleton variant="rectangular" width="90%" height={300} sx={{ mb: 10 }} />
                <Skeleton variant="rectangular" width="90%" height={300} />;
            </>

        )
    }

    if (!data || !data.profile) {
        return <p className="text-center text-red-500">Profile not found!</p>;
    }

    const { profile } = data;

    return (
        <div className="w-[100%] p-4 mt-2 shadow-md">
            {/* Cover Image */}
            <div className="relative">
                <img
                    src={profile?.coverImage || ''}
                    alt="Cover"
                    className="w-full h-52 object-cover rounded-lg bg-amber-600"
                />
                {/* User Picture */}
                <img
                    src={profile.userDetail.avatar || ''}
                    alt="User"
                    className="w-32 h-32 bg-amber-400 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 -bottom-12"
                />
            </div>

            {/* User Info */}
            <div className="mt-26 ml-8 border-t-4 rounded pt-12">
                <Link to="/login">
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ textTransform: 'none', float: 'right' }}
                    >
                        Edit Profile
                    </Button>
                </Link>
                <h2 className="text-xl font-bold mb-4">Name</h2>
                <p className="text-lg text-gray-500 mb-10 border py-2 px-8 w-fit rounded-lg">
                    {profile.userDetail.name}
                </p>
                <h2 className="text-xl font-bold mb-4">Email Address</h2>
                <p className="text-lg text-gray-500 mb-10 border py-2 px-8 w-fit rounded-lg">
                    {profile.userDetail.email}
                </p>

                <h2 className="text-xl font-bold mb-4">Description</h2>
                <p className="text-lg text-gray-500 mb-10 border py-2 px-8 w-fit rounded-lg">
                    {profile.description || 'No description'}
                </p>
            </div>

        </div>
    );
};

export default Profile;
