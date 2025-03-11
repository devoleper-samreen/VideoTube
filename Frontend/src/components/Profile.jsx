import { useGetProfileQuery } from "../../redux/api/profileApi";
import { Skeleton, Stack } from "@mui/material";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useGetProfileQuery();
    // const { profile } = data;

    if (isLoading) {
        return (
            <div className="w-[100%] p-4 mt-2 shadow-md">
                {/* Skeleton for Cover Image */}
                <Skeleton variant="rectangular" width="100%" height={208} className="rounded-lg" />

                {/* Skeleton for Profile Picture */}
                <div className="relative flex justify-center">
                    <Skeleton
                        variant="circular"
                        width={128}
                        height={128}
                        className="absolute -top-16"
                    />
                </div>

                {/* Skeleton for Buttons */}
                <div className="mt-20 mb-6 flex justify-end gap-4">
                    <Skeleton variant="rectangular" width={120} height={40} />
                    <Skeleton variant="rectangular" width={150} height={40} />
                </div>

                {/* Skeleton for Name */}
                <Skeleton width="30%" height={30} className="mb-4" />
                <Skeleton width="50%" height={25} className="mb-10" />

                {/* Skeleton for Email */}
                <Skeleton width="40%" height={30} className="mb-4" />
                <Skeleton width="60%" height={25} className="mb-10" />

                {/* Skeleton for Description */}
                <Skeleton width="35%" height={30} className="mb-4" />
                <Skeleton width="80%" height={60} className="mb-10" />
            </div>
        );
    }

    return (
        <div className="w-[100%] p-4 mt-2 shadow-md">
            {/* Cover Image */}
            <div className="relative">
                <img
                    src={data?.profile?.coverImage || ''}
                    alt="Cover"
                    className="w-full h-52 object-cover rounded-lg bg-gray-100"
                />
                {/* User Picture */}
                <img
                    src={data?.profile?.profilePicture || ''}
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
                    <Link to='/change-password'>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ textTransform: 'none', float: 'right' }}
                        >
                            change password
                        </Button>
                    </Link>
                </Stack>

                <h2 className="text-xl font-bold mb-4">Name</h2>
                <p className="text-lg text-gray-500 mb-10 border py-2 px-8 w-fit rounded-lg">
                    {data?.profile?.userDetail.name}
                </p>
                <h2 className="text-xl font-bold mb-4">Email Address</h2>
                <p className="text-lg text-gray-500 mb-10 border py-2 px-8 w-fit rounded-lg">
                    {data?.profile?.userDetail.email}
                </p>

                <h2 className="text-xl font-bold mb-4">Description</h2>
                <p className="text-lg text-gray-500 mb-10 border py-2 px-8 w-fit rounded-lg">
                    {data?.profile?.description || 'No description'}
                </p>
            </div>

        </div>
    );
};

export default Profile;
