import { Navigate, Outlet } from "react-router-dom";
import { useGetMeQuery } from "../../redux/api/auth";

const ProtectedRoute = () => {
    const { data: user, isLoading } = useGetMeQuery();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
