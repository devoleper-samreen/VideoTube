import { useState } from "react";
import PropTypes from 'prop-types';
import OIP from "../assets/OIP.jpg";
import { AiOutlineMenu } from "react-icons/ai";
import { RiVideoUploadFill } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useGetMeQuery } from "../../redux/api/auth";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "../../redux/api/profileApi";


function Navbar({ toggleSidebar }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: user } = useGetMeQuery();
  const { data: profile } = useGetProfileQuery()
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?q=${searchQuery}`); // URL update
    }
  };


  return (
    <div className="flex justify-between max-w-[1250px] w-full mx-auto bg-white px-10 py-6 h-14 items-center shadow-md fixed">
      <div className="flex items-center space-x-4">
        <AiOutlineMenu
          className="text-xl cursor-pointer hover:bg-gray-100 rounded-full"
          onClick={toggleSidebar}
        />
        <Link to="/">
          <img src={OIP} alt="videotube logo" className="w-22 cursor-pointer" />
        </Link>
      </div>
      <div className="flex w-[35%] items-center">
        <div className="w-[100%] px-4 py-2 border-[1px] border-gray-400 rounded-full">
          <input
            type="text"
            placeholder="Search"
            className="outline-none w-full"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <div className="relative cursor-pointer">
          <IoIosNotificationsOutline className="text-2xl hover:text-gray-700" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </div>
        {/* Upload Video Button */}
        <div className="px-4 py-2 border-[1px] border-gray-400 rounded-full flex items-center space-x-2 hover:bg-gray-00 cursor-pointer transition duration-300" onClick={() => navigate('/upload')}>
          <RiVideoUploadFill className="text-xl" />
          <span className="text-sm font-medium">Upload</span>
        </div>
        {/*  Conditional Rendering */}
        {user ?
          (
            <Link to="/profile">
              {!profile?.profile?.profilePicture ?
                (<FaUserCircle className="text-4xl cursor-pointer text-gray-500" />) :
                (<img src={profile?.profile?.profilePicture} className="text-4xl cursor-pointer text-gray-500 bg-gray-300 h-10 w-10 rounded-full" />)
              }
            </Link>
          ) :
          (
            <Link to="/login">
              <Button
                variant="contained"
                color="primary"
                sx={{ width: '100%', textTransform: 'none' }}
              >
                Login
              </Button>
            </Link>
          )}
      </div>
    </div>
  );
}

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;