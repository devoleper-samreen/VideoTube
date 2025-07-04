import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./protected/Protected";
import Layout from "./layout/layout";

// Lazy loaded components
import { lazy, Suspense } from "react";

const Feed = lazy(() => import("./components/Feed"));
const Signup = lazy(() => import("./components/Signup"));
const Login = lazy(() => import("./components/Login"));
const OTPInput = lazy(() => import("./components/Otp"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/ResetPassword"));
const Profile = lazy(() => import("./components/Profile"));
const ProfileUpdate = lazy(() => import("./components/ProfileUpdate"));
const ChangePassword = lazy(() => import("./components/ChangePassword"));
const Upload = lazy(() => import("./components/Upload"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const YourVideos = lazy(() => import("./components/YourVideos"));
const WatchedVideos = lazy(() => import("./components/WatchedVideos"));
const VideoPage = lazy(() => import("./components/VideoPage"));

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          {/* Layout Routes (with navbar/sidebar) */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Feed />} />
            <Route path="search" element={<Feed />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="profile" element={<Profile />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="your-videos" element={<YourVideos />} />
              <Route path="watched-videos" element={<WatchedVideos />} />
              <Route path="upload" element={<Upload />} />
              <Route path="edit-profile" element={<ProfileUpdate />} />
              <Route path="video/:videoId" element={<VideoPage />} />
            </Route>
          </Route>

          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<OTPInput />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPassword />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
