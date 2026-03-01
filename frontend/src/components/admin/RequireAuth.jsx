import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentAdmin } from "../../api/api";

const AdminContext = createContext(null);

export function useAdmin() {
    return useContext(AdminContext);
}

export default function RequireAuth({ children }) {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        getCurrentAdmin()
            .then(res => {
                if (!isMounted) return;
                setAdmin(res.data.data);
                setLoading(false);
            })
            .catch(() => {
                if (!isMounted) return;
                setAdmin(null);
                setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-500">
                Checking admin session...
            </div>
        );
    }

    if (!admin) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <AdminContext.Provider value={{ admin, setAdmin }}>
            {children}
        </AdminContext.Provider>
    );
}

