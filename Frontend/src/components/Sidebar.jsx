import PropTypes from 'prop-types';
import { GoHome } from "react-icons/go";
import { AiOutlineLike } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa6";
import { BiVideo } from "react-icons/bi";
import { MdOutlineLogout } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { useLogoutMutation } from "../../redux/api/auth"
import { toast } from 'react-hot-toast';


function Sidebar({ isOpen }) {
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      window.location.href = "/";


    } catch (error) {
      console.log(error);
    }
  }

  const sidebarItems2 = [

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


  return (
    <div
      className={`h-[calc(100vh-56px)] border-r-2  border-r-gray-200 bg-white transition-all duration-300 overflow-y-auto shadow-md
      ${isOpen ? 'w-50' : 'w-0'} ${isOpen ? 'p-5' : 'p-0'}`}
      id='sidebar'
    >
      {/* Home */}
      <div className="space-y-4 items-center">
        <Link to='/'>
          <div
            className={`flex items-center space-x-6 duration-300 py-3 px-2 mt-3 rounded-2xl  ${isOpen && "hover:bg-gray-300"}`}
          >
            <div className="text-xl cursor-pointer"><GoHome /></div>
            <span className="cursor-pointer">Home</span>
          </div>
        </Link>
      </div>
      <br />
      <hr />
      {/* You */}
      <div className="mt-4 space-y-3 items-center">
        <div className="flex items-center space-x-2 mb-6">
          <h1>You</h1>
          <FaChevronRight />
        </div>
        {sidebarItems2.map((item) => {
          return (
            <Link
              key={item.id} to={item.path}
              className={`flex items-center space-x-6 duration-300 rounded-xl py-2 px-2 ${isOpen && "hover:bg-gray-300"}`}
            >
              <div className="text-xl cursor-pointer">{item.icon}</div>
              <span className="cursor-pointer">{item.name}</span>
            </Link>
          );
        })}
      </div>
      <br />
      <hr />

      {/* dashboard & logout */}
      <div className="mt-4 space-y-3 items-center">
        <div className="items-center space-x-2">
          {isOpen && <h1 className=" font-semibold mb-6">Go For</h1>}
        </div>

        <Link
          to='/dashboard'
          className={`flex items-center space-x-6 duration-300 rounded-xl py-2 px-2 ${isOpen && "hover:bg-gray-300"}`}
        >
          <div className="text-xl cursor-pointer"><RxDashboard /></div>
          <span className="cursor-pointer">Dashboard</span>
        </Link>

        <Link
          onClick={handleLogout}
          className={`flex items-center space-x-6 duration-300 rounded-xl py-2 px-2 ${isOpen && "hover:bg-gray-300"}`}
        >
          <div className="text-xl cursor-pointer"><MdOutlineLogout /></div>
          <span className="cursor-pointer">Logout</span>
        </Link>

      </div>
      <br />
      <hr />

      {isOpen && <p className="text-xs text-gray-500 mt-6 text-center">© 2025 VideoTube</p>}

    </div >
  );
}
Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default Sidebar;