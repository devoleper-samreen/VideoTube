import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex flex-col h-screen mx-auto max-w-[1500px]">
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="flex flex-1 pt-14">
                <Sidebar isOpen={isSidebarOpen} />
                <div className="w-[1000px] ml-2 flex-1 overflow-y-auto h-[540px]">
                    <Outlet />

                </div>
            </div>
        </div>
    );
};

export default Layout;
