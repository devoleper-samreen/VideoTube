import Sidebar from "./Sidebar.jsx";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import Navbar from "./Navbar.jsx";

function Home() {
  const { data, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen mx-auto max-w-[1500px]">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-14">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {!loading &&
              data.map((item) => {
                if (item.type !== "video") return false;
                return <Video key={item.id} video={item?.video} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;