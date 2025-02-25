// import ListItems from './components/ListItems';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
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

function App() {
  return (
    <div>

      {/* <ListItems /> */}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:searchQuery" element={<Search />} />
        <Route path="/playing" element={<PlayingVideo />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/verify-email' element={<OTPInput />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        {/* Protected Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/content" element={<Content />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;