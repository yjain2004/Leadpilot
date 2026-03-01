import { useEffect, useState } from "react";
import { getLeads } from "../../api/api";
import StatCard from "../../components/admin/StatCard";
import { useNavigate } from "react-router-dom";

const heatColor = {
    hot: "bg-red-100 text-red-600",
    warm: "bg-yellow-100 text-yellow-700",
    cold: "bg-slate-100 text-slate-600"
};

const statusColor = {
    new: "bg-blue-100 text-blue-600",
    contacted: "bg-purple-100 text-purple-600",
    follow_up: "bg-yellow-100 text-yellow-700",
    converted: "bg-green-100 text-green-600",
    lost: "bg-gray-100 text-gray-600"
};

export default function Dashboard() {
    const navigate = useNavigate();
    const [leads, setLeads] = useState([]);
    const [sortBy, setSortBy] = useState("createdAt");

    useEffect(() => {
        getLeads().then(res => setLeads(res.data.data));
    }, []);

    const sortedLeads = [...leads].sort((a, b) => {
        if (sortBy === "heat") {
            const rank = { hot: 3, warm: 2, cold: 1 };
            return (rank[b.heat] || 0) - (rank[a.heat] || 0);
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const thisMonthLeads = leads.filter(
        l => new Date(l.createdAt).getMonth() === new Date().getMonth()
    );

    const hotLeads = leads.filter(l => l.heat === "hot");

    return (
        <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Leads this month" value={thisMonthLeads.length} />
                <StatCard label="Hot Leads" value={hotLeads.length} />
                <StatCard label="Active Leads" value={leads.length} />
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b">
                    <h2 className="font-semibold text-lg text-slate-800">Active Leads</h2>
                    <p className="text-sm text-slate-500">
                        Click a lead to view details & tasks
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-500 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left font-medium">Name</th>
                                <th className="px-6 py-3 text-left font-medium">Email</th>
                                <th className="px-6 py-3 cursor-pointer hover:text-slate-700 font-medium text-center" onClick={() => setSortBy("heat")}>Heat ↕</th>
                                <th className="px-6 py-3 cursor-pointer hover:text-slate-700 font-medium text-center" onClick={() => setSortBy("createdAt")}>Created ↕</th>
                                <th className="px-6 py-3 text-center font-medium">Status</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {sortedLeads.slice(0, 10).map(lead => (
                                <tr
                                    key={lead._id}
                                    onClick={() => navigate(`/leads/${lead._id}`)}
                                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                                >
                                    <td className="px-6 py-4 font-medium text-slate-800">
                                        {lead.name}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {lead.email}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${heatColor[lead.heat] || heatColor.cold}`}>
                                            {lead.heat || "cold"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center text-slate-500 text-xs">
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor[lead.status] || statusColor.new}`}>
                                            {lead.status.replace("_", " ")}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {sortedLeads.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                                        No leads found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
