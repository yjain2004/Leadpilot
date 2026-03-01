import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getLeadById,
    updateLead,
    sendEmailToLead
} from "../../api/api";

const heatColor = {
    hot: "bg-red-100 text-red-600",
    warm: "bg-yellow-100 text-yellow-700",
    cold: "bg-slate-100 text-slate-600"
};

export default function LeadDetail() {
    const { id } = useParams();
    const [lead, setLead] = useState(null);
    const [draft, setDraft] = useState("");
    const [sending, setSending] = useState(false);

    useEffect(() => {
        getLeadById(id).then(res => {
            setLead(res.data.data);
            setDraft(res.data.data.aiReplyDraft || "");
        }).catch(err => console.error(err));
    }, [id]);

    if (!lead) return <div className="p-8 text-center text-slate-500">Loading lead details...</div>;

    const handleUpdate = async (field, value) => {
        try {
            const res = await updateLead(lead._id, { [field]: value });
            setLead(res.data.data);
            if (field === "aiReplyDraft") {
                setDraft(res.data.data.aiReplyDraft);
            }
        } catch (error) {
            console.error("Failed to update lead", error);
            alert("Failed to update lead");
        }
    };

    const handleSendEmail = async () => {
        if (!draft) return alert("Draft cannot be empty.");
        setSending(true);
        try {
            const res = await sendEmailToLead(lead._id, draft);
            setLead(res.data.data);
            alert("Email sent successfully!");
        } catch (error) {
            console.error("Failed to send email", error);
            alert("Failed to send email");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-12">

            {/* Header / Summary */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            {lead.name}
                        </h2>
                        <p className="text-slate-600 mt-1">
                            {lead.email} · {lead.phone}
                        </p>
                        {lead.source && (
                            <p className="text-sm text-slate-500 mt-2">
                                Source: <span className="font-medium">{lead.source}</span>
                            </p>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <span className={`px-3 py-1.5 rounded-full text-sm font-semibold capitalize ${heatColor[lead.heat] || heatColor.cold}`}>
                            {lead.heat || "cold"}
                        </span>

                        <select
                            value={lead.status}
                            onChange={(e) => handleUpdate("status", e.target.value)}
                            className="border rounded-lg px-3 py-1.5 text-sm outline-none bg-slate-50 border-slate-200"
                        >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="follow_up">Follow Up</option>
                            <option value="converted">Converted</option>
                            <option value="lost">Lost</option>
                        </select>

                        <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5 bg-slate-50 border-slate-200">
                            <span className="text-sm text-slate-500">Follow-up:</span>
                            <input
                                type="date"
                                className="text-sm bg-transparent outline-none cursor-pointer"
                                value={lead.followUpDate ? lead.followUpDate.split("T")[0] : ""}
                                onChange={(e) => handleUpdate("followUpDate", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Original Message</h3>
                    <div className="bg-slate-50 p-4 rounded-lg text-slate-700 italic border border-slate-100">
                        "{lead.message || "No message provided."}"
                    </div>
                </div>
            </div>

            {/* AI Insights & Email Draft */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* AI Analysis */}
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <span>✨ AI Analysis</span>
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Intent</p>
                            <p className="text-slate-800 font-medium mt-1">{lead.intent || "Unknown"}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Summary</p>
                            <p className="text-slate-700 mt-1 leading-relaxed">{lead.aiSummary || "No summary available."}</p>
                        </div>
                    </div>
                </div>

                {/* AI Draft & Send */}
                <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                            <span>📝 Reply Draft</span>
                        </h3>
                        {lead.status === "contacted" && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">Already Contacted</span>
                        )}
                    </div>

                    <textarea
                        className="w-full flex-grow text-sm p-4 border rounded-lg bg-slate-50 focus:bg-white focus:outline-blue-500 resize-none min-h-[160px] mb-4"
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="Edit AI draft here before sending..."
                    ></textarea>

                    <div className="flex items-center justify-end gap-3 mt-auto">
                        <button
                            onClick={() => handleUpdate("aiReplyDraft", draft)}
                            className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                        >
                            Save Draft
                        </button>
                        <button
                            onClick={handleSendEmail}
                            disabled={sending}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition flex items-center gap-2 disabled:bg-blue-400"
                        >
                            {sending ? "Sending..." : "Send Email"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Activity Log */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="font-semibold text-slate-800 mb-6">Timeline Log</h3>

                {lead.activityLog && lead.activityLog.length > 0 ? (
                    <div className="relative border-l-2 border-slate-200 ml-3 space-y-6">
                        {[...lead.activityLog].reverse().map((log, index) => (
                            <div key={index} className="relative pl-6">
                                <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white bg-blue-500" />
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                                    <p className="font-medium text-slate-800 text-sm">{log.action}</p>
                                    <p className="text-xs text-slate-500 sm:min-w-[140px] sm:text-right mt-1 sm:mt-0">
                                        {new Date(log.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-slate-500 text-center py-4">No activity recorded yet.</p>
                )}
            </div>

        </div>
    );
}
