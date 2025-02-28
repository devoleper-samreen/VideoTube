import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetMeQuery } from "../../redux/api/auth";
import { useEffect } from "react";
import Loader from "../components/loader"

const ProtectedRoute = () => {
    const { data: user, refetch, isLoading } = useGetMeQuery();
    const location = useLocation();

    //just for testing
    // useEffect(() => {
    //     refetch();
    //     console.log('fetching user:', user);
    // }, [location.pathname, refetch]);

    if (isLoading) {
        console.log('fetching user:', user);
        return <Loader />
    }


    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
