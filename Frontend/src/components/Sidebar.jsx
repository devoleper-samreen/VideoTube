import { GoHome } from "react-icons/go";
import { AiOutlineLike } from "react-icons/ai";
import { BiVideo } from "react-icons/bi";
import { MdOutlineLogout } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/auth";
import { toast } from "react-hot-toast";

const sidebarLinks = [
  {
    title: "Main",
    links: [{ name: "Home", icon: <GoHome />, path: "/" }],
  },
  {
    title: "Library",
    links: [
      { name: "Your Videos", icon: <BiVideo />, path: "/your-videos" },
      {
        name: "Watched Videos",
        icon: <AiOutlineLike />,
        path: "/watched-videos",
      },
    ],
  },
  {
    title: "Creator Tools",
    links: [{ name: "Dashboard", icon: <RxDashboard />, path: "/dashboard" }],
  },
];

function Sidebar() {
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <aside className="w-60 h-[calc(100vh-56px)] bg-[#fdfdfd] border-r border-gray-200 p-5 flex flex-col shadow-md">
      <div className="mb-8">
        <h1 className="text-xl font-bold tracking-wide text-gray-800">
          🎥 VideoTube
        </h1>
      </div>

      <div className="flex-grow space-y-8">
        {sidebarLinks.map((section, index) => (
          <div key={index}>
            <h2 className="text-xs font-semibold text-gray-500 uppercase mb-3 px-2">
              {section.title}
            </h2>
            <ul className="space-y-1">
              {section.links.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-700 font-medium text-sm"
                  >
                    <span className="text-lg text-red-600">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-red-50 transition-all duration-200 text-gray-700 font-medium text-sm"
        >
          <MdOutlineLogout className="text-lg text-red-600" />
          Logout
        </button>
        <p className="text-xs text-gray-400 text-center mt-6">
          © 2025 VideoTube
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
