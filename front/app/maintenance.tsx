
import { FiTool } from "react-icons/fi";

export default function MaintenancePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FiTool className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">System Under Maintenance</h1>
            <p className="text-slate-600 max-w-md text-center">
                We are currently performing scheduled maintenance to improve our services. Please check back later.
            </p>
        </div>
    );
}
