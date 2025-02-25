import { Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import PlayingVideo from './components/PlayingVideo';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import OTPInput from './components/Otp';
import { Toaster } from 'react-hot-toast';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ProtectedRoute from './protected/Protected'
import Content from './components/content';
import Profile from './components/Profile';
import Layout from './layout/layout';

function App() {
  return (
    <div>

      {/* <ListItems /> */}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* routes with navbar and sidebar */}
        <Route path='/' element={<Layout />} >
          <Route path="/search/:searchQuery" element={<Search />} />
          <Route path="/playing" element={<PlayingVideo />} />

          {/* Protected Route */}
          <Route element={<ProtectedRoute />}>
            <Route path="/content" element={<Content />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* public routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/verify-email' element={<OTPInput />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />

      </Routes>
    </div>
  );
}

export default App;