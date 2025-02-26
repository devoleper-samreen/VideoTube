import { useGetProfileQuery } from "../../redux/api/auth";
import { Skeleton, Stack } from "@mui/material";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLogoutMutation } from "../../redux/api/auth"
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useGetProfileQuery();
    console.log(data);
    const [logout, { isError }] = useLogoutMutation();


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

    const handleLogout = async () => {
        try {
            await logout();

            window.location.href = "/";
            toast.success('Logged out successfully');
            // navigate('/');

        } catch (error) {
            console.log(error);
        }
    }

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
                    src={profile.profilePicture || ''}
                    alt="User"
                    className="w-32 h-32 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 -bottom-12"
                />
            </div>

            {/* User Info */}
            <div className="mt-26 ml-8 border-t-4 rounded pt-6">
                <Stack direction="column" spacing={2}>
                    <Link to="/edit-profile">
                        <Button
                            onClick={() => navigate('/edit-profile')}
                            variant="contained"
                            color="primary"
                            sx={{ textTransform: 'none', float: 'right', textAlign: 'center' }}
                        >
                            Edit Profile

                        </Button>
                    </Link>

                    <Link>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ textTransform: 'none', float: 'right' }}
                            onClick={handleLogout}
                        >
                            logout
                            <LogoutIcon sx={{ ml: 1 }} />
                        </Button>
                    </Link>
                </Stack>

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
