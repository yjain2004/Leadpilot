import { NavLink } from "react-router-dom";

const navClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
   ${isActive ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-100"}`;

export default function Sidebar() {
    return (
        <aside className="w-60 bg-white border-r h-screen fixed px-3">
            <div className="h-16 flex items-center px-2 text-xl font-bold text-slate-800">
                LeadPilot
            </div>

            <nav className="space-y-1">
                <NavLink to="/dashboard" className={navClass}>
                    📊 Dashboard
                </NavLink>
                <NavLink to="/leads" className={navClass}>
                    📋 All Leads
                </NavLink>
            </nav>
        </aside>
    );
}
