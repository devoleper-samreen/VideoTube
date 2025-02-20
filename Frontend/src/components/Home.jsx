import Sidebar from "./Sidebar.jsx";
// import Video from "./Video";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
// import ListItems from "./ListItems.jsx";
import Navbar from "./Navbar.jsx";
function Home() {
  const { data, loading } = useAuth();
  console.log(data);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex mt-10">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 mt-10">
        <Sidebar isOpen={isSidebarOpen} />
      </div>
        {/* <ListItems /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          {!loading &&
            data.map((item) => {
              if (item.type !== "video") return false;
              return <Video key={item.id} video={item?.video} />;
            })}
        </div>
      
    </div>
  );
}

export default Home;