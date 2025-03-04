import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth"
import { videoApi } from "./api/videoApi"
import { uploadApi } from "./api/upload"
import { profileApi } from "./api/profileApi";
import { searchApi } from "./api/searchApi";
import { likeApi } from "./api/likeApi";
import { commentApi } from "./api/commentApi"

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [videoApi.reducerPath]: videoApi.reducer,
        [uploadApi.reducerPath]: uploadApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [searchApi.reducerPath]: searchApi.reducer,
        [likeApi.reducerPath]: likeApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, videoApi.middleware, uploadApi.middleware, profileApi.middleware, searchApi.middleware, likeApi.middleware, commentApi.middleware),
});
