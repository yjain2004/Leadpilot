import { useEffect, useState } from "react";
import { getLeads } from "../../api/api";
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

export default function Leads() {
    const [leads, setLeads] = useState([]);
    const [heatFilter, setHeatFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const navigate = useNavigate();

    useEffect(() => {
        getLeads().then(res => setLeads(res.data.data));
    }, []);

    const filteredLeads = leads.filter(lead => {
        if (heatFilter !== "all" && lead.heat !== heatFilter) return false;
        if (statusFilter !== "all" && lead.status !== statusFilter) return false;
        return true;
    });

    return (
        <div className="bg-white rounded-xl border shadow-sm">
            <div className="px-6 py-4 border-b flex justify-between items-center">
                <div>
                    <h2 className="font-semibold text-slate-800 text-lg">Leads</h2>
                    <p className="text-sm text-slate-500">Manage and track incoming leads</p>
                </div>
                <div className="flex gap-4">
                    <select
                        value={heatFilter}
                        onChange={e => setHeatFilter(e.target.value)}
                        className="border rounded px-3 py-1.5 text-sm outline-none text-slate-600 bg-slate-50 border-slate-200"
                    >
                        <option value="all">All Heat Levels</option>
                        <option value="hot">Hot</option>
                        <option value="warm">Warm</option>
                        <option value="cold">Cold</option>
                    </select>

                    <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        className="border rounded px-3 py-1.5 text-sm outline-none text-slate-600 bg-slate-50 border-slate-200"
                    >
                        <option value="all">All Statuses</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="follow_up">Follow Up</option>
                        <option value="converted">Converted</option>
                        <option value="lost">Lost</option>
                    </select>
                </div>
            </div>

            <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 border-b">
                    <tr>
                        <th className="px-6 py-3 text-left font-medium">Name</th>
                        <th className="px-6 py-3 text-left font-medium">Email</th>
                        <th className="px-6 py-3 text-center font-medium">Heat</th>
                        <th className="px-6 py-3 text-center font-medium">Status</th>
                        <th className="px-6 py-3 text-center font-medium">Created</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredLeads.map(lead => (
                        <tr
                            key={lead._id}
                            onClick={() => navigate(`/leads/${lead._id}`)}
                            className="border-b last:border-0 hover:bg-slate-50 cursor-pointer transition-colors"
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
                            <td className="px-6 py-4 text-center">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor[lead.status] || statusColor.new}`}>
                                    {lead.status.replace("_", " ")}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-center text-slate-500 text-xs">
                                {new Date(lead.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                    {filteredLeads.length === 0 && (
                        <tr>
                            <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                                No leads found matching the selected filters.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
