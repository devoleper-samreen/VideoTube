import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import OTPInput from './components/Otp';
import { Toaster } from 'react-hot-toast';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ProtectedRoute from './protected/Protected'
import Profile from './components/Profile';
import Layout from './layout/layout';
import Feed from './components/Feed';
import Upload from './components/Upload';
import ProfileUpdate from "./components/ProfileUpdate";
import VideoPage from './components/VideoPage';
import ChangePassword from "./components/ChangePassword"
import Dashboard from "./components/Dashboard"
import YourVideos from './components/YourVideos';
import WatchedVideos from "./components/WatchedVideos"

function App() {

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* routes with navbar and sidebar */}
        <Route path='/' element={<Layout />} >
          <Route index element={<Feed />} />
          <Route path='/search' element={<Feed />} />

          {/* Protected Route */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path='/change-password' element={<ChangePassword />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/your-videos' element={<YourVideos />} />
            <Route path='/watched-videos' element={<WatchedVideos />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/edit-profile" element={<ProfileUpdate />} />
            <Route path="/video/:videoId" element={<VideoPage />} />
          </Route>
        </Route>

        {/* public routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/verify-email' element={<OTPInput />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:id/:token' element={<ResetPassword />} />

      </Routes>
    </div>
  );
}

export default App;