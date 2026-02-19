
export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-4">
            <h1 className="text-4xl font-bold text-danger mb-4">401 - Unauthorized</h1>
            <p className="text-slate-600 mb-6">You do not have permission to access this page.</p>
        </div>
    );
}
