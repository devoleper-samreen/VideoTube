import PropTypes from 'prop-types';
import { GoHome } from "react-icons/go";
import { MdOutlineSubscriptions, MdHistory } from "react-icons/md";
import { PiUserSquareThin } from "react-icons/pi";
import { IoGameControllerOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { SiYoutubestudio } from "react-icons/si";
import { SiYoutubekids } from "react-icons/si";
import { SiYoutubemusic } from "react-icons/si";
import { SiTrendmicro } from "react-icons/si";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { PiFilmSlateLight } from "react-icons/pi";
import { CgMediaLive } from "react-icons/cg";
import { FaRegNewspaper } from "react-icons/fa";
import { TfiCup } from "react-icons/tfi";
import { PiLightbulbLight } from "react-icons/pi";
import { SiStylelint } from "react-icons/si";
import { MdPodcasts } from "react-icons/md";
import { BiVideo } from "react-icons/bi";


function Sidebar({ isOpen }) {
  const sidebarItems = [
    {
      id: 1,
      name: "Home",
      icon: <GoHome />,
    },
    
    {
      id: 3,
      name: "Subscriptions",
      icon: <MdOutlineSubscriptions />,
    },
  ];
  const sidebarItems2 = [
    {
      id: 1,
      name: "Your Channel",
      icon: <PiUserSquareThin />,
    },
    {
      id: 2,
      name: "History",
      icon: <MdHistory />,
    },
    {
      id: 3,
      name: "Playlists",
      icon: <MdOutlineSubscriptions />,
    },
    {
      id: 4,
      name: "Your Videos",
      icon: <BiVideo />,
    },
    
    {
      id: 6,
      name: "Liked videos",
      icon: <AiOutlineLike />,
    },
  ];
  const sidebarItems3 = [
    {
      id: 1,
      name: "Trending",
      icon: <SiTrendmicro />,
    },
    {
      id: 2,
      name: "Shopping",
      icon: <HiOutlineShoppingBag />,
    },
    {
      id: 3,
      name: "Music",
      icon: <SiYoutubemusic />,
    },
    {
      id: 4,
      name: "Films",
      icon: <PiFilmSlateLight />,
    },
    {
      id: 5,
      name: "Live",
      icon: <CgMediaLive />,
    },
    {
      id: 6,
      name: "Gaming",
      icon: <IoGameControllerOutline />,
    },
    {
      id: 7,
      name: "News",
      icon: <FaRegNewspaper />,
    },
    {
      id: 8,
      name: "Sport",
      icon: <TfiCup />,
    },
    {
      id: 9,
      name: "Courses",
      icon: <SiStylelint />,
    },
    {
      id: 10,
      name: "Fashion & beauty",
      icon: <PiLightbulbLight />,
    },
    {
      id: 11,
      name: "Padcasts",
      icon: <MdPodcasts />,
    },
  ];
  const sidebarItems4 = [
    {
      id: 1,
      name: "Videotube Premium",
      icon: <FaYoutube />,
    },
    {
      id: 2,
      name: "Videotube Studio",
      icon: <SiYoutubestudio />,
    },
    {
      id: 3,
      name: "Videotube Music",
      icon: <SiYoutubemusic />,
    },
    {
      id: 4,
      name: "Videotube Kids",
      icon: <SiYoutubekids />,
    },
  ];
  return (
    <div 
      className={`h-[calc(100vh-56px)] bg-white transition-all duration-300 overflow-y-auto
      ${isOpen ? 'w-64' : 'w-20'}`}
    >
      {/* Home */}
      <div className=" space-y-3 items-center">
        {sidebarItems.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center space-x-6 hover:bg-gray-300 duration-300 rounded-xl p-1"
            >
              <div className="text-xl cursor-pointer">{item.icon}</div>
              <span className="cursor-pointer">{item.name}</span>
            </div>
          );
        })}
      </div>
      <br />
      <hr />
      {/* You */}
      <div className="mt-4 space-y-3 items-center">
        <div className="flex items-center space-x-2">
          <h1>You</h1>
          <FaChevronRight />
        </div>
        {sidebarItems2.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center space-x-6 hover:bg-gray-300 duration-300 rounded-xl p-1"
            >
              <div className="text-xl cursor-pointer">{item.icon}</div>
              <span className="cursor-pointer">{item.name}</span>
            </div>
          );
        })}
      </div>
      <br />
      <hr />
      {/* Explore */}
      <div className="mt-4 space-y-3 items-center">
        <div className="items-center space-x-2">
          <h1 className=" font-semibold">Explore</h1>
        </div>
        {sidebarItems3.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center space-x-6 hover:bg-gray-300 duration-300 rounded-xl p-1"
            >
              <div className="text-xl cursor-pointer">{item.icon}</div>
              <span className="cursor-pointer">{item.name}</span>
            </div>
          );
        })}
      </div>
      <br />
      <hr />
      {/* More section */}
      <div className="mt-4 space-y-3 items-center">
        <div className="items-center space-x-2">
          <h1 className=" font-semibold">More From Videotube</h1>
        </div>
        {sidebarItems4.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center space-x-6 hover:bg-gray-300 duration-300 rounded-xl p-1"
            >
              <div className="text-xl cursor-pointer text-red-500">
                {item.icon}
              </div>
              <span className="cursor-pointer">{item.name}</span>
            </div>
          );
        })}
        <hr />
      </div>
      <br />
      <span className="text-xs text-gray-600 font-semibold">
        About Press Copyright <br /> Contact us Creators <br /> Advertise
        Developers <br />
        <p className="mt-3">Terms Privacy Policy & Safety</p> How VideoTube works{" "}
        <br /> Test new features
      </span>
      <br />
      <p className="text-xs text-gray-500 mt-3">© 2025 VideoTube</p>
    </div>
  );
}
Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default Sidebar;