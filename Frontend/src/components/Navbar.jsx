import { useState } from "react";
import PropTypes from 'prop-types';
import OIP from "../assets/OIP.jpg";
import { AiOutlineMenu } from "react-icons/ai";
import { RiVideoUploadFill } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";

function Navbar({ toggleSidebar }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex justify-between fixed top-0 w-full bg-white px-3 py-2 z-50 h-14">
      <div className="flex items-center space-x-4">
        <AiOutlineMenu 
          className="text-xl cursor-pointer hover:bg-gray-100 rounded-full"
          onClick={toggleSidebar}
        />
        <img src={OIP} alt="" className="w-28 cursor-pointer" />
      </div>
      <div className="flex w-[35%] items-center">
        <div className="w-[100%] px-4 py-2 border-[1px] border-gray-400 rounded-full">
          <input
            type="text"
            placeholder="Search"
            className="outline-none w-full"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
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
        <div className="px-4 py-2 border-[1px] border-gray-400 rounded-full flex items-center space-x-2 hover:bg-gray-00 cursor-pointer transition duration-300">
          <RiVideoUploadFill className="text-xl"/>
          <span className="text-sm font-medium">Upload</span>
        </div>
      </div>
    </div>
  );
}
Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;