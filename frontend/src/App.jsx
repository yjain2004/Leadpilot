import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import PublicLayout from "./layout/PublicLayout";

import Home from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";
import Leads from "./pages/admin/Leads";
import LeadDetail from "./pages/admin/LeadDetail";
import AdminLogin from "./pages/admin/AdminLogin";
import RequireAuth from "./components/admin/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes (NO sidebar/topbar) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        {/* Dashboard routes (WITH sidebar/topbar, protected) */}
        <Route
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/leads/:id" element={<LeadDetail />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;