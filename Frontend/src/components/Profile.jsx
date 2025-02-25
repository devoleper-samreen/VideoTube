import { useGetMeQuery, useLogoutMutation } from "../../redux/api/auth";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
    const { data: user, isLoading } = useGetMeQuery();
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    if (isLoading) return <div className="flex justify-center mt-20"><CircularProgress /></div>;

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col items-center space-y-4">
                {/*  User Avatar */}
                {user?.avatar ? (
                    <img src={user.avatar} alt="Profile" className="w-24 h-24 rounded-full border" />
                ) : (
                    <FaUserCircle className="text-6xl text-gray-400" />
                )}

                {/*  User Info */}
                <h2 className="text-2xl font-bold">{user?.name || "Guest User"}</h2>
                <p className="text-gray-600">{user?.email || "No Email"}</p>

                {/*  Buttons */}
                <div className="flex space-x-4 mt-4">
                    <Button variant="contained" color="primary">
                        Update Profile
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
