import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetMeQuery } from "../../redux/api/auth";
import { useEffect } from "react";

const ProtectedRoute = () => {
    const { data: user, refetch } = useGetMeQuery();
    const location = useLocation();

    //just for testing
    useEffect(() => {
        refetch();
        console.log('fetching');
    }, [location.pathname, refetch]);


    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
