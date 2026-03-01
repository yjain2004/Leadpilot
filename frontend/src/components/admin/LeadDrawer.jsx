import { useEffect, useState } from "react";
import { getLeadById, updateTaskStatus, updateLeadStatus } from "../../api/api";

const taskBadge = {
    pending: "bg-blue-100 text-blue-600",
    in_progress: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-600",
    cancelled: "bg-slate-100 text-slate-500"
};

export default function LeadDrawer({ leadId, onClose }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        getLeadById(leadId).then(res => setData(res.data.data));
    }, [leadId]);

    if (!data) return null;

    const { lead, tasks, activities } = data;

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
            <div className="w-[480px] bg-white h-full p-6 overflow-y-auto">

                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-lg font-semibold">
                            {lead.personalInfo.fullName}
                        </h2>
                        <p className="text-sm text-slate-500">
                            {lead.personalInfo.email}
                        </p>
                    </div>
                    <button onClick={onClose} className="text-slate-500">✕</button>
                </div>

                {/* Lead Status */}
                <div className="mb-6">
                    <label className="text-sm text-slate-500">Lead Status</label>
                    <select
                        value={lead.status}
                        onChange={(e) =>
                            updateLeadStatus(lead._id, e.target.value)
                        }
                        className="w-full border rounded px-3 py-2 text-sm mt-1"
                    >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="lost">Lost</option>
                    </select>
                </div>

                {/* Tasks */}
                <div className="mb-8">
                    <h3 className="font-semibold mb-3">Tasks</h3>
                    <div className="space-y-3">
                        {tasks.map(task => (
                            <div key={task._id} className="border rounded-lg p-3">
                                <p className="font-medium">{task.title}</p>
                                <p className="text-xs text-slate-500">
                                    Due: {new Date(task.dueAt).toLocaleString()}
                                </p>

                                <select
                                    value={task.status}
                                    onChange={(e) =>
                                        updateTaskStatus(task._id, e.target.value)
                                    }
                                    className={`mt-2 text-xs px-2 py-1 rounded ${taskBadge[task.status]}`}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity */}
                <div>
                    <h3 className="font-semibold mb-3">Activity</h3>
                    <div className="space-y-3 text-sm">
                        {activities.map(a => (
                            <div key={a._id} className="flex gap-2">
                                <span className="mt-1 h-2 w-2 rounded-full bg-slate-400" />
                                <div>
                                    <p className="font-medium">
                                        {a.type.replaceAll("_", " ")}
                                    </p>
                                    <p className="text-slate-500">
                                        {new Date(a.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}