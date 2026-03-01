export default function StatCard({ label, value }) {
    return (
        <div className="bg-white p-5 rounded-xl shadow-sm border">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-1 text-3xl font-semibold text-slate-800">{value}</p>
        </div>

    );
}