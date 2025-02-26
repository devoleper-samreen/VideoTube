import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
    credentials: "include",
});

// Custom Base Query jo Refresh Token Handle karega
const customBaseQuery = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    // Agar Token Expire ho gaya (401 Unauthorized)
    if (result?.error?.status === 401) {
        console.log("Access Token expired, trying to refresh...");

        // Refresh Token API Call
        const refreshResult = await baseQuery("user/refresh-access-token", api, extraOptions);

        // Agar refresh token se naya access token mila
        if (refreshResult?.data) {
            console.log("Access Token refreshed!");

            //Original request ko dobara bhejo
            result = await baseQuery(args, api, extraOptions);
        } else {
            console.log("Refresh Token bhi expire ho gaya, user ko login karna padega.");
        }
    }

    return result;
};


export default customBaseQuery;