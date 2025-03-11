import { Navigate, Outlet } from "react-router-dom";
import { useGetMeQuery } from "../../redux/api/auth";
import Loader from "../components/loader"

const ProtectedRoute = () => {
    const { data: user, isLoading } = useGetMeQuery();

    if (isLoading) {
        console.log('fetching user:', user);
        return <Loader />
    }


    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
