import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const Layout = () => {
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
                        <Outlet />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
