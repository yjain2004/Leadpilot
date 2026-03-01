import { useNavigate } from "react-router-dom";
import { adminLogout } from "../../api/api";
import { useAdmin } from "./RequireAuth";

export default function Topbar() {
    const navigate = useNavigate();
    const { admin } = useAdmin() || {};

    const handleLogout = async () => {
        try {
            await adminLogout();
        } finally {
            navigate("/admin/login", { replace: true });
        }
    };

    const initial = admin?.name ? admin.name.charAt(0).toUpperCase() : "A";

    return (
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
            <div className="text-sm text-slate-500">
                {admin ? `Welcome back, ${admin.name}` : "LeadPilot AI Assistant"}
            </div>

            <div className="flex items-center gap-3">
                {admin && (
                    <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                        Personal AI Assistant
                    </span>
                )}
                <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                    {initial}
                </div>
                <button
                    onClick={handleLogout}
                    className="text-xs text-slate-600 hover:text-red-600 font-medium transition-colors"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}
