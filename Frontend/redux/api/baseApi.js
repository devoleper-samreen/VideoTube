import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
    credentials: "include",
});

// Custom Base Query jo Refresh Token Handle karega
const customBaseQuery = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status == 401) {

        const refreshResult = await baseQuery({
            url: "user/refresh-access-token",
            method: "POST",
        }, api, extraOptions);


        // Agar 401
        if (refreshResult?.error?.status == 401) {
            console.log('refresh token bhi exipre ho gaya');
        }

        // Agar naya access token mila
        if (refreshResult?.data?.data?.accessToken) {

            // **Original Request Retry karein with New Token**
            result = await baseQuery(args, api, extraOptions);
        }

    }

    return result;
};


export default customBaseQuery;