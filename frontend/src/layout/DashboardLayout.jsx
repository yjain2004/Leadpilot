// layouts/DashboardLayout.jsx
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
    return (
        <>
            <Sidebar />
            <div className="ml-56">
                <Topbar />
                <main className="p-6 bg-gray-100 min-h-screen">
                    <Outlet />
                </main>
            </div>
        </>
    );
}