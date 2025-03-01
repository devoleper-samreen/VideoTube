import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth"
import { videoApi } from "./api/videoApi"
import { uploadApi } from "./api/upload"
import { profileApi } from "./api/profileApi";
import { searchApi } from "./api/searchApi";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [videoApi.reducerPath]: videoApi.reducer,
        [uploadApi.reducerPath]: uploadApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [searchApi.reducerPath]: searchApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, videoApi.middleware, uploadApi.middleware, profileApi.middleware, searchApi.middleware),
});
