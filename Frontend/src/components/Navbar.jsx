import { useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineMenu } from "react-icons/ai";
import { RiVideoUploadFill } from "react-icons/ri";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useGetMeQuery } from "../../redux/api/auth";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "../../redux/api/profileApi";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: user } = useGetMeQuery();
  const { data: profile } = useGetProfileQuery();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?q=${searchQuery}`); // URL update
    }
  };

  return (
    <div className="flex justify-between max-w-[1250px] w-full mx-auto bg-white px-10 py-6 h-14 items-center shadow-md fixed">
      <div className="flex items-center space-x-4">
        <Link to="/">
          <p className="text-2xl font-bold text-red-600">VideoTube</p>
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
        {/* Upload Video Button */}
        <div
          className="px-4 py-2 border-[1px] border-gray-400 rounded-full flex items-center space-x-2 hover:bg-gray-00 cursor-pointer transition duration-300"
          onClick={() => navigate("/upload")}
        >
          <RiVideoUploadFill className="text-xl text-red-600" />
          <span className="text-sm font-medium">Upload</span>
        </div>
        {/*  Conditional Rendering */}
        {user ? (
          <Link to="/profile">
            {!profile?.profile?.profilePicture ? (
              <FaUserCircle className="text-4xl cursor-pointer text-gray-500" />
            ) : (
              <img
                src={profile?.profile?.profilePicture}
                className="text-4xl cursor-pointer text-gray-500 bg-gray-300 h-10 w-10 rounded-full"
              />
            )}
          </Link>
        ) : (
          <Link to="/login">
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "100%", textTransform: "none" }}
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
